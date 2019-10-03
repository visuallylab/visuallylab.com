import useWindowScroll from '@/hooks/useWindowScroll';
import { useRef, useEffect, useState } from 'react';

const OFFSET = 50;

export const useVideController = () => {
  const { y } = useWindowScroll();
  const container = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (container.current && player.current) {
      if (
        !isPlaying &&
        y > container.current.offsetTop - OFFSET &&
        y < container.current.offsetTop + container.current.offsetHeight
      ) {
        player.current.play();
        setIsPlaying(true);
      } else if (
        isPlaying &&
        (y < container.current.offsetTop - OFFSET ||
          y > container.current.offsetTop + container.current.offsetHeight)
      ) {
        player.current.pause();
        setIsPlaying(false);
      }
    }
  }, [y]);
  return { isPlaying, container, player };
};
