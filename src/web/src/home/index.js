window.onload=function() {
    updateCurrentDay();
    fetchLocation();
    getWeather();
}

import { TEMPERATURE_TOPIC, HUMIDITY_TOPIC, SERVER } from './mqtt_config.js'; // Import MQTT topic names for temperature and humidity from the configuration file.

/* Function to call the weather API and update the weather icon */
const getWeather = async () => {
    try {
        // Fetch weather data using the API key injected by Webpack
        //const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=gothenburg,se&APPID=${process.env.WEATHER_API_KEY}`);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=gothenburg,se&APPID="INSERT_YOUR_API_KEY_HERE"`);
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
            // Fetch location data using the API key injected by Webpack
            //fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.OPENCAGE_API_KEY}`)
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key="INSERT_YOUR_API_KEY_HERE"`)
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
var client = new Paho.MQTT.Client(SERVER, 8083, "clientId");

// Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Connect to MQTT broker
client.connect({
    onSuccess: onConnect,
});

// Called when the client connects
function onConnect() {
    console.log("Connected to MQTT broker");
    // Subscribe to a topic
    client.subscribe(TEMPERATURE_TOPIC);
    client.subscribe(HUMIDITY_TOPIC);
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
    if (topic === TEMPERATURE_TOPIC) {
        tempValue = parseFloat(sensorValue);
        document.getElementById("temperatureParagraph").textContent = sensorValue + " C";
    } else if (topic === HUMIDITY_TOPIC) {
        humidValue = parseFloat(sensorValue);
        document.getElementById("humidityParagraph").textContent = sensorValue + " % RH";
    }
    var motivationalRecommendation = getMotivationalRecommendation(tempValue, humidValue);
    document.getElementById("motivationalRecommendation").textContent = motivationalRecommendation;
}

/**
 * getMotivationalRecommendation function to return tailored messages for each temperature and humidity range.
 * Providing useful outfit recommendations delivered in inspiring messages; connecting the weather conditions with personal growth as well as emotional well-being.
 *
 * @param {*} tempValue current temperature in degrees Celsius
 * @param {*} humidValue current humidity level in percentage
 * @returns {string} recommendation combining clothing advice with a motivational message, all tailored to the current weather condition
 */
function getMotivationalRecommendation(tempValue, humidValue) {
    // Array of temperature ranges with corresponding advice for low and high humidity levels
    const tempRanges = [
        {max: -Infinity,    lowHumidityMessage: "Even the coldest days can't dampen your heat. Bundle up in a thick, down-filled, dark winter coat with a polyester thermal base layer and warm leggings or waterproof snow pants. Let your inner fire shine through!",
                            highHumidityMessage: "We recommend a waterproof shell jacket, a polyester thermal base layer, and insulated waterproof snow pants. Maybe cold and humid days like this is a reminder to embrace yourself just as warm clothes embraces your body?"},
        {max: -10,  lowHumidityMessage: "Cold days like these are an perfect invitation to wrap yourself in warmth - inside and out! Consider wearing a layered look with a beige or cream fleece jacket over a light brown or gray wool sweater and dark warm pants.",
                    highHumidityMessage: "It's cold and humid today, so it might snow. Remember that each snowflake is unique, just like you. Stand out in the winter wonderland with a bright-color waterproof windbreaker over a light wool sweater and dark insulated snow pants."},
        {max: -5,   lowHumidityMessage: "Stay as warm and sweet as a freshly baked cookie in a medium-weight winter coat in a neutral-color with a light-color fleece or wool sweater and insulated jeans!",
                    highHumidityMessage: "Just because the weather is chilly and damp doesn't mean you have to be! Wrap your amazing-self in a waterproof shell jacket with a light-color fleece jacket and water-resistant pants!"},
        {max: 0,    lowHumidityMessage: "Today is a perfect day to embrace yourself, layer by layer! Consider wearing a beige or cream light-weight winter coat with a wool or fleece sweater and jeans.",
                    highHumidityMessage: "Chilly and damp days like these calls for a celebration of layers. We suggest that you wear a dark water-resistant jacket with a wool sweater in color of your choice and jeans."},
        {max: 5,    lowHumidityMessage: "This chilly weather is a perfect canvas for a fashion statement! Layer up by wearing a light-wool jacket in a neutral color with a light fleece/thin knitted sweater and jeans.",
                    highHumidityMessage: "Cool and moist, just the right weather for a light-color windbreaker jacket over a thermal base layer and chinos. It's certainly a great day to reflect on your inner brightness, even under grey skies."},
        {max: 10,   lowHumidityMessage: "Todays mild weather is perfect for you to be as chic as you are beautiful, wearing a windbreaker or a bomber jacket in a bright color with a flannel/light wool shirt and jeans.",
                    highHumidityMessage: "It might rain today, see every raindrop as a reminder that even the skies cleanse themselves. Let today wash away your doubts with a light and bright rain jacket over a linen t-shirt and chinos."},
        {max: 15,   lowHumidityMessage: "Embrace the crisp air with style, consider wearing a thin knitted sweater in bright color of your choice over a white cotton t-shirt and chinos to keep you warm and fashionable throughout the day.",
                    highHumidityMessage: "Today brings pleasant temperatures where a breathable long-sleeved flannel shirt and cotton-blend pants would be a great outfit option. Even though a light raincoat is optional, your glowing presence is essential!"},
        {max: 20,   lowHumidityMessage: "Today is a beautiful day for you to shine as bright as the sun in a light and bright long-sleeved shirt and jeans!",
                    highHumidityMessage: "Pleasant yet humid, the perfect setting for breathable fabrics such as chambray shirt and linen pants, offering both comfort and style."},
        {max: 25,   lowHumidityMessage: "Warm days like these offer a perfect moment to glow and grow! Consider wearing a light chambray/seersucker t-shirt and chinos as you shine in the sun!",
                    highHumidityMessage: "Warm and sticky, but every moment is a chance to shine in every light which you'll certainly do in a loose-fitting, breathable clothing like a cotton t-shirt and linen shorts!"},
        {max: 30,   lowHumidityMessage: "Let your outfit reflect the hot temperature outside, wearing a light loose-fitting summer dress or cotton t-shirt and shorts!",
                    highHumidityMessage: "Stay cool in the heat with a breathable top made of chambray/cotton along with linen shorts. You can manage the heat while maintaining your style!"},
        {max: Infinity,     lowHumidityMessage: "So HOT! Not only the weather but you in a light-color cotton dress or rayon skirt in bright color of your choice along with a white tank top!",
                            highHumidityMessage: "Extremely hot and humid, consider wearing a thin tank top made of breathable rayon together with a pair of linen shorts to stay cool during this warm day. Let today amplify your radiance!"}
    ]

    // Find temperature range based on current temperature
    let adviceMessage = tempRanges.find(range => tempValue <= range.max);
    // Select coresponding advice based on the humidity level
    adviceMessage = (humidValue >= 60) ? adviceMessage.highHumidityMessage : adviceMessage.lowHumidityMessage;

    return adviceMessage;
}

/**
 * Function to test the motivational recommendations
 * @param {*} tempValue current temperature in degrees Celsius
 * @param {*} humidValue current humidity level in percentage
 */
/* function testMotivationalRecommendation(tempValue, humidValue) {
    document.getElementById("temperatureParagraph").textContent = tempValue + " C";
    document.getElementById("humidityParagraph").textContent = humidValue + " % RH";
    var motivationalRecommendation = getMotivationalRecommendation(tempValue, humidValue);
    document.getElementById("motivationalRecommendation").textContent = motivationalRecommendation;
}
// testcases
testMotivationalRecommendation(5, 75);
testMotivationalRecommendation(10, 15);
testMotivationalRecommendation(-17, 3);
testMotivationalRecommendation(29, 60); */
