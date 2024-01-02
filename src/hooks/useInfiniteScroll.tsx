import type { RefObject } from "react";

import { useState, useEffect, useRef } from "react";

type IntersectionOptions = IntersectionObserverInit & { root?: RefObject<Element> };

interface InfiniteScrollHook {
  observerRef: RefObject<Element>;
  isFetching: boolean;
}

const useInfiniteScroll = (callback: () => void, options?: IntersectionOptions): InfiniteScrollHook => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const observerRef = useRef<Element>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          setIsFetching(true);
          callback();
        }
      },
      { threshold: 0.5, ...options },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [callback, isFetching, options]);

  return { observerRef, isFetching };
};

export default useInfiniteScroll;
