
var SpriteWrapper = require('../sprite');

var TilingSpriteWrapper = Fire.Class({
    name: 'Runtime.TilingSpriteWrapper',
    extends: SpriteWrapper,

    properties: {

        tileScale: {
            get: function () {
                return Fire.v2(this.targetN.tileScale.x, this.targetN.tileScale.y);
            },
            set: function (value) {
                if (value instanceof Fire.Vec2) {
                    this.targetN.tileScale.x = value.x;
                    this.targetN.tileScale.y = value.y;
                }
                else {
                    Fire.error('The new tileScale must be Fire.Vec2');
                }
            }
        },

        tilePosition: {
            get: function () {
                return Fire.v2(this.targetN.tilePosition.x, this.targetN.tilePosition.y);
            },
            set: function (value) {
                if (value instanceof Fire.Vec2) {
                    this.targetN.tilePosition.x = value.x;
                    this.targetN.tilePosition.y = value.y;
                }
                else {
                    Fire.error('The new tilePosition must be Fire.Vec2');
                }
            }
        },

        _tileScale: {
            default: null
        },

        _tilePosition: {
            default: null
        },

        _size: {
            default: null
        }
    },

    onBeforeSerialize: function () {
        SpriteWrapper.prototype.onBeforeSerialize.call(this);

        this._tileScale = [this.tileScale.x, this.tileScale.y];
        this._tilePosition = [this.tilePosition.x, this.tilePosition.y];
        this._size = [this.size.x, this.size.y];
    },

    createNode: function (node) {
        node = new PIXI.extras.TilingSprite(PIXI.Texture.EMPTY);
        SpriteWrapper.prototype.createNode.call(this, node);

        if (this._tileScale) {
            node.tileScale.x = this._tileScale[0];
            node.tileScale.y = this._tileScale[1];
        }

        if (this._tilePosition) {
            node.tilePosition.x = this._tilePosition[0];
            node.tilePosition.y = this._tilePosition[1];
        }

        if (this._size) {
            node.width  = this._size[0];
            node.height = this._size[1];
        }

        return node;
    }
});

Runtime.TilingSpriteWrapper = module.exports = TilingSpriteWrapper;
