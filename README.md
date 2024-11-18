# sn-metrics-app

## Description

The `sn-metrics-app` is a tool designed to collect and display metrics for conditions in the mountain that indicate the feasibility of winter sports practices. It provides information about the snow quality, the occupation of the ski resort and the wind spped.

The application is built using Node.js, Express, and React, everything under Typescript. For storing the data, a docker container is used to run an instance of a Postgres DB. It is divided into two main components: the server-side API and the client-side dashboard. The API collects data from the server and stores it in a database, while the dashboard displays the collected metrics.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/sn-metrics-app.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd sn-metrics-app
   ```
3. **Install the dependencies in both client and server directories**:
   ```bash
   npm install
   ```

## Usage

1. **Start the both client and server in their own directories**:
   ```bash
   npm start
   ```
2. **Access the dashboard**: Open your browser and navigate to `http://localhost:3000`.

The `start` script in the server side automatically compiles Typescript files and initialises the docker container for the database. Sometimes, the use of `sudo` in linux environments can be necessary. If the database does not start up, inside the server directory, use:

```bash
    sudo docker-compose up -d
```

To clean the database, use:

```bash
    sudo docker-compose down -v
```

## The backend

Inside the `src` directory there's the `pool.ts` file, where the connections to the database is made, and the `index.ts`, which is the endpoint that node serves for the client to call. It runs on port 8080 and has the following routes:

-- /api/getAllMetrics: returns all the metrics stored in the database. This is the main data that the application uses.

-- /api/addMetric: adds a new metric to the database. The data is sent in the body of the request.

## The frontend

There are several folders, one for each purpose. The `App` component renders the whole application and is responsible to provide `MetricsContainer` with the data from the server. Inside of it, there are two visually split parts: one is the graphs component, called `MetricVisualiser`, which takes responsibility for displaying and handling the information to provide an input to the `Chart.js` components. The other part is the form component, `MetricForm`, which provides a form so that the user can send the data to the server and update the charts consequently.

CSS files have its own separate folder (`styles`), and inside `utils` we can find everything that can be reused or separated from the direct behaviour of the components (just like `graphOptions`, which was decided to be separated from the `MetricVisualiser` component for the sake of code readability).

## Result

The application is able to display the metrics in a visually appealing way, with the use of `Chart.js` to display the data. The user can also add new metrics to the database, which will be displayed in the charts after the request is made. However, it doesn't show an average of the metrics. This could be more meaningful after the implementation of some date filtering, which could tell the user how good a winter season has been in terms of playing sports. Nevertheless, it was more appealing to include not one but three kinds of metrics, which give some realness to the purpose of the application.

The styling is one of the biggest improvements that it could experience, just to make it's layout more attractive. The highlight colours chosen were picked from [Sierra Nevada official's website](www.sierranevada.es).
