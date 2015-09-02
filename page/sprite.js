
var ContainerWrapper = require('./container');

var SpriteWrapper = Fire.Class({
    name: 'Runtime.SpriteWrapper',
    extends: ContainerWrapper,

    constructor: function () {
        this._anchor = [0.5, 0.5];
    },

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

        texture: {
            get: function () {
                var source = this.targetN.texture.baseTexture.source;
                return (source && source.src && source.src.replace('file://', '')) || '';
            },
            set: function (value) {
                this.targetN.texture = PIXI.Texture.fromImage(value);
            },
            url: Fire.Texture
        },

        anchor: {
            get: function () {
                return Fire.v2(this.targetN.anchor.x, this.targetN.anchor.y);
            },
            set: function (value) {
                this.targetN.anchor.set(value.x, value.y);
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

        _texture: {
            default: '',
            url: Fire.Texture
        },

        _anchor: {
            default: null
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

        this._texture = this.texture;
        this._anchor = [this.anchor.x, this.anchor.y];
        this._tint = this.targetN.tint;
        this._blendMode = this.blendMode;
    },

    createNode: function (node) {
        node = node || new PIXI.Sprite();

        ContainerWrapper.prototype.createNode.call(this, node);

        if (this._texture) {
            node.texture = PIXI.Texture.fromImage(this._texture);
        }

        if (this._anchor) {
            node.anchor.set(this._anchor[0], this._anchor[1]);
        }

        node.tint = this._tint;
        node.blendMode = this._blendMode;

        return node;
    }
});

Runtime.SpriteWrapper = module.exports = SpriteWrapper;
