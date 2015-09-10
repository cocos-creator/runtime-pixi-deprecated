
var DisplayObjectWrapper = require('./display-object');

var ContainerWrapper = Fire.Class({
    name: 'Runtime.ContainerWrapper',
    extends: DisplayObjectWrapper,

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

        _alpha: {
            default: 1
        },

        _size: {
            default: null
        }
    },

    onBeforeSerialize: function () {
        DisplayObjectWrapper.prototype.onBeforeSerialize.call(this);

        this._alpha = this.alpha;
        this._size  = [this.size.x, this.size.y];
    },

    createNode: function (node) {
        node = node || new PIXI.Container();

        DisplayObjectWrapper.prototype.createNode.call(this, node);

        node.width = this._size ? this._size[0] : 0;
        node.height = this._size ? this._size[1] : 0;
        node.alpha = this._alpha;

        return node;
    }
});

Runtime.ContainerWrapper = module.exports = ContainerWrapper;
