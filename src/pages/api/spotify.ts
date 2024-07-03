import type { APIRoute } from "astro";

export interface TrackInfo {
  title: string;
  artist: string;
  trackUrl: string;
  coverImage: SpotifyApi.ImageObject;
}

export interface APIResponse {
  currentlyPlaying: TrackInfo | undefined;
  topTracks: TrackInfo[];
}

const BASIC_CREDENTIALS = Buffer.from(
  `${import.meta.env.SPOTIFY_CLIENT_ID}:${
    import.meta.env.SPOTIFY_CLIENT_SECRET
  }`,
).toString("base64");

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SPOTIFY_AUTH_SCOPES = "user-read-currently-playing user-top-read";
const SPOTIFY_CURRENTLY_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_USER_TOP_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10";

function fetcher(endpoint: string, accessToken: string) {
  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function formatTrack(track: SpotifyApi.TrackObjectFull) {
  return {
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    trackUrl: track.external_urls.spotify,
    coverImage: track.album.images.at(-1)!,
  };
}

export const GET: APIRoute = async () => {
  const { access_token: accessToken } = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC_CREDENTIALS}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: import.meta.env.SPOTIFY_REFRESH_TOKEN,
      scope: SPOTIFY_AUTH_SCOPES,
    }).toString(),
  }).then((res) => res.json());

  const currentlyPlayingResponse = await fetcher(
    SPOTIFY_CURRENTLY_PLAYING_ENDPOINT,
    accessToken,
  );

  const userTopResponse = await fetcher(SPOTIFY_USER_TOP_ENDPOINT, accessToken);

  const userTop =
    userTopResponse.status === 204 || userTopResponse.status > 400
      ? ([] as unknown as SpotifyApi.UsersTopTracksResponse)
      : ((await userTopResponse.json()) as SpotifyApi.UsersTopTracksResponse);

  const currentlyPlaying =
    currentlyPlayingResponse.status === 204 ||
    currentlyPlayingResponse.status > 400
      ? undefined
      : ((await currentlyPlayingResponse.json()) as SpotifyApi.CurrentlyPlayingResponse);

  const currentlyPlayingTrack =
    currentlyPlaying?.item?.type === "track"
      ? currentlyPlaying.item
      : undefined;

  return new Response(
    JSON.stringify({
      currentlyPlaying:
        currentlyPlayingTrack && formatTrack(currentlyPlayingTrack),
      topTracks: userTop.items.map(formatTrack),
    } satisfies APIResponse),
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    },
  );
};
