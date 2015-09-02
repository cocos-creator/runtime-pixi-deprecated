
var MeshWrapper = require('./mesh');

var RopeWrapper = Fire.Class({
    name: 'Runtime.RopeWrapper',
    extends: MeshWrapper,

    createNode: function (node) {
        node = node || new PIXI.mesh.Rope(PIXI.Texture.EMPTY, []);

        MeshWrapper.prototype.createNode.call(this, node);

        return node;
    }
});

Runtime.RopeWrapper = module.exports = RopeWrapper;
