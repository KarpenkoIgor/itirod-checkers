var create_board = document.getElementById("create-board");
var url_to_board = document.getElementById("url-to-board");
var join_to_board = document.getElementById("join-to-board")
var help = document.getElementById("help")

create_board.onclick = function (){
    location.href = "game_page.html?";
}

join_to_board.onclick = function (){
    location.href = url_to_board.value;
}

help.onclick = function (){
    location.href = "help_page.html?";
}