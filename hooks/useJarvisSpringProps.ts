import { useRef, useEffect, useMemo, useCallback } from 'react';
import { JarvisStatus } from '@/services/JarvisService';
import { useSprings, useSpring, config } from 'react-spring';

type TProps = {
  size?: number;
  status: JarvisStatus;
};

enum CircleBackgroundOption {
  Monochromatic,
  Compound,
}

const CIRCLE_NUM = 5;
const EXPAND_SCALE = 0.5;
const MARGIN = 0.5;
const primaryColor = 'rgb(195, 186, 255)';
const colorSet = [
  'rgb(255,255,255)',
  'rgb(15,82,169)',
  primaryColor,
  'rgb(173,57,76)',
  'rgb(48,220,155)',
];

const getBackground = (
  scale: CircleBackgroundOption,
  index: number,
  color = 'blue',
) => {
  if (scale === CircleBackgroundOption.Compound) {
    return `linear-gradient(${15 * index}deg, ${
      colorSet[index === 0 ? 4 : index - 1]
    }, ${colorSet[index]})`;
  }

  if (scale === CircleBackgroundOption.Monochromatic) {
    return `linear-gradient(45deg, grey, ${color})`;
  }
  return `linear-gradient(45deg, blue, blue)`;
};

const getScale = (scale: number) => ` scale(${scale})`;
const createBaseStyle = (size: number) => ({
  position: 'relative',
  borderRadius: '50%',
  width: size,
  height: size,
  spreading: 1,
  flickering: 0,
  blooming: 0,
  opacity: 0.8,
  filter: 'blur(0px)',
  top: '0%',
});
const createPreset = (size: number) => {
  const baseStyle = createBaseStyle(size);
  return {
    [JarvisStatus.Active]: {
      ...baseStyle,
      background: `linear-gradient(45deg, blue, blue)`,
    },
    [JarvisStatus.Listening]: {
      ...baseStyle,
      height: 0,
      opacity: 0,
      filter: 'blur(15px)',
      width: size * EXPAND_SCALE * 2,
      background: `linear-gradient(45deg, blue, blue)`,
    },
    [JarvisStatus.Error]: {
      ...baseStyle,
    },
    [JarvisStatus.Idle]: {
      ...baseStyle,
      opacity: 0.05,
      background: `linear-gradient(45deg, orange, ${primaryColor}})`,
    },
    [JarvisStatus.Success]: { ...baseStyle },
    [JarvisStatus.Recognizing]: {
      ...baseStyle,
    },
  };
};

