import { useEffect, useRef, useState } from 'react';
import useWindowScroll from './useWindowScroll';

const defaultOpts = { offset: 100 };

const useScrollOnElement = ({ offset = 100 } = defaultOpts) => {
  const { y } = useWindowScroll();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isScrolledOn, setIsScrolledOn] = useState(false);

  useEffect(() => {
    if (elementRef.current) {
      if (
        !isScrolledOn &&
        y > elementRef.current.offsetTop - offset &&
        y < elementRef.current.offsetTop + elementRef.current.offsetHeight
      ) {
        setIsScrolledOn(true);
      } else if (
        isScrolledOn &&
        (y < elementRef.current.offsetTop - offset ||
          y > elementRef.current.offsetTop + elementRef.current.offsetHeight)
      ) {
        setIsScrolledOn(false);
      }
    }
  }, [y]);
  return { elementRef, isScrolledOn };
};
export default useScrollOnElement;
