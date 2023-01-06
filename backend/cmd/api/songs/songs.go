package songs

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/KendrickAng/spotify-app/internal/random"
	"github.com/KendrickAng/spotify-app/internal/spotify"
)

func GenerateHandler(s spotify.Spotify) func(http.ResponseWriter, *http.Request) {
	// generate the search query params
	query := fmt.Sprintf("*%s*", random.RandomAlphabet())
	types := []string{"track"}
	limit := 10
	offset := random.RandomInt(spotify.SearchMinOffset, spotify.SearchMaxOffset)

	return func(w http.ResponseWriter, r *http.Request) {
		tracks, err := s.Search(query, types, limit, offset)
		if err != nil {
			fmt.Fprintln(w, err)
		}
		fmt.Fprintf(w, "songs works" + strconv.Itoa(len(tracks.Items)))
	}
}
