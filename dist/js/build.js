"use strict";

var app = document.querySelector('#app');
app.innerHTML = "\n        <div id=\"div1\">\n            Div1 body\n        </div>\n        <div id=\"div2\">\n            Div2 body\n        </div>\n    ";
var oImg = document.createElement("img");
oImg.src = "images/1.jpg";
window.onload = function () {
    app.appendChild(oImg);
    console.log(add(1, 2));
};
"use strict";

function add(a, b) {
    return a + b;
}