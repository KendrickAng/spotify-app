package spotify

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/KendrickAng/spotify-app/internal/config"
)

const authEp = `https://accounts.spotify.com/api/token`

type Spotify struct {
	cfg config.Config
	AccessToken string
	ExpiresAt time.Time
}

type ClientCredentialsResp struct {
	AccessToken string 	`json:"access_token"`
	TokenType string	`json:"token_type"`
	ExpiresIn int		`json:"expires_in"`
}

func NewSpotify(cfg config.Config) (Spotify, error) {
	return Spotify{
		cfg: cfg,
		AccessToken: "",
		ExpiresAt: time.Time{},
	}, nil
}

func (s *Spotify) Init() error {
	data := url.Values{}
	data.Set("grant_type", "client_credentials")
	
	req, err := http.NewRequest("POST", authEp, strings.NewReader(data.Encode()))
	if err != nil {
		return err
	}
	req.Header.Add("Authorization", "Basic: " + base64.StdEncoding.EncodeToString(
		[]byte(s.cfg.ClientID + ":" + s.cfg.ClientSecret),
	))
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	if resp.StatusCode != http.StatusOK {
		return errors.New("non-200 response when getting access token")
	}

	creds := ClientCredentialsResp{}
	err = json.NewDecoder(resp.Body).Decode(&creds)
	if err != nil {
		return err
	}

	s.AccessToken = creds.AccessToken
	s.ExpiresAt = time.Now().Add(time.Second * time.Duration(creds.ExpiresIn))
	log.Println(s.ExpiresAt.String())

	return nil
}