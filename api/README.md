# WarPlus API

WarPlus API (WPA) is web endpoint that accepts, stores, and provides WPA user
and game data. Authrization is required for certain functionality, such as creating and modifying games. More information is available in the [Using the API](#using-the-api) section.

## Tech

WPA utilizes a number of open source projects:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework by [@tjholowaychuk]
- [morgan] - simple logger for Node.js
- [Sequelize] - promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server
- [SQLite3] - small, fast local database engine
- [basic-auth] - simplified basic authorization library
- [bcrypt] - easy hashing library
- [nodemon] - process supervisor for node.js

## Installation

WPAApi requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd api
npm i
npm start
```

For production environments...

```sh
npm install --production
cross-env NODE_ENV=production npm start
```

## Using the API

WPAApi has two main routes: `/api/games` and `/api/users`.

### Authentication

The api requires authorization to release your information, so you will have to send your email address as your username and your password as an `Authorization: Basic` header. Read more about [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).

### Users Route

The model for user information is as follows:

- firstName, required string
- lastName, required a string
- emailAddress, required valid, unique email string
- password, required string

To view your user account information, you must first create an account.

To create a new user, send a post request to the api at `/api/users` with the required user information in the body of the request. If you include invalid information, you will get a response from the server detailing why the request wasn't successfully handled.

Now you will be able to make a get request to `/api/users` to retrieve your account information. Requires [Basic Authentication](#authentication). Response will be sent including user id, firstName, lastName, and emailAddress.

### Games Route

The model for user information is as follows:

- typeOfGame, required ENUM of games available
- status, required ENUM of `created`, `completed`, or `ongoing`
- maxPlayers, required integer of how many players
- gameplay, required JSON state of the game

To view a full list of games of your games, make a get request to `/api/games`. The return object will have an array of game objects that follow the game model. When requesting any game information, the Users value will be replaced with the public info of all players in the game. Requires [Basic Authentication](#authentication).

To create a new game, make a post request to `/api/games/create` and include information according to the game model. User is redirected after creation to the `/api/games/join/id` route, where `id` is the id property of the newly created game. Requires [Basic Authentication](#authentication).

To view a specific game, make an EventSource request to `/api/games/subscribe/id` where `id` is the game's id key. Response will be a Server Sent Event driven stream of data containing the state of the game.

To join a game, the user can send a get request to `/api/games/join/id` where id is the game's id key. Requires [Basic Authentication](#authentication).

To advance a game by taking your turn, send a get request to `/api/games/war/id/turn` where id is the game's id key. Requires [Basic Authentication](#authentication).

## License

MIT

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[node.js]: https://nodejs.org
[@tjholowaychuk]: https://twitter.com/tjholowaychuk
[express]: https://expressjs.com
[morgan]: https://github.com/expressjs/morgan#readme
[sequelize]: https://sequelize.org/
[sqlite3]: https://www.sqlite.org/index.html
[basic-auth]: https://npmjs.org/package/basic-auth
[bcrypt]: https://npmjs.org/package/bcrypt
[cross-env]: https://npmjs.org/package/cross-env
[nodemon]: https://npmjs.org/package/nodemon
