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
      tr.append("<td>" + JsonData[i].toplam + "</td>");
      //tr.append("<td data-sort="+"{JsonData[i].toplam}"+">" + JsonData[i].toplam + "</td>");
      tr.append("<td>" + JsonData[i].birinciDoz + "</td>");
      tr.append("<td>" + JsonData[i].ikinciDoz + "</td>");
      tr.append(
        "<td>" +
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
    var count = 1;
    for (var i = 83; i < 164; i++) {
      tr = $("<tr/>");
      tr.append("<td>" + count++ + "</td>");
      tr.append("<td>" + JsonData[i].adi + "</td>");
      if (JsonData[i].yuzde > "% 75") {
        tr.append("<td style='color:#4dc3fa'>" + JsonData[i].yuzde + "</td>");
      } else {
        tr.append("<td>" + JsonData[i].yuzde + "</td>");
      }
      $("#myTable2").append(tr);
    }
  })
  .catch(function (err) {
    console.warn("Something went wrong.", err);
  });
fetch(
  "https://cors.bridged.cc/https://covid19.saglik.gov.tr/TR-66935/genel-koronavirus-tablosu.html#"
)
  .then((res) => res.text())
  .then((textResponse) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(textResponse, "text/html");
    const veri = doc.getElementsByTagName("script");
    var genel = JSON.stringify(veri[16].innerHTML);
    genel = genel.split('"');
    
   genel[4] = genel[4].slice(0, -1);
   genel[8] = genel[8].slice(0, -1);
   genel[12] = genel[12].slice(0, -1);
   genel[20] = genel[20].slice(0, -1);

    document.querySelector("#tarih").textContent = genel[4];   
    document.querySelector("#test").textContent = genel[8];
    document.querySelector("#poz").textContent = genel[12];
    document.querySelector("#dea").textContent = genel[20];

  });
