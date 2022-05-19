// Checkers Game

// black.gif
// gray.gif
// you1.gif -- normal piece (player/red)
// you2.gif -- highlighted piece
// you1k.gif -- kinged normal piece
// you2k.gif -- kinged highlighted piece
// me1.gif -- normal piece (computer/black)
// me2.gif -- highlighted piece
// me1k.gif -- kinged normal piece
// me2k.gif -- kinged highlighted piece

function preload() {
  this.length = preload.arguments.length;
  for (var i = 0; i < this.length; i++) {
    this[i] = new Image();
    this[i].src = preload.arguments[i];
  }
}
var pics = new preload(
  "gif/black.gif",
  "gif/gray.gif",
  "gif/you1.gif",
  "gif/you2.gif",
  "gif/you1k.gif",
  "gif/you2k.gif",
  "gif/me1.gif",
  "gif/me2.gif",
  "gif/me1k.gif",
  "gif/me2k.gif"
);

var black = -1; // computer is black
var red = 1; // visitor is red
var square_dim = 80;
var piece_toggled = false;
var red_turn = false;
var double_jump = false;
var comp_move = false;
var game_is_over = false;
var safe_from = (safe_to = null);
var toggler = null;
var togglers = 0;

function Board() {
  board = new Array();
  for (var i = 0; i < 8; i++) {
    board[i] = new Array();
    for (var j = 0; j < 8; j++) board[i][j] = Board.arguments[8 * j + i];
  }
  board[-2] = new Array(); // prevents errors
  board[-1] = new Array(); // prevents errors
  board[8] = new Array(); // prevents errors
  board[9] = new Array(); // prevents errors
}
var board;
Board(1,0,1,0,1,0,1,0,
  0,1,0,1,0,1,0,1,
  1,0,1,0,1,0,1,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,-1,0,-1,0,-1,0,-1,
  -1,0,-1,0,-1,0,-1,0,
  0,-1,0,-1,0,-1,0,-1);

function moveable_space(i, j) {
  // calculates whether it is a gray (moveable)
  // or black (non-moveable) space
  return ((i % 2) + j) % 2 == 0;
}
function Coord(x, y) {
  this.x = x;
  this.y = y;
}
function coord(x, y) {
  c = new Coord(x, y);
  return c;
}

document.write(
  '<div class="board">' +
  "<table border=0 cellspacing=0 cellpadding=0 width=" +
    (square_dim * 8 + 8) +
    "<tr><td><img src='gif/black.gif' width=" +
    (square_dim * 8 + 8) +
    " height=4><br></td></tr>"
);
for (var j = 0; j < 8; j++) {
  document.write(
    "<tr><td><img src='gif/black.gif' width=4 height=" + square_dim + ">"
  );
  for (var i = 0; i < 8; i++) {
    if (moveable_space(i, j))
      document.write("<a href='javascript:clicked(" + i + "," + j + ")'>");
    document.write("<img src='");
    if (board[i][j] == 1) document.write("gif/you1.gif");
    else if (board[i][j] == -1) document.write("gif/me1.gif");
    else if (moveable_space(i, j)) document.write("gif/gray.gif");
    else document.write("gif/black.gif");
    document.write(
      "' width=" +
        square_dim +
        " height=" +
        square_dim +
        " name='space" +
        i +
        "" +
        j +
        "' border=0>"
    );
    if (moveable_space(i, j)) document.write("</a>");
  }
  document.write(
    "<img src='gif/black.gif' width=4 height=" + square_dim + "></td></tr>"
  );
}
document.write(
  "<tr><td><img src='gif/black.gif' width=" +
    (square_dim * 8 + 8) +
    " height=4><br></td></tr></table><br>" +
    "</div>"+
    "<form class='controllers' name='disp'>" +
    '<div class="moves-history"><p class="history-title">Moves History</p>' +
    "<textarea name='message' id='message' wrap=virtual rows=2 cols=40></textarea></div>" +
    '<div id="copy-url"><input class="url" value="#url-to-board" disabled><button id="copy" class="black-button">Copy</button></div>' +
    '<div id="send-request"><input placeholder="username"><button id="send" class="blue-button">Send</button></div>' +
    "</form>"
);

const textarea = document.getElementById('message');

