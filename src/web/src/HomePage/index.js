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

    var motivationalRecommendation = getMotivationalRecommendation(tempValue, humidValue);
    document.getElementById("motivationalRecommendation").textContent = motivationalRecommendation;
}

/*function getRecommendation(temp, humid) {
/* function getRecommendation(temp, humid) {
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
} */




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
        {max: -Infinity,    lowHumidityMessage: "Even the coldest days can't dampen your heat. Bundle up in ---clothing recommendation---, and let your inner fire shine through!",
                            highHumidityMessage: "Maybe cold and humid days like this is a reminder to embrace yoursel just as ---clothing recommendation--- embraces your body?"},
        {max: -10,  lowHumidityMessage: "Cold days like these are an perfect invitation to wrap yourself in warmth - inside and out! Consider wearing ---clothing recommendation---.",
                    highHumidityMessage: "It's cold and humid today, so it might snow. Remember that each snowflake is unique, just like you. Stand out in the winter wonderland with ---clothing recommendation---!"},
        {max: -5,   lowHumidityMessage: "Stay as warm and sweet as a freshly baked cookie in ---clothing recommendation---!",
                    highHumidityMessage: "Just because the weather is chilly and damp doesn't mean you have to be! Wrap your amazing-self in ---clothing recommendation--- and heat up your surroundings!"},
        {max: 0,    lowHumidityMessage: "Today is a perfect day to embrace yourself, layer by layer! Consider wearing ---clothing recommendation---.",
                    highHumidityMessage: "Chilly and damp days like these calls for a celebration of layers. We suggest that you wear ---clothing recommendation--- to keep your confidence as high as your classy style!"},
        {max: 5,    lowHumidityMessage: "This chilly weather is a perfect canvas for a fashion statement! Layer up by wearing ---clothing recommendation---.",
                    highHumidityMessage: "Cool and moist, just the right weather for ---clothing recommendation---. It's certainly a great day to reflect on your inner brightness, even under grey skies."},
        {max: 10,   lowHumidityMessage: "Todays mild weather is perfect for you to be as chic as you are beautiful, wearing ---clothing recommendation---.",
                    highHumidityMessage: "It might rain today, see every raindrop as a reminder that even the skies cleanse themselves. Let today wash away your doubts with ---clothing recommendation---."},
        {max: 15,   lowHumidityMessage: "Embrace the crisp air with style, consider wearing ---clothing recommendation--- to keep you warm and fashionable throughout the day.",
                    highHumidityMessage: "Today brings pleasant temperatures where ---clothing recommendation--- would be a great outfit option. Even though a light raincoat is optional, your glowing presence is essential!"},
        {max: 20,   lowHumidityMessage: "Today is a beautiful day for you to shine as bright as the sun in ---clothing recommendation---!",
                    highHumidityMessage: "Pleasant yet humid, the perfect setting for breathable fabrics such as ---clothing recommendation---, offering both comfort and style."},
        {max: 25,   lowHumidityMessage: "Warm days like these offer a perfect moment to glow and grow! Consider wearing ---clothing recommendation--- as you shine in the sun!",
                    highHumidityMessage: "Warm and sticky, but every moment is a chance to shine in every light which you'll certainly do in ---clothing recommendation---!"},
        {max: 30,   lowHumidityMessage: "Let your outfit reflect the hot temperature outside, wearing ---clothing recommendation---!",
                    highHumidityMessage: "Stay cool in the heat with a outfit like ---clothing recommendation---, managing the heat while maintaining your style!"},
        {max: Infinity,     lowHumidityMessage: "So HOT! Not only the weather but you in ---clothing recommendation---!",
                            highHumidityMessage: "Extremely hot and humid, consider wearing ---clothing recommendation--- and let today amplify your radiance!"}
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
    document.getElementById("temperatureParagraph").textContent = "Temperature: " + tempValue + " C";
    document.getElementById("humidityParagraph").textContent = "Humidity: " + humidValue + " % RH";
    var motivationalRecommendation = getMotivationalRecommendation(tempValue, humidValue);
    document.getElementById("motivationalRecommendation").textContent = motivationalRecommendation;
}
// testcases
testMotivationalRecommendation(-17, 3);
testMotivationalRecommendation(5, 75);
testMotivationalRecommendation(29, 60);
testMotivationalRecommendation(10, 15);
 */
