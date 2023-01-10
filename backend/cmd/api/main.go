package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/KendrickAng/spotify-app/cmd/api/healthcheck"
	"github.com/KendrickAng/spotify-app/cmd/api/songs"
	"github.com/KendrickAng/spotify-app/internal/spotify"
)

const API_VERSION = 1

func lookupEnvFailFast(key string) string {
	key, isSet := os.LookupEnv(key)
	if !isSet {
		log.Fatalf("%s is not set\n", key)
	}
	return key
}

func main() {
	cid := lookupEnvFailFast("CLIENT_ID")
	cs := lookupEnvFailFast("CLIENT_SECRET")
	cUrl := lookupEnvFailFast("CLIENT_URL")

	spotify, err := spotify.NewSpotify(spotify.Config{
		ClientID:     cid,
		ClientSecret: cs,
	})
	if err != nil {
		log.Fatalln(err)
	}
	err = spotify.Init()
	if err != nil {
		log.Fatalln(err)
	}

	http.HandleFunc(fmt.Sprintf("/v%d/healthcheck", API_VERSION), healthcheck.HealthCheckHandler(
		healthcheck.Config{
			ClientUrl: cUrl,
		},
	))
	// TODO: rate limiting
	http.HandleFunc(fmt.Sprintf("/v%d/songs/generate", API_VERSION), songs.GenerateHandler(
		songs.Config{
			ClientUrl: cUrl,
		},
		spotify,
	))

	log.Fatal(http.ListenAndServe(":8080", nil))

	// TODO graceful exit
}