function clicked(i, j) {
  if (integ((board[i][j]) >= 1 && red_turn)|| (integ(board[i][j]) <= -1 && !red_turn)) toggle(i, j);
  else if (piece_toggled) move(selected, coord(i, j));
}
function toggle(x, y) {
  if (red_turn) {
    if (piece_toggled)
      draw(
        selected.x,
        selected.y,
        "gif/you1" + (board[selected.x][selected.y] == 1.1 ? "k" : "") + ".gif"
      );
    if (piece_toggled && selected.x == x && selected.y == y) {
      piece_toggled = false;
      if (double_jump) {
        red_turn = double_jump = false;
        computer();
      }
    } else {
      piece_toggled = true;
      draw(x, y, "gif/you2" + (board[x][y] == 1.1 ? "k" : "") + ".gif");
    }
    selected = coord(x, y);
  } 
  else {
    if (piece_toggled)
      draw(
        selected.x,
        selected.y,
        "gif/me1" + (board[selected.x][selected.y] == -1.1 ? "k" : "") + ".gif"
      );
    if (piece_toggled && selected.x == x && selected.y == y) {
      piece_toggled = false;
      if (double_jump) {
        red_turn = double_jump = false;
        computer();
      }
    } else {
      piece_toggled = true;
      draw(x, y, "gif/me2" + (board[x][y] == -1.1 ? "k" : "") + ".gif");
    }
    selected = coord(x, y);
  }
}
function draw(x, y, name) {
  document.images["space" + x + "" + y].src = name;
}
function integ(num) {
  if (num != null) return Math.round(num);
  else return null;
}
function abs(num) {
  return Math.abs(num);
}
function sign(num) {
  if (num < 0) return -1;
  else return 1;
}
function concatenate(arr1, arr2) {
  // function tacks the second array onto the end of the first and returns result
  for (var i = 0; i < arr2.length; i++) arr1[arr1.length + i] = arr2[i];
  return arr1;
}
function legal_move(from, to) {
  if (to.x < 0 || to.y < 0 || to.x > 7 || to.y > 7) return false;
  piece = board[from.x][from.y];
  distance = coord(to.x - from.x, to.y - from.y);
  if (distance.x == 0 || distance.y == 0) {
    return false;
  }
  if (abs(distance.x) != abs(distance.y)) {
    return false;
  }
  if (abs(distance.x) > 2) {
    return false;
  }
  if (abs(distance.x) == 1 && double_jump) {
    return false;
  }
  if (board[to.x][to.y] != 0 || piece == 0) {
    return false;
  }
  if (
    abs(distance.x) == 2 &&
    integ(piece) !=
      -integ(board[from.x + sign(distance.x)][from.y + sign(distance.y)])
  ) {
    return false;
  }
  if (integ(piece) == piece && sign(piece) != sign(distance.y)) {
    return false;
  }

  return true;
}
function move(from, to) {
  //if (!red_turn) red_turn = true;
  if (legal_move(from, to)) {
    piece = board[from.x][from.y];
    distance = coord(to.x - from.x, to.y - from.y);
    if (abs(distance.x) == 1 && board[to.x][to.y] == 0) {
      swap(from, to);
    } 
    else if (
      abs(distance.x) == 2 &&
      integ(piece) !=
        integ(board[from.x + sign(distance.x)][from.y + sign(distance.y)])) {
      double_jump = false;
      swap(from, to);
      remove(from.x + sign(distance.x), from.y + sign(distance.y));
      if (
        legal_move(to, coord(to.x + 2, to.y + 2)) ||
        legal_move(to, coord(to.x + 2, to.y - 2)) ||
        legal_move(to, coord(to.x - 2, to.y - 2)) ||
        legal_move(to, coord(to.x - 2, to.y + 2))
      ) {
        double_jump = true;
      }
    }
    if (board[to.x][to.y] == 1 && to.y == 7 && red_turn) king_me(to.x, to.y);
    if (board[to.x][to.y] == -1 && to.y == 0 && !red_turn) king_me(to.x, to.y);
    selected = to;
    if(red_turn){
      if (game_over() && !double_jump) {
        setTimeout(
          "toggle(" +
            to.x +
            "," +
            to.y +
            ");red_turn = double_jump = false;",
          100
        );
        textarea.value += 
          "Red:\n" +
          "\tFrom: " + from.x + "," + from.y + "\n" +
          "\tTo: " + to.x + "," + to.y + "\n" 
        ;
      }
    }
    else {
      if (game_over() && !double_jump) {
        setTimeout(
          "toggle(" +
            to.x +
            "," +
            to.y +
            ");red_turn = true;double_jump = false;",
          100
        );
        textarea.value += 
          "Black:\n"+
          "\tFrom: " + from.x + "," + from.y + "\n" +
          "\tTo: " + to.x + "," + to.y + "\n";
      }
    }
  }
  return true;
}
function king_me(x, y) {
  if (board[x][y] == 1) {
    board[x][y] = 1.1; // king you
    draw(x, y, "gif/you2k.gif");
  } else if (board[x][y] == -1) {
    board[x][y] = -1.1; // king me
    draw(x, y, "gif/me2k.gif");
  }
  if(red_turn) textarea.value += "\nRed "
  else textarea.value += "\nBalck "
  textarea.value += 
  "checker("+ x +"," + y +")is king now\n";
}

function swap(from, to) {
  dummy_src = document.images["space" + to.x + "" + to.y].src;
  document.images["space" + to.x + "" + to.y].src =
    document.images["space" + from.x + "" + from.y].src;
  document.images["space" + from.x + "" + from.y].src = dummy_src;

  dummy_num = board[from.x][from.y];
  board[from.x][from.y] = board[to.x][to.y];
  board[to.x][to.y] = dummy_num;
}
function remove(x, y) {
  draw(x, y, "gif/gray.gif");
  board[x][y] = 0;
  if(red_turn) textarea.value += "\nBlack "
  else textarea.value += "\nRed "
  textarea.value += 
  "checker("+ x +"," + y +") eaten\n";
}
function Result(val) {
  this.high = val;
  this.dir = new Array();
}

function game_over() {
  // make sure game is not over (return false if game is over)
  comp = you = false;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (integ(board[i][j]) == -1) comp = true;
      if (integ(board[i][j]) == 1) you = true;
    }
  }
  if (!comp) textarea.value += 
    "You beat me!";
  if (!you) textarea.value += 
    "Gotcha! Game over.";
  game_is_over = !comp || !you;
  return !game_is_over;
}

textarea.value += 
  "The game started!\n";
red_turn = true;
