
var ContainerWrapper = require('./container');

var SpineWrapper = Fire.Class({
    name: 'Runtime.SpineWrapper',
    extends: ContainerWrapper,

    constructor: function () {
        this._anchor = [0.5, 0.5];
    },

    properties: {
        childrenN: {
            get: function () {
                var targetN = this.targetN;
                var children = targetN.children.filter(function (child) {
                    return targetN.slotContainers.indexOf(child) === -1;
                });
                return children;
            }
        },

        spineData: {
            default: '',
            url: Runtime.SpineAsset,

            notify: function () {
                var url  = this.spineData;
                var self = this;

                function loadComplete() {
                    var data = self.getSpineDataFromUrl(url);
                    self.resetSpineWithData(data);
                }

                var loader = PIXI.loader;
                if (!loader.resources[url]) {
                    loader.add(url)
                        .load(loadComplete);
                }
                else {
                    loadComplete();
                }
            }
        },

        skin: {
            default: '',

            notify: function () {
                var skeleton = this.targetN.skeleton;
                if (!skeleton.data.findSkin(this.skin)) return;

                skeleton.setSkinByName(this.skin);
                skeleton.setSlotsToSetupPose();
            }
        },

        startAnimation: '',
        loop: true
    },

    getSpineDataFromUrl: function (url) {
        var data = PIXI.loader.resources[url];
        return data && data.spineData;
    },

    resetSpineWithData: function (spineData) {
        var spine = PIXI.spine.SpineRuntime;
        var targetN = this.targetN;
        targetN.removeChildren();

        targetN.spineData = spineData;

        targetN.skeleton = new spine.Skeleton(spineData);
        targetN.skeleton.updateWorldTransform();

        targetN.stateData = new spine.AnimationStateData(spineData);

        targetN.state = new spine.AnimationState(targetN.stateData);

        targetN.slotContainers = [];

        for (var i = 0, n = targetN.skeleton.slots.length; i < n; i++)
        {
            var slot = targetN.skeleton.slots[i];
            var attachment = slot.attachment;
            var slotContainer = new PIXI.Container();
            targetN.slotContainers.push(slotContainer);
            targetN.addChild(slotContainer);

            if (attachment instanceof spine.RegionAttachment)
            {
                var spriteName = attachment.rendererObject.name;
                var sprite = targetN.createSprite(slot, attachment);
                slot.currentSprite = sprite;
                slot.currentSpriteName = spriteName;
                slotContainer.addChild(sprite);
            }
            else if (attachment instanceof spine.MeshAttachment)
            {
                var mesh = targetN.createMesh(slot, attachment);
                slot.currentMesh = mesh;
                slot.currentMeshName = attachment.name;
                slotContainer.addChild(mesh);
            }
            else
            {
                continue;
            }

        }
    },

    createNode: function (node) {
        var data;

        if (this.spineData) {
            data = this.getSpineDataFromUrl(this.spineData);
        }
        else {
            data = {
                bones: {},
                slots: {},
                ikConstraints: {}
            };
        }

        node = node || new PIXI.spine.Spine(data);

        ContainerWrapper.prototype.createNode.call(this, node);

        if (!Fire.isEditor && this.startAnimation !== '') {
            node.state.setAnimationByName(0, this.startAnimation, this.loop);
        }

        if (this.skin) {
            node.skeleton.setSkinByName(this.skin);
            node.skeleton.setSlotsToSetupPose();
        }

        return node;
    }
});

Runtime.SpineWrapper = module.exports = SpineWrapper;
