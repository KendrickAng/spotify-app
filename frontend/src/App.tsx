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
  const [songs, { refetch }] = createResource(fetchSongs);
  const [health] = createResource(fetchHealth);

  return (
    <div>
      <div>{"Health: " + health()}</div>
      <h1>spotify</h1>
      <p>song picker</p>
      <div>
        <button onClick={() => refetch()}>generate</button>
      </div>
      <div>
        <a href={GITHUB_LINK}>github</a>
      </div>
      <Switch fallback={<p>Click "Generate" to find songs!</p>}>
        <Match when={songs && songs.loading}>
          Loading...
        </Match>
        <Match when={songs && songs.error}>
          <div>Sorry, we met an issue fetching songs... please try again later!</div>
          <div>The following error occured: {songs.error}</div>
        </Match>
        <Match when={songs && songs()}>
          <ol>
            <For each={songs().tracks}>
              {(track, i) =>
                <li>
                  <div>{i}</div>
                  <div>{track.name}</div>
                </li>
              }
            </For>
          </ol>
        </Match>
      </Switch>
    </div>
  );
};

export default App;
