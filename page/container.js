
var DisplayObjectWrapper = require('./display-object');

var ContainerWrapper = Fire.Class({
    name: 'Runtime.ContainerWrapper',
    extends: DisplayObjectWrapper,

    createNode: function (node) {
        node = node || new PIXI.Container();

        DisplayObjectWrapper.prototype.createNode.call(this, node);

        return node;
    }
});

Runtime.ContainerWrapper = module.exports = ContainerWrapper;
