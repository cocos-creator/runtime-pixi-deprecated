
var ContainerWrapper = require('./container');

var GraphicsWrapper = Fire.Class({
    name: 'Runtime.GraphicsWrapper',
    extends: ContainerWrapper,

    properties: {
        size: {
            get: function () {
                return Fire.v2(this.targetN.width, this.targetN.height);
            },
            set: function (value) {
                this.targetN.width = value.x;
                this.targetN.height = value.y;
            }
        },

        alpha: {
            get: function () {
                return this.targetN.alpha;
            },
            set: function (value) {
                this.targetN.alpha = value;
            }
        },

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

        _alpha: {
            default: 1
        },

        _tint: {
            default: 0xffffff
        }
    },

    onBeforeSerialize: function () {
        ContainerWrapper.prototype.onBeforeSerialize.call(this);

        this._alpha = this.alpha;
        this._tint = this.targetN.tint;
    },

    createNode: function (node) {
        node = node || new PIXI.Graphics();

        ContainerWrapper.prototype.createNode.call(this, node);

        node.alpha = this._alpha;
        node.tint = this._tint;

        return node;
    }
});

Runtime.GraphicsWrapper = module.exports = GraphicsWrapper;
