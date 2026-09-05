import { Photo } from "@/components/photo";

const tones = ["#fa7b24", "#2f9e6b", "#7c8cff", "#e07070", "#c4a35a", "#5aa9e6"];

function tone(id: string) {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n + id.charCodeAt(i) * (i + 3)) % tones.length;
  return tones[n];
}

export function GameArt({
  src,
  name,
  short,
  alt,
}: {
  src?: string;
  name: string;
  short: string;
  alt?: string;
}) {
  if (src) return <Photo src={src} alt={alt || name} />;
  return (
    <div
      className="flex h-full w-full items-end p-3"
      style={{
        background: `linear-gradient(160deg, ${tone(short)} 0%, #12181f 72%)`,
      }}
    >
      <p className="text-lg font-semibold leading-none tracking-tight">{short}</p>
    </div>
  );
}
