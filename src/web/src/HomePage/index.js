window.onload=function() { 
    fetchWeather();
    updateCurrentDay();
    fetchLocation();
   
}

function fetchWeather() {
    const apiKey = 'c95f90301395e8ce1cb18d910cd184cb';
    const city = 'gothenburg'; // Replace 'CityName' with your desired city

    const getWeatherIcon = document.getElementById('weather-icon');

    // Fetch weather data from openWeatherMap API
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const weatherCondition = data.weather[0].id;
        getWeatherIcon(weatherCondition);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

    // Function to call the weather API and update the weather icon
    
    
    
    // Function to get the appropriate weather icon based on the weather condition code
    const getWeatherIcon = (weatherCondition) => {
        if (weatherCondition >= 200 && weatherCondition < 300) {
            return '<i class="wi wi-thunderstorm weather-icon"></i>'; // Thunderstorm
        } else if (weatherCondition >= 300 && weatherCondition < 400) {
            return '<i class="wi wi-rain weather-icon"></i>'; // Drizzle
        } else if (weatherCondition >= 500 && weatherCondition < 600) {
            return '<i class="wi wi-day-rain weather-icon"></i>'; // Rain
        } else if (weatherCondition >= 600 && weatherCondition < 700) {
            return '<i class="wi wi-day-snow weather-icon"></i>'; // Snow
        } else if (weatherCondition >= 700 && weatherCondition < 800) {
            return '<i class="wi wi-fog weather-icon"></i>'; // Atmosphere
        } else if (weatherCondition === 800) {
            return '<i class="wi wi-day-sunny weather-icon"></i>'; // Clear
        } else if (weatherCondition > 800) {
            return '<i class="wi wi-day-cloudy weather-icon"></i>'; // Clouds
        } else {
            return '';
        }
    };

    // Call the getWeather function to fetch weather data and display the icon



function updateCurrentDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const currentDay = days[date.getDay()];

    document.getElementById('weekday').textContent = currentDay;
}

function fetchLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            /* EDIT FOR LATER: API KEY SHOULD BE SECURE NOT PUT HERE! EITHER SERVER SIDE WITH ENVIRONMENT VARIABLES OR IN GITIGNORE? */
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=3661a45eca484dfdb9eda5299d447535`)
                .then(response => response.json())
                .then(data => {
                    const city = data.results[0].components.city;
                    document.getElementById('location').textContent = city;
                })
                .catch(error => console.log('Error fetching location:', error));
        });
    } else {
        document.getElementById('location').textContent = 'Geolocation is not supported by this browser.';
    }
}

// Create an MQTT client instance
var client = new Paho.MQTT.Client("broker.emqx.io", 8083, "clientId");

// Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Connect to MQTT broker
client.connect({
    onSuccess: onConnect,
    // Other connection options if needed
});

// Called when the client connects
function onConnect() {
    console.log("Connected to MQTT broker");
    // Subscribe to a topic
    client.subscribe("Temperature");
    client.subscribe("Humidity");
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Connection lost: " + responseObject.errorMessage);
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    console.log("Message received: " + message.payloadString);
    
    // Handle the incoming messages
    // Extract temperature and humidity value based on topic
    var topic = message.destinationName;
    var sensorValue = message.payloadString;
    var tempValue;
    var humidValue;
    if (topic === "Temperature") {
        tempValue = parseFloat(sensorValue);
        document.getElementById("temperatureParagraph").textContent = sensorValue + " C";
    } else if (topic === "Humidity") {
        humidValue = parseFloat(sensorValue);
        document.getElementById("humidityParagraph").textContent = sensorValue + " % RH";
    }
    var clothingRecom = getRecommendation(tempValue, humidValue);
    document.getElementById("clothingParagraph").textContent = "Based on the weathere data, " + clothingRecom;
}

function getRecommendation(temp, humid) {
    if (temp < 10 && humid < 60) {
        return "It's quite cold. Wear something warm like a knitted sweater and a winter coat.";
    } else if (temp<10 && humid>=60) {
        return "It's very cold. Wear a warm sweater, a winter coat, and don't forget your gloves and scarf"
    } else if (temp < 20 && humid<60) {
        return "It's chilly. Consider wearing a jacket or sweater.";
    } else if (temp < 20 && humid>=60) {
        return "It's chilly. Consider wearing a jacket or sweater. Wear in layers as it might feel colder than it is.";
    } else if (temp < 30 && humid<60) {
        return "It's warm. You might be comfortable in a light jacket or long sleeves.";
    } else if (temp < 30 && humid>=60) {
        return "It's pretty warm. You might be comfortable in long sleeves or a shirt.";
    } else if (humid<60){
        return "It's hot. Wear light, breathable clothes.";
    } else if (humid>=60){
        return "It's very hot outside. Wear light, breathable clothes. It is time for wearing t-shirt, tops, and shorts!";
    }
}




