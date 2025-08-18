"use client";

import { useEffect, useState } from "react";

/**
 * Компонент за рендиране на съдържанието на услугите
 * Този компонент се зарежда динамично и използва клиентски код за оптимизация
 */
export default function ServiceContent({
  content,
  contentId = "service-content",
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Използваме IntersectionObserver за "lazy loading" на съдържанието
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const contentContainer = document.getElementById(contentId);
    if (contentContainer) {
      observer.observe(contentContainer);
    }

    return () => {
      if (contentContainer) {
        observer.unobserve(contentContainer);
      }
      observer.disconnect();
    };
  }, []);

  // Оптимизация на изображенията и линковете в съдържанието
  useEffect(() => {
    if (isVisible) {
      // Намираме всички изображения в съдържанието
      const images = document.querySelectorAll(`#${CSS.escape(contentId)} img`);

      // Добавяме lazy loading и формат webp за всички изображения
      images.forEach((img) => {
        if (!img.hasAttribute("loading")) {
          img.setAttribute("loading", "lazy");
        }

        // Добавяме decoding="async" за по-добра производителност
        if (!img.hasAttribute("decoding")) {
          img.setAttribute("decoding", "async");
        }
      });

      // Обработваме външни линкове: отваряне в нов таб и nofollow/noopener
      const anchors = document.querySelectorAll(
        `#${CSS.escape(contentId)} a[href]`
      );
      anchors.forEach((a) => {
        try {
          const url = new URL(a.getAttribute("href"), window.location.origin);
          if (url.origin !== window.location.origin) {
            a.setAttribute("target", "_blank");
            const existingRel = (a.getAttribute("rel") || "")
              .split(" ")
              .filter(Boolean);
            ["nofollow", "noopener", "noreferrer"].forEach((rel) => {
              if (!existingRel.includes(rel)) existingRel.push(rel);
            });
            a.setAttribute("rel", existingRel.join(" "));
          }
        } catch {}
      });
    }
  }, [isVisible]);

  return (
    <article className="mx-auto max-w-8xl w-full">
      <div
        id={contentId}
        className={`wordpress-content prose max-w-none leading-relaxed ${
          isVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
}
