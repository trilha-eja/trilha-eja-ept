import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Stores scroll positions keyed by pathname
const scrollPositions = {};

export function useScrollRestore(scrollRef) {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  // Save scroll position when leaving a route
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      scrollPositions[location.pathname] = el.scrollTop;
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [location.pathname, scrollRef]);

  // Restore scroll position when entering a route
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const saved = scrollPositions[location.pathname] ?? 0;
    // Small delay to let the new page render before scrolling
    const raf = requestAnimationFrame(() => {
      el.scrollTop = saved;
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, scrollRef]);
}