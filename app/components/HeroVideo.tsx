"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const showVideo = !reducedMotion && !videoError;

  // Le <video autoPlay> peut démarrer sa lecture native (et émettre
  // l'événement "playing") avant que React n'ait fini d'hydrater et
  // d'attacher onPlaying : l'événement est alors manqué. On rattrape
  // cet état au montage en relisant directement `paused`.
  useEffect(() => {
    if (showVideo && videoRef.current && !videoRef.current.paused) {
      setVideoReady(true);
    }
  }, [showVideo]);

  return (
    <>
      <Image
        src="/hero-portrait.webp"
        alt="Caly Nails"
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-opacity duration-700 ${
          videoReady && showVideo ? "opacity-0" : "opacity-100"
        }`}
      />

      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-portrait.webp"
          aria-hidden="true"
          onPlaying={() => setVideoReady(true)}
          onError={() => {
            setVideoError(true);
            setVideoReady(false);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}
