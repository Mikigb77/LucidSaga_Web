"use client";

import { useEffect, useRef } from "react";

import styles from "./CursorGlow.module.css";
import { follow, glowMedia, settled } from "./pointerGlow";

/**
 * A soft gold light that trails the mouse across the page, like the light through the gate. Only
 * a mouse or a trackpad brings it out: a touch hides it, it fades when the pointer leaves the
 * window, and visitors who ask for reduced motion never get it (CursorGlow.module.css hides it
 * too). It draws only while it is catching up with the pointer.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const media = window.matchMedia(glowMedia);

    // Where the glow is, and where the pointer is, in the window's coordinates.
    let x = 0;
    let y = 0;
    let pointerX = 0;
    let pointerY = 0;
    let shown = false;
    let frame = 0;
    let last = 0;

    const place = () => {
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const draw = (now: number) => {
      // The first frame of a run has no frame before it to measure from: take one frame's time.
      const elapsed = last ? now - last : 16;
      last = now;
      x = follow(x, pointerX, elapsed);
      y = follow(y, pointerY, elapsed);
      if (settled(x, y, pointerX, pointerY)) {
        x = pointerX;
        y = pointerY;
        frame = 0;
      } else {
        frame = requestAnimationFrame(draw);
      }
      place();
    };

    const hide = () => {
      shown = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      glow.removeAttribute("data-on");
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        hide();
        return;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!shown) {
        // Light up where the pointer is, rather than sliding over from where it left.
        shown = true;
        x = pointerX;
        y = pointerY;
        place();
        glow.setAttribute("data-on", "");
      } else if (!frame) {
        last = 0;
        frame = requestAnimationFrame(draw);
      }
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") hide();
    };
    // A mouseout with nowhere to go is the pointer leaving the window.
    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) hide();
    };

    let listening = false;
    const listen = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.addEventListener("mouseout", onOut);
      window.addEventListener("blur", hide);
    };
    const unlisten = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("blur", hide);
      hide();
    };

    // A visitor can turn on reduced motion, or plug in a mouse, while the page is open.
    const onChange = () => (media.matches ? listen() : unlisten());
    onChange();
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      unlisten();
    };
  }, []);

  return <div ref={glowRef} className={styles.glow} aria-hidden="true" />;
}
