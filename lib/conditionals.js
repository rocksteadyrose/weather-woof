var points = 10;
var shortNose = ["Boxer", "Pug", "English Bulldog", "American Bulldog", "French Bulldog", "Boston Terrier", "Shih Tzu", "Chihuahua", "Chow Chow", "Pekingese", "Lhasa Apso", "Bullmastiff", "English Toy Spaniel", "Cavalier King Charles Spaniel"]

function getSpecificBreedCalculation() {
    var specificBreed = $('#breedDropdown').val();

    for (i = 0; i < shortNose.length; i++) {

        if (shortNose.indexOf(specificBreed[i]) > -1) {
            points = 5;
        }
    }
}


