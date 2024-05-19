/**
 * @file mqtt_info.h
 * @brief Header file for MQTT server information.
 *
 * This file contains the definitions of constants for MQTT server configuration.
 * These definitions are used by the arduino file to establish MQTT connections.
 */

#ifndef MQTT_INFO_H // start of include guard
#define MQTT_INFO_H

// MQTT server information
const char* mqtt_server = "server"; // MQTT Broker URL
const char* temperature_topic = "your-temperature-topic"; // Topic for temperature
const char* humidity_topic = "your-humidity-topic"; // Topic for humidity

#endif // end of include guard
