//===================================================================
//DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// Makes routing easy for us using node JS.
var express = require("express");
//Allows us to receive info back in JSON form. Formats requests from user and responses from server into really easy to manipulate format.
var bodyParser = require("body-parser");
//===================================================================
// Set app = to express so we can easily call it. Tells node that we are creating an "express" server
var app = express();
//===================================================================
// Sets an initial port. Takes whatever port is defined by the deployment site by Heroku or the port we've set so it'll work on our local host so we don't have to reconfigure it when we deploy it live.
var PORT = process.env.PORT || 8080;
//===================================================================
// To create a virtual path prefix (where the path does not actually exist in the file system) for files that are served by the express.static function, specify a mount path for the static directory, as shown below:
var path = require("path");
app.use('/static', express.static(path.join(__dirname, 'app/public')))
//===================================================================
// Sets up the Express app to handle data parsing. Makes it easy for back and front-end to talk to each other
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//=====================================================================
// ROUTER: The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// Tells it to pass in express into the module exports function in our routes
// We want to include the API routes first because that's where we're pulling our data to display inside our HTML pages
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);
//=====================================================================
// LISTENER
// The below code effectively "starts" our server. Let's us know that it's running.
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
//=====================================================================
