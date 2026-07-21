import { useEffect, useRef } from "react";

function useClickOutside<T extends HTMLElement>(
  enabled: boolean,
  onOutside: () => void,
) {
  const ref = useRef<T>(null);
  const onOutsideRef = useRef(onOutside);

  useEffect(() => {
    onOutsideRef.current = onOutside;
  });

  useEffect(() => {
    if (!enabled) return;

    const handle = (e: PointerEvent) => {
      if (ref.current && !e.composedPath().includes(ref.current)) {
        onOutsideRef.current();
      }
    };

    document.addEventListener("pointerdown", handle);
    return () => document.removeEventListener("pointerdown", handle);
  }, [enabled]);

  return ref;
}

export default useClickOutside;
