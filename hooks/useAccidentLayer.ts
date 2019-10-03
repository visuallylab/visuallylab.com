import { useRef, useState, useEffect, useCallback } from 'react';
import { geoInterpolate } from 'd3-geo';
import { getRhumbLineBearing } from 'geolib';
import { Timer } from 'd3-timer';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { accidentFrames as frames } from '../constants';
import useAnimationController from './useAnimationController';

const useAccidentLayer = (enable: boolean, data: number[][][]) => {
  const timer = useRef<Timer>();
  const interpolatePos = useRef<Array<(t: number) => [number, number]>>([]);
  const [transportation, setTransportations] = useState(
    data.slice().map(d => ({ latlng: d[0], direction: 0 })),
  );
  const animationState = useRef<
    Array<{ currentPositionIndex: number; frame: number }>
  >(
    Array.from({ length: data.length }).map(() => ({
      currentPositionIndex: 0,
      frame: 0,
    })),
  );

  const updateInterpolatePos = useCallback((index: number) => {
    animationState.current[index].currentPositionIndex =
      animationState.current[index].currentPositionIndex + 1;
    if (
      animationState.current[index].currentPositionIndex + 1 ===
      data[index].length
    ) {
      animationState.current[index].currentPositionIndex = 1;
    }
    const currentPosition = data[index][
      animationState.current[index].currentPositionIndex
    ] as [number, number];
    const nextPosition = data[index][
      animationState.current[index].currentPositionIndex + 1
    ] as [number, number];
    interpolatePos.current[index] = geoInterpolate(
      currentPosition,
      nextPosition,
    );
  }, []);

  const animateIndexFrame = useCallback((index: number) => {
    if (animationState.current[index].frame === frames + 1) {
      animationState.current[index].frame = 0;
      updateInterpolatePos(index);
    }
    const newPosition = interpolatePos.current[index](
      animationState.current[index].frame / frames,
    );
    setTransportations(prev => {
      const newState = prev.slice();
      newState[index] = { ...newState[index] };
      newState[index].direction = getRhumbLineBearing(
        {
          latitude: newState[index].latlng[0],
          longitude: newState[index].latlng[1],
        },
        {
          latitude: newPosition[0],
          longitude: newPosition[1],
        },
      );
      newState[index].latlng = newPosition;
      return newState;
    });
    animationState.current[index].frame =
      animationState.current[index].frame + 1;
  }, []);

  const animateFrame = useCallback(() => {
    Array.from({ length: data.length }).forEach((_, index) => {
      animateIndexFrame(index);
    });
  }, [data]);

  useAnimationController(enable, timer, animateFrame);

  useEffect(() => {
    Array.from({ length: data.length }).forEach((_, index) => {
      const currentPosition = data.slice()[index][0] as [number, number];
      const nextPosition = data.slice()[index][1] as [number, number];
      interpolatePos.current[index] = geoInterpolate(
        currentPosition,
        nextPosition,
      );
    });
  }, []);

  return new ScenegraphLayer({
    id: 'accident-layer',
    data: transportation.map(t => ({
      position: t.latlng,
      orientation: t.direction,
    })),
    scenegraph:
      'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb',
    sizeScale: 1.5,
    getOrientation: (obj: { orientation: number }) => [
      0,
      -obj.orientation + 180,
      90,
    ],
  });
};

export default useAccidentLayer;
