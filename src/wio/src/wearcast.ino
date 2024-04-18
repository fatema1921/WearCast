/*
 - Note: The code for reading the temperature sensor has been adapted from Seeed Studio's User Manual for the Grove Temperature Sensor:
 - Link: https://www.mouser.com/datasheet/2/744/Seeed_101020015-1217523.pdf
 */

#include <math.h> // Import math header file
#include "TFT_eSPI.h" // Import the TFT LCD library

const int pinTempSensor = A0;     // Grove - Temperature Sensor connects to pin A0 
const int B_VALUE = 4275;         // B value of the temperature sensor's thermistor
 
TFT_eSPI tft; //Initializing TFT LCD
TFT_eSprite spr = TFT_eSprite(&tft); //Initializing buffer 

void setup() {
  // Set up pinmode
  pinMode (pinTempSensor, INPUT);

  //INITIALIZE SERIAL AND TFT DISPLAY
  Serial.begin(9600);
  tft.begin(); //Start TFT LCD
  tft.setRotation(3); //Set TFT LCD rotation
  spr.createSprite(TFT_HEIGHT,TFT_WIDTH); //Create buffer

}
 
void loop() {

  //READ TEMPERATURE
  int analogValue = analogRead(pinTempSensor); // Analog reading from temperature sensor

  float resistance = 1023.0/((float)analogValue)-1.0;
  resistance = 100000.0 * resistance;

  float temperature = 1.0/(log(resistance/100000.0)/B_VALUE+1/298.15)-273.15; //Convert to temperature via datasheet ;

  //DISPLAY HEADER
  spr.fillSprite(TFT_WHITE); //Fill background with white color
  spr.fillRect(0,0,320,50,TFT_LIGHTGREY); //Create rectangle and fill with light grey 
  spr.setTextColor(TFT_BLACK); //Setting text color to black
  spr.setTextSize(3); //Setting text size 
  spr.drawString("Wearcast",90,15); //Drawing a text string 

  spr.drawFastVLine(150,50,190,TFT_LIGHTGREY); //Drawing verticle line across screen

  //DISPLAY TEMPERATURE
  spr.setTextColor(TFT_BLACK);
  spr.setTextSize(2);
  spr.drawString("Temperature",10,100);
  spr.setTextSize(3);
  spr.drawNumber(temperature,50,130); //Display the temperature value 
  spr.drawString("C",90,130);

  spr.pushSprite(0,0); //Push sprite to LCD
  delay(50);
}