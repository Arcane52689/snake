;(function() {
  "use strict";
  if ( typeof Snake === "undefined" ) {
    window.Snake = {};
  }


  var GAMEOVER = [
    85,86,87,88,89,90,
    125,165,205,245,285,325,
    325,326,327,328,329,330,
    130,170,210,250,290,330,
    ,
    93,133,174,214,255,295,336,
    297,257,218,178,139,99,
    ,
    102,142,182,222,262,302,342,
    103,104,105,106,107,
    223,224,225,
    343,344,345,346,347,
    ,
    110,150,190,230,270,310,350,
    111,112,113,114,
    231,232,233,234,
    154,194,
    272,313,354,
    ,
    117,157,197,237,277,357,
    ,
    497,498,499,500,501,502,503,
    537,577,617,657,697,737,
    543,583,623,663,703,743,
    778,779,780,781,782,
    579,581,
    659,661,
    699,700,701

  ]


  var View = Snake.View = function(board, $el) {
    this.board = board;
    this.$el = $el;
  };

  View.prototype.turnSnake = function(dir) {
    this.board.snake.turn(dir);
  };

  View.prototype.bindKeys = function() {

  };

  View.prototype.handleKeyEvent = function() {
    $(document).keydown(function(event) {
      switch(event.which) {
        case 87:
        case 73:
        case 38:
          this.turnSnake("N");
          break;
        case 65:
        case 74:
        case 37:
          this.turnSnake("W");
          break;
        case 83:
        case 75:
        case 40:
          this.turnSnake("S");
          break;
        case 68:
        case 76:
        case 39:
          this.turnSnake("E");
          break;
      }
    }.bind(this));
  };

  View.prototype.setupBoard = function() {
    var total = this.board.dimX * this.board.dimY;
    var html = "<li></li>";
    for (var i = 0; i < total; i++) {
      this.$el.append(html);
    }
    var ticks = 0



    var tick = function() {
      this.board.snake.move();
      this.board.checkApples();
      ticks += 1
      if (ticks % 12 === 0) {
        this.board.addApple()
      }
      this.render();
      this.isGameOver();
    }


    this.render();
    this.handleKeyEvent();

    this.interval = setInterval(tick.bind(this), 250);
  };

  View.prototype.render = function() {
    var boardString = this.board.render();
    var $children = this.$el.children();
    for (var i = 0; i < boardString.length; i++) {
      var $child = $($children[i]);
      $child.removeClass();
      if (boardString[i] === "S") {
        $child.addClass("snake");
      } else if (boardString[i] === "a") {
        $child.addClass("apple");
      }
    }

  };

  View.prototype.renderOver = function() {
    var $children = this.$el.children()
    for (var i = 0; i < 800; i++) {
      var child = $($children[i]);
      child.removeClass();
      child.addClass("over");
    }
    for (var i=0; i < GAMEOVER.length; i++) {
      var child = $($children[GAMEOVER[i]]);
      child.removeClass();
      child.addClass("letter");
    }
  };

  View.prototype.isGameOver = function() {
    if (this.board.gameOver()) {
      this.board = null;
      clearInterval(this.interval)
      this.renderOver();
    }
  };

})();
