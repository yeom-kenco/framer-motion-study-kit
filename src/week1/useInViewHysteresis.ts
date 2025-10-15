// useInViewHysteresis.ts
import { useEffect, useRef, useState } from "react";

type Options = {
  enter?: number; // 이 비율 이상 보이면 true로 전환 (예: 0.6)
  leave?: number; // 이 비율 이하로 줄면 false로 전환 (예: 0.4)
  debounceMs?: number; // 급한 토글을 흡수하는 지연(ms)
  rootMargin?: string; // viewport.margin과 동일 개념 (예: "140px 0px")
};

const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20); // 0,0.05,...,1

export function useInViewHysteresis<T extends HTMLElement>({
  enter = 0.6,
  leave = 0.4,
  debounceMs = 120,
  rootMargin = "140px 0px", // 위/아래 140px 확장 → 조금 일찍 감지
}: Options = {}) {
  const el = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        const ratio = entries[0].intersectionRatio; // 0~1
        // 현재 상태에 따라 다음 상태 판정 기준을 다르게 적용
        const next = inView ? ratio > leave : ratio >= enter;

        if (next !== inView) {
          if (timer.current) window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setInView(next), debounceMs);
        }
      },
      { root: null, rootMargin, threshold: THRESHOLDS }
    );

    io.observe(node);
    return () => {
      io.disconnect();
      if (timer.current) window.clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enter, leave, debounceMs, rootMargin, inView]); // inView를 의존성에 포함해 현재 상태 기반 판정

  return { el, inView };
}