const useJarvisSpringProps = ({ status, size = 60 }: TProps) => {
  const interval = useRef<number>();
  const timeout = useRef<number>();

  const preset = useMemo(() => createPreset(size), [size]);
  const getSpreadingOffset = useCallback(
    (scale: number, index: number) =>
      `calc(${scale * (index - 2) * EXPAND_SCALE * (1 + MARGIN) * size}px)`,
    [size],
  );
  const getBloomingTransform = useCallback(
    (bloom: boolean, scale: number, index: number) => {
      if (bloom) {
        return `translate(${(2 - index) * size +
          Math.sin((((index * Math.PI) / 180) * 360) / CIRCLE_NUM) *
            Math.sqrt(size * scale)}px, ${Math.cos(
          (((index * Math.PI) / 180) * 360) / CIRCLE_NUM,
        ) * Math.sqrt(size * scale)}px`;
      }
      return `translate(${(2 - index) * size}px, 0px)`;
    },
    [size],
  );

  const [circleProps, setCircleProps] = useSprings(colorSet.length, index => ({
    to: {
      ...preset[JarvisStatus.Active],
      background: getBackground(CircleBackgroundOption.Compound, index),
      transform: getBloomingTransform(false, 0, index) + getScale(1),
      left: getSpreadingOffset(1, index),
    },
  }));
  const [siriProps, setSiriProps] = useSpring(() => ({
    transform: 'translateX(0%})',
    opacity: 0,
    filter: 'blur(0px)',
    width: '100%',
  }));

  useEffect(() => {
    clearInterval(interval.current);
    clearTimeout(timeout.current);

    if (status !== JarvisStatus.Listening) {
      setSiriProps({
        transform: 'translateX(0%)',
        opacity: 0,
        filter: 'blur(5px)',
      });
    }

    switch (status) {
      case JarvisStatus.Idle:
        // @ts-ignore
        setCircleProps(index => ({
          ...preset[status],
          left: getSpreadingOffset(0, index),
          transform: getBloomingTransform(false, 0, index) + getScale(1),
        }));
        break;
      case JarvisStatus.Recognizing:
        // @ts-ignore
        setCircleProps(index => ({
          config: {
            tension: 200,
            mass: 2,
            friction: 10,
          },
          to: {
            ...preset[status],
            left: getSpreadingOffset(1.5, index),
            transform: getBloomingTransform(false, 0, index) + getScale(0.6),
            background: getBackground(CircleBackgroundOption.Compound, index),
          },
        }));

        let animateCount = 0;
        interval.current = setInterval(() => {
          // @ts-ignore
          setCircleProps(index => ({
            to: {
              ...preset[status],
              left: getSpreadingOffset(1.5, index),
              transform: getBloomingTransform(false, 0, index) + getScale(0.6),
              background: getBackground(CircleBackgroundOption.Compound, index),
              top: `${(Math.round(
                Math.sin((((animateCount + index) % 4) / 2) * Math.PI) * 100,
              ) /
                100) *
                30}%`,
            },
          }));
          timeout.current = setTimeout(() => {
            // @ts-ignore
            setCircleProps(index => ({
              ...preset[status],
              left: getSpreadingOffset(1.5, index),
              transform: getBloomingTransform(false, 0, index) + getScale(0.6),
              background: getBackground(CircleBackgroundOption.Compound, index),
            }));
          }, 200);
          animateCount += 1;
        }, 400);
        break;
      case JarvisStatus.Active:
        // @ts-ignore
        setCircleProps(index => ({
          config: config.default,
          to: async (next: any) => {
            await next({
              ...preset[status],
              left: getSpreadingOffset(1, index),
              transform: getBloomingTransform(false, 0, index) + getScale(1),
              background: getBackground(CircleBackgroundOption.Compound, index),
            });
            next({
              ...preset[JarvisStatus.Listening],
            });
            // @ts-ignore
            setSiriProps({
              transform: 'translateX(150%)',
              opacity: 1,
              filter: 'blur(0px)',
            });
          },
        }));
        break;
      case JarvisStatus.Listening:
        // @ts-ignore
        setSiriProps({
          transform: 'translateX(150%)',
          opacity: 1,
          filter: 'blur(0px)',
        });
        // @ts-ignore
        setCircleProps(index => ({
          config: config.default,
          to: {
            ...preset[status],
            left: getSpreadingOffset(1, index),
            transform: getBloomingTransform(false, 0, index) + getScale(1),
            background: getBackground(CircleBackgroundOption.Compound, index),
          },
        }));
        break;
      case JarvisStatus.Error:
        // @ts-ignore
        setCircleProps(index => ({
          config: config.default,
          to: {
            ...preset[status],
            left: getSpreadingOffset(0, index),
            transform: getBloomingTransform(true, 20, index) + getScale(0.6),
            background: getBackground(
              CircleBackgroundOption.Monochromatic,
              index,
              'red',
            ),
          },
        }));
        break;
      case JarvisStatus.Success:
        // @ts-ignore
        setCircleProps(index => ({
          config: config.default,
          to: [
            {
              ...preset[status],
              left: getSpreadingOffset(0, index),
              transform: getBloomingTransform(true, 50, index) + getScale(1),
              background: getBackground(CircleBackgroundOption.Compound, index),
            },
            {
              ...preset[status],
              left: getSpreadingOffset(0, index),
              transform: getBloomingTransform(true, 5, index) + getScale(1),
              background: getBackground(CircleBackgroundOption.Compound, index),
            },
          ],
        }));
        break;
    }
    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    };
  }, [status]);

  return {
    circleProps,
    siriProps,
  };
};

export default useJarvisSpringProps;
