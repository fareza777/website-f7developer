"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  XIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "./icons";

export function Gallery({
  slug,
  name,
  count,
}: {
  slug: string;
  name: string;
  count: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const show = (index: number) => {
    setCurrent(index);
    dialog.current?.showModal();
  };
  const step = (direction: number) =>
    setCurrent((c) => (c + direction + count) % count);
  return (
    <>
      <div className="screenshot-grid">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            className="screenshot-button"
            onClick={() => show(i)}
            aria-label={`Enlarge ${name} screenshot ${i + 1}`}
          >
            <Image
              src={`/images/products/${slug}-${i + 1}.webp`}
              alt={`${name} official Google Play screenshot ${i + 1}`}
              width={720}
              height={1280}
              sizes="(max-width: 767px) 70vw, 33vw"
            />
            <span>
              View screenshot <ArrowUpRightIcon size={15} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        aria-label={`${name} screenshot viewer`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        <div className="gallery-toolbar">
          <span>
            {name} · {current + 1} / {count}
          </span>
          <button
            onClick={() => dialog.current?.close()}
            aria-label="Close screenshot viewer"
          >
            <XIcon size={24} />
          </button>
        </div>
        <Image
          src={`/images/products/${slug}-${current + 1}.webp`}
          alt={`${name} screenshot ${current + 1}`}
          width={720}
          height={1280}
          className="gallery-full-image"
        />
        <div className="gallery-controls">
          <button onClick={() => step(-1)} aria-label="Previous screenshot">
            <ArrowLeftIcon size={22} />
          </button>
          <span>Use the arrow keys to explore</span>
          <button onClick={() => step(1)} aria-label="Next screenshot">
            <ArrowRightIcon size={22} />
          </button>
        </div>
      </dialog>
    </>
  );
}
