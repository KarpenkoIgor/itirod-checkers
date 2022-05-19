if(document.getElementById("menu")){
    document.getElementById("menu").onclick = function () {
        location.href = "menu_page.html?";
    };
}

if(document.getElementById("log-in")){
    document.getElementById("log-in").onclick = function () {
        location.href = "login_page.html?";
    };
}

if(document.getElementById("sign-up")){
    document.getElementById("sign-up").onclick = function () {
        location.href = "sign_up_page.html?";
    };
}

if(document.getElementById("log-out")){
    document.getElementById("log-out").onclick = function () {
        location.href = "index.html?";
    };
}
