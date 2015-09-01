
var Container = PIXI.Container;

function Stage () {
    Container.call(this);
}

// constructor
Stage.prototype = Object.create(Container.prototype);
Stage.prototype.constructor = Stage;

PIXI.fireball.Stage = Stage;
module.exports = Stage;
