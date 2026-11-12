"use client";

import { useEffect } from "react";

import { activeSection, readProgress } from "./scrollProgress";

/**
 * Follows the page's scroll for the header (Header.module.css): gives it its glass background
 * once the page has scrolled, draws the gold thread along its lower edge as far as the reader has
 * read (--progress), and lights the link of the section the reader is in.
 */
export function HeaderScroll() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-header]");
    if (!header) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      header.toggleAttribute("data-scrolled", window.scrollY > 12);
      header.style.setProperty(
        "--progress",
        readProgress(window.scrollY, root.scrollHeight, window.innerHeight).toFixed(4),
      );
      // The links are looked up each time: the page under the header changes as the reader
      // moves between the home page and a legal page.
      const links = Array.from(header.querySelectorAll<HTMLAnchorElement>("nav a[href*='#']"));
      const boxes = links.map((link) => {
        const box = document.getElementById(link.hash.slice(1))?.getBoundingClientRect();
        return box ? { top: box.top, bottom: box.bottom } : null;
      });
      const active = activeSection(boxes, window.innerHeight * 0.4);
      links.forEach((link, i) => link.toggleAttribute("data-active", i === active));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
