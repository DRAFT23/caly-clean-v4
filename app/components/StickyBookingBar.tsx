/**
 * Barre de réservation persistante, mobile uniquement.
 *
 * Décisions figées pour cette V4 (documentées ici pour ne pas rouvrir la
 * discussion) :
 * - Le CTA "Réserver" de la navbar (Navbar.tsx) reste inchangé et continue
 *   de fonctionner sans JavaScript : cette barre est un ajout progressif,
 *   jamais un remplacement. Si JS échoue, la réservation reste possible
 *   via la navbar.
 * - Un seul IntersectionObserver observe les deux limites (fin du Hero,
 *   début du Footer) ; le callback distingue la cible via entry.target.
 * - Anti-clignotement : les changements d'état ne sont validés qu'après
 *   150ms de stabilité (debounce), pour absorber les oscillations de
 *   scroll (rebond iOS, hésitation autour d'une limite). C'est un choix
 *   assumé de robustesse en production plutôt qu'une géométrie à seuils
 *   multiples, plus simple à maintenir pour un gain équivalent.
 * - `data-scroll-boundary` (sur Hero.tsx) plutôt qu'un id global : Hero et
 *   Footer sont des Server Components, un vrai partage de ref React n'est
 *   pas réalisable sans les convertir en Client Components (coût
 *   disproportionné pour ce seul besoin de mesure).
 * - `inert` remplace aria-hidden + tabIndex manuel : un seul attribut retire
 *   tout le sous-arbre du focus clavier et de l'arbre d'accessibilité.
 */
"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SALONKEE_URL, WHATSAPP_URL } from "../lib/constants";
import type { Dictionary } from "../lib/dictionaries/fr";

const SETTLE_MS = 150;
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

export default function StickyBookingBar({ dict }: { dict: Dictionary }) {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const pendingShow = useRef(false);
  const settleTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const heroEnd = document.querySelector('[data-scroll-boundary="hero-end"]');
    const footer = document.querySelector("footer");
    const menu = document.getElementById("mobile-menu");
    if (!heroEnd || !footer) return;

    let heroPast = false;
    let footerReached = false;

    function scheduleUpdate() {
      pendingShow.current = heroPast && !footerReached;
      window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => {
        setShow(pendingShow.current);
      }, SETTLE_MS);
    }

    // Un seul IntersectionObserver pour les deux limites (Hero, Footer) :
    // le callback distingue la cible via entry.target.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === heroEnd) heroPast = !entry.isIntersecting;
        if (entry.target === footer) footerReached = entry.isIntersecting;
      }
      scheduleUpdate();
    });
    observer.observe(heroEnd);
    observer.observe(footer);

    const onMenuToggle = () => setMenuOpen(menu?.hasAttribute("open") ?? false);
    menu?.addEventListener("toggle", onMenuToggle);

    return () => {
      observer.disconnect();
      window.clearTimeout(settleTimer.current);
      menu?.removeEventListener("toggle", onMenuToggle);
    };
  }, []);

  const visible = show && !menuOpen;

  const motion = reducedMotion
    ? visible
      ? "opacity-100"
      : "opacity-0"
    : `transition-[opacity,transform] duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`;

  return (
    <div
      inert={!visible}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      className={`fixed inset-x-0 bottom-0 z-[900] flex items-center gap-3 border-t border-[#dcc8b5]/60 bg-[#f8f4ef]/95 px-4 pt-3 backdrop-blur-xl md:hidden ${motion}`}
    >
      <a
        href={SALONKEE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 rounded-full bg-[#617261] py-3 text-center text-sm font-semibold text-white transition-[background-color] duration-200 hover:bg-[#566b59]"
      >
        {dict.hero.book}
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.hero.whatsapp}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#dcc8b5] text-[#2a2320] transition-[border-color,color] duration-200 hover:border-[#617261] hover:text-[#617261]"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.5 0-10 4.5-10 10 0 1.77.46 3.45 1.32 4.94L2 22l5.24-1.37a9.96 9.96 0 0 0 4.8 1.22h.01c5.5 0 10-4.5 10-10s-4.5-9.85-10.01-9.85Zm5.86 14.2c-.25.7-1.24 1.32-1.98 1.47-.53.11-1.22.2-3.55-.76-2.98-1.23-4.9-4.24-5.05-4.44-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.6-.37.8-.37.2 0 .4 0 .57.01.19.01.43-.07.67.51.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.3.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.62 2.02 1.12.99 2.06 1.3 2.36 1.44.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.01.96.3.15.49.22.56.34.08.13.08.72-.17 1.42Z" />
        </svg>
      </a>
    </div>
  );
}
