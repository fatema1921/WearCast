# WearCast


### Table of Contents
- [WearCast](#wearcast)
       - [Table of Contents](#table-of-contents)
    - [Background & Description](#background--description)
        - [Features](#features)
        - [Purpose & Benefits](#purpose-&-benefits)
   - [Dependencies & Requirements](#dependencies--requirements)
        - [Required Hardware Components](#required-hardware-components)
        - [Required Software Components](#required-software-components)
   - [Installation](#installation)
       - [Wio Terminal | Installation Process](#wio-terminal--installation-process)
       - [Web-based Application | Local Installation](#web-based-application--local-installation)
   - [Usage](#usage)
        - [Wio Terminal | Usage](#wio-terminal--usage)
        - [Web Application | Local Usage](#Web-Application--local-usage)
        - [Demo Video](#demo-video)
    - [System Design](#system-design)
   - [Team & Contributions](#team-&-contributions)
   - [License](#license)


## Background & Description
We've all been there: staring at the closet, struggling to figure out what to wear as the weather changes outside. **WearCast** is the answer to your problem! 

WearCast is a revolutionary two-tier solution designed to provide tailored clothing recommendations based on real-time weather data. Utilizing sensors integrated with a Wio Terminal, WearCast continuously gathers raw data on key weather parameters, including temperature and humidity. This data is processed and transmitted to a web interface, where it is analysed and displayed alongside with tailored clothing suggestions and empowering messages.

By undertaking this project as a part of the System Development course at University of Gothenburg/Chalmers University of Technology, WearCast serves as a testament to the intersection of academia and innovation. The team behind WearCast does not only aim to address a real-world need but also to apply theoretical knowledge and technical skills in a practical context.

### Features
* **Real-time Weather Data Integration:** WearCast gathers continuous updates on temperature and humidity to provide users with accurate weather information.

* **API integration:** WearCast integrates APIs to fetch current location and local weather data. The location is rendered on the screen along with an icon that visualizes the current weather.  

* **Visual Temperature Representation:** The system is connected to a LED sensor that changes color to visually represent the temperature - red for warmth and blue for coolness.

* **Tailored Clothing Recommendations:** WearCast generates outfit suggestions, tailored to the gathered weather data.

* **Empowering Messages:** WearCast motivates users with empowering messages, encouraging them to embrace any weather with confidence and style.

* **Interactive Web Interface:** Featuring a user-friendly interface, WearCast serves as a centralized hub for accessing weather data and outfit recommendations. 

* **Inspirational Fashion Galleries:** WearCast offers climate-based galleries, allowing the user to explore styles. 

## Purpose & Benefits

The primary purpose of WearCast is to simplify the daily decision of what to wear by providing precise clothing recommendations based on real-time weather data. As weather conditions can change rapidly, WearCast ensures you are always dressed appropriately, enhancing comfort and convenience. By leveraging sensors and a web interface, WearCast transforms raw weather data into actionable advice, promoting not only practicality but also confidence and style in your daily attire.

The benefits of WearCast include personalized clothing recommendations based on real-time weather data, enhanced comfort and convenience, visual temperature indicators, motivational messages, and a user-friendly web interface that integrates practical and educational elements.

## Dependencies & Requirements
### Required Hardware Components:
(Should be aquired prior to the installation process.)
1. [Wio Seeed Terminal](https://www.seeedstudio.com/Wio-Terminal-p-4509.html) or compatible board
2. Grove Sensors for Wio Terminal
    * [Temperature & Humidity Sensor | Seeed Studio Wiki](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-DHT11.html) (only used to measure humidity)
    * [Temperature Sensor | Seeed Studio Wiki](https://www.seeedstudio.com/Grove-Temperature-Sensor.html)
    * [RGB LED Stick | Seeed Studio Wiki](https://www.seeedstudio.com/Grove-RGB-LED-Stick-10-WS2813-Mini.html)
3. Cables to connect sensors to Wio Terminal
    * [Universal 4 Pin Buckled 20cm Cable](https://www.seeedstudio.com/Grove-Universal-4-Pin-Buckled-20cm-Cable-5-PCs-pack.html)
    * [4 pin Male Jumper to Grove 4 pin Conversion Cable](https://www.seeedstudio.com/Grove-4-pin-Male-Jumper-to-Grove-4-pin-Conversion-Cable-5-PCs-per-Pack.html)

### Required Software Components:
(Should be installed prior to the installation process.)

1. [Git](https://git-scm.com/downloads) (to clone the repository)
2. [Node.js](https://nodejs.org/en) + [npm](https://www.w3schools.com/nodejs/nodejs_npm.asp) (to install dependencies for the web-based application)
3. [Arduino IDE](https://www.arduino.cc/en/software)
4. Wio Terminal [Board Library](https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json)
5. Collection of Arduino libraries:
    * [rpcWiFi](https://github.com/Seeed-Studio/Seeed_Arduino_rpcWiFi) | seeed-studio/Seeed Arduino rpcWiFi@^1.0.7
    * [PubSubClient](https://github.com/knolleary/pubsubclient) | knolleary/PubSubClient@^2.8
	* [TFT_eSPI](https://github.com/Bodmer/TFT_eSPI) | bodmer/TFT_eSPI@^2.5.43
    * [Grove Temperature and Humidity sensor](https://github.com/Seeed-Studio/Grove_Temperature_And_Humidity_Sensor) | seeed-studio/Grove_Temperature_And_Humidity_Sensor@^2.0.2
    * [Adafruit NeoPixel](https://github.com/adafruit/Adafruit_NeoPixel) | adafruit/Adafruit_NeoPixel@^1.12.2

## Installation

### Wio Terminal | Installation Process

**1. Update the Wireless Core Firmware:**

To enable wireless connectivity on the Wio Terminal, you need to update the firmware for the Realtek RTL8720 wireless core. Following the steps below will help you perform these updates.

- **Step 1: Erase the Initial Factory Firmware**

    NOTE: You only need to erase the factory firmware for the very first time. Afterwards, you can flash new firmware to overwrite the existing firmware

    Before using the Wio Terminal for the first time, you need to erase the initial RTL8720 firmware and flash the latest version. This requires using the `ambd_flash_tool`.

    1. Download the Flashing Tool:
    
        - Open Terminal and execute the following commands:

                git clone https://github.com/Seeed-Studio/ambd_flash_tool
            
                cd ambd_flash_tool
        
    2. Connect Wio Terminal:

        - Connect your Wio Terminal to your computer and turn it on.

    3. Erase the Initial Firmware:

        - Run the following command to erase the existing firmware:

                python3 ambd_flash_tool.py erase

            NOTE: Ensure you have Python 3 installed. The initial erase process may take a while, so please be patient.

- **Step 2: Flash the Latest Firmware**

    1. Flash the Firmware:

        - While inside the ambd_flash_tool directory, execute the following command to flash the latest firmware:

                python3 ambd_flash_tool.py flash

By following these steps, you will successfully update the wireless core firmware on your Wio Terminal, enabling wireless connectivity with the latest features and stability improvements.

**2. Install the Required Board Library:**

* Manually install the required [board library [4]](#required-software-components) via the  `Arduino IDE`.
More information and the steps nessecary to install the library can be found in the [Getting Started](https://wiki.seeedstudio.com/Wio-Terminal-Getting-Started/#getting-started) guide from Seeed Studio.

    - NOTE THAT: If you are not able to find the `Additional Boards Manager URLs` in `File > Preferences` as described in the guide try to access it through the menu bar `Arduino IDE > Settings` then you should be able to see `Additional Boards Manager URLs`. Paste the link and click on `OK` (it might take a while before the `Seeeduino Wio Terminal` shows up in your list of boards).

**3. Install the Required Libraries:**

- Manually install the required [libraries [5]](#required-software-components) via the `Arduino IDE` by following the steps below:

    - For libraries that can be installed directly through the `Arduino IDE`:
        1. Open and navigate to `Tools > Manage Libraries...`
        2. Install the [required libraries](#required-software-components) by searching for the library name in the search bar, select the latest version and click `install`.

    - For libraries that require additional source
        1. Download the library as a `.ZIP` file from the GitHub repository. You can typically find the download option under the  `Code ` button on the library's GitHub page.
        2. Open `Arduino IDE` and navigate to `Sketch > Include Libraries > Add .ZIP Library...`
        3. Select `.ZIP > Open`

            - NOTE THAT: it is required to be a __.ZIP__ file, if your folder is unzipped you have to compress it first.

### Web-based Application | Local Installation

WearCast uses Node.js and npm (the Node Package Manager) to install the necessary dependencies for the web-based application. Follow these steps to set up the dependencies:

1. Clone the Repository:

        git clone <repository-url>

2. Navigate to the Web Application:

        cd WearCast

3. Install Required Dependencies:

        npm install

4. Configure API Keys:

    - Create a `.env` file in the repository. Add the following contents to the `.env` file, replacing "<API_KEY>" with your actual API key values:

            OPENCAGE_API_KEY="<API_KEY>"
            WEATHER_API_KEY="<API_KEY>"

    - You can obtain these API keys from the respective developer portals. For example, OpenWeatherMap API keys can be obtained from the [OpenWeatherMap website](https://openweathermap.org/appid), and OpenCage API keys can be obtained from the [OpenCage Geocoding API website](https://opencagedata.com/api).

    These commands will prepare your local environment to run the WearCast web application. Make sure you have Node.js and npm installed on your system before proceeding.

5. Configure WiFi and MQTT Settings for the Wio Terminal

    - Open the `network_info.h` and the `mqtt_info.h` file located in the project directory. 

        1. Replace the placeholder values for **ssid** and **password** with your actual WiFi network credentials.
        2. Replace the placeholder values for **mqtt_server**, **temperature_topic**, and **humidity_topic** with your actual MQTT broker URL and topic names.

    By completing these steps, you ensure that your Wio Terminal can connect to your specified WiFi network and communicate with your MQTT broker using the provided credentials and topic names.

## Usage

### Wio terminal | Usage

Assuming that the [Installation](#installation) is completed, follow the listed steps to use the Wio terminal:

1. Open the Arduino IDE and navigate to `File > Open...`
2. Open the terminarium file by following this path `src\wio\wearcast\wearcast.ino`.
3. Connect the Wio terminal to your computer via the USB cable. 
4. Click the `Upload` button, to upload the sketch to the Wio terminal. 
5. To view the Serial Monitor, navigate to `Tools > Serial Monitor` and select the `9600 baud` option.

### Web Application | Local Usage

You can run the web application locally, by executing the following steps:

1. Open the WearCast directory and run the following commands in the temrinal:

        cd src\web\src
        npm run dev

2. Copy the port adress that is displayed in the terminal and paste it in the search bar of the browser. It should be in the following format `localhost:XXXX`.

### Demo Video

The team behind WearCast has created a demo video that showcases the need for it and how to use it. [WearCast - Demo Video](url) 

## System Design

Below is the system architecture diagram for WearCast, which illustrates the overall structure and interaction of the components within the system. WearCast comprises two main subsystems: the Wio Terminal and the User Interface. 

The Wio Terminal subsystem includes sensors for temperature and humidity, a microcontroller, and an LED indicator. These components work together to gather and display weather data, which is then published to the MQTT Broker. The User Interface subsystem subscribes to this data, utilizing components like the WeatherDataAnalyzer, WeatherDataDisplayer, ClothingRecommender, and AdditionalRecommender to process and present weather information and clothing recommendations to the user. 

![System Architecture Diagram](docs/img/Software%20Architecture%20Diagram-SystemDesign.jpg)

## Team & Contributions

**Abbasi, Reihaneh** (@abbasir) <br>
Backend development of the Wio terminal.<br>
Interface development of web application.<br>
Creation of demo-video.<br>
Finalization of Wiki.<br>

**Ahsan Abid, Rawan** (@rawanah) <br>
Backend and frontend development of the Wio terminal.<br>
Interface development of web application.<br>
Implementation of automated build process.<br>
Refactorization of code.<br>
Finalization of README.<br>

**Akbarifar, Fatemeh** (@fatakb) <br>
Backend development of Wio terminal. <br>
Interface development of web application.<br>
Refactorization of code.<br>
Finalization of Wiki.<br>

**Alirani, Cazandra** (@cazandra) <br>
Frontend development of the Wio terminal. <br>
Interface development of web application.<br>
Creation of demo-video.<br>
Finalization of README.<br>

**Forssell, Elin** (@elifor) <br>
Backend and frontend development of the Wio terminal. <br>
Creation of Wireframes. <br>
Initialization of README and Wiki. <br>
Interface development of web application. <br>
Implementation of automated build process and CI. <br>
Refactorization of code. <br>

## License

WearCast is licensed under the MIT License. Refer to the [LICENSE](https://git.chalmers.se/courses/dit113/2024/group-17/WearCast/-/blob/main/LICENSE?ref_type=heads) file for more information.


