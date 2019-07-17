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
    var dogInfo = req.body;
    console.log(dogInfo)
    var breeds;
    var points = 100;
    var notGreatRainyConditions;
    var badRainyConditions;
    var temperature;

    //Temps outside
    function temperature(currentTemp) {
      if (currentTemp > 80 && currentTemp < 90) {
        points += -5;
      } else if (currentTemp > 90 && currentTemp < 95) {
        points += -10;
      } else if (currentTemp > 95 && currentTemp < 100) {
        points += -45;
      } else if (currentTemp > 100) {
        points += -50;
      } else if (currentTemp < 40 && currentTemp > 20) {
        points += -25;
      } else if (currentTemp < 10 && currentTemp > 20) {
        points += -10;
      } else if (currentTemp < 10) {
        points += -50;
      }
    }

    //weather conditions
    function conditions(currentTemp, condition) {
      badRainyConditions = ["Thundery outbreaks possible", "Moderate rain", "Moderate or heavy sleet", "Moderate snow", "Heavy rain at times", "Heavy rain", "Moderate or heavy freezing rain", "Patchy heavy snow", "Heavy snow", "Ice pellets", "Moderate or heavy rain shower", "Torrential rain shower", "Moderate or heavy sleet showers", "Moderate or heavy snow showers", "Moderate or heavy showers of ice pellets", "Moderate or heavy rain with thunder", "Moderate or heavy snow with thunder", "Freezing fog", "Moderate rain at times"]

      notGreatRainyConditions = ["Patchy sleet possible", "Patchy freezing drizzle possible", "Blowing snow", "Blizzard", "Freezing drizzle", "Heavy freezing drizzle", "Light freezing rain", "Light sleet", "Patchy light snow", "Light snow", "Patchy moderate snow", "Light rain shower", "Light sleet showers", "Light snow showers", "Light showers of ice pellets", "Patchy light rain with thunder", "Patchy light snow with thunder", "Mist", "Patchy rain possible", "Patchy light drizzle", "Light drizzle", "Patchy light rain", "Light rain"]

      for (var i = 0; i < badRainyConditions.length || i < notGreatRainyConditions.length; i += 1) {
        if (currentTemp < 50 && badRainyConditions.indexOf(condition[i]) != -1) {
          points += -50;
          console.log("bad weather")
        } else if (currentTemp > 50 && badRainyConditions.indexOf(condition[i]) != -1) {
          points += -30;
          console.log("bad weather but not 50 degrees")
        } else if (currentTemp < 50 && notGreatRainyConditions.indexOf(condition[i]) != -1) {
          points += -30;
          console.log("not great weather")
        } else if (currentTemp > 50 && notGreatRainyConditions.indexOf(condition[i]) != -1) {
          points += -20;
          console.log("not great weather but not 50 degrees")
        }
      }
    }

    //breeds that don't do well in heat
    function dogsBadInHeat(breed, furColor) {
      breeds = ['Alaskan Malamute', 'English Bulldog', 'French Bulldog', 'Pomeranian', 'Cavalier King Charles Spaniel', 'Chow Chow', 'Pug', 'Boxer', 'Akita', 'Boston Terrier', 'Pekingese', 'Shih Tzu', 'Samoyed', 'Japanese Chin', 'Keeshond', 'Affenpinscher', 'American Eskimo Dog', 'Siberian Husky', 'Komondor'];
      var pointSubtraction;
      var moreThanOneMatchedBreed;

      for (var i = 0; i < breeds.length; i += 1) {
        if (breed.length == 1) {
          if (breeds.indexOf(breed[i]) != -1) {
            points += -30;
            console.log("one breed that matches")
          }
        } else if (breed.length > 1) {
          if (breeds.indexOf(breed[i]) != -1) {
            moreThanOneMatchedBreed = "yes";
            console.log("more than one breed that matches")
          }
        }
      }
      if (moreThanOneMatchedBreed === "yes") {
        pointSubtraction = breed.length * 5;
        points = points - 30 - pointSubtraction;
        console.log("new total:" + points)
      }

      if (furColor === "Black") {
        points += -20;
        console.log("black fur")
      } else if (furColor === "Multi - Mostly Dark Colored") {
        points += -15;
        console.log("multi dark fur")
      }
    }
   

    if (dogInfo.health === "Poor" && dogInfo.feelsLike > 80 || dogInfo.health === "Very Poor" && dogInfo.feelsLike > 75 || dogInfo.health === "Poor" && dogInfo.feelsLike < 35 || dogInfo.health === "Very Poor" && dogInfo.feelsLike < 40) {
      points += -30;
    }

    if (dogInfo.weightQuestion === "Yes") {
      points += -15;
    }

    //Puppy
    if (dogInfo.age === "Under 1") {
      points += -10;
    }

    //Toy & Small Dog
    if (dogInfo.weight < 15 && dogInfo.age > 10) {
      points += -30;
    }

    //Medium Dog
    if (dogInfo.weight < 50 && dogInfo.weight > 15 && dogInfo.age > 8) {
      points += -30;
    }

    //Large Dog
    if (dogInfo.weight < 80 && dogInfo.weight > 50 && dogInfo.age > 7) {
      points += -30;
    }

    //Giant Dog
    if (dogInfo.weight > 80 && dogInfo.age > 5) {
      points += -30;
      //Source: The Living Well Guide for Senior Dogs, Diane Morgan, Wayne Hunthausen DVM
    }

    var shouldntwalk;

    //Points

    if (points > 80) {
      shouldntwalk = "Your dog is totally fine to walk"
    }

    if (points < 80) {
      shouldntwalk = "Your dog should be okay to walk"
    }

    if (points < 60) {
      shouldntwalk = "Please be mindful if walking your dog"
    }

    if (points < 40) {
      shouldntwalk = "Please take extreme caution if walking your dog"
    }

    if (points < 20) {
      shouldntwalk = "You should absolutely not walk your dog"
    }

    console.log(points)

    //send the match to the front-end/json for the module
    res.json({ shouldntwalk });

    //Push the new user data into the api
    dogData.push(req.body);

    temperature(dogInfo.feelsLike);
    conditions(dogInfo.feelsLike, dogInfo.condition);
    dogsBadInHeat(dogInfo.specifiedBreed, dogInfo.furColor)

  })
};