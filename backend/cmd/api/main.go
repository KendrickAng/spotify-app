package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/KendrickAng/spotify-app/cmd/api/healthcheck"
)

const API_VERSION = 1

func main() {
	http.HandleFunc(fmt.Sprintf("/v%d/healthcheck", API_VERSION), healthcheck.HealthCheck)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
