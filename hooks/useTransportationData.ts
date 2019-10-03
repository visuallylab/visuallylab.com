import { frames } from '../constants';
import { geoInterpolate } from 'd3-geo';
import { Timer } from 'd3-timer';
import { useRef, useState, useEffect, useCallback } from 'react';

import { registerLoaders } from '@loaders.gl/core';
import staticTraffic from 'static/data/traffic/traffic.json';
import { GLTFScenegraphLoader } from '@luma.gl/addons';
import { getRhumbLineBearing, getDistance } from 'geolib';
import useAnimationController from './useAnimationController';

registerLoaders([GLTFScenegraphLoader]);

const initalTransportation = staticTraffic.map(d => {
  return {
    ...d.data[0],
    direction: d.data[0].direction ? d.data[0].direction : 0,
  };
});

const useTransportationData = (
  enable: boolean,
  traffic: TransporationItem[],
) => {
  const timers = useRef<Timer>();
  const interpolatePos = useRef<Array<(t: number) => [number, number]>>([]);
  const [transportation, setTransportations] = useState(initalTransportation);
  const animationState = useRef<
    Array<{ currentPositionIndex: number; frame: number; timestamp: number }>
  >(
    Array.from({ length: traffic.length }).map(() => ({
      currentPositionIndex: 1,
      frame: 0,
      timestamp: 0,
    })),
  );
  const maxAnimationIndex = Math.max(...traffic.map(t => t.data.length));

  const animateFrame = useCallback(() => {
    let isSetInitValue = false;
    const newState: SelfUsedTransportation[] = [];
    Array.from({ length: traffic.length }).forEach((_, index) => {
      if (animationState.current[index].frame === frames + 1) {
        animationState.current[index].frame = 0;
        if (
          animationState.current[index].currentPositionIndex + 1 ===
          traffic[index].data.length
        ) {
          newState[index] = { ...newState[index], direction: 0 };
          if (
            animationState.current[index].currentPositionIndex + 1 ===
              maxAnimationIndex &&
            !isSetInitValue
          ) {
            isSetInitValue = true;

            animationState.current.forEach((__, i) => {
              animationState.current[i].frame = 0;
              animationState.current[i].currentPositionIndex = 1;
              interpolatePos.current[i] = geoInterpolate(
                traffic[i].data[0].latlng as [number, number],
                traffic[i].data[1].latlng as [number, number],
              );
            });
          }
          return;
        }
        const currentPosition = traffic[index].data[
          animationState.current[index].currentPositionIndex
        ].latlng as [number, number];
        const nextPosition = traffic[index].data[
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
      setTransportations(initalTransportation);
    } else {
      setTransportations(prev => {
        const nextState = [...prev];

        for (let index = 0; index < traffic.length; index++) {
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
            360000;

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

  useAnimationController(enable, timers, animateFrame);

  useEffect(() => {
    Array.from({ length: traffic.length }).forEach((_, index) => {
      const currentPosition = traffic[index].data[0].latlng as [number, number];
      const nextPosition = traffic[index].data[1].latlng as [number, number];
      interpolatePos.current[index] = geoInterpolate(
        currentPosition,
        nextPosition,
      );
    });
  }, [traffic]);

  return {
    transportation,
    timestamps: animationState.current.map(d => d.timestamp),
  };
};

export default useTransportationData;
