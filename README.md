# WearCast


### Table of Contents
- [WearCast](#wearcast)
       - [Table of Contents](#table-of-contents)
   - [Description](#descripton)
       - [Background](#background)
       - [Features](#features)
       - [Visuals](#visuals)
           - [Sketches](#sketches)
   - [Dependencies & Requirements](#dependencies--requirements)
   - [Installation](#installation)
       - [Wio Terminal | Installation Process](#wio-terminal--installation-process)
       - [Web-based Application | Local Installation](#web-based-application--local-installation)
   - [Usage](#usage)
   - [Wio Terminal | Usage](#wio-terminal--usage)
   - [Web-based Application | Local Usage](#web-based-application--local-usage)
   - [Web-based Application | Live Demo](#web-based-application--live-demo)
   - [Authors and acknowledgment](#authors-and-acknowledgment)
   - [License](#license)

## Descripton
The project _“WearCast”_ is a __two-tier system__ designed to give the user suggestions for appropriate clothing based on current weather conditions. 

Using __sensors__ integrated with a __Wio Terminal__ the system is able to gather raw data of different weather parameters such as temperature and humidity. These sensors continuously gather data on the surrounding environment, which is processed and then transmitted to a __web-based user interface__ to be displayed as separate values. The system is also connected to a LED sensor that changes colors to red or blue to visually represent the temperature.

By analyzing and displaying these values, the user can access the weather data alongside tailored clothing suggestions and empowering messages. This ensures that the user is always well-prepared and fashionably attired for any weather scenario.

### Background
We've all been there: staring at the closet, trying to figure out what to wear as the weather changes outside. It is a struggle to know if we will be too hot, too cold or just right. Throw in factors like humidity and rain, and it is even trickier... That is where _WearCast_ comes in. We saw this common dilemma and decided to do something about it, _WearCast_ is our solution to help as many as possible to get dressed with confidence, no matter what the weather throws our way.

By undertaking this project as a part of our System Development course at University of Gothenburg/Chalmers University of Technology, _WearCast_ serves as a testament to the intersection of academia and innovation where [the team](#authors-and-acknowledgment) behind _WearCast_ not only aims to address a real-world need but also to apply theoretical knowledge and technical skills in a practical context.

### Features
* __Real-time Weather Data Integration__: utilizing sensors integrated with a Wio Terminal, _WearCast_ gathers raw data on key weather parameters such as temperature and humidity. This data is updated continously to provide users with the most accurate weather information.
* __Personalized Clothing Recommendations__: _WearCast_ analyzes the gathered data to generate perzonalised clothing suggestions tailored to current weather conditions. Wheter it is for a sunny day calling for a light-colored, breathable outfit or a rainy forecast perfect for a waterproof attire, _WearCast_ ensures users are equipped with suitable outfit ideas.
* __Interactive Web Interface__: featuring a user-friendly web interface that serves as a centralized hub for accessing weather data alongside outfit recommendations.
* __Pinterest API Integration__: to enrich the user experiece, _WearCast_ integrates with the Pinterest API to generate visual inspiration for different styles based on weather conditions. By browsing this curated selection of clothing ideas tailored to the specific climate, _WearCast_ empowers users to make informed decisions about their outfits, ensuring they are both stylish and _weatherproof_ in any situation fostering their creativity and exploration in outfit choices.


### Visuals

#### Sketches
Sketches of the initial design of our website, all sketches are made in [Procreate](https://procreate.com/).
![homepage-top.jpeg](/docs/img/homepage-top.jpeg)
![homepage-bottom.jpeg](/docs/img/homepage-bottom.jpeg)
![avatar-wardrobe.jpg](/docs/img/avatar-wardrobe.jpg)
![avatar-wardrobe.GIF](/docs/img/avatar-wardrobe.GIF)


## Dependencies & Requirements
#### Required Hardware:
1. Wio Seeed Terminal or compatible board
2. Grove Sensors for Wio Terminal
    * [Temperature & Humidity Sensor | Seeed Studio Wiki](https://wiki.seeedstudio.com/Grove-TemperatureAndHumidity_Sensor/) (only used to measure humidity)
    * [Temperature Sensor | Seeed Studio Wiki](https://wiki.seeedstudio.com/Grove-Temperature_Sensor_V1.2/)
    * [RGB LED Stick | Seeed Studio Wiki](https://wiki.seeedstudio.com/Grove-RGB_LED_Stick-10-WS2813_Mini/)

#### Required Software:
Should be installed prior to the installation process.
1. [Arduino IDE](https://www.arduino.cc/en/software) or [Arduino CLI](https://github.com/arduino/arduino-cli)
2. Wio Terminal [Board Library](https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json)
3. Collection of Arduino libraries:
    Libraries that can be installed through the Arduino IDE
   * [Grove Temperature And Humidity Sensor](https://github.com/Seeed-Studio/Grove_Temperature_And_Humidity_Sensor)

   Libraries that require an additional source to be installed (`.ZIP`)
   * [TFT_eSPI](https://github.com/Bodmer/TFT_eSPI)
   * []()
   * []()
   * []()


## Installation
Required steps of installation process


### Wio Terminal | Installation Process
- Manually install the required [board library [2]](#required-software) via the  `Arduino IDE`.
    More information and the steps nessecary to install the library can be found in the [Getting Started](https://wiki.seeedstudio.com/Wio-Terminal-Getting-Started/#getting-started) guide from Seeed Studio.

    NOTE THAT: If you are not able to find the `Additional Boards Manager URLs` in `File > Preferences` as described in the guide try access it through the menu bar `Arduino IDE > Settings` then you should be able to see `Additional Boards Manager URLs`. Paste the link and click on `OK` (it might take a while before the `Seeeduino Wio Terminal` shows up in your list of boards).


- Manually install the required [libraries [3]](#required-software) via the `Arduino IDE` by following the steps below

    - For libraries that can be installed directly through the `Arduino IDE`:
        1. Open and navigate to `Tools > Manage Libraries...`
        2. Install the [required libraries](#dependencies--requirements) by searching for the library name in the search bar, select the latest version and click `install`.

    - For libraries that require additional source
        1. Open `Arduino IDE` and navigate to `Sketch > Include Libraries > Add .ZIP Library...`
        2. Select `.ZIP > Open`
        
        NOTE THAT: it is required to be a __.ZIP__ file, if your folder is unzipped you have to compress it first.

#### Update the Wireless Core Firmware


### Web-based Application | Local Installation

## Usage

### Wio Terminal | Usage
1. Arduino IDE | Usage


### Web-based Application | Local Usage


### Web-based Application | Live Demo


## Authors and acknowledgment
* Elin Forssell (@elifor)
* Fatemeh Akbarifar (@fatakb)
* Rawan Ahsan Abid (@rawanah)
* Caszandra Alirani (@cazandra)
* Reihaneh Abbasi (@abbasir)


## License





