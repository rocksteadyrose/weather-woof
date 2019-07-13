//====================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// API Routes are for our data. That helps determine what data the user sees as well as what data the user can post to our server to store

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data)
  // ---------------------------------------------------------------------------

  app.get("/api/dogdata", function (req, res) {
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
  app.post("/api/dogdata", function (req, res) {
    // This is the user data coming from the user. req.body is available since we're using the body-parser middleware
    var userInfo = req.body;
    var userScore = userInfo.scores;
    var others = friendsData;
    var sums = [];

    // Loop through the api data of friend' data
    for (i = 0; i < friendsData.length; i++) {
      var totalDifference = [];
      var otherScores = friendsData[i].scores;

      //Loop through the scores array of this data
      for (j = 0; j < otherScores.length; j++) {
        var differences = Math.abs(parseInt(userScore[j]) - parseInt(otherScores[j]));
        totalDifference.push(differences);
      }

      var sumofDifferences = totalDifference.reduce(
        function (total, num) { return total + num }
        , 0);

      sums.push(sumofDifferences);
    }
    var min = Math.min.apply(null, sums);
    var selectedDogIndex = sums.indexOf(min);

    var match = others[selectedDogIndex];
    var matchName = match.name;
    var matchPic = match.photo;

    //send the match to the front-end/json for the module
    res.json({ matchName, matchPic });

    //Push the new user data into the api friends array after we've looped through
    friendsData.push(req.body);
  });
};