
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

        drawMode: {
            get: function () {
                return this.targetN.drawMode;
            },
            set: function (value) {
                if (typeof value === 'number' && !isNaN(value)) {
                    this.targetN.drawMode = value;
                }
                else {
                    Fire.error('The new drawMode must be number');
                }
            },
            type: Runtime.MeshDrawMode
        },

        _drawMode: {
            default: Runtime.MeshDrawMode.TriangleMesh
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
        this._drawMode = this.drawMode;
    },

    createNode: function (node) {
        node = node || new PIXI.mesh.Mesh(PIXI.Texture.EMPTY);

        ContainerWrapper.prototype.createNode.call(this, node);

        if (this._texture) {
            node.texture = PIXI.Texture.fromImage(this._texture);
        }

        node.drawMode = this._drawMode;
        node.blendMode = this._blendMode;

        return node;
    }
});

Runtime.MeshWrapper = module.exports = MeshWrapper;
