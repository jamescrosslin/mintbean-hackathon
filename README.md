# North Valley Business Academy Administrator Dashboard

NVBA Admin Dashboard is a course management application for a small to mid-size organization.

## Features

- Client and server side programs
- Integrated user account infrastructure
- Custom user authorization
- Create, display, modify, and delete course data from dashboard
- Modular and extensible through configuration

## Tech Stack

**Client:** Create React App, Axios

**Server:** Node, Express, Sequelize, Sqlite3, Bcrypt

## Run Locally

Clone the project

```bash
  git clone https://github.com/jamescrosslin/nvba-admin-dashboard.git
```

Go to the project directory

```bash
  cd nvba-admin-dashboard
```

Install dependencies

```bash
  cd client
  npm install
  cd ../api
  npm install
```

Start the server

```bash
  npm start
  cd ../client
  npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your runtime environment

`API_URL` - a string representing the hosting location of the api application (defaults to localhost:5000)
