package songs

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/KendrickAng/spotify-app/internal/random"
	"github.com/KendrickAng/spotify-app/internal/spotify"
)

type GenerateResp struct {
	Error  string
	Tracks *spotify.Tracks
}

func jsonResponse(err error, tracks *spotify.Tracks) []byte {
	bytes, err := json.Marshal(GenerateResp{
		Error:  err.Error(),
		Tracks: tracks,
	})
	// marshalling shouldn't go wrong, so just absorb the error
	if err != nil {
		log.Println(err.Error())
		return []byte{}
	}
	return bytes
}

func GenerateHandler(s spotify.Spotify) func(http.ResponseWriter, *http.Request) {
	// generate the search query params
	query := fmt.Sprintf("*%s*", random.RandomAlphabet())
	types := []string{"track"}
	limit := 10
	offset := random.RandomInt(spotify.SearchMinOffset, spotify.SearchMaxOffset)

	log.Printf("q: '%v', types: %v, limit: %v, offset: %v\n", query, types, limit, offset)

	return func(w http.ResponseWriter, r *http.Request) {
		res, err := s.Search(query, types, limit, offset)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write(jsonResponse(err, nil))
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write(jsonResponse(nil, &res.Tracks))
	}
}
