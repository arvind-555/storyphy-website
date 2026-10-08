export const media = {
  "IMG-01": "/media/IMG-01.webp",
  "IMG-04": "/media/IMG-04.webp",
  "IMG-05": "/media/IMG-05.webp",
  "IMG-06": "/media/IMG-06.webp",
  "IMG-07": "/media/IMG-07.webp",
  "IMG-08": "/media/IMG-08.webp",
  "IMG-13": "/media/IMG-13.webp",
  "IMG-37": "/media/IMG-37.webp",
  "IMG-50": "/media/IMG-50.webp",
  "IMG-53": "/media/IMG-53.webp",
} as const;

export function mediaSrc(id: string): string | undefined {
  return (media as Record<string, string>)[id];
}
