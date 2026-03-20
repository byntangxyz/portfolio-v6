export function useWindowEvent<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) {
  onMounted(() => {
    window.addEventListener(eventName, handler as EventListener, options);
  });

  onUnmounted(() => {
    window.removeEventListener(eventName, handler as EventListener, options);
  });
}
