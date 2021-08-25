fetch("https://cors.bridged.cc/https://covid19.saglik.gov.tr", {
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
    const yuzdeVeri = doc.getElementsByTagName("script");

    var yuzdeGenel = JSON.stringify(yuzdeVeri[12].innerHTML);
    var vakaDurum = JSON.stringify(yuzdeVeri[22].innerHTML);
    vakaDurum = vakaDurum.split('"').join("\\").split("\\");
    yuzdeGenel = yuzdeGenel.split("=").join(";").split(";").join("''").split("'");

    document.querySelector("#fdoz").textContent = yuzdeGenel[3];
    document.querySelector("#sdoz").textContent = yuzdeGenel[9];
    document.querySelector("#tdoz").textContent = yuzdeGenel[15];
    document.querySelector("#toplam").textContent = yuzdeGenel[21];
    document.querySelector("#tarihAsi").textContent = yuzdeGenel[45];

    document.querySelector("#tarih").textContent = vakaDurum[9];
    document.querySelector("#test").textContent = vakaDurum[17];
    document.querySelector("#poz").textContent = vakaDurum[25];
    document.querySelector("#dea").textContent = vakaDurum[41];

    var dataset = [...veri].map((m) => m.dataset);
    JsonData = JSON.parse(JSON.stringify(dataset));
    JsonData = { ...JsonData };
    delete JsonData[0];
    var sayacMavi =0;
    var sayacKirmizi =0;
    var sayacTuruncu =0;

    for (var i = 1; i < 82; i++) {
      var tr;
      tr = $("<tr/>");
      tr.append("<td>" + i + "</td>");
      tr.append("<td>" + JsonData[i].adi + "</td>");
      if (JsonData[i].yuzde < "% 55") {
        sayacKirmizi++;
        tr.append("<td style='color:#f22536'>" + JsonData[i].yuzde + "</td>");
      } else if (JsonData[i].yuzde > "% 75") {
        sayacMavi++;
        tr.append("<td style='color:#4dc3fa'>" + JsonData[i].yuzde + "</td>");
      } else {
        sayacTuruncu++;
        tr.append("<td style='color:#ea8421'>" + JsonData[i].yuzde + "</td>");
      }

      $("#myTable2").append(tr);
    }
    document.getElementById("mavi").innerHTML = sayacMavi;
    document.getElementById("kirmizi").innerHTML = sayacKirmizi;
    document.getElementById("turuncu").innerHTML = sayacTuruncu;
  

    document.getElementById("genelOran2").innerHTML =
      parseFloat(yuzdeGenel[39]) + "%";
    document.getElementById("progress-value2").style.width =
      parseFloat(yuzdeGenel[39]) + "%";
  })
  .catch(function (err) {
    console.warn("Something went wrong.", err);
  });
