$(document).ready(function () {
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

var i=0;
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
                <div class="col-auto">
                    <img src="${element.flag}" class="img-fluid" alt="">
                </div>
                <div class="col">
                    <div class="card-block px-2">
                        <h4 class="card-title" id="symOut">${element.symbol}</h4><label class="switch"><input type="checkbox" />    <div></div></label>
                        <p class="card-text" ><span id="nameOut">${element.name}</span></p>
                        <button class="btn btn-info moreBtn" data-toggle="collapse"   href="${i}" >More Info</button>
                          <a class="btn btn-primary" data-toggle="collapse" href="#${i}" role="button" aria-expanded="false" aria-controls="${i}">Toggle first element</a>

                      </div>
                 </div>
                 <div class="collapse multi-collapse " id="${i}">
                     <div class="card card-body">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                     </div>
                 </div>
             </div>

`
                    )
                    i++;
                    console.log(i)

                });
            },

        });
    }

    printCountry( "https://api.coingecko.com/api/v3/coins/list");

});