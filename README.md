# WarPlus

WarPlus is a card game app for 1 to 4 players.

## Features

- Client and server side programs
- Integrated user account infrastructure
- Custom user authorization
- Create and play games from dashboard
- Modular and extensible through configuration

## Tech Stack

**Client:** Create React App, Axios

**Server:** Node, Express, Sequelize, Sqlite3, Bcrypt

## Run Locally

Clone the project

```bash
  git clone https://github.com/jamescrosslin/mintbean-hackathon.git
```

Go to the project directory

```bash
  cd warplus
```

Install dependencies and start project

```bash
  cd api
  npm install
  npm start
```

In a separate terminal:

```bash
  cd client
  npm install
  npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your runtime environment

`API_URL` - a string representing the hosting location of the api application (defaults to localhost:5000)
`CLIENT_URL` - a string representing the hosting location of the client application (defaults to localhost:3000)
