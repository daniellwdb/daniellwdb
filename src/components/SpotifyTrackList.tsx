import { useStore } from "@nanostores/preact";
import { $spotifyData } from "../stores";
import { SpotifyTrack } from "./SpotifyTrack";

export function SpotifyTrackList() {
  const { data } = useStore($spotifyData);

  return (
    <>
      {data?.currentlyPlaying && (
        <>
          <h1 class="text-lg font-semibold">🔊 Now listening</h1>
          <aside class="mb-8">
            <a href={data.currentlyPlaying.trackUrl} target="_blank">
              <SpotifyTrack {...data.currentlyPlaying} />
            </a>
          </aside>
        </>
      )}
      <h1 class="text-lg font-semibold">🔊 10 Most listened</h1>
      <div class="grid grid-cols-1 gap-6">
        {data?.topTracks.map((track) => (
          <a href={track.trackUrl} target="_blank">
            <SpotifyTrack {...track} />
          </a>
        ))}
      </div>
    </>
  );
}
