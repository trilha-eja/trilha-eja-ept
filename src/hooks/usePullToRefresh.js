import { useEffect, useRef, useState } from "react";

const THRESHOLD = 72; // px to pull before triggering

export function usePullToRefresh(scrollRef, onRefresh) {
  const [pulling, setPulling] = useState(false);
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(null);
  const active = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      if (el.scrollTop === 0) {
        startY.current = e.touches[0].clientY;
        active.current = true;
      }
    };

    const onTouchMove = (e) => {
      if (!active.current || startY.current === null) return;
      const dy = e.touches[0].clientY - startY.current;
      if (dy > 0) {
        setPulling(true);
        setPullY(Math.min(dy * 0.45, THRESHOLD + 20)); // dampen
        // Prevent native scroll when pulling
        if (el.scrollTop === 0) e.preventDefault();
      }
    };

    const onTouchEnd = async () => {
      if (!active.current) return;
      active.current = false;
      if (pullY >= THRESHOLD) {
        setRefreshing(true);
        setPullY(THRESHOLD * 0.6);
        try {
          await onRefresh();
        } finally {
          setRefreshing(false);
        }
      }
      setPulling(false);
      setPullY(0);
      startY.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [scrollRef, onRefresh, pullY]);

  return { pulling, pullY, refreshing };
}