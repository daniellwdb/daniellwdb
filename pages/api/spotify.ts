import type { NextApiRequest, NextApiResponse } from "next"
import querystring from "querystring"

const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString("base64")

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const { access_token: accessToken } = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
      }),
    }
  ).then((response) => response.json())

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false })
  }

  const song = await response.json()
  const title = song.item.name

  const artist = song.item.artists
    .map((singleArtist: Record<"name", string>) => singleArtist.name)
    .join(", ")

  const songUrl = song.item.external_urls.spotify

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  )

  return res.status(200).json({
    title,
    artist,
    songUrl,
  })
}
