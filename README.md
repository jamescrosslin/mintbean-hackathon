# WarPlus

WarPlus is a card game app for 1 to 4 players.

## Creators

- Design and Landing page: [Shara Crosslin](https://www.linkedin.com/in/sharacrosslin/)
- React and API logic: [James Crosslin](https://www.linkedin.com/in/jamescrosslin/)

## Demo

Visit our [landing page](https://warplus.netlify.app/) to learn more about WarPlus!

## Previews

![Imgur](https://i.imgur.com/8MqEqZH.png)
![Imgur](https://i.imgur.com/8JBAWSA.png)
![Imgur](https://i.imgur.com/CntTxmV.png)
![Imgur](https://i.imgur.com/I7qkQGd.png)

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

## More Information

The api and the client both have their own individual README.md files with more information about the structure of the application.
