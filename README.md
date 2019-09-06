# express-yourself-with-nodejs-my-version

This is simple **RESTful** server using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) framework.
Using [log4js](https://github.com/log4js-node/log4js-node) for logging errors. 

API can be accessed via [Heroku](https://bsa-nodejs-my-version.herokuapp.com/) deployment.

API reference:

+ /user - information about users
    * GET /user - returns information on all the available users
    * GET /user/:id - return information on the particular user
	* POST /user - adds new user
	* PUT /user/:id - modifies information on particular user
	* DELETE /user/:id - deletes particular user
+ /fights - history of fights
	* GET /fights - returns information on all fights
	* POST /fights - adds information about new fight

Server is created for the needs of the [Street Fighter simulator app](https://bitbucket.org/TheSubliminal/es6-for-everyone-my-version/src/master/).

---
[Binary Studio Academy 2019](https://academy.binary-studio.com)

