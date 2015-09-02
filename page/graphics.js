
var ContainerWrapper = require('./container');

var GraphicsWrapper = Fire.Class({
    name: 'Runtime.GraphicsWrapper',
    extends: ContainerWrapper,

    properties: {

        blendMode: {
            get: function () {
                return this.targetN.blendMode;
            },
            set: function (value) {
                this.targetN.blendMode = value;
            },
            type: Runtime.BlendModes
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

        _tint: {
            default: 0xffffff
        },

        _blendMode: {
            default: Runtime.BlendModes.NORMAL
        }
    },

    onBeforeSerialize: function () {
        ContainerWrapper.prototype.onBeforeSerialize.call(this);

        this._tint = this.targetN.tint;
        this._blendMode = this.blendMode;
    },

    createNode: function (node) {
        node = node || new PIXI.Graphics();

        ContainerWrapper.prototype.createNode.call(this, node);

        node.tint = this._tint;
        node.blendMode = this._blendMode;

        return node;
    }
});

Runtime.GraphicsWrapper = module.exports = GraphicsWrapper;
