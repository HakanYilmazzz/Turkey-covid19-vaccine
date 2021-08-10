fetch('https://cors.bridged.cc/https://covid19asi.saglik.gov.tr' , {
    method: "GET",
    credentials: "same-origin"
}).then(function (response) {
	return response.text();
}).then(function (html) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');
    const veri = doc.getElementsByTagName('g');
    var dataset = [...veri].map(m=>m.dataset);
    JsonData = JSON.parse(JSON.stringify(dataset))
    JsonData={...JsonData};
    var iller = [...veri].map(m=>m.dataset.adi);
    var birinci = [...veri].map(m=>m.dataset.birinciDoz);
    var ikinci = [...veri].map(m=>m.dataset.ikinciDoz);
    var toplam = [...veri].map(m=>m.dataset.toplam);
    var tr;
    GenelToplam=0;
    fdoz=0;
    sdoz=0;
    tdoz=0;
        for (var i = 1; i < 82; i++) {
            GenelToplam=Number(JsonData[i].toplam.split('.').join(''))+GenelToplam;
            fdoz = Number(JsonData[i].birinciDoz.split('.').join(''))+fdoz;
            sdoz = Number(JsonData[i].ikinciDoz.split('.').join(''))+sdoz;
            tdoz = (Number(JsonData[i].toplam.split('.').join('')) - Number(JsonData[i].birinciDoz.split('.').join('')) - Number(JsonData[i].ikinciDoz.split('.').join(''))) + tdoz;

            tr = $('<tr/>');
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + JsonData[i].adi + "</td>");
            tr.append("<td>" + JsonData[i].toplam + "</td>");
          //tr.append("<td data-sort="+"{JsonData[i].toplam}"+">" + JsonData[i].toplam + "</td>");
            tr.append("<td>" + JsonData[i].birinciDoz + "</td>");
            tr.append("<td>" + JsonData[i].ikinciDoz + "</td>");
            tr.append("<td>" + ((Number(JsonData[i].toplam.split('.').join('')) - Number(JsonData[i].birinciDoz.split('.').join('')) - Number(JsonData[i].ikinciDoz.split('.').join(''))).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + "</td>");
            $('#myTable').append(tr);
        }
    document.getElementById("toplam").innerText = GenelToplam.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    document.getElementById("fdoz").innerText = fdoz.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    document.getElementById("sdoz").innerText = sdoz.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    document.getElementById("tdoz").innerText = tdoz.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    var yuzde = ((sdoz/83614362)*100).toFixed(1);
    document.getElementById("genelOran").innerHTML = yuzde + "%";
    document.getElementById('progress-value1').style.width = yuzde+ "%";
    
    var count=1;
    for (var i = 83; i < 164; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + count++ + "</td>");
        tr.append("<td>" + JsonData[i].adi+ "</td>");
        if(JsonData[i].yuzde > "% 75"){
            tr.append("<td style='color:#4dc3fa'>" + JsonData[i].yuzde + "</td>");
        }else{
        tr.append("<td>" + JsonData[i].yuzde + "</td>");
        }
        $('#myTable2').append(tr);
    }
  
}).catch(function (err) {
	console.warn('Something went wrong.', err);
});
