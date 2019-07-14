//====================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// API Routes are for our data. That helps determine what data the user sees as well as what data the user can post to our server to store

var dogData = require("../data/dogstested");
// var weather = require("../data/weatherapi");
// var retrieveWeather = weather.getWeather();

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data)
  // ---------------------------------------------------------------------------

  app.get("/api/dogstested", function (req, res) {
    //Build a route where you can view the dog data
    res.json(dogData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  //When the app tries to post to this URL, run this function. The function has a request and a response.
  app.post("/api/dogstested", function (req, res) {
    // This is the user data coming from the user. req.body is available since we're using the body-parser middleware
    // var zip = dogData.zip;
    var dogInfo = req.body;
    console.log(dogInfo)
    // var dogsTested = breedArray;

            // console.log(response.current.condition.text)
            // console.log(response.current.temp_f)
            // console.log(response.current.feelslike_f)

            if (dogInfo.feelsLike > 80 && dogInfo.feelsLike < 90) {
              dogInfo.points += -5;
                console.log(dogInfo.points)
            }

            if (dogInfo.feelsLike > 90 && dogInfo.feelsLike < 95) {
              dogInfo.points += -10;
                console.log(dogInfo.points)
            }

            if (dogInfo.feelsLike > 95 && dogInfo.feelsLike < 100) {
              dogInfo.points += -15;
                console.log(dogInfo.points)
            }

            if (dogInfo.feelsLike > 100) {
              dogInfo.points += -50;
                console.log(dogInfo.points)
            }

            if (dogInfo.feelsLike < 50 && dogInfo.feelsLike > 40) {
              dogInfo.points += -20;
                console.log(dogInfo.points)
            }

            if (dogInfo.feelsLike < 40 && dogInfo.feelsLike > 20) {
              dogInfo.points += -30;
                console.log(dogInfo.points)
            }

            if (dogInfo.feelsLike < 10 && dogInfo.feelsLike > 20) {
              dogInfo.points += -40;
                console.log(dogInfo.points)
            }

            if (dogInfo.feelsLike < 10) {
              dogInfo.points += -50;
                console.log(dogInfo.points)
            }

            if (dogInfo.feelsLike < 50 && dogInfo.condition === "Mist" || dogInfo.condition === "Patchy rain possible" || dogInfo.condition === "Freezing fog" || dogInfo.condition === "Patchy light drizzle" || dogInfo.condition === "Light drizzle" || dogInfo.condition === "Patchy light rain" || dogInfo.condition === "Light rain" || dogInfo.condition === "Moderate rain at times" || dogInfo.condition === "Light rain shower") {
              dogInfo.points += -30;
                console.log(dogInfo.points)
            }

            if (dogInfo.feelsLike < 50 && dogInfo.condition === "Patchy sleet possible" || dogInfo.condition === "Patchy freezing drizzle possible" || dogInfo.condition === "Thundery outbreaks possible" || dogInfo.condition === "Blowing snow" || dogInfo.condition === "Blizzard" || dogInfo.condition === "Freezing drizzle" || dogInfo.condition === "Heavy freezing drizzle" || dogInfo.condition === "Moderate rain" || dogInfo.condition === "Heavy rain at times" || dogInfo.condition === "Heavy rain" || dogInfo.condition === "Light freezing rain" || dogInfo.condition === "Moderate or heavy freezing rain" || dogInfo.condition === "Light sleet" || dogInfo.condition === "Moderate or heavy sleet" || dogInfo.condition === "Patchy light snow" || dogInfo.condition === "Light snow" || dogInfo.condition === "Patchy moderate snow" || dogInfo.condition === "Moderate snow" || dogInfo.condition === "Patchy heavy snow" || dogInfo.condition === "Heavy snow" || dogInfo.condition === "Ice pellets" || dogInfo.condition === "Light rain shower" || dogInfo.condition === "Moderate or heavy rain shower" || dogInfo.condition === "Torrential rain shower" || dogInfo.condition === "Light sleet showers" || dogInfo.condition === "Moderate or heavy sleet showers" || dogInfo.condition === "Light snow showers" || dogInfo.condition === "Moderate or heavy snow showers" || dogInfo.condition === "Light showers of ice pellets" || dogInfo.condition === "Light showers of ice pellets" || dogInfo.condition === "Moderate or heavy showers of ice pellets" || dogInfo.condition === "Patchy light rain with thunder" || dogInfo.condition === "Moderate or heavy rain with thunder" || dogInfo.condition === "Patchy light snow with thunder" || dogInfo.condition === "Moderate or heavy snow with thunder") {
              dogInfo.points += -50;
                console.log(dogInfo.points)
            }

            // for (i = 0; i < shortNose.length; i++) {

            //     if (dogInfo.shortNose.indexOf(specificBreed[i]) > -1 && dogInfo.feelsLike > 80) {
            //       dogInfo.points += -10;
            //         console.log(dogInfo.points)
            //     }
            // }

            // for (i = 0; i < thickFur.length; i++) {

            //     if (dogInfo.thickFur.indexOf(specificBreed[i]) > -1 && feelsdogInfo.feelsLikeLike > 80) {
            //       dogInfo.points += -10;
            //         console.log(dogInfo.points)
            //     }
            // }

            if (dogInfo.furColor === "Black" && dogInfo.feelsLike > 80 || dogInfo.furColor === "Multi - Mostly Dark Colored" && dogInfo.feelsLike > 75) {
              dogInfo.points += -10;
                console.log(dogInfo.points)
            }

            if (dogInfo.health === "Poor" && dogInfo.feelsLike > 80 || dogInfo.health === "Very Poor" && dogInfo.feelsLike > 75 || dogInfo.health === "Poor" && dogInfo.feelsLike < 35 || dogInfo.health === "Very Poor" && dogInfo.feelsLike < 40) {
              dogInfo.points += -20;
                console.log(dogInfo.points)
            }

            if (dogInfo.Question === "Yes") {
              dogInfo.points += -15;
                console.log(dogInfo.points)
            }

            //Puppy
            if (dogInfo.age === "Under 1") {
              dogInfo.points += -10;
                console.log(dogInfo.points)
            }

            //Toy & Small Dog
            if (dogInfo.weight < 15 && dogInfo.age > 10) {
              dogInfo.points += -10;
                console.log(dogInfo.points)
            }

            //Medium Dog
            if (dogInfo.weight < 50 && dogInfo.weight > 15 && dogInfo.age > 8) {
              dogInfo.points += -10;
                console.log(dogInfo.points)
            }

            //Large Dog
            if (dogInfo.weight < 80 && dogInfo.weight > 50 && dogInfo.age > 7) {
              dogInfo.points += -10;
                console.log(dogInfo.points)
            }

            //Giant Dog
            if (dogInfo.weight > 80 && dogInfo.age > 5) {
              dogInfo.points += -10;
                console.log(dogInfo.points)
                //Source: The Living Well Guide for Senior Dogs, Diane Morgan, Wayne Hunthausen DVM
            }

            var shouldntwalk = "testttt"

            //send the match to the front-end/json for the module
            res.json({ shouldntwalk});

            //Push the new user data into the api
            dogData.push(req.body);
          })
  };