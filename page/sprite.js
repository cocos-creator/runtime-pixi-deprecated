
var DisplayObjectWrapper = require('./display-object');

var SpriteWrapper = Fire.Class({
    name: 'Runtime.SpriteWrapper',
    extends: DisplayObjectWrapper,

    constructor: function () {
        this._anchor = [0.5, 0.5];
    },

    properties: {
        texture: {
            get: function () {
                var source = this.targetN.texture.baseTexture.source;
                return (source && source.src.replace('file://', '')) || '';
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

        size: {
            get: function () {
                return Fire.v2(this.targetN.width, this.targetN.height);
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

        _texture: {
            default: '',
            url: Fire.Texture
        },

        _anchor: {
            default: null
        },

        _alpha: {
            default: 1
        },

        _tint: {
            default: 0xffffff
        }
    },

    onBeforeSerialize: function () {
        DisplayObjectWrapper.prototype.onBeforeSerialize.call(this);

        this._texture = this.texture;
        this._anchor = [this.anchor.x, this.anchor.y];
        this._alpha = this.alpha;

        this._tint = this.targetN.tint;
    },

    createNode: function (node) {
        node = node || new PIXI.Sprite();

        DisplayObjectWrapper.prototype.createNode.call(this, node);

        if (this._texture) {
            node.texture = PIXI.Texture.fromImage(this._texture);
        }

        if (this._anchor) {
            node.anchor.set(this._anchor[0], this._anchor[1]);
        }

        node.alpha = this._alpha;
        node.tint = this._tint;

        return node;
    }
});

Runtime.SpriteWrapper = module.exports = SpriteWrapper;
