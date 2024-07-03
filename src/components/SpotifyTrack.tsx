import type { TrackInfo } from "../pages/api/spotify";

export function SpotifyTrack({ title, artist, coverImage }: TrackInfo) {
  return (
    <div class="flex items-center justify-between gap-3">
      <div class="flex w-full items-center gap-3">
        <img
          alt={`Album art for ${title} by ${artist}`}
          width={64}
          height={64}
          src={coverImage.url}
          loading="lazy"
          class="aspect-ratio-1 outline-primary-50 h-[64px] w-[64px] rounded object-cover outline outline-1 outline-light-brown"
        />
        <div class="flex flex-col justify-center overflow-hidden">
          <h2 class="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-[black]">
            {title}
          </h2>
          <h3 class="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {artist}
          </h3>
        </div>
      </div>
    </div>
  );
}
