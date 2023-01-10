import type { Component } from "solid-js";
import { createSignal, createResource } from "solid-js";

import styles from "./App.module.css";

const GITHUB_LINK = "https://github.com/KendrickAng/spotify-app";

const fetchSongs = async () => {
  const url = import.meta.env.VITE_SERVER_URL + "/songs/generate";
  const res = await fetch(url, {
    method: "GET",
  });
  const ret = await res.json();
  console.log(ret);
  return ret;
};

const fetchHealth = async () => {
  const url = import.meta.env.VITE_SERVER_URL + "/healthcheck";
  const res = await fetch(url, {
    method: "GET",
  });
  return await res.text();
};

const App: Component = () => {
  const [songs, { mutate, refetch }] = createResource(fetchSongs);
  const [health] = createResource(fetchHealth);
  console.log(JSON.stringify(songs()));
  console.log("Loading: " + songs.loading);
  console.log("Error: " + songs.error);

  return (
    <div>
      <h1>spotify</h1>
      <p>song picker</p>
      <div>
        <a>generate</a>
      </div>
      <div>
        <a href={GITHUB_LINK}>github</a>
      </div>
      <div>{"Loading: " + songs.loading}</div>
      <div>{"Error: " + songs.error + "\n"}</div>
      <div>{JSON.stringify(songs(), null, 2)}</div>
      <div>{"Health: " + health()}</div>
    </div>
  );
};

export default App;
