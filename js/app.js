let flag = 0, i = 0;

$(document).ready(function () {
    localStorage.clear();

    //  $("#allBtn").click(function () {
    //    $("#out").html('');
    //    url = "https://api.coingecko.com/api/v3/coins/list";
    //    printCountry(url)
    // });

    //   $("#cInput").keypress(function () {
    //     $("#out").html('');
    //     url = "https://restcountries.eu/rest/v2/name/" + $("#cInput").val();
    //     printCountry(url)
    //  });

    $("#searchBtn").click(function () {
        $("#out").html('');
        url = "https://api.coingecko.com/api/v3/coins/" + $("#cInput").val();
        printCountry(url)
    });
    printCountry("https://api.coingecko.com/api/v3/coins/list");
});

let printCountry = (url) => {
    $.ajax({
        url: url,
        type: "GET",
        beforeSend: function () {
            $("#spinnerSend").show();
        },
        success: function (response) {
            $("#spinnerSend").hide();

            response.forEach(function (element) {

                $('#out').append(
                    `        <div class="card col-md-3 cardCss">
            <div class="row no-gutters">

                <div class="col">
                    <div class="card-block px-2">
                        <h4 class="card-title" id="symOut">${element.symbol}</h4><label class="switch"><input type="checkbox" />    <div></div></label>
                        <p class="card-text" ><span id="nameOut">${element.name}</span></p>
                        <button class="btn btn-info moreBtn" id="${element.id}" onclick="collapseFunc(this.id)" >More Info</button>
                          <div class="collapse" id="b${element.id}"></div>
             </div> `
                )

                i++;
                
            });
        },

    });
}

let collapseFunc = (coinId) => {

    //  if($("#b"+coinId).is(":visible")) $("#b"+coinId).toggle();
    // if($("#b"+coinId).is(":hidden")) $("#b"+coinId).show();

    $("#b" + coinId).toggle();

    let url = 'https://api.coingecko.com/api/v3/coins/' + coinId;
    var retrievedObject1 = JSON.parse(localStorage.getItem(coinId));

    // if (retrievedObject1 == null ){
    //      flag = 0
    //  }
    if (retrievedObject1 == null) flag = 0;

    if (flag == 0) {
        $.ajax({
            url: url,
            type: "GET",
            beforeSend: function () {
                $("#spinnerSend").show();
            },
            success: function (response) {
                $("#spinnerSend").hide();
                $("#b" + coinId).html("");
                // alert(response.market_data.current_price.usd)
                $("#b" + coinId).append(
                    `
                 <p><b>Conversion Rates </b></p>
                 <p>${response.market_data.current_price.usd} <b>$ USD</b></p>
                 <p>${response.market_data.current_price.eur} <b>€ EUR</b></p> 
                 <p>${response.market_data.current_price.ils} <b>₪ ILS</b></p>`
                )

                var testObject = {
                    'usd': response.market_data.current_price.usd,
                    'eur': response.market_data.current_price.eur,
                    'ils': response.market_data.current_price.ils
                };
                localStorage.setItem(coinId, JSON.stringify(testObject));

                flag = 1;
                setTimeout(() => flag = 0, 120000);
            },

        });

    } else {
        var retrievedObject = JSON.parse(localStorage.getItem(coinId));
        $("#b" + coinId).html("");
        $("#b" + coinId).append(
            `<p>${retrievedObject.usd} <b>USD</b></p>
                 <p>${retrievedObject.eur} <b>EUR</b></p> 
                 <p>${retrievedObject.ils} <b>ILS</b></p>`
        )
    }
}

