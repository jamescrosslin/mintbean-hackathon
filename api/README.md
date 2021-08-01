# North Valley Business Academy API

North Valley Business Academy API (NVBAApi) is web endpoint that accepts, stores, and provides NVBA user
and course data. Authrization is required for certain functionality, such as creating and modifying courses. More information is available in the [Using the API](#using-the-api) section.

## Tech

NVBAApi utilizes a number of open source projects:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework by [@tjholowaychuk]
- [morgan] - simple logger for Node.js
- [Sequelize] - promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server
- [SQLite3] - small, fast local database engine
- [basic-auth] - simplified basic authorization library
- [bcrypt] - easy hashing library
- [cross-env] - compatibility library for env variables in different OS
- [nodemon] - process supervisor for node.js

## Installation

NVBAApi requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd nvba-courses-api
npm i
npm start
```

To seed mock user and course data...

```sh
npm run seed
```

For production environments...

```sh
npm install --production
cross-env NODE_ENV=production npm start
```

## Using the API

NVBAApi has two main routes: `/api/courses` and `/api/users`.

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

### Courses Route

The model for user information is as follows:

- title, required string
- description, required text block
- estimatedTime, an optional string
- materialsNeeded, an optional string
- userId, required id of associated user in the system

To view a full list of courses, make a get request to `/api/courses`. The return object will have an array of course objects that follow the course model. When requesting any course information, the userId value will be replaced with the public info of the related user.

To create a new course, make a post request to `/api/courses` and include information according to the course model. Requires [Basic Authentication](#authentication).

To view a specific course, make a get request to `/api/courses/id` where `id` is the course's id key. Response will be an object with course model properties.

To update a course, the course's associated user can send a put request to `/api/courses/id` where id is the course's id key. Requires [Basic Authentication](#authentication).

To delete a course, the course's associated user can send a delete request to `/api/courses/id` where id is the course's id key. Requires [Basic Authentication](#authentication).

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
