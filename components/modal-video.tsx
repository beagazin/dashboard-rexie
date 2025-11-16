"use client";

import { useState, useRef } from "react";

interface ModalVideoProps {
  thumb: string;
  thumbWidth: number;
  thumbHeight: number;
  thumbAlt: string;
  video: string;
  videoWidth: number;
  videoHeight: number;
}

export default function ModalVideo({
  thumb,
  thumbWidth,
  thumbHeight,
  thumbAlt,
  video,
  videoWidth,
  videoHeight,
}: ModalVideoProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative">
      <button
        className="group relative flex items-center justify-center rounded-2xl focus:outline-hidden focus-visible:ring-3 focus-visible:ring-[#9c6dfc]"
        onClick={() => setModalOpen(true)}
        aria-label="Watch the video"
      >
        <figure className="relative overflow-hidden rounded-2xl">
          <img
            className="opacity-50 grayscale"
            src={thumb}
            width={thumbWidth}
            height={thumbHeight}
            alt={thumbAlt}
          />
        </figure>
        <span className="pointer-events-none absolute p-2.5">
          <span className="relative flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
              <path
                fill="url(#pla)"
                fillRule="evenodd"
                d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Zm3.5-10-5-3.5v7l5-3.5Z"
                clipRule="evenodd"
              />
              <defs>
                <linearGradient id="pla" x1={10} x2={10} y1={0} y2={20} gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9c6dfc" />
                  <stop offset={1} stopColor="#9c6dfc" stopOpacity=".72" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-medium leading-tight text-gray-300">
              Watch Demo <span className="text-gray-600">-</span> 3:47
            </span>
          </span>
        </span>
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 z-99999 flex items-center justify-center bg-black/70 px-4 py-6 sm:px-6"
          onClick={() => setModalOpen(false)}
        >
          <div className="mx-auto flex h-full max-w-6xl items-center">
            <div
              className="aspect-video max-h-full w-full overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video ref={videoRef} width={videoWidth} height={videoHeight} loop controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}