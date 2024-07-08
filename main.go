package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/gin-contrib/cors"
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
	encodedCity := url.QueryEscape(city) // Handling for cities with multiple words in the name
	url := fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=%s&lang=pt&appid=%s&units=metric", encodedCity, apiKey)

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
	<div class="card">
	    <h1 class="cityDisplay">%s</h2>
	    <p class="tempDisplay">%.2f°C</p>
	    <p class="humidityDisplay">Umidade: %d%%</p>
	    <p class="descDisplay">%s</p>
		<p class="weatherEmoji">%s</p>
	</div>
	`, weatherData.Name, weatherData.Main.Temp, weatherData.Main.Humidity,
		weatherData.Weather[0].Description, findWeatherEmoji(weatherData.Weather[0].ID))

	c.Writer.Header().Set("Content-Type", "text/html; charset=utf-8")
	c.String(http.StatusOK, resultHTML)
	c.Writer.WriteHeader(http.StatusOK)
	// c.Writer.WriteString(resultHTML)
	// c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(resultHTML))
}

func findWeatherEmoji(weatherID int) string {
	switch {
	case weatherID >= 200 && weatherID < 300:
		return "⛈️🌩️"
	case weatherID >= 300 && weatherID < 400:
		return "☔🌂"
	case weatherID >= 500 && weatherID < 600:
		return "☔🌧️"
	case weatherID >= 600 && weatherID < 700:
		return "🥶❄️"
	case weatherID >= 700 && weatherID < 771:
		return "🌫️🌫️"
	case weatherID >= 771 && weatherID < 800:
		return "🌪️🌪️"
	case weatherID == 800:
		return "🌞😎"
	case weatherID >= 801 && weatherID < 803:
		return "🌤️🌤️"
	case weatherID >= 803 && weatherID <= 804:
		return "🌥️☁️"
	default:
		return "🤔❓"
	}
}

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*")

	simresponse.RegisterClickerRoutes(router)

	// Works fine using the live server, but getting CORS error when trying to post from github pages

	// CORS middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:5500", "https://kimchiiboiii.github.io"},
		AllowMethods:     []string{"GET", "OPTIONS", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Hx-Current-Url"},
		AllowCredentials: true,
	}))

	router.OPTIONS("/get-weather", func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Hx-Current-Url")
		// c.Status(http.StatusOK)
	})
	router.POST("/get-weather", getWeather)
	router.Run(":8080")
}
