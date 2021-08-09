
fetch('https://covid19asi.saglik.gov.tr').then(function (response) {
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
        for (var i = 1; i < 82; i++) {
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
        var count=1;
        for (var i = 83; i < 164; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + count++ + "</td>");
            tr.append("<td>" + JsonData[i].adi+ "</td>");
            tr.append("<td>" + JsonData[i].yuzde + "</td>");
            $('#myTable2').append(tr);
        }
  
}).catch(function (err) {
	console.warn('Something went wrong.', err);
});
