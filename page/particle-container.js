
var ContainerWrapper = require('./container');

var ParticleContainerWrapper = Fire.Class({
    name: 'Runtime.ParticleContainerWrapper',
    extends: ContainerWrapper,

    properties: {
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
    },

    createNode: function (node) {
        node = node || new PIXI.ParticleContainer(this.maxSize, {});

        ContainerWrapper.prototype.createNode.call(this, node);

        this.updateProperties(node);

        return node;
    }
});

Runtime.ParticleContainerWrapper = module.exports = ParticleContainerWrapper;
