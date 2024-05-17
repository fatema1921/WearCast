# WearCast


### Table of Contents
- [WearCast](#wearcast)
       - [Table of Contents](#table-of-contents)
   - [Background & Description](#background--description)
       - [Features](#features)
   - [Dependencies & Requirements](#dependencies--requirements)
        - [Required Hardware Components](#required-hardware-components)
        - [Required Software Components](#required-software-components)
   - [Installation](#installation)
       - [Wio Terminal | Installation Process](#wio-terminal--installation-process)
            - [Update the Wireless Core Firmware](#update-the-wireless-core-firmware)
       - [Web-based Application | Local Installation](#web-based-application--local-installation)
   - [Usage](#usage)
        - [Wio Terminal | Usage](#wio-terminal--usage)
        - [Web-based Application | Local Usage](#web-based-application--local-usage)
   - [Authors and acknowledgment](#authors-and-acknowledgment)
   - [License](#license)

## Background & Description
We've all been there: staring at the closet, struggling to figure out what to wear as the weather changes outside. WearCast is the answer to your problem! 

WearCast is a revolutionary two-tier solution designed to provide tailored clothing recommendations based on real-time weather data. Utilizing sensors integrated with a Wio Terminal, WearCast continuously gathers raw data on key weather parameters, including temperature and humidity. This data is processed and transmitted to a web interface, where it is analysed and displayed alongside with tailored clothing suggestions and empowering messages.

By undertaking this project as a part of the System Development course at University of Gothenburg/Chalmers University of Technology, WearCast serves as a testament to the intersection of academia and innovation. The team behind WearCast does not only aim to address a real-world need but also to apply theoretical knowledge and technical skills in a practical context.

### Features
* **Real-time Weather Data Integration:** WearCast gathers continuous updates on temperature and humidity to provide users with accurate weather information.
* **Visual Temperature Representation:** The system is connected to a LED sensor that changes color to visually represent the temperature - red for warmth and blue for coolness.
* **Tailored Clothing Recommendations:** WearCast generates outfit suggestions, tailored to the gathered weather data.
* **Empowering Messages:** WearCast motivates users with empowering messages, encouraging them to embrace any weather with confidence and style.
* **Interactive Web Interface:** Featuring a user-friendly interface, WearCast serves as a centralized hub for accessing weather data and outfit recommendations. 
* **Inspirational Fashion Galleries:** WearCast offers climate-based galleries, allowing the user to explore styles. 


## Dependencies & Requirements
### Required Hardware Components:
(Should be aquired prior to the installation process.)
1. [Wio Seeed Terminal](https://www.seeedstudio.com/Wio-Terminal-p-4509.html) or compatible board
2. Grove Sensors for Wio Terminal
    * [Temperature & Humidity Sensor | Seeed Studio Wiki](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-DHT11.html) (only used to measure humidity)
    * [Temperature Sensor | Seeed Studio Wiki](https://www.seeedstudio.com/Grove-Temperature-Sensor.html)
    * [RGB LED Stick | Seeed Studio Wiki](https://www.seeedstudio.com/Grove-RGB-LED-Stick-10-WS2813-Mini.html)

### Required Software Components:
(Should be installed prior to the installation process.)
1. [Arduino IDE](https://www.arduino.cc/en/software)
2. Wio Terminal [Board Library](https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json)
3. Collection of Arduino libraries:
    * rpcWiFi | seeed-studio/Seeed Arduino rpcWiFi@^1.0.7
    * [PubSubClient](https://github.com/knolleary/pubsubclient) | knolleary/PubSubClient@^2.8
	* [TFT_eSPI](https://github.com/Bodmer/TFT_eSPI) | bodmer/TFT_eSPI@^2.5.43
    * .
    * -- this list will be added to/updated further during Sprint 2 v1.5, v2.0

## Installation

### Wio Terminal | Installation Process
- Manually install the required [board library [2]](#required-software-components) via the  `Arduino IDE`.
    More information and the steps nessecary to install the library can be found in the [Getting Started](https://wiki.seeedstudio.com/Wio-Terminal-Getting-Started/#getting-started) guide from Seeed Studio.

    NOTE THAT: If you are not able to find the `Additional Boards Manager URLs` in `File > Preferences` as described in the guide try to access it through the menu bar `Arduino IDE > Settings` then you should be able to see `Additional Boards Manager URLs`. Paste the link and click on `OK` (it might take a while before the `Seeeduino Wio Terminal` shows up in your list of boards).


- Manually install the required [libraries [3]](#required-software-components) via the `Arduino IDE` by following the steps below

    - For libraries that can be installed directly through the `Arduino IDE`:
        1. Open and navigate to `Tools > Manage Libraries...`
        2. Install the [required libraries](#required-software-components) by searching for the library name in the search bar, select the latest version and click `install`.

    - For libraries that require additional source
        1. Open `Arduino IDE` and navigate to `Sketch > Include Libraries > Add .ZIP Library...`
        2. Select `.ZIP > Open`

        NOTE THAT: it is required to be a __.ZIP__ file, if your folder is unzipped you have to compress it first.

### Update the Wireless Core Firmware


### Web-based Application | Local Installation


## Usage

### Wio Terminal | Usage
1. Arduino IDE | Usage


### Web-based Application | Local Usage


## Authors and acknowledgment
* Elin Forssell (@elifor)
* Fatemeh Akbarifar (@fatakb)
* Rawan Ahsan Abid (@rawanah)
* Caszandra Alirani (@cazandra)
* Reihaneh Abbasi (@abbasir)


## License





