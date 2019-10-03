import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import tainanStations from 'static/data/traffic/tainanStations.json';
import { useState, useRef, useCallback } from 'react';
import { Timer } from 'd3-timer';
import useAnimationController from './useAnimationController';

enum ZIndexs {
  marker = 120,
  outline = 175,
  inner = 180,
  label = 200,
}

type TCreateBubbleProps = {
  max: number;
  current: number;
  position: number[];
  maxRadius?: number;
  index: number;
  type?: 'station' | 'train';
};

enum TrainCapacity {
  normal = 600,
  premium = 900,
}

const createBubble = ({
  max,
  current,
  position,
  maxRadius = 30,
  index,
  type = 'train',
}: TCreateBubbleProps) => {
  const radio = current / max;
  const warning = radio > 0.75;

  return [
    {
      position: [
        ...position,
        type === 'station' ? ZIndexs.marker : ZIndexs.outline + index * 6,
      ],
      radius: maxRadius,
      outline: true,
      warning,
    },
    {
      position: [
        ...position,
        type === 'station' ? ZIndexs.marker + 12 : ZIndexs.inner + index * 6,
      ],
      radius: radio * maxRadius,
      outline: false,
      warning,
    },
  ];
};

const createTrainPreset = (trainNumber: number) => {
  const result = Array.from({ length: trainNumber * 2 }).map(_ => ({
    index:
      Math.floor(Math.random() * (tainanStations.length * 2 - 1)) -
      tainanStations.length +
      1,

    maxRadius: [TrainCapacity.normal, TrainCapacity.premium][
      Math.floor(Math.random() * 2)
    ],
  }));

  return result;
};

const getStationCapacity = (stationClass: string) =>
  (6 - +stationClass) * (6 - +stationClass) * 200;
const TRAIN_NUM = 10;

const usePublicTransporationLayers = (enable: boolean) => {
  const [layers, setLayers] = useState<any>([]);
  const timer = useRef<Timer>();
  const trainPresets = useRef(createTrainPreset(TRAIN_NUM));
  const previoutAnimateTime = useRef(new Date().getTime());
  const intervalMs = 1200;

  const animate = useCallback(() => {
    const now = new Date().getTime();
    if (now - previoutAnimateTime.current < intervalMs) {
      return;
    }
    previoutAnimateTime.current = now;

    setLayers([
      new ScatterplotLayer({
        id: 'bubble-layer',
        data: [
          ...tainanStations
            .map((t, i) => {
              const capacity = getStationCapacity(t.StationClass);
              return createBubble({
                current: Math.floor(
                  capacity * 0.5 +
                    Math.random() * capacity * 0.9 -
                    capacity * 0.45,
                ),
                max: capacity,
                maxRadius: capacity,
                position: t.StationPosition,
                index: i,
                type: 'station',
              });
            })
            .reduce((accu, curr) => [...accu, ...curr], []),
          ...trainPresets.current
            .map((p, i) =>
              createBubble({
                current: Math.floor(p.maxRadius * Math.random()),
                max: p.maxRadius,
                maxRadius: p.maxRadius,
                position: tainanStations[Math.abs(p.index)].StationPosition,
                index: i,
              }),
            )
            .reduce((accu, curr) => [...accu, ...curr], []),
        ],
        opacity: 0.5,
        filled: true,
        stroked: true,
        radiusScale: 0.4,
        getRadius: (d: any) => d.radius,
        getLineColor: (d: any) =>
          d.outline ? [200, 200, 200, 255] : [0, 0, 0, 0],
        getLineWidth: (d: any) => (d.outline ? 50 : 0),
        getFillColor: (d: any) =>
          d.outline
            ? [0, 0, 0, 0]
            : d.warning
            ? [255, 60, 60, 255]
            : [200, 200, 200, 255],
        transitions: {
          getPosition: 1200,
          getLineColor: 500,
          getRadius: 500,
          getFillColor: 500,
        },
      }),
      new TextLayer({
        id: 'station-label-layer',
        data: 'static/data/traffic/tainanStations.json',
        pickable: true,
        sizeUnits: 'meters',
        getText: (d: any) => `${d.StationName.En} Station`,
        getPosition: (d: any) => [...d.StationPosition, ZIndexs.label],
        fontFamily: 'Source Sans',
        fontWeight: 900,
        getColor: (_: any) => [255, 255, 255, 255],
        getSize: (_: any) => 300,
        getAlignmentBaseline: 'bottom',
        getPixelOffset: [0, -20],
        sizeMinPixels: 20,
      }),
    ]);
    trainPresets.current = trainPresets.current.map(p => ({
      ...p,
      index:
        p.index === tainanStations.length - 1
          ? -tainanStations.length + 1
          : p.index + 1,
    }));
  }, []);

  useAnimationController(enable, timer, animate);

  return {
    layers,
  };
};

export default usePublicTransporationLayers;
