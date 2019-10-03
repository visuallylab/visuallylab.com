import { useState, useMemo, useRef, useCallback } from 'react';
import { LineLayer } from 'deck.gl';
import { Timer } from 'd3-timer';
import { interpolate } from 'd3-interpolate';
import { getDistance } from 'geolib';
import useAnimationController from './useAnimationController';

const trafficJamData = [
  [
    [120.1977909345994, 22.990330240395014],
    [120.19756711083575, 22.98944424138069],
  ],
  [
    [120.19971581886395, 22.992576118852078],
    [120.20269267478852, 22.99187557361032],
  ],
  [
    [120.20042837169827, 22.998318305721032],
    [120.19988609981894, 22.996786361127604],
  ],
];

const useLineLayer = (enable: boolean) => {
  const [hoverData, setHoverData] = useState({ x: 0, y: 0, object: null });
  const [shingTime, setShingTime] = useState(0);
  const animationTimer = useRef<Timer>();

  const color = interpolate([255, 83, 83], [30, 30, 30]);
  const flickerIntervalMs = 1000;

  const animateLine = useCallback(() => {
    const animationIndex =
      (new Date().getTime() % flickerIntervalMs) / flickerIntervalMs;
    if (animationIndex - shingTime < 0.1) {
      return;
    }
    setShingTime(animationIndex);
  }, []);

  useAnimationController(enable, animationTimer, animateLine, 0);

  const length = useMemo(
    () =>
      trafficJamData.reduce((accu, curr) => {
        return (
          accu +
          getDistance(
            { latitude: curr[0][0], longitude: curr[0][1] },
            { latitude: curr[1][0], longitude: curr[1][1] },
          )
        );
      }, 0),
    [trafficJamData],
  );

  return {
    lineLayer: new LineLayer({
      id: 'LineLayer',
      // @ts-ignore
      data: trafficJamData,
      getSourcePosition: (d: number[][]) => d[0],
      getTargetPosition: (d: number[][]) => d[1],
      onHover: (props: { x: number; y: number; object: any }) =>
        setHoverData(props),
      opacity: 0.7,
      stroked: false,
      filled: false,
      pickable: true,
      getWidth: 40,
      // @ts-ignore
      getColor: color(shingTime),
      widthUnits: 'meters',
    }),
    hoverData,
    count: trafficJamData.length,
    length,
  };
};

export default useLineLayer;
