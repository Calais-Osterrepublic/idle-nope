//Text variables- These variables run the math and links the Javascript with the HTML. These variables aren't saved.
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//A text function.
var text = function(input, x, y) {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(input, x, y);
};

//Core variables: These variables are the ones that run the very game, and are the ones to be saved. They are all compressed into an object. Use dot notation (player.coin) to access the variables.

var player = {
  coin: 0,
  mint: 0,
  bots: 0,
  transits: 0
};

if (typeof Storage !== "undefined") {
  if (localStorage.coin && localStorage.coin !== "NaN") {
    player.coin = Number(localStorage.coin);
  }
  if (localStorage.mint && localStorage.mint !== "NaN") {
    player.mint = Number(localStorage.mint);
  }
  if (localStorage.bots && localStorage.bots !== "NaN") {
    player.bots = Number(localStorage.bots);
  }
  if (localStorage.transits && localStorage.transits !== "NaN") {
    player.transits = Number(localStorage.transits);
  }
} else {
  alert("No saving here on this browser, sorry!");
}

//This is a mess.
var makeCoin = function() {
  player.coin++;
  player.coin += player.mint;
  player.coin += player.transits;
};
var buyMint = function() {
  if (player.coin >= player.transits * 10 + 100) {
    player.coin -= player.transits * 10 + 100;
    player.mint++;
  }
};
var recycleMint = function() {
  if (player.bots >= 1 && player.transits >= 1) {
    player.bots--;
    player.coin += 50;
    player.mint++;
  }
};
var constructBot = function() {
  if (player.coin >= player.bots * 20 + 100 && player.mint >= player.transits) {
    player.coin -= player.bots * 20 + 100;
    player.mint -= player.transits;
    player.bots++;
  }
};

var transcend = function() {
  if (
    player.bots >= 20 &&
    player.coin >= 2000 &&
    player.mint >= 200 &&
    player.transits <= 10
  ) {
    player.bots = 0;
    player.coin = 0;
    player.mint = 0;
    player.transits += 1;
    alert(
      "You leave this plane. You start to disassemble your coins, mints, and bots, as a fuel to enter a higher plane."
    );
  }
};
//Used for the loop.
var ticker = 0;

//The loop:
setInterval(function() {
  ctx.clearRect(0, 0, 400, 100);
  text("Coin:" + player.coin, 10, 10);
  text("Mint:" + player.mint, 10, 30);
  text("Bots:" + player.bots, 10, 50);
  text("Transcendence Points (TP):" + player.transits, 10, 70);

  if (ticker >= 120) {
    ticker = 0;
  }

  if (ticker === 60) {
    player.coin += player.bots + player.mint * player.transits;
  }

  ticker++;

  localStorage.coin = player.coin.toString();
  localStorage.mint = player.mint.toString();
  localStorage.bots = player.bots.toString();
  localStorage.transits = player.transits.toString();
}, 1);
