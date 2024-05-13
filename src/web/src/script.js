// Load environment variables
require('dotenv').config();

// Create an MQTT client instance
var client = new Paho.MQTT.Client("test.mosquitto.org", 1883, "clientId");

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

    // Handle the incoming message
    // Extract temperature value from the message payload
    var temperatureValue = message.payloadString;
    document.getElementById("temperatureParagraph").textContent = "Temperature: " + temperatureValue;

}
