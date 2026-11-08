"use client";

import { useEffect } from "react";

const HIDDEN = "[data-reveal]:not([data-visible])";

/**
 * Marks each [data-reveal] element with data-visible once it scrolls into view, which fades it in
 * (globals.css). One observer serves the whole site, and each element is revealed once. It lives in
 * the layout, which stays mounted while a visitor moves between pages, so it also watches for
 * elements a client-side navigation adds (the home page's sections, after a legal page).
 */
export function RevealObserver() {
  useEffect(() => {
    const intersection =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  entry.target.setAttribute("data-visible", "");
                  intersection?.unobserve(entry.target);
                }
              }
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
          )
        : null;
    const watch = (element: Element) => {
      if (intersection) intersection.observe(element);
      else element.setAttribute("data-visible", "");
    };
    const scan = (root: Element | Document) => {
      if (root instanceof Element && root.matches(HIDDEN)) watch(root);
      root.querySelectorAll(HIDDEN).forEach(watch);
    };

    scan(document);
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      intersection?.disconnect();
    };
  }, []);
  return null;
}
