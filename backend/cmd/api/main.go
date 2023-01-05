package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/KendrickAng/spotify-app/cmd/api/healthcheck"
	"github.com/KendrickAng/spotify-app/cmd/api/songs"
	"github.com/KendrickAng/spotify-app/internal/config"
	"github.com/KendrickAng/spotify-app/internal/spotify"
)

const API_VERSION = 1

func main() {
	cid, isSet := os.LookupEnv("CLIENT_ID")
	if !isSet {
		log.Fatalln("CLIENT_ID is not set")
	}
	cs, isSet := os.LookupEnv("CLIENT_SECRET")
	if !isSet {
		log.Fatalln("CLIENT_SECRET is not set")
	}

	cfg := config.Config{
		ClientID: cid,
		ClientSecret: cs,
	}
	spotify, err := spotify.NewSpotify(cfg)
	if err != nil {
		log.Fatalln("Failed to start spotify API")
	}

	http.HandleFunc(fmt.Sprintf("/v%d/healthcheck", API_VERSION), healthcheck.HealthCheckHandler)
	http.HandleFunc(fmt.Sprintf("/v%d/songs/generate", API_VERSION), songs.GenerateHandler(spotify))

	log.Fatal(http.ListenAndServe(":8080", nil))
}
