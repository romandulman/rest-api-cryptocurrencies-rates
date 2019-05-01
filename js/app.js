let flag = 0, i = 0;

$(document).ready(function () {
    localStorage.clear();

    $("#liveRepBtn").click(function () {
        $('#out').html('');
        $('#out').append(


        )

    });
    $("#aboutBtn").click(function () {
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
            if (url == "https://api.coingecko.com/api/v3/coins/list") {
                response.forEach(function (element) {

                    $('#out').append(
                        `        <div class="card col-md-3 cardCss">
            <div class="row no-gutters">

                <div class="col">
                    <div class="card-block px-2">
                        <h4 class="card-title" id="symOut">${element.symbol}</h4><label class="switch"><input type="checkbox" id="${element.symbol}" onchange="checkCoinCount(this.id)" />    <div></div></label>
                        <p class="card-text" ><span id="nameOut">${element.name}</span></p>
                          <div class="collapse" id="N${element.id}"></div>
                                                  <button class="btn btn-info moreBtn" id="${element.id}" onclick="collapseFunc(this.id)" >More Info</button>

             </div> `
                    )

                  ;

                });
            }else{
                $('#out').append(
                    `        <div class="card col-md-3 cardCss">
            <div class="row no-gutters">

                <div class="col">
                    <div class="card-block px-2">
                        <h4 class="card-title" id="symOut">${response.symbol}</h4><label class="switch"><input type="checkbox" id="${response.symbol}" onchange="checkCoinCount(this.id)" />    <div></div></label>
                        <p class="card-text" ><span id="nameOut">${response.name}</span></p>
                          <div class="collapse" id="${response.id}"></div>
                                                  <button class="btn btn-info moreBtn" id="${response.id}" onclick="collapseFunc(this.id)" >More Info</button>

             </div> `
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
var  conisToView = [];

let checkCoinCount = (id) => {

let idUpperCase =  id.toString().toUpperCase();

    if ($("#" + id).is(':checked')) {

        countCoins += 1;

        conisToView.push(idUpperCase)
        console.log(conisToView)

        if (countCoins > 5) {
            $("#" + id ).prop( "checked" , false )
          //  alert("too manny")
            countCoins -= 1;
            $('#coinModal').modal('show');

        }

       // alert(countCoins)
    }
    else if ($("#" + id).is(':checked') == false) {
        countCoins -= 1
        alert(countCoins)

    }
    for (let i = 0; i < conisToView.length; i++) {
        text += cars[i] + "<br>";
        conisToView[i]
    }

  //  let conisUrl =   "https://min-api-cryptocompare.com/data/pricemulti?fsyms="+conisToView[0]+","+conisToView[1]+","+conisToView[2]+","+conisToView[3]+","+conisToView[4]+"&tsyms=USD"




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
                printMoreInfo (coinId,response.image.small,response.market_data.current_price.usd,response.market_data.current_price.eur,response.market_data.current_price.ils)

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
        printMoreInfo (coinId,retrievedObject.img,retrievedObject.usd,retrievedObject.eur,retrievedObject.ils)


        }
}

printMoreInfo =(coinId,img,usd,eur,ils)=>{
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

