
var EngineWrapper = Fire.Class({
    name: 'Runtime.EngineWrapper',
    extends: Fire.Runtime.EngineWrapper,
    constructor: function () {
        this._stage = null;
        this._designResolution = Fire.Vec2.zero
    },

    properties: {
        canvasSize: {
            default: Fire.Vec2.zero,
            type: Fire.Vec2,

            notify: function () {
                this.renderer.resize( this.canvasSize.x, this.canvasSize.y );
            }
        },

        designResolution: {
            get: function () {
                return _designResolution;
            },
            set: function (value) {
                this._designResolution = value;
            }
        }
    },

    initRuntime: function (options, callback) {
        var width  = options.width  || 640;
        var height = options.height || 480;
        var canvas = options.canvas;

        this.renderer = new PIXI.WebGLRenderer( width, height, {
            view: canvas,
            transparent: true,
            antialias: false,
            forceFXAA: false,
        });

        this.canvasSize = Fire.v2(width, height);
        this.designResolution = Fire.v2(options.designWidth, options.designHeight);
        this._setCurrentSceneN(new PIXI.Container());

        callback();
    },

    playRuntime: function () {
    },

    stopRuntime: function () {
    },

    pauseRuntime: function () {
    },

    resumeRuntime: function () {
    },

    animateRuntime: function (dt) {

    },

    updateRuntime: function (dt) {
        Runtime.deepQueryChildren(this._stage, function (child) {
            if (child.update) {
                child.update(dt);
            }
            return true;
        });
    },

    renderRuntime: function () {
        this.renderer.render(this._stage);
    },

    _setCurrentSceneN: function (scene) {
        this._stage = scene;
    },

    getCurrentSceneN: function () {
        return this._stage;
    },

    getIntersectionList: function (rect) {
        var scene = this.getCurrentScene();
        var list = [];

        Runtime.deepQueryChildren(scene, function (child) {

            var bounds = child.getWorldBounds();

            // if intersect aabb success, then try intersect obb
            if (rect.intersects(bounds)) {
                bounds = child.getWorldOrientedBounds();

                var polygon = new Fire.Polygon(bounds);

                if (Fire.Intersection.rectPolygon(rect, polygon)) {
                    list.push(child.targetN);
                }
            }

            return true;
        });

        return list;
    }
});

Runtime.EngineWrapper = module.exports = EngineWrapper;
