import type { APIResponse } from "./pages/api/spotify";
import { nanoquery } from "@nanostores/query";

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: (...keys: Array<string | number | true>) =>
    fetch(keys.join("")).then((r) => r.json()),
});

export const $spotifyData = createFetcherStore<APIResponse>(["/api/spotify"], {
  // cacheLifetime: 60_000,
  // revalidateInterval: 30_000,
  // revalidateOnFocus: true,
  // revalidateOnReconnect: true,
});
