import { frames } from '../constants';
import { geoInterpolate } from 'd3-geo';
import { Timer } from 'd3-timer';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';

import { registerLoaders } from '@loaders.gl/core';
import { GLTFScenegraphLoader } from '@luma.gl/addons';
import { getRhumbLineBearing, getDistance } from 'geolib';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import useAnimationController from './useAnimationController';

registerLoaders([GLTFScenegraphLoader]);

const BUS_NUM_OF_ROUTE = 6;

type THexagonData = {
  value: number;
  latlng: number[];
};

const useBusScenegraphLayers = (
  enable: boolean,
  buses: PublicTransportation[][],
) => {
  const timer = useRef<Timer>();
  const interpolatePos = useRef<Array<(t: number) => [number, number]>>([]);
  const insertedBusesData = useMemo(
    () =>
      buses.reduce(
        (accu, curr) => {
          const currSlices = Array.from({ length: BUS_NUM_OF_ROUTE }).map(
            (_, i) => {
              return curr
                .slice((curr.length / BUS_NUM_OF_ROUTE) * i)
                .concat(curr.slice(0, (curr.length / BUS_NUM_OF_ROUTE) * i));
            },
          );
          return [...accu, ...currSlices];
        },
        [] as PublicTransportation[][],
      ),
    [buses],
  );
  const [transportation, setTransportations] = useState(
    insertedBusesData.map(b => b[0]),
  );
  const animationState = useRef<
    Array<{ currentPositionIndex: number; frame: number; timestamp: number }>
  >(
    Array.from({ length: insertedBusesData.length }).map(() => ({
      currentPositionIndex: 1,
      frame: 0,
      timestamp: 0,
    })),
  );
  const [hexagonData, setHexagonData] = useState<{
    data: THexagonData[];
    count: number;
  }>({
    data: [],
    count: 0,
  });

  const animateFrame = useCallback(() => {
    let isSetInitValue = false;
    const newState: PublicTransportation[] = [];
    Array.from({ length: insertedBusesData.length }).forEach((_, index) => {
      if (animationState.current[index].frame === frames + 1) {
        animationState.current[index].frame = 0;
        if (index === 0) {
          setHexagonData(prev => ({
            count: prev.count + 1,
            data: buses[0].map((b, busIndex) => ({
              value:
                (busIndex - prev.count) % 5 === 0
                  ? Math.random() * 0.1
                  : Math.random() * b.capacityUtilization,
              latlng: b.latlng,
            })),
          }));
        }
        if (
          animationState.current[index].currentPositionIndex + 1 ===
          insertedBusesData[index].length
        ) {
          newState[index] = { ...newState[index], direction: 0 };
          animationState.current[index].frame = 0;
          animationState.current[index].currentPositionIndex = 1;
          interpolatePos.current[index] = geoInterpolate(
            insertedBusesData[index][0].latlng as [number, number],
            insertedBusesData[index][1].latlng as [number, number],
          );
          isSetInitValue = true;
          return;
        }

        const currentPosition = insertedBusesData[index][
          animationState.current[index].currentPositionIndex
        ].latlng as [number, number];
        const nextPosition = insertedBusesData[index][
          animationState.current[index].currentPositionIndex + 1
        ].latlng as [number, number];
        interpolatePos.current[index] = geoInterpolate(
          currentPosition,
          nextPosition,
        );
        animationState.current[index].currentPositionIndex =
          animationState.current[index].currentPositionIndex + 1;
      }
      animationState.current[index].frame =
        animationState.current[index].frame + 1;
      animationState.current[index].timestamp =
        animationState.current[index].currentPositionIndex * frames +
        animationState.current[index].frame;
    });
    if (isSetInitValue) {
      setTransportations(insertedBusesData.map(b => b[0]));
    } else {
      setTransportations(prev => {
        const nextState = [...prev];

        for (let index = 0; index < insertedBusesData.length; index++) {
          const newPosition = interpolatePos.current[index](
            animationState.current[index].frame / frames,
          );

          const speed =
            (getDistance(
              {
                latitude: nextState[index].latlng[0],
                longitude: nextState[index].latlng[1],
              },
              {
                latitude: newPosition[0],
                longitude: newPosition[1],
              },
            ) /
              1000 /
              frames) *
            36000;

          const direction = getRhumbLineBearing(
            {
              latitude: nextState[index].latlng[0],
              longitude: nextState[index].latlng[1],
            },
            {
              latitude: newPosition[0],
              longitude: newPosition[1],
            },
          );

          nextState[index] = {
            ...prev[index],
            ...(newState[index] ? newState[index] : []),
            speed,
            direction,
            latlng: newPosition,
          };
        }

        return nextState;
      });
    }
  }, []);

  useAnimationController(enable, timer, animateFrame);

  useEffect(() => {
    Array.from({ length: insertedBusesData.length }).forEach((_, index) => {
      const currentPosition = insertedBusesData[index][0].latlng as [
        number,
        number,
      ];
      const nextPosition = insertedBusesData[index][1].latlng as [
        number,
        number,
      ];
      interpolatePos.current[index] = geoInterpolate(
        currentPosition,
        nextPosition,
      );
    });
  }, [insertedBusesData, enable]);

  return {
    transportation,
    layers: [
      new HexagonLayer({
        id: 'hexagon-layer',
        data: hexagonData.data,
        pickable: true,
        extruded: true,
        radius: 10,
        elevationScale: 4,
        elevationRange: [0, 30],
        getPosition: (d: THexagonData) => d.latlng,
        getElevationWeight: (d: THexagonData) => d.value,
      }),
      new ScenegraphLayer({
        id: 'bus-layer',
        data: transportation.map(t => ({
          position: t.latlng,
          orientation: t.direction,
        })),
        scenegraph:
          'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb',
        sizeScale: 2,
        getOrientation: (obj: { orientation: number }) => [
          0,
          -obj.orientation + 180,
          90,
        ],
      }),
    ],
    timestamps: animationState.current.map(d => d.timestamp),
  };
};

export default useBusScenegraphLayers;
