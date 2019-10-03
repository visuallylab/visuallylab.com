import { useEffect, useRef, MutableRefObject } from 'react';

import { Timer, timer as d3Timer } from 'd3-timer';

const useAnimationController = (
  enable: boolean,
  timer: MutableRefObject<Timer | undefined>,
  callbackFn: () => void,
  delay: number = 300,
) => {
  const previousEnable = useRef(enable);
  useEffect(() => {
    if (enable) {
      timer.current = d3Timer(callbackFn, delay);
    }
  }, []);

  useEffect(() => {
    if (!enable && previousEnable.current) {
      if (timer.current) {
        timer.current.stop();
      }
    } else if (enable && !previousEnable.current) {
      if (timer.current) {
        timer.current.restart(callbackFn, delay);
      } else {
        timer.current = d3Timer(callbackFn, delay);
      }
    }
    previousEnable.current = enable;
    return () => {
      if (timer.current) {
        timer.current.stop();
      }
    };
  }, [enable]);
};

export default useAnimationController;
