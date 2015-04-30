;(function() {
  "use strict";
  if ( typeof Snake === "undefined" ) {
    window.Snake = {};
  }

  var Coord = Snake.Coord = function(pos) {
    this.x = pos[0];
    this.y = pos[1];
  };

  Coord.prototype.plus = function(vector) {
    this.x += vector[0];
    this.y += vector[1];
  };

  Coord.prototype.equals = function(pos) {
    return ((this.x === pos[0]) && (this.y === pos[1]));
  };

  Coord.prototype.isOpposite = function() {

  };

  Coord.prototype.pos = function() {
    return [this.x, this.y];
  };

})();
