fetch("https://api.allorigins.win/get?url=https://covid19.saglik.gov.tr", {
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
    // console.log(yuzdeVeri)
    var yuzdeGenel = JSON.stringify(yuzdeVeri[12].innerHTML);
    var vakaDurum = JSON.stringify(yuzdeVeri[23].innerHTML);
    vakaDurum = vakaDurum.split('"').join("\\").split("\\");
    yuzdeGenel = yuzdeGenel.split("=").join(";").split(";").join("''").split("'");
     console.log(vakaDurum)
    document.querySelector("#fdoz").textContent = yuzdeGenel[3];
    document.querySelector("#sdoz").textContent = yuzdeGenel[9];
    document.querySelector("#tdoz").textContent = yuzdeGenel[15];
    document.querySelector("#toplam").textContent = yuzdeGenel[27];
    document.querySelector("#tarihAsi").textContent = yuzdeGenel[63];

    document.querySelector("#tarih").textContent = vakaDurum[21];
    document.querySelector("#test").textContent = vakaDurum[37];
    document.querySelector("#poz").textContent = vakaDurum[53];
    document.querySelector("#dea").textContent = vakaDurum[85];

    var dataset = [...veri].map((m) => m.dataset);
    JsonData = JSON.parse(JSON.stringify(dataset));
    JsonData = { ...JsonData };
    delete JsonData[0];
    // console.log(JsonData)
    var sayacMavi =0;
    var sayacKirmizi =0;
    var sayacTuruncu =0;
    var sayacSari=0;
    var tr,element;
    var sira=1;
    for (var i = 1; i < 82; i++) {
      
      tr = $("<tr/>");
      tr.append("<td>" + i + "</td>");
      tr.append("<td>" + JsonData[i].adi + "</td>");
      if (JsonData[i].yuzde < "% 55.0") {
        element  = document.querySelector('[data-iladi='+JsonData[i].adi+']');
        element.style.fill = "red";
        let div = document.createElement('span');
        div.innerHTML = JsonData[i].yuzde;
        element.append(div)
        sayacKirmizi++;
        tr.append("<td style='color:#f22536'>" + JsonData[i].yuzde + "</td>");
      } else if (JsonData[i].yuzde >= "% 75.0") {
        element  = document.querySelector('[data-iladi='+JsonData[i].adi+']');
        element.style.fill = "blue ";
        let div = document.createElement('span');
        div.innerHTML = JsonData[i].yuzde;
        element.append(div)
        sayacMavi++;
        tr.append("<td style='color:#4dc3fa'>" + JsonData[i].yuzde + "</td>");
      } else if(JsonData[i].yuzde >= "% 55.0" && JsonData[i].yuzde <= "% 65.0"){
        element  = document.querySelector('[data-iladi='+JsonData[i].adi+']');
        element.style.fill = "orange";
        let div = document.createElement('span');
        div.innerHTML = JsonData[i].yuzde;
        element.append(div)
        sayacTuruncu++;
        tr.append("<td style='color:#ea8421'>" + JsonData[i].yuzde + "</td>");
      }else{
        element  = document.querySelector('[data-iladi='+JsonData[i].adi+']');
        element.style.fill = "#e6e600";
        let div = document.createElement('span');
        div.innerHTML = JsonData[i].yuzde;
        element.append(div)
        sayacSari++;
        tr.append("<td style='color:yellow'>" + JsonData[i].yuzde + "</td>");

      }

      $("#myTable2").append(tr);
    }
    for(var k=83;k<164;k++){
      tr = $("<tr/>");
      tr.append("<td>" + sira + "</td>");
      tr.append("<td>" + JsonData[k].adi.split('\\').join('').split('"').join('') + "</td>");
      tr.append('<td id='+k+' >' + JsonData[k].detay.split('\\').join('').split('"').join('').split('n').join('') + "</td>");
      $("#myTable").append(tr);
      sira++;
      document.getElementById(''+k+'').setAttribute('data-sort','' + JsonData[k].detay.split(",").join("")+ '');
    }
    document.getElementById("mavi").innerHTML = sayacMavi;
    document.getElementById("kirmizi").innerHTML = sayacKirmizi;
    document.getElementById("turuncu").innerHTML = sayacTuruncu;
    document.getElementById("sari").innerHTML = sayacSari;

    
    document.getElementById("genelOran2").innerHTML =
      parseFloat(yuzdeGenel[45]) + "%";
    document.getElementById("progress-value2").style.width =
      parseFloat(yuzdeGenel[45]) + "%";
  })
  .catch(function (err) {
    console.warn("Something went wrong.", err);
  });
