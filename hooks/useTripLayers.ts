import { useState, useEffect, useRef } from 'react';

import { geoInterpolate } from 'd3-geo';
import { frames } from '../constants';
import { TripsLayer } from '@deck.gl/geo-layers';
import useAnimationController from './useAnimationController';
import { Timer } from 'd3-timer';

const useTripLayers = (
  enable: boolean,
  traffic: TransporationItem[],
  timestamps: number[],
) => {
  const [trip, setTrip] = useState<Array<Array<[number, number, number]>>>([]);
  const [tripLayers, setTripLayers] = useState<any[]>([]);
  const maxTimestamp = useRef(0);
  const timer = useRef<Timer>();
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const tmpTrips: Array<Array<[number, number, number]>> = [];
    traffic
      .map(d => d.data.map(item => item.latlng))
      .forEach(d => {
        const tmpTrip = [] as Array<[number, number, number]>;
        d.reduce<number[] | undefined>(
          (prev, curr, index) => {
            if (prev && prev.length === 0) {
              return curr;
            }
            const currentPosition = prev!.slice(0, 2) as [number, number];
            const nextPosition = curr.slice(0, 2) as [number, number];
            const interoplate = geoInterpolate(currentPosition, nextPosition);
            tmpTrip.push(
              ...Array.from({ length: frames }).map((_, i) => {
                return [...interoplate(i / frames), i + index * frames] as [
                  number,
                  number,
                  number,
                ];
              }),
            );
            return curr;
          },
          [] as number[],
        );
        tmpTrips.push(tmpTrip);
      });
    setTrip(tmpTrips);
    maxTimestamp.current = Math.max(...tmpTrips.map(d => d.length));
  }, [traffic]);

  useAnimationController(enable, timer, () => {
    setCurrentTime(prev => (prev + 1 === maxTimestamp.current ? 0 : prev + 1));
  });

  useEffect(() => {
    setTripLayers(
      new TripsLayer({
        id: 'trip-layers',
        data: trip,
        getPath: (d: Array<[number, number, number]>) => d,
        getColor: [166, 255, 172],
        opacity: 0.5,
        widthMinPixels: 2,
        rounded: true,
        trailLength: 60,
        currentTime,
      }),
    );
  }, [timestamps, trip]);

  return tripLayers;
};

export default useTripLayers;
