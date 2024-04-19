// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain
#include "Arduino.h"
#include "DHT.h" 

#define DHTPIN 0 // Define Signal Pin of DHT

#define DHTTYPE DHT11 // Define DHT Sensor Type

DHT dht(DHTPIN, DHTTYPE); // Initializing DHT Sensor

//  CABLE  T&S  SEEEDUINO
//  ---------------------------
//  BLACK  GND  GND
//  RED    VCC  5V
//  WHITE  NC   Not Connected
//  YELLOW CIG  D2


void setup() {

    Serial.begin(9600);
    dht.begin();

}

void loop() {

  int t = dht.readTemperature();
  int h = dht.readHumidity();

  Serial.print("Temperature: ");
  Serial.println(t); // Print themperature
  Serial.print("Humidity: ");
  Serial.println(h);
  Serial.println("-----------");

  delay(3000);
}