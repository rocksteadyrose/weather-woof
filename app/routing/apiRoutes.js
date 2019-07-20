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
  var breeds;
  var selectedBreeds;
  var matchedBreeds = [];
  var points = 100;
  var notGreatRainyConditions;
  var badRainyConditions;
  var shouldntwalk;
  var dogsWeatherComment;
  var dogsConditionComment;
  var dogsBreedComment;
  var dogsHealthComment;
  var dogsFurComment;
  var dogsWeightComment;
  var reason;

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

    //Temps outside
    function temperature(currentTemp) {
      if (currentTemp > 80 && currentTemp < 90) {
        points += -5;
        dogsWeatherComment = "yes";
      } else if (currentTemp > 90 && currentTemp < 95) {
        points += -10;
        dogsWeatherComment = "yes";
      } else if (currentTemp > 95 && currentTemp < 100) {
        points += -45;
        dogsWeatherComment = "yes";
      } else if (currentTemp > 100) {
        points += -50;
        dogsWeatherComment = "yes";
      } else if (currentTemp < 40 && currentTemp > 20) {
        points += -25;
        dogsWeatherComment = "yes";
      } else if (currentTemp < 10 && currentTemp > 20) {
        points += -10;
        dogsWeatherComment = "yes";
      } else if (currentTemp < 10) {
        points += -50;
        dogsWeatherComment = "yes";
      }
      console.log("new total with temp outside:" + points)
    }

    //weather conditions
    function conditions(currentTemp, condition) {
      badRainyConditions = ["Thundery outbreaks possible", "Moderate rain", "Moderate or heavy sleet", "Moderate snow", "Heavy rain at times", "Heavy rain", "Moderate or heavy freezing rain", "Patchy heavy snow", "Heavy snow", "Ice pellets", "Moderate or heavy rain shower", "Torrential rain shower", "Moderate or heavy sleet showers", "Moderate or heavy snow showers", "Moderate or heavy showers of ice pellets", "Moderate or heavy rain with thunder", "Moderate or heavy snow with thunder", "Freezing fog", "Moderate rain at times"]

      notGreatRainyConditions = ["Patchy sleet possible", "Patchy freezing drizzle possible", "Blowing snow", "Blizzard", "Freezing drizzle", "Heavy freezing drizzle", "Light freezing rain", "Light sleet", "Patchy light snow", "Light snow", "Patchy moderate snow", "Light rain shower", "Light sleet showers", "Light snow showers", "Light showers of ice pellets", "Patchy light rain with thunder", "Patchy light snow with thunder", "Mist", "Patchy rain possible", "Patchy light drizzle", "Light drizzle", "Patchy light rain", "Light rain"]

      for (var i = 0; i < badRainyConditions.length || i < notGreatRainyConditions.length; i += 1) {
        if (currentTemp < 50 && badRainyConditions.indexOf(condition[i]) != -1) {
          points += -50;
          dogsConditionComment = "yes";
          console.log("bad weather")
        } else if (currentTemp > 50 && badRainyConditions.indexOf(condition[i]) != -1) {
          points += -30;
          dogsConditionComment = "yes";
          console.log("bad weather but not 50 degrees")
        } else if (currentTemp < 50 && notGreatRainyConditions.indexOf(condition[i]) != -1) {
          points += -30;
          dogsConditionComment = "yes";
          console.log("not great weather")
        } else if (currentTemp > 50 && notGreatRainyConditions.indexOf(condition[i]) != -1) {
          points += -20;
          dogsConditionComment = "yes";
          console.log("not great weather but not 50 degrees")
        }
      }
      console.log("new total with weather condition subtraction:" + points)
    }

    //breeds that don't do well in heat
    function dogsBadInHeat(breed) {
      breeds = ['Alaskan Malamute', 'English Bulldog', 'French Bulldog', 'Pomeranian', 'Cavalier King Charles Spaniel', 'Chow Chow', 'Pug', 'Boxer', 'Akita', 'Boston Terrier', 'Pekingese', 'Shih Tzu', 'Samoyed', 'Japanese Chin', 'Keeshond', 'Affenpinscher', 'American Eskimo Dog', 'Siberian Husky', 'Komondor', 'American Bulldog'];
      var pointSubtraction;
      selectedBreeds = breed.trim().split(/\s*,\s*/);
      dogsBreedComment;

      for (var i = 0; i < breeds.length; i += 1) {
        if (selectedBreeds.length == 1) {
          if (breeds.indexOf(selectedBreeds[i]) != -1) {
            points += -30;
            dogsBreedComment = "yes";
            matchedBreeds.push(selectedBreeds[i]);
          }
        } else for (var j = 0; j < selectedBreeds.length; j++) {
          if (breeds[i] === selectedBreeds[j]) {
            matchedBreeds.push(selectedBreeds[j]);
            dogsBreedComment = "yes";
          }
        }
      }
      if (matchedBreeds.length > 0) {
        pointSubtraction = matchedBreeds.length * 5;
        points += -30 - pointSubtraction;
      }
      console.log("new total due to breed:" + points)
      console.log(matchedBreeds)
    }

    function health(dogHealth, currentTemp) {
      dogsHealthComment;
      if (dogHealth === "Poor" && currentTemp > 80 || dogHealth === "Very Poor" && currentTemp > 75 || dogHealth === "Poor" && currentTemp < 35 || dogHealth === "Very Poor" && currentTemp < 40) {
        points += -30;
        dogsHealthComment = "yes";
      }
      console.log("new total with health subtracted:" + points)
    }

    function furColoring(furColor) {
      dogsFurComment;
      if (furColor === "Black") {
        points += -20;
        dogsFurComment = "yes"
      } else if (furColor === "Multi - Mostly Dark Colored") {
        points += -15;
        dogsFurComment = "yes"
      }
      console.log("new total with fur color subtracted:" + points)
    }

    // function dogAge(age, weight) {
    //   //Puppy
    //   if (age === "Under 1") {
    //     points += -10;
    //   }

    //   //Toy & Small Dog
    //   else if (weight < 15 && age > 10) {
    //     points += -30;
    //   }

    //   //Medium Dog
    //   else if (weight < 50 && weight > 15 && age > 8) {
    //     points += -30;
    //   }

    //   //Large Dog
    //   else if (weight < 80 && weight > 50 && age > 7) {
    //     points += -30;
    //   }

    //   //Giant Dog
    //   else if (weight > 80 && age > 5) {
    //     points += -30;
    //     //Source: The Living Well Guide for Senior Dogs, Diane Morgan, Wayne Hunthausen DVM
    //   }
    //   console.log("new total with age subtracted:" + points)
    // }

    function dogWeight(weight) {
      dogsWeightComment;
      if (weight === "Yes") {
        points += -15;
        dogsWeightComment = "yes"
      }
      console.log("new total with weight subtracted:" + points)
    }

    function pointSystem(points) {
      if (points > 80) {
        shouldntwalk = "Your dog is totally fine to walk"
      } if (points < 80 && points > 60) {
        shouldntwalk = "Your dog should be okay to walk"
      } if (points < 60 && points > 40) {
        shouldntwalk = "Please be mindful if walking your dog"
      } if (points < 40 && points > 20) {
        shouldntwalk = "Please take extreme caution if walking your dog"
      } else {
        shouldntwalk = "You should absolutely not walk your dog"
      }
      console.log("new total:" + points);
    }

    function clearPoints() {
      points = 100;
    }

    function reasons(weather, condition, breed, health, fur, weight) {
      console.log(breed)
      var selectedBreedsString = selectedBreeds.toString();
      var matchedBreedsString = matchedBreeds.toString()
      var vowelRegex = '^[aieouAIEOU].*'
      var vowelSelected = selectedBreedsString.match(vowelRegex)
      var vowelMatched = matchedBreedsString.match(vowelRegex)
      console.log(selectedBreedsString)
      console.log(matchedBreedsString)

      if (shouldntwalk === "Please be mindful if walking your dog" ||
        shouldntwalk === "Please take extreme caution if walking your dog" ||
        shouldntwalk === "You should absolutely not walk your dog") {
        if (weather === "yes") {
          reason = "It feels like " + dogInfo.feelsLike + " outside. "
        }
        if (condition === "yes") {
          reason = reason + "The weather is " + dogInfo.condition.toLowerCase(); + ". "
        }
        if (breed === "yes") {
          if (selectedBreeds.length > 2) {
            selectedBreeds.splice(selectedBreeds.length - 1, 0, "and")
            selectedBreedsString = selectedBreeds.toString().replace(/,/g, ', ').replace('and,', 'and');
            selectedBreedsString = selectedBreedsString + " mix"
          }
          if (matchedBreeds.length > 2) {
            matchedBreeds.splice(matchedBreeds.length - 1, 0, "and")
            matchedBreedsString = matchedBreeds.toString().replace(/,/g, ', ').replace('and,', 'and');
            // matchedBreedsString = matchedBreedsString + " mix"
          }
          if (selectedBreeds.length === 2) {
            selectedBreeds.splice(1, 0, "and")
            selectedBreedsString = selectedBreeds.toString().replace(/,/g, ' ');
            selectedBreedsString = selectedBreedsString + " mix"
          }
          if (matchedBreeds.length === 2) {
            matchedBreeds.splice(1, 0, "and")
            matchedBreedsString = matchedBreeds.toString().replace(/,/g, ' ');
            // matchedBreedsString = matchedBreedsString + " mix"
          }
          // if (selectedBreeds.length >= 2 && matchedBreeds.length === 1) {
          //   matchedBreedsString = matchedBreedsString + " mix"
          // }

          if (vowelSelected) {
            reason = reason + "Your dog is an " + selectedBreedsString + ". "
          }
          if (!vowelSelected) {
            reason = reason + "Your dog is a " + selectedBreedsString + ". "
          }
          if ((matchedBreeds.length > 1) || (selectedBreeds.length > 1 && matchedBreeds.length === 1)) {
            reason = reason + "Having " + matchedBreedsString + " in their mix makes them more affected by the heat. "
          }
          if (vowelMatched && selectedBreeds.length === 1) {
            reason = reason + "Being a " + matchedBreedsString + " makes them more affected by the heat. "
          }
          else if (!vowelMatched && selectedBreeds.length === 1) {
            reason = reason + "Being a " + matchedBreedsString + " makes them more affected by the heat. "
          }

          dogsBreedComment = "";
        }

        if (health === "yes") {
          reason = reason + "Your dog's health is " + dogInfo.health.toLowerCase() + ". "
        }
        if (fur === "yes") {
          reason = reason + "Your dog's fur color is " + dogInfo.furColor.toLowerCase() + ". "
        }
        if (weight === "yes") {
          reason = reason + "Your dog is overweight."
        }
      }
      //send the responses to the front-end/json for the module
      res.json({ shouldntwalk: shouldntwalk, reason: reason });
      //Push the new user data into the api
      dogData.push(req.body);
      console.log(reason)
      matchedBreeds = [];
    }

    temperature(dogInfo.feelsLike);
    conditions(dogInfo.feelsLike, dogInfo.condition);
    dogsBadInHeat(dogInfo.specifiedBreed);
    health(dogInfo.health, dogInfo.feelsLike);
    furColoring(dogInfo.furColor);
    // dogAge(dogInfo.age, dogInfo.weightQuestion);
    dogWeight(dogInfo.weightQuestion);
    pointSystem(points);
    reasons(dogsWeatherComment, dogsConditionComment, dogsBreedComment, dogsHealthComment, dogsFurComment, dogsWeightComment);
    clearPoints();
  })
};