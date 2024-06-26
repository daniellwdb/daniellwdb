import useSWR from "swr";
import type { APIResponse } from "../pages/api/spotify";
import { SpotifyTrack } from "./SpotifyTrack";

export function SpotifyTrackList() {
  const { data } = useSWR<APIResponse>("/api/spotify", (url: string) =>
    fetch(url).then((res) => res.json()),
  );

  return (
    <>
      {data?.currentlyPlaying && (
        <>
          <h1 className="text-lg font-semibold">🔊 Now playing</h1>
          <aside className="mb-8">
            <a href={data.currentlyPlaying.trackUrl} target="_blank">
              <SpotifyTrack {...data.currentlyPlaying} />
            </a>
          </aside>
        </>
      )}
      <h1 className="text-lg font-semibold">🔊 10 Most listened</h1>
      <div className="grid grid-cols-1 gap-6">
        {data?.topTracks.map((track) => (
          <a key={track.title} href={track.trackUrl} target="_blank">
            <SpotifyTrack {...track} />
          </a>
        ))}
      </div>
    </>
  );
}
