package songs

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/KendrickAng/spotify-app/internal/random"
	"github.com/KendrickAng/spotify-app/internal/spotify"
)

type Config struct {
	ClientUrl string
}

type GenerateResp struct {
	Error  string `json:"error"`
	Tracks []Track `json:"tracks"`
}

type Track struct {
	Id string `json:"id"`
	Name string	`json:"name"`
	Album Album `json:"album"`
	Uri string	`json:"uri"`
	ExternalUrl string	`json:"external_url"`
	PreviewUrl string `json:"preview_url"`
	Popularity int `json:"popularity"`
}

type Album struct {
	Id string	`json:"id"`
	Name string	`json:"name"`
	Images []Image	`json:"images"`
	Uri string	`json:"uri"`
	ExternalUrl string	`json:"external_url"`
}

type Image struct {
	Height int	`json:"height"`
	Width int	`json:"width"`
	Url string	`json:"url"`
}

func jsonResponse(err error, tracks []Track) []byte {
	if tracks == nil {
		return []byte{}
	}

	errString := ""
	if err != nil {
		errString = err.Error()
	}
	bytes, err := json.Marshal(GenerateResp{
		Error:  errString,
		Tracks: tracks,
	})
	// marshalling shouldn't go wrong, so just absorb the error
	if err != nil {
		log.Println(err.Error())
		return []byte{}
	}
	return bytes
}

func tracks(t *spotify.Tracks) []Track {
	tracks := make([]Track, len(t.Items))
	for i, item := range t.Items {
		// extract album iamges
		images := []Image{}
		for _, image := range item.Album.Images {
			images = append(images, Image{
				Height: image.Height,
				Width: image.Width,
				Url: image.Url,
			})
		}
		// extract essential track info
		tracks[i] = Track{
			Id: item.Id,
			Name: item.Name,
			Uri: item.Uri,
			ExternalUrl: item.ExternalUrls.Spotify,
			Album: Album{
				Id: item.Album.Id,
				Name: item.Album.Name,
				Uri: item.Album.Uri,
				ExternalUrl: item.Album.ExternalUrls.Spotify,
				Images: images,
			},
			Popularity: item.Popularity,
			PreviewUrl: item.PreviewUrl,
		}
	}
	return tracks
}

func GenerateHandler(cfg Config, s spotify.Spotify) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", cfg.ClientUrl)

		// generate the search query params
		query := fmt.Sprintf("*%s*", random.RandomAlphabet())
		types := []string{"track"}
		limit := 10
		offset := random.RandomInt(spotify.SearchMinOffset, spotify.SearchMaxOffset)
	
		log.Printf("q: '%v', types: %v, limit: %v, offset: %v\n", query, types, limit, offset)
	
		res, err := s.Search(query, types, limit, offset)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write(jsonResponse(err, nil))
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResponse(nil, tracks(&res.Tracks)))
	}
}
