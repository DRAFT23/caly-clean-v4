"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const tryPlay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    tryPlay();

    const onLoaded = () => {
      window.setTimeout(tryPlay, 250);
    };

    if (document.readyState === "complete") {
      window.setTimeout(tryPlay, 250);
    } else {
      window.addEventListener("load", onLoaded);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(video);

    return () => {
      window.removeEventListener("load", onLoaded);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Image
        src="/hero-portrait.webp"
        alt="Caly Nails"
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-opacity duration-700 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-portrait.webp"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </>
  );
}
