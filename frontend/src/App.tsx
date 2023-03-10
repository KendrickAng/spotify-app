import type { Resource } from "solid-js";
import {
  Component,
  Match,
  Show,
  createSignal,
  createResource,
  Switch,
  For,
} from "solid-js";
import internal from "stream";

import styles from "./App.module.css";

const GITHUB_LINK = "https://github.com/KendrickAng/spotify-app";

type SongsResponse = {
  error: string;
  tracks: Track[];
};

type Track = {
  id: string;
  name: string;
  uri: string;
  external_url: string;
  album: Album;
  preview_url: string;
  popularity: number;
};

type Album = {
  id: string;
  name: string;
  uri: string;
  external_url: string;
  images: Image[];
};

type Image = {
  height: number;
  width: number;
  url: string;
};

const EMPTY_IMAGE = {
  height: 64,
  width: 64,
  url: "https://via.placeholder.com/64",
};

const fetchSongs = async () => {
  const url = import.meta.env.VITE_SERVER_URL + "/v1/songs/generate";
  console.log(url);
  const res = await fetch(url, {
    method: "GET",
  });
  return await res.json();
};

const fetchHealth = async () => {
  const url = import.meta.env.VITE_SERVER_URL + "/v1/healthcheck";
  console.log(url);
  const res = await fetch(url, {
    method: "GET",
  });
  return await res.text();
};

const assetUrl = (filename: string) => {
  return new URL(`/src/assets/${filename}`, import.meta.url).href
}

const App: Component = () => {
  const [songsSignal, setSongsSignal] = createSignal(false);
  const [songs, { refetch }] = createResource(songsSignal, fetchSongs);
  const [health] = createResource(fetchHealth);

  const onGenerateClick = () => {
    if (!songsSignal()) {
      setSongsSignal(true);
    } else {
      refetch();
    }
  };

  return (
    <>
      <div class={styles.header}>
        <img src={assetUrl("spotify_logo_green_500.png")} alt="spotify logo" />
      </div>
      <div class={styles.center}>
        <div class={styles.subheader}>song picker</div>
      </div>

      <div class={styles.center}>
        <div class={styles.socials}>
          <a href={GITHUB_LINK}>github</a>
        </div>
      </div>

      <div class={styles.center}>
        <Show
          when={health()}
          fallback={<button disabled>Service Unavailable</button>}
        >
            <button class={styles.generate} onClick={onGenerateClick}>
              generate
            </button>
        </Show>
      </div>

      <div class={styles.results}>
        <Switch
          fallback={
            <p class={styles.reminder}>Click "Generate" to find songs!</p>
          }
        >
          <Match when={songs && songs.loading}>
            <div class={styles.reminder}>Loading...</div>
          </Match>
          <Match when={songs && songs.error}>
            <div class={styles.reminder}>
              <div>
                Sorry, we met an issue fetching songs... please try again later!
              </div>
              <div>The following error occured: {songs.error}</div>
            </div>
          </Match>
          <Match when={songs && songs()}>
            <div class={styles.center}>
              <For each={songs().tracks}>
                {(track: Track) => {
                  const { url: imageUrl } =
                    track.album.images.find(({ height }) => height > 100) ||
                    EMPTY_IMAGE;
                  return (
                    <div class={styles.track}>
                      <img
                        class={styles.trackImage}
                        height={150}
                        src={imageUrl}
                        alt="album image"
                      />
                      <div class={styles.trackContent}>
                        <div>{track.name}</div>
                        <div>Popularity: {track.popularity}</div>
                        <div>
                          <a target="_blank" href={track.external_url}>
                            Song Link
                          </a>
                        </div>
                        <div>
                          <a target="_blank" href={track.preview_url}>
                            Song Preview
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>
          </Match>
        </Switch>
      </div>
    </>
  );
};

export default App;
