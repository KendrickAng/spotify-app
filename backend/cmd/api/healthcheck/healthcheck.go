package healthcheck

import (
	"fmt"
	"net/http"
)

type Config struct {
	ClientUrl string
}

func HealthCheckHandler(cfg Config) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", cfg.ClientUrl)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "Server is running!")
	}
}
