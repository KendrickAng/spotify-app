package spotify

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/KendrickAng/spotify-app/internal/config"
)

const authEp = `https://accounts.spotify.com/api/token`
const searchEp = `https://api.spotify.com/v1/search`

const SearchMinOffset = 0
const SearchMaxOffset = 1000
const SearchMinLimit = 0
const SearchMaxLimit = 50

type Spotify struct {
	cfg         config.Config
	AccessToken string
	ExpiresAt   time.Time
}

// taken directly from the spotify API
type ClientCredentialsResp struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpiresIn   int    `json:"expires_in"`
}

// taken directly from the spotify API
type SearchResp struct {
	Tracks Tracks `json:"tracks"`
}

type Tracks struct {
	// https://api.spotify.com/v1/search?query=*p*&type=track&include_external=audio&offset=10&limit=1
	Href string `json:"href"`
	// the list of items from the search
	Items []Item `json:"items"`
	// url of the next page to search
	Next string `json:"next"`
	// url of the previous page to search
	Previous string `json:"previous"`
	// item limit (specified in search query)
	Limit int `json:"limit"`
	// item offset (specified in search query)
	Offset int `json:"offset"`
	// no idea what this is
	Total int `json:"total"`
}

type Item struct {
	Album            Album        `json:"album"`
	Artists          []Artist     `json:"artists"`
	AvailableMarkets []string     `json:"available_markets"`
	DiscNumber       int          `json:"disc_number"`
	DurationMs       int          `json:"duration_ms"`
	Explicit         bool         `json:"explicit"`
	ExternalIds      ExternalIds  `json:"external_ids"`
	ExternalUrls     ExternalUrls `json:"external_urls"`
	Href             string       `json:"href"`
	Id               string       `json:"id"`
	IsLocal          bool         `json:"is_local"`
	Name             string       `json:"name"`
	Popularity       int          `json:"popularity"`
	PreviewUrl       string       `json:"preview_url"`
	TrackNumber      int          `json:"track_number"`
	Type             string       `json:"type"`
	Uri              string       `json:"uri"`
}

type Album struct {
	AlbumType            string       `json:"album_type"`
	Artists              []Artist     `json:"artists"`
	AvailableMarkets     []string     `json:"available_markets"`
	ExternalUrls         ExternalUrls `json:"external_urls"`
	Href                 string       `json:"href"`
	Id                   string       `json:"id"`
	Images               []Image      `json:"images"`
	Name                 string       `json:"name"`
	ReleaseDate          string       `json:"release_date"`
	ReleaseDataPrecision string       `json:"release_date_precision"`
	TotalTracks          int          `json:"total_tracks"`
	Type                 string       `json:"type"`
	Uri                  string       `json:"uri"`
}

type Artist struct {
	ExternalUrls ExternalUrls `json:"external_urls"`
	Href         string       `json:"href"`
	Id           string       `json:"id"`
	Name         string       `json:"name"`
	Type         string       `json:"type"`
	Uri          string       `json:"uri"`
}

type Image struct {
	Height int    `json:"height"`
	Width  int    `json:"width"`
	Url    string `json:"url"`
}

type ExternalIds struct {
	Isrc string `json:"isrc"`
}

type ExternalUrls struct {
	Spotify string `json:"spotify"`
}

func NewSpotify(cfg config.Config) (Spotify, error) {
	return Spotify{
		cfg:         cfg,
		AccessToken: "",
		ExpiresAt:   time.Time{},
	}, nil
}

// refreshes the access token for the spotify api
func (s *Spotify) Init() error {
	data := url.Values{}
	data.Set("grant_type", "client_credentials")

	req, err := http.NewRequest("POST", authEp, strings.NewReader(data.Encode()))
	if err != nil {
		return err
	}
	req.Header.Add("Authorization", "Basic "+base64.StdEncoding.EncodeToString(
		[]byte(s.cfg.ClientID+":"+s.cfg.ClientSecret),
	))
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return errors.New("non-200 response when getting access token, got: " + resp.Status)
	}

	creds := ClientCredentialsResp{}
	err = json.NewDecoder(resp.Body).Decode(&creds)
	if err != nil {
		return err
	}

	s.AccessToken = creds.AccessToken
	s.ExpiresAt = time.Now().Add(time.Second * time.Duration(creds.ExpiresIn))
	log.Printf("Access token: %s\n", s.AccessToken)
	log.Printf("Expires: %s\n", s.ExpiresAt.String())

	return nil
}

func (s *Spotify) Search(query string, types []string, limit int, offset int) (SearchResp, error) {
	// sanity checking
	if offset < SearchMinOffset || offset > SearchMaxOffset {
		return SearchResp{}, errors.New("invalid offset: 0 <= offset <= 1000")
	}
	if limit < SearchMinLimit || limit > SearchMaxLimit {
		return SearchResp{}, errors.New("invalid limit: 0 <= limit <= 50")
	}

	// refresh access token if expired
	if time.Now().After(s.ExpiresAt) {
		log.Println("refreshing access token")
		s.Init()
	}

	req, err := http.NewRequest("GET", searchEp, nil)
	if err != nil {
		return SearchResp{}, err
	}
	params := url.Values{}
	for _, typ := range types {
		params.Add("type", typ)
	}
	params.Add("include_external", "audio")
	params.Add("limit", strconv.Itoa(limit))
	params.Add("offset", strconv.Itoa(offset))
	params.Add("q", query)
	req.URL.RawQuery = params.Encode()
	req.Header.Add("Authorization", "Bearer "+s.AccessToken)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return SearchResp{}, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return SearchResp{}, errors.New("non-200 response when searching, got: " + resp.Status)
	}

	sResp := SearchResp{}
	err = json.NewDecoder(resp.Body).Decode(&sResp)
	if err != nil {
		return SearchResp{}, err
	}

	return sResp, nil
}
