//LED WORKING CODE 
/*
 - Note: The code for reading the humidity from the temperature and humidity sensor has been adapted from "Smart_Garden.ino" found in the Wio_Terminal_Classroom_Arduino GitHub repository by lakshanthad:
 - Link: https://github.com/lakshanthad/Wio_Terminal_Classroom_Arduino/blob/main/Classroom%2012/Smart_Garden/Smart_Garden.ino

 - Note: The code for reading from the temperature sensor has been adapted from Seeed Studio's User Manual for the Grove Temperature Sensor:
 - Link: https://www.mouser.com/datasheet/2/744/Seeed_101020015-1217523.pdf
 */

/* Import header/library files */
#include <Adafruit_NeoPixel.h>
#include <math.h> // Math library for mathematical calculations
#include "Wire.h" // Wire library for I2C communication
#include "DHT.h" // DHT library 
#include "TFT_eSPI.h" // TFT LCD library for Wio Terminal
#include "rpcWiFi.h" // WiFi library for Wio Terminal
#include <PubSubClient.h> // MQTT client library for Wio Terminal

#ifdef AVR
  #include <avr/power.h>
#endif

// #include <ArduinoJson.h> // Include ArduinoJson library
#define LED_PIN    A2
#define LED_COUNT  10

Adafruit_NeoPixel pixels(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
int delayval = 500;
/* Constant variables for temperature */
const int pinTempSensor = A0; // Analog pin A0 connected to Grove - Temperature Sensor
const int B_VALUE = 4275; // B value of the temperature sensor's thermistor

/* Definitions for humidity sensor */
#define DHTPIN PIN_WIRE_SCL //Use I2C port as Digital Port for Grove - Temperature and Humidity sensor
#define DHTTYPE DHT11 //Define DHT sensor type 

/* Constant variables for WiFi */
const char* ssid = "Elins iPhone"; // WiFi SSID (Name)
const char* password = "yH59!Gum"; // WiFi Password

/* Constant variable for MQTT */
const char* mqtt_server = "broker.emqx.io"; // MQTT Broker URL
const char* temperature_topic = "Temperature"; // Topic for temperature
const char* humidity_topic = "Humidity"; // Topic for humidity

/* Initializations */
DHT dht(DHTPIN, DHTTYPE); //Initializing DHT sensor

TFT_eSPI tft; // TFT_eSPI object for Wio Terminal's TFT screen
TFT_eSprite spr = TFT_eSprite(&tft); // Initializing sprite buffer for graphical operations

WiFiClient wioClient; // WiFi client object for Wio Terminal
PubSubClient client(wioClient); // MQTT client object for Wio Terminal


/**
 * @brief Function to set up and establish a connection to WiFi network.
 *
 * This function connects the Wio Terminal to the specified WiFi network using thhe provided SSID and password.
 * It prints messages to both Wio Terminal and the serial monitor to indicate the process and connection status.
 * When connection is established, it displays a confirmation message on the Wio Terminal and prints the local IP address to the serial monitor.
*/
void setup_wifi() {
  delay(10);

  /* Print in Serial Monitor */
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  /* Print in Wio Terminal */
  tft.fillScreen(TFT_BLACK);
  tft.fillRect(0, 190, 320, 50, TFT_LIGHTGREY); // Draw footer background rectangle
  tft.setTextColor(TFT_BLACK); // Set text color to black
  tft.setTextSize(2);
  tft.setCursor((320 - tft.textWidth("Connecting to WiFi...")) /2, 210);
  tft.print("Connecting to WiFi...");

  /* Attempt to connect to WiFi */
  WiFi.begin(ssid, password);
  int attempts = 0;
  while (WiFi.status() !=WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  /* Check if WiFi connection was established */
  if(WiFi.status() == WL_CONNECTED){
     /* Print in Serial Monitor */
    Serial.println();
    Serial.println("WiFi connection established!");
    /* Print in Wio Terminal */
    tft.fillScreen(TFT_BLACK);
    tft.fillRect(0, 190, 320, 50, TFT_LIGHTGREY); // Draw footer background rectangle
    tft.setTextColor(TFT_BLACK); // Set text color to black
    tft.setCursor((320 - tft.textWidth("WiFi status: Connected")) /2, 210);
    tft.print("WiFi status: Connected");
  } else {
    /* Print in Serial Monitor */
    Serial.println();
    Serial.println("Attempt to establish WiFi connection failed!");
    /* Print local IP in Serial Monitor */
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());

    /* Print in Wio Terminal */
    tft.fillScreen(TFT_BLACK);
    tft.fillRect(0, 190, 320, 50, TFT_LIGHTGREY); // Draw footer background rectangle
    tft.setTextColor(TFT_BLACK); // Set text color to black
    tft.setCursor((320 - tft.textWidth("WiFi Connection Failed")) /2, 210);
    tft.print("WiFi Connection Failed");
  }
}

/**
 * @brief Reconnect function to reconnect to the MQTT broker.
 *
 * This function attempts to establish a connection to the MQTT broker using the MQTT client.
 * Generating a randomized client ID, attempt conection with said ID, and publishes an announcement message if connection is successful.
 * If the attempt to connect fails it logs the return code and retries after a 5 sec delay.
*/
void reconnect() {
  while(!client.connected()) {
    Serial.println("Attempting MQTT connection...");

    /* Create randomized client ID */
    String clientId = "WioTerminal-" + String(random(0xffff), HEX);

    /* Attempt to connect, publish, subscribe */
    if(client.connect(clientId.c_str())) {
      Serial.println("Connection established!");
      client.publish("Temperature", "Connection established!"); // Publish announcement
      // client.subscribe("WTin"); // Resubscribe
    } else {
      Serial.print("Attempt to connect failed, rc=");
      Serial.print(client.state()); // log/print generated return code (i.e. result of connection attempt)
      Serial.println(". Try again in 5 seconds.");
      delay(5000);
    }
  }
}

/**
 * @brief Initialize setup for the Wio Terminal
 *
 * This function sets up the necessary configurations and components for the Wio Terminal,
 * including pin modes, serial communication, TFT screen, WiFi connection, and MQTT client.
*/
void setup() {
  pinMode (pinTempSensor, INPUT); // Set up pinmode for temperature sensor
  pinMode(LED_PIN, OUTPUT);

  Serial.begin(9600); // Initialize serial communication at 9600 baud rate; for general logging (initialize communication between microcontroller and computer (serial monitor))
 
  tft.begin(); // Initialize TFT (i.e. Wio Terminal LCD screen)
  tft.setRotation(3); // Set screen rotation
  
  pixels.setBrightness(40);
  pixels.begin();
  // spr.createSprite(TFT_HEIGHT,TFT_WIDTH); // Create buffer (enabling the composition and manipulation of graphical elements befor rendering them on the TFT screen)

  Serial.println();
  Serial.begin(115200); // Initialize serial communication at 115200 baud rate; for communication with WiFi module

  setup_wifi(); // Call function to set up WiFi connection

  client.setServer(mqtt_server, 1883); // Set MQTT server and port
  client.setCallback(callback); // Set callback function for MQTT client
}

/**
 * @brief Main loop
 *
 * This function continously executes the main tasks of the program, including:
 * 1. Checking and handling MQTT connection
 * 2. Displaying header information on the Wio Terminal's TFT screen
 * 3. Reading temperature from sensor and displaying it
 * 4. Publishing MQTT messages at regular intervals, containing temperature data
*/
void loop() {
  /* MQTT connection check and handling */
  if(!client.connected()) {
    reconnect(); // Attempt to reconnect to MQTT broker if not connected
  } client.loop(); // Allow the MQTT client to handle incoming messages and maintain the connection

  /* Display header */
  tft.fillRect(0, 0, 320, 50, TFT_LIGHTGREY); // Draw header background rectangle
  //tft.fillRectHGradient(0, 0, 320, 50, TFT_PURPLE, TFT_NAVY);
  tft.setTextColor(TFT_BLACK); // Set text color to black
  tft.setTextSize(3); // Set text size
  tft.setCursor(90, 15);
  tft.print("WearCast");
  tft.drawFastVLine(160, 50, 160, TFT_LIGHTGREY); // Draw vertical line across screen

  /* Temperature reading */
  int analogValue = analogRead(pinTempSensor); // Read analog value from temperature sensor
  float resistance = 1023.0 / ((float)analogValue) - 1.0;
  resistance = 100000.0 * resistance;
  float temperature = 1.0 / (log(resistance/100000.0) / B_VALUE +1 / 298.15) - 273.15; // Convert to temperature (using datasheet)

  /* Humidity reading */
  int humidity = dht.readHumidity(); // Read digital value from humidity sensor 

  /* Display temperature */
  tft.setTextColor(TFT_WHITE);
  tft.setTextSize(2);
  tft.setCursor(10, 100);
  tft.print("Temperature");

  tft.setTextSize(3);
  tft.setCursor(50, 130);
  tft.fillRect(35, 125, 100, 30, TFT_BLACK); // Clear the previously displayed temperature by filling a rectangle over it
  tft.print((int)temperature);
  tft.setCursor(90, 130);
  tft.print("C");

  /* Display humidity */
  tft.setTextColor(TFT_WHITE);
  tft.setTextSize(2);
  tft.setCursor(200, 100);
  tft.print("Humidity");

  tft.setTextSize(3);
  tft.setCursor(210, 130);
  tft.fillRect(195, 125, 100, 30, TFT_BLACK); // Clear the previously displayed humidity by filling a rectangle over it
  tft.print(humidity);
  tft.setCursor(235, 130);
  tft.print("%RH");

  delay(50); // Delay to stabilize the display
  // Determine the color and number of pixels to light up based on temperature
  uint32_t color;
  int numPixels;

  if (temperature >= 0) {
    color = pixels.Color(255, 0, 0); // Red color
  } else {
    color = pixels.Color(0, 0, 255); // Blue color
  }
   numPixels = abs(temperature) / 5; // Every 5-degree change lights up one more light
  if (numPixels > LED_COUNT) {
    numPixels = LED_COUNT;
  }

  // Set the color and light up the pixels
  for (int i = 0; i < LED_COUNT; i++) {
    if (i < numPixels) {
      pixels.setPixelColor(i, color);
       pixels.show();
        delay(delayval); 
    } else {
      pixels.setPixelColor(i, pixels.Color(0, 0, 0)); // Turn off the remaining pixels
     pixels.show();
      delay(delayval); 
     } 

  }
  // Update the LED display
 
  /* MQTT message publishing*/
  client.publish(temperature_topic, String(temperature).c_str()); // Publish temperature to broker
  client.publish(humidity_topic, String(humidity).c_str()); // Publish humidity to broker
  Serial.print("Temperature: ");
  Serial.println(temperature);
  Serial.print("Humidity: " );
  Serial.println(humidity);
  delay(10000);

}

/** CODESNIPPETS - CURRENTLY NOT IN USE */
  /*

  // #include <ArduinoJson.h> // Include ArduinoJson library

 * @brief Callback function for handling MQTT messages.
 *
 * This function is called whenever a message is recieved from the MQTT broker.
 * Printing the recieved topic and payload to the serial monitor, and displays the payload on the Wio Terminal.
 *
 * @param topic   : The topic of MQTT message
 * @param payload : The payload of MQTT message
 * @param length  : The length of payload
 * 
void callback(char* topic, byte* payload, unsigned int length){
  tft.fillScreen(TFT_BLACK);
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("]");

  char buff_p[length];

  for(int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    buff_p[i] = (char)payload[i];
  }

  Serial.println();
  buff_p[length] = '\0';
  String msg_p = String(buff_p);

  tft.fillScreen(TFT_BLACK);
  tft.setCursor((320 - tft.textWidth("MQTT Message: ")) /2, 90);
  tft.print("MQTT Message: ");
  tft.setCursor((320 - tft.textWidth(msg_p)) /2, 120);
  tft.print(msg_p); // Print recieved payload
}

long lastMsg = 0; // Timestamp of the last MQTT message
char msg[50]; // Buffer for storing MQTT messages
int value = 0; // Value used in MQTT messages for tracking

  spr.createSprite(TFT_HEIGHT,TFT_WIDTH); // Create buffer (enabling the composition and manipulation of graphical elements befor rendering them on the TFT screen)


  long now = millis(); // Get current time
  if(now - lastMsg > 2000) { // Check if 2 sec have elapsed since last message
    lastMsg = now; // Update time for last message
    ++ value; // Increment message value

  snprintf(msg, 50, "%d", (int)temperature); // Format message, cast temperature to int
  Serial.print("Publish message: ");
  Serial.println(msg);
  client.publish("Temperature", msg); // Publish message to MQTT broker

  // Format message as JSON
  StaticJsonDocument<100> jsonDocument;
  jsonDocument["value"] = (int)temperature;

  // Serialize JSON document to the char array
  serializeJson(jsonDocument, msg);
  Serial.print("Publish message: ");
  Serial.println(msg);
  client.publish("Temperature", msg);

  String jsonString;
  serializeJson(jsonDocument, jsonString);

  Serial.print("Publish message: ");
  Serial.println(jsonString);
  client.publish("Temperature", jsonString.c_str());

  */
