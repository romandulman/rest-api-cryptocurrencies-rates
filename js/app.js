let flag = 0, conisToView = [], idOut, coinToRemove, AllCoins = [];

$(document).ready(function () {
    localStorage.clear();
    getCoinData()
});

$("#homeBtn").click(function () {
  //  $('#outReports').hide();
   // $('#About').hide();
  //  $('#out').show();
    printCoins()
});

$("#liveRepBtn").click(function () {
    // $('#About').hide();
    // $('#out').hide();
    // $('#outReports').show();
    $('#out').html('');
    $('#out').append(liveReports);
});

$("#aboutBtn").click(function () {
    // $('#out').hide();
    // $('#outReports').hide();
    // $('#About').show();
    
});

$("#srchBtn").click(function () {
    $("#out").html('');
    searchCoin($("#srchFld").val())
});

$("#CancelModalBtn").click(function () {
    $("#" + idOut).attr('checked', false);
    conisToView.splice(-1, 1);
});

$("#RemoveCoinBtn").click(function () {
    removeCoin();
});

const aboutMe = ` <div id="About">
            <div class="card shadow p-3 mb-5 ">
                <div class="row no-gutters">
                    <div class="col">
                        <h1>About Me</h1>
                        <img src="https://avatars2.githubusercontent.com/u/47609139?s=460&v=4" alt="Roman-Dulman" height="170">
                        <p><h6><strong>Roman Dulman</strong></h6> </p>
                        <p><h6>ID: 306033143</h6></p>
                        <hr>
                        <p><em class="fas fa-coins"></em><strong>&nbsp; Cryptonite</strong></span></p>
                        <p>This project demonstrates implementation of  REST api, Canvas. JS for live graph report and Bootstrap for theming.</p>
                        <p>With "Coin-Gecko" REST Api we retrieve Cypto-Currencies list and the properties of each currency and with the "Crypto-Compare" REST Api us push Crypto-Currencies rates data in live and shows it on "Canvas.JS" Graph. </p>
                        
                    </div>
                </div>
            </div>
        </div>`

const liveReports = `<div id="chartContainer"></div>`

let checkCoinCount = (id) => {
    idOut = id;
    let idUpperCase = id.toString().toUpperCase();
    if ($("#" + id).is(':checked')) {
        conisToView.push(idUpperCase);
        if (conisToView.length > 5) {
            $('#coinModal').modal('show');
            $('#modalCoinList').html('');
            for (let i = 0; i < 5; i++) {
                $('#modalCoinList').append(
                    `<div class="row"><div class="col"> <span class="CoinTextMod">${conisToView[i]}</span> <label class="switch SwModal"><input type="checkbox" id="C${conisToView[i]}" onchange="SetRemCoin(this.id)"/><div></div></label> </div></div>`
                );
                $("#C" + conisToView[i]).prop("checked", true);
            }
        }
    }
    else if ($("#" + id).is(':checked') == false) {
        const index = conisToView.findIndex(conisToView => conisToView === idUpperCase);
        conisToView.splice(index, 1);
    }
    updateChart();
};

let SetRemCoin = (id) => {
    id = id.substring(1);
    coinToRemove = id;
}

const removeCoin = () => {
    const index = conisToView.findIndex(conisToView => conisToView === coinToRemove);
    conisToView.splice(index, 1);
    let idLowerCase = coinToRemove.toString().toLowerCase();
    $("#" + idLowerCase).prop("checked", false);
    $('#coinModal').modal('hide');
    updateChart();
};

const getCoinData = () => {
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/list',
        type: "GET",
        beforeSend: function () {
            $("#spinnerSend").show();
        },
        success: function (response) {
            $("#spinnerSend").hide();
            AllCoins = response;
            printCoins();
        }
    });
};

let searchCoin = (searchTerm) => {
    if (searchTerm.length == 0) {
        printCoins();
    } else {
        (searchTerm === searchTerm.toUpperCase()) ? searchTerm = searchTerm.toLowerCase() : searchTerm;
        const result = AllCoins.find(Coin => Coin.symbol === searchTerm);
        if (typeof result === 'undefined') {
            $('#out').append(
                `<p class="errMsg">Sorry! No such coin, Try again.... </p>`
            )
        } else {
            $('#out').append(
                `<div class="col-lg-3 col-md-6 SingleColCss">
        <div class="card shadow p-3 mb-5">
            <div class="row no-gutters">
                <div class="col">
                    <div class="card-block px-2">
                       <h4 class="card-title" id="symOut">${result.symbol}</h4><label class="switch"><input type="checkbox" id="${result.symbol}" onchange="checkCoinCount(this.id)" /> <div></div></label>
                       <p class="card-text" ><span id="nameOut">${result.name}</span></p>
                          <div class="collapse" id="N${result.id}"></div>
                                                 <button class="btn btn-info moreBtn" id="${result.id}" onclick="collapseFunc(this.id)" >More Info</button>
              </div>
        </div> `
            );
            if (conisToView.length > 0) {
                for (let k = 0; k < conisToView.length; k++) {

                    const result = AllCoins.find(Coin => Coin.symbol === conisToView[k].toLowerCase());
                    $("#" + result.symbol).prop("checked", true);

                    console.log(result)

                }
            }

        }
    }
};

