window.onload=function() {
    updateCurrentDay();
    fetchLocation();
    getWeather();
}

/* Function to call the weather API and update the weather icon */
const getWeather = async () => {
    try {
        const response = await  fetch('https://api.openweathermap.org/data/2.5/weather?q=gothenburg,se&APPID=c95f90301395e8ce1cb18d910cd184cb');
        const data = await response.json();
        const weatherIconID = data.weather[0].icon;

        const weatherIconURL = "https://openweathermap.org/img/wn/" + weatherIconID + "@2x.png";
        document.getElementById('weatherIcon').src = weatherIconURL;
           
    } catch (error) {
        console.log('Error fetching weather data:',error);
        document.getElementById('weatherIcon').src = "../../assets/img/no-icon-found";
    }
};

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




