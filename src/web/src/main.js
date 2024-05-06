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
    if (topic === "Temperature") {
        document.getElementById("temperatureParagraph").textContent = "Temperature: " + sensorValue + " C";
    } else if (topic === "Humidity") {
        document.getElementById("humidityParagraph").textContent = "Humidity: " + sensorValue + " % RH";
    }
}
