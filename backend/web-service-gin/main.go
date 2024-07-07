package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

const apiKey = "34b85c75e5b1e5845e4fd93d412ff953"

type WeatherData struct {
	Name string `json:"name"`
	Main struct {
		Temp     float64 `json:"temp"`
		Humidity int     `json:"humidity"`
	} `json:"main"`
	Weather []struct {
		Description string `json:"description"`
		ID          int    `json:"id"`
	} `json:"weather"`
}

func getWeather(c *gin.Context) {
	city := c.PostForm("city")
	url := fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=%s&lang=pt&appid=%s&units=metric", city, apiKey)

	resp, err := http.Get(url)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to get weather data")
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		c.String(http.StatusInternalServerError, "Failed to get weather data")
		return
	}

	var weatherData WeatherData
	if err := json.NewDecoder(resp.Body).Decode(&weatherData); err != nil {
		c.String(http.StatusInternalServerError, "Failed to parse weather data")
		return
	}

	resultHTML := fmt.Sprintf(`
    <div id="weather-result">
        <h2>Weather in %s</h2>
        <p>Temperature: %.2f°C</p>
        <p>Humidity: %d%%</p>
        <p>Description: %s</p>
    </div>
    `, weatherData.Name, weatherData.Main.Temp, weatherData.Main.Humidity, weatherData.Weather[0].Description)

	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(resultHTML))
}

func main() {
	router := gin.Default()

	// // CORS middleware
	// router.Use(cors.New(cors.Config{
	// 	AllowOrigins: []string{"http://127.0.0.1:5500/index.html"},
	// 	AllowMethods: []string{"GET", "POST"},
	// 	AllowHeaders: []string{"Origin"},
	// }))

	router.POST("/get-weather", getWeather)
	router.Run(":8080")
}
