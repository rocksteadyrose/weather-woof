function getWeather (zip) {
    var key = 'ed02eee49956436e94415434180309';
    // var zip = $("#zipCode").val();
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        async: false,
        method: 'GET',
        url: `http://api.apixu.com/v1/current.json?key=${key}&q=${zip}`,
        dataType: 'json',
        success: function (data) {
            result = {
                "condition": data.current.condition.text,
                "temp": data.current.temp_f,
                "feelsLike": data.current.feelslike_f
            }
        }
    });
    return result;
    }
    