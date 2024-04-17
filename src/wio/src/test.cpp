#include"Arduino.h"
#include"TFT_eSPI.h"
TFT_eSPI tft;
#define LCD_BACKLIGHT (72Ul) // Control Pin of LCD

void setup() {
  // put your setup code here, to run once:
  
    tft.begin();
    /* setRotation:
    buttons on top and usb on bottom
    0 = left to right
    1 = upside down
    2 = right to left
    3 = normal 
    */
    tft.setRotation(3);

    tft.fillScreen(TFT_MAGENTA); //Red background

    // tft.drawChar(140,120,'A',TFT_BLACK, TFT_RED,2); //Draw a black character A from (140,120)
    // tft.drawChar(155,120,'B',TFT_BLACK, TFT_RED,2); //Draw a black character B from (155,120)
    // tft.drawChar(170,120,'C',TFT_BLACK, TFT_RED,2); //Draw a black character C from (170,120)

    tft.setTextColor(TFT_WHITE);          //sets the text colour to black
    tft.setTextSize(6);                   //sets the size of text
    tft.drawString("WearCast", 20, 10); //prints strings from (0, 0)
    tft.setTextSize(2);
    tft.drawString("Current temperature: ", 20, 50);


    delay(2000);
    // Turning off the LCD backlight
    digitalWrite(LCD_BACKLIGHT, LOW);
    delay(2000);
    // Turning on the LCD backlight
    digitalWrite(LCD_BACKLIGHT, HIGH);

        tft.setTextSize(6);                   //sets the size of text
    tft.drawString("WearCast", 20, 10); //prints strings from (0, 0)
    tft.setTextSize(2);
    tft.drawString("Current temperature: ", 20, 50);
    // Convert float to string and draw it
    char buffer[10]; // Buffer to hold the string
    dtostrf(temperature, 4, 2, buffer); // Convert float to string with 2 decimal places
    tft.drawString(buffer, 180, 50); // Draw the string
    delay(1000); // Delay for one second before next reading}
}

void loop() {
  // put your main code here, to run repeatedly:

}