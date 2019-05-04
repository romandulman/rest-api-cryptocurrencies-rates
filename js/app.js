let flag = 0, i = 0;

$(document).ready(function () {
    localStorage.clear();

    $("#homeBtn").click(function () {
        $('#outReports').hide();
        $('#out').html('');
        printCoins("https://api.coingecko.com/api/v3/coins/list");
    });

    $("#liveRepBtn").click(function () {
        $('#out').html('');
        $('#outReports').show();


    });
    $("#aboutBtn").click(function () {
        $('#outReports').hide();
        $('#out').html('');
        $('#out').append(
            `<div class="col-md-4"></div>

<div class="col-md-4"><h1>About</h1>
<p></p>


</div>
<div class="col-md-4"></div>

`
        )

    });

    //   /   $("#cInput").keypress(function () {
    //    $("#out").html('');
    //    url = "https://restcountries.eu/rest/v2/name/" + $("#cInput").val();
    //     printCountry(url)
    //});

    $("#srchBtn").click(function () {
        $("#out").html('');
        url = "https://api.coingecko.com/api/v3/coins/" + $("#srchFld").val();
        printCoins(url)
    });
    printCoins("https://api.coingecko.com/api/v3/coins/list");
});

let printCoins = (url) => {
    $.ajax({
        url: url,
        type: "GET",
        beforeSend: function () {
            $("#spinnerSend").show();
        },
        success: function (response) {
            $("#spinnerSend").hide();
            if (url == "https://api.coingecko.com/api/v3/coins/list") {
                response.forEach(function (element) {

                    $('#out').append(
                        `  
                    <div class=" col-lg-3 col-md-6 ">

        <div class="card shadow p-3 mb-5 cardCss">
            <div class="row no-gutters">

                <div class="col">
                    <div class="card-block px-2">
                        <h4 class="card-title" id="symOut">${element.symbol}</h4><label class="switch"><input type="checkbox" id="${element.symbol}" onchange="checkCoinCount(this.id)" />    <div></div></label>
                        <p class="card-text" ><span id="nameOut">${element.name}</span></p>
                          <div class="collapse" id="N${element.id}"></div>
                                                  <button class="btn btn-info moreBtn" id="${element.id}" onclick="collapseFunc(this.id)" >More Info</button>

             </div></div>
              `
                    )

                    ;

                });
            } else {
                $('#out').append(
                    `         <div class=" col-lg-3 col-md-6 SingleColCss ">

        <div class="card shadow p-3 mb-5 ">
            <div class="row no-gutters">

                <div class="col">
                    <div class="card-block px-2">
                        <h4 class="card-title" id="symOut">${response.symbol}</h4><label class="switch"><input type="checkbox" id="${response.symbol}" onchange="checkCoinCount(this.id)" />    <div></div></label>
                        <p class="card-text" ><span id="nameOut">${response.name}</span></p>
                          <div class="collapse" id="N${response.id}"></div>
                                                  <button class="btn btn-info moreBtn" id="${response.id}" onclick="collapseFunc(this.id)" >More Info</button>

             </div> </div>`
                )
            }


        },


        statusCode: {
            404: function () {
                $("#spinnerSend").hide();
                $('#out').append(
                    `<p class="errMsg">Sorry! No such coin, Try again.... </p>`
                )
            }
        }


    });
}

let countCoins = 0;
var conisToView = [];

let checkCoinCount = (id) => {

    let idUpperCase = id.toString().toUpperCase();

    if ($("#" + id).is(':checked')) {

        countCoins += 1;

        conisToView.push(idUpperCase)
        console.log(conisToView)

        if (countCoins > 5) {
            $("#" + id).prop("checked", false)
            //  alert("too manny")
            countCoins -= 1;
            $('#coinModal').modal('show');
            ('#modalCoinList').html('');
            $('#modalCoinList').append(

            )


        }

        // alert(countCoins)
    }
    else if ($("#" + id).is(':checked') == false) {
        countCoins -= 1
        alert(countCoins)

    }

    // for (let i = 0; i < conisToView.length; i++) {
    //     text += cars[i] + "<br>";
    //     conisToView[i]
    // }


    // alert(conisToView[0])

    updateChart();

};

