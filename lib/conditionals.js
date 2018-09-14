var points = 50;
var shortNose = ["Boxer", "Pug", "English Bulldog", "American Bulldog", "French Bulldog", "Boston Terrier", "Shih Tzu", "Chihuahua", "Chow Chow", "Pekingese", "Lhasa Apso", "Bullmastiff", "English Toy Spaniel", "Cavalier King Charles Spaniel"];
var thickFur = ["Husky", "Bernese Mountain Dog", "Alaskan Malamute", "Samoyed"];
var feelsLike;
var condition;

function getBreedInfo() {
    var weight = $('#weight').val();
    var healthSelection = $('#health')[0];
    var health = healthSelection.options[healthSelection.selectedIndex].text;
    var specificBreed = $('#breedDropdown').val();
    var weightSelectionQuestion = $("#weightQuestion")[0];
    var weightQuestion = weightSelectionQuestion.options[weightSelectionQuestion.selectedIndex].text;
    var colorSelection = $("#furColor")[0];
    var furColor = colorSelection.options[colorSelection.selectedIndex].text;
    var ageSelection = $("#age")[0];
    var age = ageSelection.options[ageSelection.selectedIndex].text;
    var key = 'ed02eee49956436e94415434180309';
    var zip = $("#zipCode").val();
    return $.ajax({
        method: 'GET',
        url: `http://api.apixu.com/v1/current.json?key=${key}&q=${zip}`,
        dataType: 'json',
    })
        .then(function (response) {
            feelsLike = response.current.feelslike_f;
            condition = response.current.condition.text;
            // console.log(response)
            // console.log(response.current.condition.text)
            // console.log(response.current.temp_f)
            // console.log(response.current.feelslike_f)

            if (feelsLike > 80 && feelsLike < 90) {
                points += -5;
                console.log(points)
            }

            if (feelsLike > 90 && feelsLike < 95) {
                points += -10;
                console.log(points)
            }

            if (feelsLike > 95 && feelsLike < 100) {
                points += -15;
                console.log(points)
            }

            if (feelsLike > 100) {
                points += -50;
                console.log(points)
            }

            if (feelsLike < 50 && feelsLike > 40) {
                points += -20;
                console.log(points)
            }

            if (feelsLike < 40 && feelsLike > 20) {
                points += -30;
                console.log(points)
            }

            if (feelsLike < 10 && feelsLike > 20) {
                points += -40;
                console.log(points)
            }

            if (feelsLike < 10) {
                points += -50;
                console.log(points)
            }

            if (feelsLike < 50 && condition === "Mist" || condition === "Patchy rain possible" || condition === "Freezing fog" || condition === "Patchy light drizzle" || condition === "Light drizzle" || condition === "Patchy light rain" || condition === "Light rain" || condition === "Moderate rain at times" || condition === "Light rain shower") {
                points += -30;
                console.log(points)
            }


            if (feelsLike < 50 && condition === "Patchy sleet possible" || condition === "Patchy freezing drizzle possible" || condition === "Thundery outbreaks possible" || condition === "Blowing snow" || condition === "Blizzard" || condition === "Freezing drizzle" || condition === "Heavy freezing drizzle" || condition === "Moderate rain" || condition === "Heavy rain at times" || condition === "Heavy rain" || condition === "Light freezing rain" || condition === "Moderate or heavy freezing rain" || condition === "Light sleet" || condition === "Moderate or heavy sleet" || condition === "Patchy light snow" || condition === "Light snow" || condition === "Patchy moderate snow" || condition === "Moderate snow" || condition === "Patchy heavy snow" || condition === "Heavy snow" || condition === "Ice pellets" || condition === "Light rain shower" || condition === "Moderate or heavy rain shower" || condition === "Torrential rain shower" || condition === "Light sleet showers" || condition === "Moderate or heavy sleet showers" || condition === "Light snow showers" || condition === "Moderate or heavy snow showers" || condition === "Light showers of ice pellets" || condition === "Light showers of ice pellets" || condition === "Moderate or heavy showers of ice pellets" || condition === "Patchy light rain with thunder" || condition === "Moderate or heavy rain with thunder" || condition === "Patchy light snow with thunder" || condition === "Moderate or heavy snow with thunder") {
                points += -50;
                console.log(points)
            }

            for (i = 0; i < shortNose.length; i++) {

                if (shortNose.indexOf(specificBreed[i]) > -1 && feelsLike > 80) {
                    points += -10;
                    console.log(points)
                }
            }

            for (i = 0; i < thickFur.length; i++) {

                if (thickFur.indexOf(specificBreed[i]) > -1 && feelsLike > 80) {
                    points += -10;
                    console.log(points)
                }
            }

            if (furColor === "Black" && feelsLike > 80 || furColor === "Multi - Mostly Dark Colored" && feelsLike > 75) {
                points += -10;
                console.log(points)
            }

            if (health === "Poor" && feelsLike > 80 || health === "Very Poor" && feelsLike > 75 || health === "Poor" && feelsLike < 35 || health === "Very Poor" && feelsLike < 40) {
                points += -20;
                console.log(points)
            }

            if (weightQuestion === "Yes") {
                points += -15;
                console.log(points)
            }

            //Puppy
            if (age === "Under 1") {
                points += -10;
                console.log(points)
            }

            //Toy & Small Dog
            if (weight < 15 && age > 10) {
                points += -10;
                console.log(points)
            }

            //Medium Dog
            if (weight < 50 && weight > 15 && age > 8) {
                points += -10;
                console.log(points)
            }

            //Large Dog
            if (weight < 80 && weight > 50 && age > 7) {
                points += -10;
                console.log(points)
            }

            //Giant Dog
            if (weight > 80 && age > 5) {
                points += -10;
                console.log(points)
                //Source: The Living Well Guide for Senior Dogs, Diane Morgan, Wayne Hunthausen DVM
            }
        })
}


