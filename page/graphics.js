
var ContainerWrapper = require('./container');

var GraphicsWrapper = Fire.Class({
    name: 'Runtime.GraphicsWrapper',
    extends: ContainerWrapper,

    properties: {
        tint: {
            get: function () {
                var color = Fire.Color.fromHex( this.targetN.tint );
                color.a = this.alpha;
                return color;
            },
            set: function (value) {
                this.targetN.tint = value.toPixiHex();
                this.alpha = value.a;
            },

            type: Fire.Color
        },

        _tint: {
            default: 0xffffff
        }
    },

    onBeforeSerialize: function () {
        ContainerWrapper.prototype.onBeforeSerialize.call(this);

        this._tint = this.targetN.tint;
    },

    createNode: function (node) {
        node = node || new PIXI.Graphics();

        ContainerWrapper.prototype.createNode.call(this, node);

        node.tint = this._tint;

        return node;
    }
});

Runtime.GraphicsWrapper = module.exports = GraphicsWrapper;
