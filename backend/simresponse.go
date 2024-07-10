package simresponse

// HTTP requests working, implement the HTML response

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var clickCount int = 0

func RegisterClickerRoutes(router *gin.Engine) {
	router.OPTIONS("/increase-opacity", func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Hx-Current-Url")
	})
	router.POST("/increase-opacity", handleClick)
}

func handleClick(c *gin.Context) {
	currentOpacity := c.PostForm("opacity")
	opacity, err := strconv.ParseFloat(currentOpacity, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid opacity value"})
		return
	}
	clickCount++
	newOpacity := opacity + 0.3
	if newOpacity > 1 {
		newOpacity = 1
	}

	c.HTML(http.StatusOK, "clicker_response.html", gin.H{
		"opacity":    newOpacity,
		"clickCount": clickCount,
	})
}
