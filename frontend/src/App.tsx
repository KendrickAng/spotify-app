import type { Resource } from "solid-js";
import { Component, Match, Show, createSignal, createResource, Switch, For } from "solid-js";
import internal from "stream";

import styles from "./App.module.css";

const GITHUB_LINK = "https://github.com/KendrickAng/spotify-app";

type SongsResponse = {
  error: string;
  tracks: Track[];
}

type Track = {
  id: string;
  name: string;
  uri: string;
  external_url: string;
  album: Album;
}

type Album = {
  id: string;
  name: string;
  uri: string;
  external_url: string;
  images: Image[];
}

type Image = {
  height: number;
  width: number;
  url: string;
}

const fetchSongs = async () => {
  const url = import.meta.env.VITE_SERVER_URL + "/songs/generate";
  const res = await fetch(url, {
    method: "GET",
  });
  return await res.json();
};

const fetchHealth = async () => {
  const url = import.meta.env.VITE_SERVER_URL + "/healthcheck";
  const res = await fetch(url, {
    method: "GET",
  });
  return await res.text();
};

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
    <div class={styles.App}>
      <div class={styles.header}>
        <img src="/src/assets/spotify_logo_green_500.png" alt="spotiy logo"/>
      </div>
      <div class={styles.center}>
        <div class={styles.subheader}>
          song picker
        </div>
      </div>
      
      <div class={styles.center}>
        <div class={styles.socials}>
          <a href={GITHUB_LINK}>github</a>
        </div>
      </div>

      <Show when={health()}
        fallback={<button disabled>Service Unavailable</button>}
      >
        <div class={styles.center}>
          <button class={styles.generate} onClick={onGenerateClick}>
            generate
          </button>
        </div>
      </Show>

      <div class={styles.results}>
        <Switch fallback={<p class={styles.reminder}>Click "Generate" to find songs!</p>}>
          <Match when={songs && songs.loading}>
            <div class={styles.reminder}>
              Loading...
            </div>
          </Match>
          <Match when={songs && songs.error}>
            <div class={styles.reminder}>
              <div>Sorry, we met an issue fetching songs... please try again later!</div>
              <div>The following error occured: {songs.error}</div>
            </div>
          </Match>
          <Match when={songs && songs()}>
            <div class={styles.center}>
              <For each={songs().tracks}>
                {(track, i) =>
                  <div class={styles.track}>{track.name}</div>
                }
              </For>
            </div>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default App;
