let flag = 0, i = 0;

$(document).ready(function () {
    localStorage.clear();

    $("#homeBtn").click(function () {
        $('#outReports').hide();
        $('#About').hide();

        // $('#out').html('');
     //   printCoins("https://api.coingecko.com/api/v3/coins/list");
        $('#out').show();

    });

    $("#liveRepBtn").click(function () {
       // $('#out').html('');
        $('#About').hide();
        $('#out').hide();
        $('#outReports').show();


    });
    $("#aboutBtn").click(function () {
        $('#out').hide();
        $('#outReports').hide();
        $('#About').show();

        //    $('#out').html('');


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
let checkCoinCount = (id) => {

    let idUpperCase = id.toString().toUpperCase();

    if ($("#" + id).is(':checked')) {

        countCoins += 1;

        conisToView.push(idUpperCase);
        console.log(conisToView);

        if (countCoins > 5) {
            $("#" + id).prop("checked", false);
            //  alert("too manny")
            countCoins -= 1;

            $('#coinModal').modal('show');
            $('#modalCoinList').html('');

            for(let i=0; i<5 ; i ++){


            $('#modalCoinList').append(
`

<div>${conisToView[i]}</div> <label class="switch"><input type="checkbox" id="${conisToView[i]}"  /><div></div></label>


`
            )


        }}

        // alert(countCoins)
    }
    else if ($("#" + id).is(':checked') == false) {
        countCoins -= 1
        alert(conisToView[countCoins] +" removed")

        conisToView.splice(countCoins, 1);

        console.log(conisToView)

    }

    // for (let i = 0; i < conisToView.length; i++) {
    //     text += cars[i] + "<br>";
    //     conisToView[i]
    // }


    // alert(conisToView[0])

    updateChart();

};

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


let updateChart = () => {
    let conisUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + conisToView[0] + "," + conisToView[1] + "," + conisToView[2] + "," + conisToView[3] + "," + conisToView[4] + "&tsyms=USD"

    $.ajax({
        url: conisUrl,
        type: "GET",

        success: function (response) {
            console.log(response[conisToView[0]]);
            console.log(response[conisToView[1]]);
            console.log(response[conisToView[2]]);
            console.log(response[conisToView[3]]);
            console.log(response[conisToView[4]]);


            var dataPoints1 = [];
            var dataPoints2 = [];
            var dataPoints3 = [];
            var dataPoints4 = [];
            var dataPoints5 = [];
            var mainText, coin1, coin2, coin3, coin4, coin5
            var updateInterval = 2000;
// initial value
            var yValue1 = 0;
            var yValue2 = 0;
            var yValue3 = 0;
            var yValue4 = 0;
            var yValue5 = 0;

            var options = {
                title: {
                    text: mainText
                },
                axisX: {
                    title: "chart updates every 2 secs"
                },
                axisY: {
                    suffix: " $",
                    includeZero: false
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    verticalAlign: "top",
                    fontSize: 18,
                    fontColor: "dimGrey",
                    itemclick: toggleDataSeries
                },
                data: [{
                    type: "line",
                    xValueType: "dateTime",
                    yValueFormatString: "###.00Wh",
                    xValueFormatString: "hh:mm:ss TT",
                    showInLegend:  (typeof response[conisToView[0]] === 'undefined') ? false : true,
                    name: coin1,
                    dataPoints: dataPoints1
                },
                    {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.00Wh",
                        showInLegend: (typeof response[conisToView[1]] === 'undefined') ? false : true,
                        name: coin2,
                        dataPoints: dataPoints2
                    }, {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.00Wh",
                        showInLegend: (typeof response[conisToView[2]] === 'undefined') ? false : true,
                        name: coin3,
                        dataPoints: dataPoints3
                    }, {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.00Wh",
                        showInLegend: (typeof response[conisToView[3]] === 'undefined') ? false : true,
                        name: coin4,
                        dataPoints: dataPoints4
                    }, {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.00Wh",
                        showInLegend: (typeof response[conisToView[4]] === 'undefined') ? false : true,
                        name: coin5,
                        dataPoints: dataPoints5
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


            var time = new Date;
// starting at 10.00 am
            time.setHours(10);
            time.setMinutes(00);
            time.setSeconds(00);
            time.setMilliseconds(00);

            function updateChart(count) {
                count = count || 1;
                var deltaY1, deltaY2, deltaY3, deltaY4, deltaY5;
                for (var i = 0; i < count; i++) {
                    time.setTime(time.getTime() + updateInterval);
                    // deltaY1 = -1 + Math.random() * (1 + 1);
                    // deltaY2 = -1 + Math.random() * (1 + 1);
                    // deltaY3 = -1 + Math.random() * (1 + 1);
                    // deltaY4 = -1 + Math.random() * (1 + 1);
                    // deltaY5 = -1 + Math.random() * (1 + 1);
                    //
                    // // adding random value and rounding it to two digits.
                    // yValue1 = Math.round((yValue1 + deltaY1) * 100) / 100;
                    // yValue2 = Math.round((yValue2 + deltaY2) * 100) / 100;
                    // yValue3 = Math.round((yValue3 + deltaY3) * 100) / 100;
                    // yValue4 = Math.round((yValue3 + deltaY3) * 100) / 100;
                    // yValue5 = Math.round((yValue3 + deltaY3) * 100) / 100;

                    // pushing the new values
                    dataPoints1.push({
                        x: time.getTime(),
                        y: response[conisToView[0]].USD == 'undefined' ? 0 : response[conisToView[0]].USD
                    });
                    dataPoints2.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[1]] === 'undefined') ? 0 : response[conisToView[1]].USD
                    });
                    dataPoints3.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[2]] === 'undefined') ? 0 : response[conisToView[2]].USD
                    });
                    dataPoints4.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[3]] === 'undefined') ? 0 : response[conisToView[3]].USD
                    });
                    dataPoints5.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[4]] === 'undefined') ? 0 : response[conisToView[4]].USD
                    });
                }

                // updating legend text with  updated with y Value
                // options.data[0].legendText = coin1 + "," + yValue1 + "$";
                // options.data[1].legendText = coin2 + "," + yValue2 + "$";
                // options.data[2].legendText = coin3 + "," + yValue3 + "$";
                // options.data[3].legendText = coin4 + "," + yValue3 + "$";
                // options.data[4].legendText = coin5 + "," + yValue3 + "$";
             //   console.log(response[conisToView[0]].USD)
                options.data[0].legendText = (typeof response[conisToView[0]] === 'undefined') ? "0" : conisToView[0]+" is" +" "+response[conisToView[0]].USD +" USD";
                options.data[1].legendText = (typeof response[conisToView[1]] === 'undefined') ? "0" : conisToView[1]+" is" +" "+response[conisToView[1]].USD +" USD";
                options.data[2].legendText = (typeof response[conisToView[2]] === 'undefined') ? "0" : conisToView[2]+" is" +" "+response[conisToView[2]].USD +" USD";
                options.data[3].legendText = (typeof response[conisToView[3]] === 'undefined') ? "0" : conisToView[3]+" is" +" "+response[conisToView[3]].USD +" USD";
                options.data[4].legendText = (typeof response[conisToView[4]] === 'undefined') ? "0" : conisToView[4]+" is" +" "+response[conisToView[4]].USD +" USD";

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

