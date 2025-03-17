# Weather Service API

This is the backend service for the Sample Weather App. It provides weather data through a RESTful API and interacts with external data sources.


## Prerequisites

Ensure you have the following installed before proceeding:
	•	Node.js (Recommended: v18+)
	•	npm or yarn


## Installation

Clone the repository and install dependencies:
```sh
git clone <repository-url>
cd weather-service
npm install
```


## Running the Service

Start the backend service using:
```sh
npm start
```

## Tests

Test the backend service using:
```sh
npm test
```

## API Endpoints

| Method | Endpoint                                      | Description                                                   |
|--------|-----------------------------------------------|---------------------------------------------------------------|
| GET    | /api/weatherStations                          | Fetch all weather stations                                    |
| GET    | /api/weatherStations/:id                      | Fetch details of a specific weather station (ID: 1)           |
| GET    | /api/variables                                | Fetch all available weather variables                         |
| GET    | /api/variables/:id                            | Fetch details of a specific weather variable (ID: 11)         |
| GET    | /api/variables/weather-station/:id            | Fetch all variables associated with weather station (ID: 1)   |
| GET    | /api/weatherData                              | Fetch all weather data records                                |
| GET    | /api/weatherData/:id                          | Fetch details of a specific weather data record (ID: 1)       |
| GET    | /api/weatherData/weather-station/:id          | Fetch all weather data for a specific weather station (ID: 1) |
| GET    | /api/weatherData/latest/weather-station/:id   | Fetch the latest weather data for weather station (ID: 10)    |

## Usage

1.	Ensure dependencies are installed.
2.	Start the service using npm start.
3.	The API will be available at http://localhost:3000.
