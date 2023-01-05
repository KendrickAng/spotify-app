package songs

import (
	"fmt"
	"net/http"

	"github.com/KendrickAng/spotify-app/internal/spotify"
)

func GenerateHandler(s spotify.Spotify) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "songs works")
	}
}
