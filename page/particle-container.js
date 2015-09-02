
var ContainerWrapper = require('./container');

var ParticleContainerWrapper = Fire.Class({
    name: 'Runtime.ParticleContainerWrapper',
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

        maxSize: {
            default: 15000
        },

        enableScale: {
            default: false
        },

        enablePosition: {
            default: true
        },

        enableRotation: {
            default: false
        },

        enableUvs: {
            default: false
        },

        enableAlpha: {
            default: false
        },

        _blendMode: {
            default: Runtime.BlendModes.NORMAL
        }
    },

    updateProperties: function (node) {
        node = node || this.targetN;

        var properties = {
            scale:      this.enableScale,
            position:   this.enablePosition,
            rotation:   this.enableRotation,
            uvs:        this.enableUvs,
            alpha:      this.enableAlpha
        };

        node.setProperties(properties);
    },

    onBeforeSerialize: function () {
        ContainerWrapper.prototype.onBeforeSerialize.call(this);

        this._blendMode = this.blendMode;
    },

    createNode: function (node) {
        node = node || new PIXI.ParticleContainer(this.maxSize, {});

        ContainerWrapper.prototype.createNode.call(this, node);

        this.updateProperties(node);
        node.blendMode = this._blendMode;

        return node;
    }
});

Runtime.ParticleContainerWrapper = module.exports = ParticleContainerWrapper;
