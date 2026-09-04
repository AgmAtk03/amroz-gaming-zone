import type { ReactNode } from "react";
import type { HubId } from "@/lib/catalog";

function Frame({
  children,
  bg,
}: {
  children: ReactNode;
  bg: string;
}) {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
      <rect width="80" height="80" rx="16" fill={bg} />
      {children}
    </svg>
  );
}

export function HubArt({ id }: { id: HubId }) {
  switch (id) {
    case "freefire":
      return (
        <Frame bg="#c4622d">
          <path d="M40 16c8 10 4 16 4 22 0 8-4 14-4 14s-4-6-4-14c0-6-4-12 4-22z" fill="#f6d7c4" />
          <path d="M40 28c4 6 2 10 2 14 0 5-2 8-2 8s-2-3-2-8c0-4-2-8 2-14z" fill="#9a3f2a" />
          <path d="M32 56h16l-2 8H34z" fill="#1e1a16" opacity="0.35" />
          <circle cx="40" cy="54" r="5" fill="#f3eee4" />
        </Frame>
      );
    case "pubg":
      return (
        <Frame bg="#8a7349">
          <rect x="26" y="30" width="28" height="22" rx="3" fill="#efe3cb" />
          <path d="M30 30v-4h20v4" stroke="#1e1a16" strokeWidth="2" fill="none" />
          <circle cx="40" cy="41" r="5" fill="#c4a574" />
          <path d="M22 22c8 4 16 4 18 10" stroke="#f3eee4" strokeWidth="2" fill="none" />
        </Frame>
      );
    case "mlbb":
      return (
        <Frame bg="#b8893a">
          <path d="M28 52 L40 18 L52 52" stroke="#f3eee4" strokeWidth="3" fill="none" />
          <circle cx="40" cy="36" r="5" fill="#1e1a16" />
          <path d="M24 56h32" stroke="#efe3cb" strokeWidth="3" />
        </Frame>
      );
    case "valorant":
      return (
        <Frame bg="#8a3a2c">
          <path d="M24 58 L40 16 L44 28 L56 22 L42 58Z" fill="#f3eee4" />
          <path d="M34 40 L48 34" stroke="#8a3a2c" strokeWidth="2" />
        </Frame>
      );
    case "roblox":
      return (
        <Frame bg="#2f5c59">
          <g transform="translate(22 20)">
            <path d="M18 0 L36 10 L18 20 L0 10Z" fill="#d3e0de" />
            <path d="M0 10 L18 20 V40 L0 30Z" fill="#1e1a16" opacity="0.35" />
            <path d="M18 20 L36 10 V30 L18 40Z" fill="#f3eee4" />
          </g>
        </Frame>
      );
    case "psn":
      return (
        <Frame bg="#3a342c">
          <rect x="18" y="28" width="44" height="26" rx="13" fill="#f3eee4" />
          <circle cx="30" cy="41" r="5" fill="#1e1a16" />
          <circle cx="50" cy="41" r="5" fill="#1e1a16" />
          <path d="M36 22h8v8h-8z" fill="#b8893a" />
        </Frame>
      );
    case "steam":
      return (
        <Frame bg="#3f4f3a">
          <circle cx="40" cy="40" r="16" fill="none" stroke="#f3eee4" strokeWidth="3" />
          <circle cx="40" cy="32" r="6" fill="#c4a574" />
          <path d="M40 38 L28 52" stroke="#f3eee4" strokeWidth="3" />
          <circle cx="28" cy="52" r="4" fill="#f3eee4" />
        </Frame>
      );
  }
}

export const hubTile = {
  ember: "hub-ember",
  sand: "hub-sand",
  pine: "hub-pine",
  teal: "hub-teal",
  brick: "hub-brick",
  ink: "hub-ink",
  gold: "hub-gold",
} as const;
