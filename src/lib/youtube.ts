const YOUTUBE_ID_PATTERNS = [
  /youtube\.com\/live\/([^?&/]+)/,
  /youtube\.com\/shorts\/([^?&/]+)/,
  /youtube\.com\/embed\/([^?&/]+)/,
  /[?&]v=([^?&/]+)/,
  /youtu\.be\/([^?&/]+)/,
];

export function youtubeEmbedUrl(
  rawUrl: string | null | undefined,
): string | null {
  const trimmed = rawUrl?.trim();
  if (!trimmed) return null;

  for (const pattern of YOUTUBE_ID_PATTERNS) {
    const videoId = trimmed.match(pattern)?.[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    }
  }

  return null;
}
