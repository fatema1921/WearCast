window.onload=function() {
    updateCurrentDay();
    fetchLocation();
}

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
// var client = new Paho.MQTT.Client("test.mosquitto.org", 1883, "clientId");

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
    if (topic === "Temperature") {
        document.getElementById("temperatureParagraph").textContent = "Temperature: " + sensorValue + " C";
    } else if (topic === "Humidity") {
        document.getElementById("humidityParagraph").textContent = "Humidity: " + sensorValue + " % RH";
    }
}
/*
// Called when a message arrives
function onMessageArrived(message) {
    console.log("Message received: " + message.payloadString);

    // Handle the incoming message
    // Extract temperature value from the message payload
    var temperatureValue = message.payloadString;
    document.getElementById("temperatureParagraph").textContent = "Temperature: " + temperatureValue;

}
 */