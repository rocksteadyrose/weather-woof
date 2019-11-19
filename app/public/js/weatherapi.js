jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

function getWeather (zip) {
    var key = 'c8412f951245f8b6ea0aded5362e6c66';
    // var zip = $("#zipCode").val();
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        async: false,
        method: 'GET',
        url: `http://api.weatherstack.com/current?access_key=${key}&query=${zip}&units=f`,
        dataType: 'json',
        success: function (data) {
            result = {
                "condition": data.current.weather_descriptions,
                "temp": data.current.temperature,
                "feelsLike": data.current.feelslike
            }
            console.log(data)
        }
    });
    return result;
    }
    