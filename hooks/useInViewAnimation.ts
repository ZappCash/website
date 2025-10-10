import { useInView } from "framer-motion";
import { useRef } from "react";

interface UseInViewAnimationOptions {
  once?: boolean;
  amount?: number | "some" | "all";
  margin?: string;
}

export function useInViewAnimation(options?: UseInViewAnimationOptions) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    amount: options?.amount ?? 0.3,
    margin: options?.margin,
  });

  return { ref, isInView };
}
