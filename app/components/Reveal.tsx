/**
 * Reveal anime l'apparition de son enfant unique au scroll (fondu + léger
 * déplacement vertical), sans jamais dépendre de JavaScript pour être
 * visible : le rendu par défaut est toujours pleinement visible.
 *
 * Contrainte : l'enfant doit être un élément hôte DOM (div, section,
 * article...) ou un composant qui transmet ref/className/style à un nœud
 * DOM réel. cloneElement fusionne ces props directement sur l'enfant —
 * aucun wrapper n'est ajouté au DOM. Si l'enfant ne transmet pas `ref`,
 * l'observation échoue silencieusement et l'élément reste simplement
 * visible sans animation (dégradation gracieuse, jamais de contenu masqué).
 */
"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";

type RevealProps = {
  children: ReactElement;
  delay?: number;
};

const ENTER_TRANSITION = "transition-[opacity,transform] duration-700 ease-out";
const HIDDEN = "opacity-0 translate-y-4";
const VISIBLE = "opacity-100 translate-y-0";

// Si l'IntersectionObserver ne déclenche jamais (échec silencieux, cas
// limite navigateur), on force l'état visible après ce délai plutôt que
// de laisser un bloc masqué indéfiniment.
const FAILSAFE_MS = 1000;

export default function Reveal({ children, delay = 0 }: RevealProps) {
  // "idle" = rendu serveur et pré-hydratation : aucune classe d'opacité ou
  // de transform n'est jamais émise dans le HTML initial. Le contenu est
  // visible que JavaScript s'exécute ou non.
  const [state, setState] = useState<"idle" | "hidden" | "visible">("idle");
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // reste "idle" => toujours visible, jamais animé
    }

    // Un élément déjà à l'écran au montage (grand viewport, page peu
    // scrollée) ne doit pas être masqué puis révélé : ce serait un
    // clignotement, pas une entrée. Et comme cette lecture a lieu après
    // le paint (useEffect), elle ne bloque jamais le premier rendu.
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.9;
    if (alreadyInView) return;

    setState("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    const failsafe = window.setTimeout(() => setState("visible"), FAILSAFE_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const child = Children.only(children);
  if (!isValidElement(child)) return children;

  const motionClass =
    state === "idle" ? "" : `${state === "hidden" ? HIDDEN : VISIBLE} ${ENTER_TRANSITION}`;

  const childProps = child.props as { className?: string; style?: CSSProperties };

  type ClonedHostProps = {
    ref: typeof ref;
    className: string;
    style: CSSProperties;
  };

  // cloneElement + fusion de props polymorphes : typage volontairement
  // pragmatique (cast ciblé, plus de `any`), composant interne dont le
  // seul usage est de recevoir une balise hôte valide en enfant unique
  // (voir JSDoc ci-dessus). Le forwarding de `ref` via cloneElement est
  // le mécanisme prévu par React pour ce cas ; la règle react-hooks/refs
  // ne le distingue pas encore d'une lecture de ref pendant le rendu.
  // eslint-disable-next-line react-hooks/refs
  return cloneElement(child, {
    ref,
    className: [childProps.className, motionClass].filter(Boolean).join(" "),
    style: {
      ...childProps.style,
      transitionDelay: state === "visible" ? `${delay}ms` : "0ms",
    },
  } as ClonedHostProps);
}