const printCoins = () => {
    AllCoins.forEach(function (element) {
        $('#out').append(
            `  
                    <div class="col-lg-3 col-md-6">
                      <div class="card shadow p-3 mb-5 cardCss">
                         <div class="row no-gutters">
                        <div class="col">
                          <div class="card-block px-2">
                             <h4 class="card-title" id="symOut">${element.symbol}</h4><label class="switch"><input type="checkbox"  id="${element.symbol}" onchange="checkCoinCount(this.id)" /> 
                                <div>
                                  </div>
                                   </label>
                             <p class="card-text" ><span id="nameOut">${element.name}</span></p>
                             <div class="collapse" id="N${element.id}"></div>
                              <button class="btn btn-info moreBtn" id="${element.id}" onclick="collapseFunc(this.id)" >More Info</button>
                      </div>
                    </div> `
        )
        if (conisToView.length > 0) {
            for (let k = 0; k < conisToView.length; k++) {

                const result = AllCoins.find(Coin => Coin.symbol === conisToView[k].toLowerCase());
                $("#" + result.symbol).prop("checked", true);

                console.log(result)

            }
        }
    });
};


const updateChart = () => {
    let conisUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + conisToView[0] + "," + conisToView[1] + "," + conisToView[2] + "," + conisToView[3] + "," + conisToView[4] + "&tsyms=USD"
    $.ajax({
        url: conisUrl,
        type: "GET",
        success: function (response) {

            var dataPoints1 = [];
            var dataPoints2 = [];
            var dataPoints3 = [];
            var dataPoints4 = [];
            var dataPoints5 = [];
            var updateInterval = 2000;

            var options = {
                // title: {
                //   text: mainText
                //  },
                axisX: {
                    title: "chart updates every 2 secs"
                },
                axisY: {
                    suffix: " $",
                    includeZero: false
                },
                toolTip: {
                    shared: false
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
                    yValueFormatString: "###.#00$",
                    xValueFormatString: "hh:mm:ss TT",
                    showInLegend: (typeof response[conisToView[0]] === 'undefined') ? false : true,
                    dataPoints: dataPoints1
                },
                    {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.#00$",
                        showInLegend: (typeof response[conisToView[1]] === 'undefined') ? false : true,
                        dataPoints: dataPoints2
                    }, {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.#00$",
                        showInLegend: (typeof response[conisToView[2]] === 'undefined') ? false : true,
                        dataPoints: dataPoints3
                    }, {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.#00$",
                        showInLegend: (typeof response[conisToView[3]] === 'undefined') ? false : true,
                        dataPoints: dataPoints4
                    }, {
                        type: "line",
                        xValueType: "dateTime",
                        yValueFormatString: "###.#00$",
                        showInLegend: (typeof response[conisToView[4]] === 'undefined') ? false : true,
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
            time.setHours(10);
            time.setMinutes(00);
            time.setSeconds(00);
            time.setMilliseconds(00);

            function updateChart(count) {
                count = count || 1;
                for (let i = 0; i < count; i++) {
                    time.setTime(time.getTime() + updateInterval);

                    dataPoints1.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[0]] === 'undefined') ? 0 : response[conisToView[0]].USD
                })
                    ;
                    dataPoints2.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[1]] === 'undefined') ? 0 : response[conisToView[1]].USD
                })
                    ;
                    dataPoints3.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[2]] === 'undefined') ? 0 : response[conisToView[2]].USD
                })
                    ;
                    dataPoints4.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[3]] === 'undefined') ? 0 : response[conisToView[3]].USD
                })
                    ;
                    dataPoints5.push({
                        x: time.getTime(),
                        y: (typeof response[conisToView[4]] === 'undefined') ? 0 : response[conisToView[4]].USD
                })
                    ;
                }
                for (let x = 0; x < 5; x++) {
                    options.data[x].legendText = (typeof response[conisToView[x]] === 'undefined') ? "0" : conisToView[x] + " is" + " " + response[conisToView[x]].USD + " USD";

                }

                $("#chartContainer").CanvasJSChart().render();
            }

            updateChart(100);
            setInterval(function () {
                updateChart();
            }, updateInterval);
        },

    });
};


let collapseFunc = (coinId) => {
    $("#N" + coinId).toggle();
    let url = 'https://api.coingecko.com/api/v3/coins/' + coinId;
    var retrievedObject1 = JSON.parse(localStorage.getItem(coinId));

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
        let retrievedObject = JSON.parse(localStorage.getItem(coinId));
        printMoreInfo(coinId, retrievedObject.img, retrievedObject.usd, retrievedObject.eur, retrievedObject.ils)
    }
};

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
};

