var Vec2 = Fire.Vec2;
var Rect = Fire.Rect;
var Color = Fire.Color;
var Helpers = Fire.Runtime.Helpers;


var DisplayObjectWrapper = Fire.Class({
    name: 'Runtime.DisplayObjectWrapper',
    extends: Fire.Runtime.NodeWrapper,

    properties: {

        name: {
            get: function () {
                return this.targetN.name || '';
            },
            set: function (value) {
                this.targetN.name = value;
            }
        },

        // HIERARCHY

        parentN: {
            get: function () {
                return this.targetN.parent;
            },
            set: function (value) {
                if (this.parentN) {
                    this.parentN.removeChild(this.targetN);

                    if (FIRE_EDITOR)
                        Helpers.onNodeDetachedFromParent(this.targetN);
                }

                if (value) {
                    value.addChild(this.targetN);

                    if (FIRE_EDITOR)
                        Helpers.onNodeAttachedToParent(this.targetN);
                }
            },
            visible: false
        },

        childrenN: {
            get: function () {
                return this.targetN.children;
            },
            visible: false
        },

        // TRANSFORM

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
                if (!this.targetN.parent) return Vec2.zero;

                var pos = this.targetN.toGlobal(new PIXI.Point(0,0));
                return new Vec2(pos.x, pos.y);
            },
            set: function (value) {
                if ( value instanceof Vec2 ) {
                    if ( this.parentN ) {
                        this.targetN.position = this.parentN.worldTransform.applyInverse(new PIXI.Point(value.x, value.y));
                    }
                    else {
                        this.position = value;
                    }
                }
                else {
                    Fire.error('The new worldPosition must be Fire.Vec2');
                }
            },
            visible: false
        },

        rotation: {
            get: function () {
                return this.targetN.rotation * 180 / Math.PI;
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    this.targetN.rotation = value / 180 * Math.PI;
                }
                else {
                    Fire.error('The new rotation must not be NaN');
                }
            }
        },

        worldRotation: {
            get: function () {
                var parent = this.parentN;
                if ( parent ) {
                    if ( parent === Fire.engine.getCurrentSceneN() ) {
                        return this.rotation + parent.rotation;
                    }
                    else {
                        return this.rotation + Fire(parent).worldRotation;
                    }
                }
                else {
                    return this.rotation;
                }
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    var parent = this.parentN;
                    if ( parent ) {
                        if ( parent === Fire.engine.getCurrentSceneN() ) {
                            this.rotation = value - parent.rotation;
                        }
                        else {
                            this.rotation = value - Fire(parent).worldRotation;
                        }
                    }
                    else {
                        this.rotation = value;
                    }
                }
                else {
                    Fire.error('The new worldRotation must not be NaN');
                }
            },
            visible: false
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
                var mat = this.targetN.worldTransform;

                var ret = new Vec2();
                ret.x = Math.sqrt(mat.a * mat.a + mat.b * mat.b);
                ret.y = Math.sqrt(mat.c * mat.c + mat.d * mat.d);

                return ret;
            },
            visible: false
        },

        pivot: {
            get: function () {
                return new Vec2(this.targetN.pivot.x, this.targetN.pivot.y);
            },
            set: function (value) {
                if ( value instanceof Vec2 ) {
                    this.targetN.pivot.set(value.x, value.y);
                }
                else {
                    Fire.error('The new pivot must be Fire.Vec2');
                }
            }
        },

        _name: {
            default: ""
        },

        _position: {
            default: null
        },

        _scale: {
            default: null
        },

        _rotation: {
            default: 0
        },

        _pivot: {
            default: null
        }
    },

    setSiblingIndex: function (index) {
        if (!this.parentN) return;

        Fire.Runtime.NodeWrapper.prototype.setSiblingIndex.call(this, index);
    },

    attached: function () {
    },

    // RENDERER
    getWorldBounds: function (out) {
        var bounds = this.getWorldOrientedBounds();

        var minx = Math.min(bounds[0].x, bounds[1].x, bounds[2].x, bounds[3].x);
        var miny = Math.min(bounds[0].y, bounds[1].y, bounds[2].y, bounds[3].y);
        var maxx = Math.max(bounds[0].x, bounds[1].x, bounds[2].x, bounds[3].x);
        var maxy = Math.max(bounds[0].y, bounds[1].y, bounds[2].y, bounds[3].y);

        out = out || new Rect();
        out.x = minx;
        out.y = miny;
        out.width  = maxx - minx;
        out.height = maxy - miny;

        return out;
    },

    /**
     * Returns a "world" oriented bounding box(OBB) of the renderer.
     *
     * @method getWorldOrientedBounds
     * @param {Fire.Vec2} [out_bl] - optional, the vector to receive the world position of bottom left
     * @param {Fire.Vec2} [out_tl] - optional, the vector to receive the world position of top left
     * @param {Fire.Vec2} [out_tr] - optional, the vector to receive the world position of top right
     * @param {Fire.Vec2} [out_br] - optional, the vector to receive the world position of bottom right
     * @return {Fire.Vec2} - the array contains vectors represented in world position,
     *                    in the sequence of BottomLeft, TopLeft, TopRight, BottomRight
     */
    getWorldOrientedBounds: function (out_bl, out_tl, out_tr, out_br) {
        var bounds = this.targetN.getLocalBounds();
        var width  = bounds.width;
        var height = bounds.height;

        out_bl = out_bl || new Vec2();
        out_tl = out_tl || new Vec2();
        out_tr = out_tr || new Vec2();
        out_br = out_br || new Vec2();

        var mat = this.targetN.worldTransform;
        var anchor = mat.apply(new PIXI.Point(bounds.x, bounds.y));

        // transform bounds by matrix
        var tx = anchor.x;
        var ty = anchor.y;
        var xa = mat.a * width;
        var xb = mat.b * width;
        var yc = mat.c * height;
        var yd = mat.d * height;

        out_tl.x = tx;
        out_tl.y = ty;
        out_tr.x = xa + tx;
        out_tr.y = xb + ty;
        out_bl.x = yc + tx;
        out_bl.y = yd + ty;
        out_br.x = xa + yc + tx;
        out_br.y = xb + yd + ty;

        return [out_bl, out_tl, out_tr, out_br];
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

    //

    onBeforeSerialize: function () {
        this._name  = this.name;
        this._scale = [this.scaleX, this.scaleY];
        this._rotation = this.rotation;
        this._position = [this.position.x, this.position.y];
        this._pivot = [this.pivot.x, this.pivot.y];
    },

    createNode: function (node) {
        node = node || new PIXI.DisplayObject();

        node.name = this._name;
        node.x = this._position ? this._position[0] : 0;
        node.y = this._position ? this._position[1] : 0;
        node.scale.x = this._scale ? this._scale[0] : 1;
        node.scale.y = this._scale ? this._scale[1] : 1;
        node.rotation = this._rotation;

        if (this._pivot) {
            node.pivot.set(this._pivot[0], this._pivot[1]);
        }

        return node;
    }
});


Runtime.DisplayObjectWrapper = module.exports = DisplayObjectWrapper;
