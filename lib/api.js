function getBreedList() {
    var key = '637f60e69a6ba107f51bb2b99a9a3727';
    //secret: 885a2dec8c9ecbec45ff0d5250f88ef8

    return $.ajax({
        method: 'GET',
        url: `https://api.petfinder.com/breed.list?format=json&key=${key}&output=full&animal=dog&callback=?`,
        dataType: 'json',
    })
        .then(function (response) {
            var breeds = response.petfinder.breeds.breed
            for (i = 0; i < breeds.length; i++) {
                var breedList = breeds[i]['$t'];
                console.log(breedList)
                var newOpt = $("<option></option>").attr("value",breedList).text(breedList);
            $("#breedDropdown").append(newOpt);
            $('#breedDropdown').formSelect();
            }

        })
}