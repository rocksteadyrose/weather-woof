//===================================================================
//HTML ROUTES: Helps direct the user. Whenever they click on a link, the router understands based on the information in this file what page to deliver to them.

//DEPENDENCIES
// We need to include the path package to get the correct file path for our html. Allows us to deliver html pages easily to users with our Express and our routing.
var path = require("path");
//===================================================================
// ROUTING: Build the routes to tell the router what page to DELIVER based on the URL. Then put it inside a module exports function to later include paths in server
module.exports = function(app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content

    //Displays the survey page. When you go to that page, you want to display the html files
    //Pass in app(express) above to the export, and when the user goes to the url /survey, you deliver survey.html
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
      });
    
      // If they don't go to a predefined URL and are using our app, go to the homepage
      app.use(function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
      });
    };
//===================================================================
