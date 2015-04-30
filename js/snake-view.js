;(function() {
  "use strict";
  if ( typeof Snake === "undefined" ) {
    window.Snake = {};
  }

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

    var gameOver = function() {
      
    };

    var tick = function() {
      this.board.snake.move();
      this.board.checkApples();
      ticks += 1
      if (ticks % 12 === 0) {
        this.board.addApple()
      }
      this.render();
    }


    this.render();
    this.handleKeyEvent();

    setInterval(tick.bind(this), 250);
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

})();
