fetch("https://cors.bridged.cc/https://covid19asi.saglik.gov.tr", {
  method: "GET",
  credentials: "same-origin",
})
  .then(function (response) {
    return response.text();
  })
  .then(function (html) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    const veri = doc.getElementsByTagName("g");
    const yuzdeVeri= doc.getElementsByTagName("script");

    var yuzdeGenel = JSON.stringify(yuzdeVeri[18].innerHTML);
    var vakaDurum = JSON.stringify(yuzdeVeri[26].innerHTML);

    vakaDurum = vakaDurum.split('"');
    yuzdeGenel = yuzdeGenel.split('=').join(';').split(';').join("''").split("'");

    vakaDurum[4] = vakaDurum[4].slice(0, -1);
    vakaDurum[8] = vakaDurum[8].slice(0, -1);
    vakaDurum[12] = vakaDurum[12].slice(0, -1);
    vakaDurum[20] = vakaDurum[20].slice(0, -1);
 
    document.querySelector("#tarih").textContent = vakaDurum[4];   
    document.querySelector("#test").textContent = vakaDurum[8];
    document.querySelector("#poz").textContent = vakaDurum[12];
    document.querySelector("#dea").textContent = vakaDurum[20];

    var dataset = [...veri].map((m) => m.dataset);
    JsonData = JSON.parse(JSON.stringify(dataset));
    JsonData = { ...JsonData };
    var tr;
    GenelToplam = 0;
    fdoz = 0;
    sdoz = 0;
    tdoz = 0;
    for (var i = 1; i < 82; i++) {
      GenelToplam =
        Number(JsonData[i].toplam.split(".").join("")) + GenelToplam;
      fdoz = Number(JsonData[i].birinciDoz.split(".").join("")) + fdoz;
      sdoz = Number(JsonData[i].ikinciDoz.split(".").join("")) + sdoz;
      tdoz =
        Number(JsonData[i].toplam.split(".").join("")) -
        Number(JsonData[i].birinciDoz.split(".").join("")) -
        Number(JsonData[i].ikinciDoz.split(".").join("")) +
        tdoz;
       
      tr = $("<tr/>");
      tr.append("<td>" + i + "</td>");
      tr.append("<td>" + JsonData[i].adi + "</td>");
      tr.append('<td id='+i+' >' + JsonData[i].toplam + "</td>");
      tr.append('<td id='+(i+82)+' >' + JsonData[i].birinciDoz + "</td>");
      tr.append('<td id='+(i+163)+' >' + JsonData[i].ikinciDoz + "</td>");
      tr.append(
        '<td id='+(i+244)+'>' +
          (
            Number(JsonData[i].toplam.split(".").join("")) -
            Number(JsonData[i].birinciDoz.split(".").join("")) -
            Number(JsonData[i].ikinciDoz.split(".").join(""))
          )
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
          "</td>"
      );

      $("#myTable").append(tr);
      
      document.getElementById(''+i+'').setAttribute('data-sort','' + JsonData[i].toplam.split(".").join("")+ '');
      document.getElementById(''+(i+82)+'').setAttribute('data-sort','' + JsonData[i].birinciDoz.split(".").join("")+ '');
      document.getElementById(''+(i+163)+'').setAttribute('data-sort','' + JsonData[i].ikinciDoz.split(".").join("")+ '');
      document.getElementById(''+(i+244)+'').setAttribute('data-sort','' + (
        Number(JsonData[i].toplam.split(".").join("")) -
        Number(JsonData[i].birinciDoz.split(".").join("")) -
        Number(JsonData[i].ikinciDoz.split(".").join(""))
      )+ '');
      }
      
    document.getElementById("toplam").innerText =
      GenelToplam.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    document.getElementById("fdoz").innerText = fdoz
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    document.getElementById("sdoz").innerText = sdoz
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    document.getElementById("tdoz").innerText = tdoz
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    var yuzde = ((sdoz / 83614362) * 100).toFixed(1);
    document.getElementById("genelOran").innerHTML = yuzde + "%";
    document.getElementById("progress-value1").style.width = yuzde + "%";

    document.getElementById("genelOran2").innerHTML = parseInt(yuzdeGenel[39]) + "%";
    document.getElementById("progress-value2").style.width = parseInt(yuzdeGenel[39]) + "%";
    var count = 1;
    
    for (var i = 83; i < 164; i++) {
      tr = $("<tr/>");
      tr.append("<td>" + count++ + "</td>");
      tr.append("<td>" + JsonData[i].adi + "</td>");
      if(JsonData[i].yuzde < "% 55"){
        tr.append("<td style='color:#f22536'>" + JsonData[i].yuzde + "</td>");
      }
      else if (JsonData[i].yuzde > "% 75") {
        tr.append("<td style='color:#4dc3fa'>" + JsonData[i].yuzde + "</td>");
      } else {
        tr.append("<td style='color:#ea8421'>" + JsonData[i].yuzde + "</td>");
      }
      $("#myTable2").append(tr);
    }
  })
  .catch(function (err) {
    console.warn("Something went wrong.", err);
  });

