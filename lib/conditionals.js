var points = 50;
var shortNose = ["Boxer", "Pug", "English Bulldog", "American Bulldog", "French Bulldog", "Boston Terrier", "Shih Tzu", "Chihuahua", "Chow Chow", "Pekingese", "Lhasa Apso", "Bullmastiff", "English Toy Spaniel", "Cavalier King Charles Spaniel"];
var thickFur = ["Husky", "Bernese Mountain Dog", "Alaskan Malamute", "Samoyed"];

function getSpecificBreedCalculation() {
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

    for (i = 0; i < shortNose.length; i++) {

        if (shortNose.indexOf(specificBreed[i]) > -1) {
            points += -1;
            console.log(points)
        }
    }

    for (i = 0; i < thickFur.length; i++) {

        if (thickFur.indexOf(specificBreed[i]) > -1) {
            points += -1;
            console.log(points)
        }
    }

    if (furColor === "Black" || furColor === "Multi - Mostly Dark Colored") {
        points += -1;
        console.log(points)
    }

    if (health === "Poor" || health === "Very Poor") {
        points += -5;
        console.log(points)
    }

    if (weightQuestion === "Yes") {
        points += -5;
        console.log(points)
    }

    //Puppy
    if (age === "Under 1") {
        points += -1;
        console.log(points)
    }

    //Toy & Small Dog
    if (weight < 15 && age > 10) {
        points += -1;
        console.log(points)
    }

    //Medium Dog
    if (weight < 50 && weight > 15 && age > 8) {
        points += -1;
        console.log(points)
    }

    //Large Dog
    if (weight < 80 && weight > 50 && age > 7) {
        points += -1;
        console.log(points)
    }

    //Giant Dog
    if (weight > 80 && age > 5) {
        points += -1;
        console.log(points)
        //Source: The Living Well Guide for Senior Dogs, Diane Morgan, Wayne Hunthausen DVM
    }

}