let updateChart = () => {
    let conisUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + conisToView[0] + "," + conisToView[1] + "," + conisToView[2] + "," + conisToView[3] + "," + conisToView[4] + "&tsyms=USD"

//alert(conisToView[0])

    $.ajax({
        url: conisUrl,
        type: "GET",

        success: function (response) {


            var dataPoints1 = [];
            var dataPoints2 = [];
            var dataPoints3 = [];

            var options = {
                title: {
                    text: "Electricity Generation in Turbine"
                },
                axisX: {
                    title: "chart updates every 2 secs"
                },
                axisY: {
                    suffix: "Wh",
                    includeZero: false
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    verticalAlign: "top",
                    fontSize: 22,
                    fontColor: "dimGrey",
                    itemclick: toggleDataSeries
                },
                data: [{
                    type: "line",
                    xValueType: "dateTime",
                    yValueFormatString: "###.00Wh",
                    xValueFormatString: "hh:mm:ss TT",
                    showInLegend: true,
                    name: "Turbine 1",
                    dataPoints: dataPoints1
                },
                    {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.00Wh",
                        showInLegend: true,
                        name: "Turbine 2",
                        dataPoints: dataPoints2
                    }, {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.00Wh",
                        showInLegend: true,
                        name: "Turbine 2",
                        dataPoints: dataPoints3
                    }]
            };

            var chart = $("#chartContainer").CanvasJSChart(options);

            function toggleDataSeries(e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                }
                else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }

            var updateInterval = 2000;
// initial value
            var yValue1 = 800;
            var yValue2 = 810;
            var yValue3 = 780;

            var time = new Date;
// starting at 10.00 am
            time.setHours(10);
            time.setMinutes(00);
            time.setSeconds(00);
            time.setMilliseconds(00);

            function updateChart(count) {
                count = count || 1;
                var deltaY1, deltaY2, deltaY3;
                for (var i = 0; i < count; i++) {
                    time.setTime(time.getTime() + updateInterval);
                    deltaY1 = -1 + Math.random() * (1 + 1);
                    deltaY2 = -1 + Math.random() * (1 + 1);
                    deltaY3 = -1 + Math.random() * (1 + 1);

                    // adding random value and rounding it to two digits.
                    yValue1 = Math.round((yValue1 + deltaY1) * 100) / 100;
                    yValue2 = Math.round((yValue2 + deltaY2) * 100) / 100;
                    yValue3 = Math.round((yValue3 + deltaY3) * 100) / 100;

                    // pushing the new values
                    dataPoints1.push({
                        x: time.getTime(),
                        y: yValue1
                    });
                    dataPoints2.push({
                        x: time.getTime(),
                        y: yValue2
                    });
                    dataPoints3.push({
                        x: time.getTime(),
                        y: yValue3
                    });
                }

                // updating legend text with  updated with y Value
                options.data[0].legendText = "Turbine 1 : " + yValue1 + "Wh";
                options.data[1].legendText = "Turbine 2 : " + yValue2 + "Wh";
                options.data[2].legendText = "Turbine 3 : " + yValue3 + "Wh";
                $("#chartContainer").CanvasJSChart().render();
            }

// generates first set of dataPoints
            updateChart(100);
            setInterval(function () {
                updateChart()
            }, updateInterval);


            //    $('#outReports').append(
            //           `
            //      `
            //      )


            //   alert(response[conisToView[0]].USD)
            //   alert(response[conisToView[1]].USD)


        },


        statusCode: {
            404: function () {
                $("#spinnerSend").hide();
                $('#out').append(
                    `<p class="errMsg">Sorry! No such coin, Try again.... </p>`
                )
            }
        }


    });


};


let collapseFunc = (coinId) => {

    //  if($("#b"+coinId).is(":visible")) $("#b"+coinId).toggle();
    // if($("#b"+coinId).is(":hidden")) $("#b"+coinId).show();

    $("#N" + coinId).toggle();

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
                //   $("#" + coinId).html("");
                // alert(response.market_data.current_price.usd)
                //   $("#" + coinId).append(
                //       `
                //     <br>
                //    <img src="${response.image.small}"/>
                //    <p><b>Conversion Rates </b></p>
                //    <p>${response.market_data.current_price.usd} <b>$ USD</b></p>
                //    <p>${response.market_data.current_price.eur} <b>€ EUR</b></p>
                //   <p>${response.market_data.current_price.ils} <b>₪ ILS</b></p>`
                //   )
                printMoreInfo(coinId, response.image.small, response.market_data.current_price.usd, response.market_data.current_price.eur, response.market_data.current_price.ils)

                var testObject = {
                    'usd': response.market_data.current_price.usd,
                    'eur': response.market_data.current_price.eur,
                    'ils': response.market_data.current_price.ils,
                    'img': response.image.small
                };
                localStorage.setItem(coinId, JSON.stringify(testObject));

                flag = 1;
                setTimeout(() => flag = 0, 120000);
            },

        });

    } else {
        var retrievedObject = JSON.parse(localStorage.getItem(coinId));
        //   $("#" + coinId).html("");
        //   $("#" + coinId).append(
        //   `
        //        <img src="${retrievedObject.img}"/>
        //     <br>
        //    <p><b>Conversion Rates </b></p>
        //    <p>${retrievedObject.usd} <b>USD</b></p>
        //    <p>${retrievedObject.eur} <b>EUR</b></p>
        //   <p>${retrievedObject.ils} <b>ILS</b></p>`
        //    )
        printMoreInfo(coinId, retrievedObject.img, retrievedObject.usd, retrievedObject.eur, retrievedObject.ils)


    }
}

printMoreInfo = (coinId, img, usd, eur, ils) => {
    $("#N" + coinId).html("");
    $("#N" + coinId).append(
        `
                  <img src="${img}"/>
                  <br>
                 <p><b>Conversion Rates </b></p>
                  <p>${usd} <b>USD</b></p>
                 <p>${eur} <b>EUR</b></p> 
                 <p>${ils} <b>ILS</b></p>`
    )
}

