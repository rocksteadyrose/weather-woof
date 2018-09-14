// function getWeather() {
//     var key = 'ed02eee49956436e94415434180309';
//     var zip = $("#zipCode").val();
//     console.log(zip)

//     return $.ajax({
//         method: 'GET',
//         url: `http://api.apixu.com/v1/current.json?key=${key}&q=${zip}`,
//         dataType: 'json',
//     })
//         .then(function (response) {
//             console.log(response)
//             console.log(response.current.condition.text)
//             console.log(response.current.temp_f)
//             console.log(response.current.feelslike_f)
//             }
//         )
// }