
var SpriteWrapper = require('../sprite');

var MovieClipWrapper = Fire.Class({
    name: 'Runtime.MovieClipWrapper',
    extends: SpriteWrapper,

    properties: {
        spriteSheet: {
            default: '',
            url: Runtime.SpriteSheet,

            notify: function () {
                var url = this.spriteSheet;

                var loader = PIXI.loader;
                if (!loader.resources[url]) {
                    loader.add(url)
                        .load(this.updateTextures.bind(this));
                }
                else {
                    this.updateTextures();
                }
            }
        },

        prefix: {
            default: '',

            notify: function () {
                this.updateTextures();
            }
        },

        subfix: {
            default: '.png',

            notify: function () {
                this.updateTextures();
            }
        },

        range: {
            default: Fire.Vec2.zero,

            notify: function () {
                this.updateTextures();
            }
        },

        loop: {
            get: function () {
                return this.targetN.loop;
            },
            set: function (value) {
                if (typeof value === 'boolean') {
                    this.targetN.loop = value;
                }
                else {
                    Fire.error('The new loop must be boolean');
                }
            }
        },

        animationSpeed: {
            get: function () {
                return this.targetN.animationSpeed;
            },
            set: function (value) {
                if (typeof value === 'number' && !isNaN(value)) {
                    this.targetN.animationSpeed = value;
                }
                else {
                    Fire.error('The new animationSpeed must be number');
                }
            }
        },

        autoPlay: {
            default: true
        },

        _loop: {
            default: true
        },

        _animationSpeed: {
            default: 0.5
        }
    },

    updateTextures: function (node) {
        node = node || this.targetN;

        if (this.spriteSheet !== '' &&
            this.prefix !== '' &&
            this.subfix !== '' &&
            !this.range.equals(Fire.Vec2.zero)) {
            var frames = [];

            for (var i = this.range.x; i <= this.range.y; i++) {
                var val = i < 10 ? '0' + i : i;

                var name = this.prefix + val + this.subfix;
                try{
                    var frame = PIXI.Texture.fromFrame(name);
                    frames.push(frame);
                }
                catch (err) {
                    if (!FIRE_EDITOR) {
                        Fire.error(err);
                    }
                    frames = [PIXI.Texture.EMPTY];
                    break;
                }
            }

            node.textures = frames;

            if (FIRE_EDITOR)
                node.gotoAndStop(0);
        }
    },

    onBeforeSerialize: function () {
        SpriteWrapper.prototype.onBeforeSerialize.call(this);

        this._loop = this.loop;
        this._animationSpeed = this.animationSpeed;
    },

    createNode: function (node) {
        node = new PIXI.extras.MovieClip([PIXI.Texture.EMPTY]);
        SpriteWrapper.prototype.createNode.call(this, node);

        this.updateTextures(node);
        node.loop = this._loop;
        node.animationSpeed = this._animationSpeed;

        if (this.autoPlay) {
            node.play();
        }

        return node;
    }
});

Runtime.MovieClipWrapper = module.exports = MovieClipWrapper;
