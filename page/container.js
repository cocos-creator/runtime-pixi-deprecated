var Vec2 = Fire.Vec2;
var Helpers = Fire.Runtime.Helpers;

/**
 * @class ContainerWrapper
 * @extends Fire.Runtime.ContainerWrapper
 * @constructor
 * @param {RuntimeNode} node - The root node of current stage.
 */
var ContainerWrapper = Fire.Class({
    name: 'Runtime.ContainerWrapper',
    extends: Fire.Runtime.SceneWrapper,

    properties: {

        childrenN: {
            get: function () {
                return this.targetN.children;
            },
            visible: false
        },

        position: {
            get: function () {
                return new Vec2(this.targetN.x, this.targetN.y);
            },
            set: function (value) {
                if ( value instanceof Vec2 ) {
                    this.targetN.x = value.x;
                    this.targetN.y = value.y;
                }
                else {
                    Fire.error('The new position must be Fire.Vec2');
                }
            }
        },

        worldPosition: {
            get: function () {
                return this.position;
            },
            set: function (value) {
                this.position = value;
            }
        },

        scale: {
            get: function () {
                return new Vec2(this.targetN.scale.x, this.targetN.scale.y);
            },
            set: function (value) {
                if ( value instanceof Vec2 ) {
                    this.targetN.scale.set(value.x, value.y);
                }
                else {
                    Fire.error('The new scale must be Fire.Vec2');
                }
            }
        },

        worldScale: {
            get: function () {
                return this.scale;
            },
            set: function (value) {
                this.scale = value;
            }
        },

        rotation: {
            get: function () {
                return this.targetN.rotation;
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    this.targetN.rotation = value;
                }
                else {
                    Fire.error('The new rotation must not be NaN');
                }
            }
        },

        worldRotation: {
            get: function () {
                return this.rotation;
            },
            set: function (value) {
                this.rotation = value;
            }
        },

        _position: {
            default: null
        },

        _scale: {
            default: null
        }
    },

    transformPointToWorld: function (point) {
        var temp = new PIXI.Point();
        this.targetN.worldTransform.apply(point, temp);
        return new Fire.Vec2(temp.x, temp.y);
    },

    transformPointToLocal: function (point) {
        var temp = new PIXI.Point();
        this.targetN.worldTransform.applyInverse(point, temp);
        return new Fire.Vec2(temp.x, temp.y);
    },

    attached: function () {
    },

    preloadAssets: function (assetObjects, rawAssetUrls, callback) {
        // get all urls
        var urls = assetObjects.map( function (asset) {
            return asset.url;
        });
        urls = urls.concat(rawAssetUrls);

        // start to load assets
        var loader = PIXI.loader;
        var numToLoad = 0;

        urls.forEach(function (url) {
            if (loader.resources[url]) return;

            loader.add(url, url);
            numToLoad ++;
        });

        if (numToLoad === 0) {
            callback();
        }
        else {
            loader.once('complete',callback);
            loader.load();
        }
    },

    onBeforeSerialize: function () {
        this._scale = [this.scaleX, this.scaleY];
        this._position = [this.position.x, this.position.y];
    },

    createNode: function (node) {
        node = node || new PIXI.Container();

        node.x = this._position ? this._position[0] : 0;
        node.y = this._position ? this._position[1] : 0;
        node.scaleX = this._scale ? this._scale[0] : 1;
        node.scaleY = this._scale ? this._scale[1] : 1;

        return node;
    }
});


if (FIRE_EDITOR) {
    var originAddChildAt = PIXI.Container.prototype.addChildAt;
    PIXI.Container.prototype.addChildAt = function () {
        var child = originAddChildAt.apply(this, arguments);
        Helpers.onNodeAttachedToParent(child);
    }

    var originRemoveChildAt = PIXI.Container.prototype.removeChildAt;
    PIXI.Container.prototype.removeChildAt = function () {
        var child = originRemoveChildAt.apply(this, arguments);
        Helpers.onNodeDetachedFromParent(child);
    }
}


Runtime.ContainerWrapper = module.exports = ContainerWrapper;
