export type VideoSource = {
  kind: "embed" | "file";
  url: string;
};

const videoIdPattern = /^[a-zA-Z0-9_-]{6,20}$/;
const directVideoPattern = /\.(?:mp4|webm|ogg)$/i;

export function getSafeExternalUrl(value?: string): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export function getVideoSource(value?: string): VideoSource | null {
  if (!value) return null;

  if (value.startsWith("/videos/") && directVideoPattern.test(value)) {
    return { kind: "file", url: value };
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return null;

  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  let youtubeId = "";

  if (host === "youtu.be") {
    youtubeId = url.pathname.split("/").filter(Boolean)[0] || "";
  } else if (
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "youtube-nocookie.com"
  ) {
    const parts = url.pathname.split("/").filter(Boolean);
    if (url.pathname === "/watch") youtubeId = url.searchParams.get("v") || "";
    if (["embed", "shorts", "live"].includes(parts[0])) youtubeId = parts[1] || "";
  }

  if (videoIdPattern.test(youtubeId)) {
    return {
      kind: "embed",
      url: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
    };
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const vimeoId = url.pathname.split("/").filter(Boolean).find((part) => /^\d+$/.test(part));
    if (vimeoId) {
      return { kind: "embed", url: `https://player.vimeo.com/video/${vimeoId}` };
    }
  }

  if (directVideoPattern.test(url.pathname)) {
    return { kind: "file", url: url.toString() };
  }

  return null;
}
