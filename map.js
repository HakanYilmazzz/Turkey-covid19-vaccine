function svgturkiyeharitasi() {
  const element = document.querySelector("#svg-turkiye-haritasi");
  const info = document.querySelector(".il-isimleri");

  element.addEventListener("mouseover", function (event) {
    if (
      event.target.tagName === "path" &&
      event.target.parentNode.id !== "guney-kibris"
    ) {
      info.innerHTML = [
        "<div style='border-radius: 10px;box-shadow: 10px 10px 10px -10px #fff;'>",
        '<span style="font-weight:bold;border-bottom:1px solid #00ffff;padding-bottom:2px;color:#fb667a">',
        event.target.parentNode.getAttribute("data-iladi"),
        "</span>",
        "<li>",
        "<br>",
        "<span style='font-weight:bold;color:#4dc3fa'>",
        "Toplam: ",
        "</span>",
        "<span style='font-weight:bold'>",
        JsonData[
          parseInt(event.target.parentNode.getAttribute("data-plakakodu"), 10)
        ].toplam,
        "</span>",
        "</li>",
        "<br>",
        "<li>",
        "<span style='font-weight:bold;color:#4dc3fa'>",
        "1. Doz: ",
        "</span>",
        "<span style='font-weight:bold'>",
        JsonData[
          parseInt(event.target.parentNode.getAttribute("data-plakakodu"), 10)
        ].birinciDoz,
        "</span>",
        "</li>",
        "<br>",
        "<li>",
        "<span style='font-weight:bold;color:#4dc3fa'>",
        "2. Doz: ",
        "</span>",
        "<span style='font-weight:bold'>",      
        JsonData[
          parseInt(event.target.parentNode.getAttribute("data-plakakodu"), 10)
        ].ikinciDoz,
        "</span>",
        "</li>",
        "<br>",
        "<li>",
        "<span style='font-weight:bold;color:#4dc3fa'>",
        "3. Doz: ",
        "</span>",
        "<span style='font-weight:bold'>",
          (
            Number(JsonData[parseInt(event.target.parentNode.getAttribute("data-plakakodu"), 10)].toplam.split(".").join("")) -
            Number(JsonData[parseInt(event.target.parentNode.getAttribute("data-plakakodu"), 10)].birinciDoz.split(".").join("")) -
            Number(JsonData[parseInt(event.target.parentNode.getAttribute("data-plakakodu"), 10)].ikinciDoz.split(".").join(""))
          )
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
        
        "</span>",
        "</li>",
        "</div>",
      ].join("");
    }
  });

  element.addEventListener("mousemove", function (event) {
    info.style.top = event.pageY + 25 + "px";
    info.style.left = event.pageX + "px";
  });

  element.addEventListener("mouseout", function (event) {
    info.innerHTML = "";
  });
}
