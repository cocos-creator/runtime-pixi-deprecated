
var ContainerWrapper = require('./container');

var MeshWrapper = Fire.Class({
    name: 'Runtime.MeshWrapper',
    extends: ContainerWrapper,

    constructor: function () {
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

        _texture: {
            default: '',
            url: Fire.Texture
        },

        _blendMode: {
            default: Runtime.BlendModes.NORMAL
        }
    },

    onBeforeSerialize: function () {
        ContainerWrapper.prototype.onBeforeSerialize.call(this);

        this._texture = this.texture;
        this._blendMode = this.blendMode;
    },

    createNode: function (node) {
        node = node || new PIXI.mesh.Mesh(PIXI.Texture.EMPTY);

        ContainerWrapper.prototype.createNode.call(this, node);

        if (this._texture) {
            node.texture = PIXI.Texture.fromImage(this._texture);
        }

        node.blendMode = this._blendMode;

        return node;
    }
});

Runtime.MeshWrapper = module.exports = MeshWrapper;
