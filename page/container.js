
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
        }
    },

    onBeforeSerialize: function () {
        DisplayObjectWrapper.prototype.onBeforeSerialize.call(this);

        this._alpha = this.alpha;
    },

    createNode: function (node) {
        node = node || new PIXI.Container();

        DisplayObjectWrapper.prototype.createNode.call(this, node);

        node.alpha = this._alpha;

        return node;
    }
});

Runtime.ContainerWrapper = module.exports = ContainerWrapper;
