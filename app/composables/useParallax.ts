import { useScroll, useTransform } from 'motion-v';
import type { Ref } from 'vue';

interface UseElementParallaxOptions {
  input?: [number, number];
  output?: [string, string];
  offset?: [string, string];
}

interface UsePageParallaxOptions {
  input?: [number, number];
  output: [string, string];
}

export function useElementParallax(
  target: Ref<HTMLElement | null>,
  options: UseElementParallaxOptions = {}
) {
  const {
    input = [0, 1],
    output = ['40px', '-40px'],
    offset = ['start end', 'end start'],
  } = options;

  const { scrollYProgress } = useScroll({
    target,
    offset,
  });

  return useTransform(scrollYProgress, input, output);
}

export function usePageParallax(options: UsePageParallaxOptions) {
  const { input = [0, 500], output } = options;
  const { scrollY } = useScroll();

  return useTransform(scrollY, input, output);
}
