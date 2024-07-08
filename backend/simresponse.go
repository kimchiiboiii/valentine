package simresponse

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var clickCount int = 0

func RegisterClickerRoutes(router *gin.Engine) {
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
	newOpacity := opacity + 0.1
	if newOpacity > 1 {
		newOpacity = 1
	}

	c.HTML(http.StatusOK, "click_response.html", gin.H{
		"opacity":    newOpacity,
		"clickCount": clickCount,
	})
}
