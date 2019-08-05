var app = document.querySelector('#app');
app.innerHTML = `
        <div id="div1">
            Div1 body
        </div>
        <div id="div2">
            Div2 body
        </div>
    `
var oImg = document.createElement("img");
oImg.src = "images/1.jpg";
window.onload = function () {
    app.appendChild(oImg);
    console.log(add(1, 2));
}
