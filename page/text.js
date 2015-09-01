
var SpriteWrapper = require('./sprite');

var TextWrapper = Fire.Class({
    name: 'Runtime.TextWrapper',
    extends: SpriteWrapper,

    properties: {
        text: {
            get: function () {
                return this.targetN.text;
            },
            set: function (value) {
                this.targetN.text = value;
                this.targetN.updateText();
            }
        },

        font: {
            default: 'bold 20px Arial',
            notify: function () {
                this.updateStyle();
            }
        },

        fill: {
            default: 'black',
            notify: function () {
                this.updateStyle();
            }
        },

        align: {
            default: 'left',
            notify: function () {
                this.updateStyle();
            }
        },

        stroke: {
            default: '',
            notify: function () {
                this.updateStyle();
            }
        },

        strokeThickness: {
            default: 0,
            notify: function () {
                this.updateStyle();
            }
        },

        wordWrap: {
            default: false,
            notify: function () {
                this.updateStyle();
            }
        },

        wordWrapWidth: {
            default: 100,
            notify: function () {
                this.updateStyle();
            }
        },

        lineHeight: {
            default: -1,
            notify: function () {
                this.updateStyle();
            }
        },

        dropShadow: {
            default: false,
            notify: function () {
                this.updateStyle();
            }
        },

        dropShadowColor: {
            default: 'black',
            notify: function () {
                this.updateStyle();
            }
        },

        dropShadowAngle: {
            default: Math.PI/4,
            notify: function () {
                this.updateStyle();
            }
        },

        dropShadowDistance: {
            default: 5,
            notify: function () {
                this.updateStyle();
            }
        },

        padding: {
            default: 0,
            notify: function () {
                this.updateStyle();
            }
        },

        textBaseline: {
            default: 'alphabetic',
            notify: function () {
                this.updateStyle();
            }
        },

        lineJoin: {
            default: 'miter',
            notify: function () {
                this.updateStyle();
            }
        },

        miterLimit: {
            default: 10,
            notify: function () {
                this.updateStyle();
            }
        },

        _text: {
            default: 'Text'
        },

        _lineHeight: {
            default: null
        }
    },

    updateStyle: function (node) {
        node = node || this.targetN;

        var style = {
            font:               this.font,
            fill:               this.fill,
            align:              this.align,
            stroke:             this.stroke,
            strokeThickness:    this.strokeThickness,
            wordWrap:           this.wordWrap,
            wordWrapWidth:      this.wordWrapWidth,
            dropShadow:         this.dropShadow,
            dropShadowColor:    this.dropShadowColor,
            dropShadowAngle:    this.dropShadowAngle,
            dropShadowDistance: this.dropShadowDistance,
            padding:            this.padding,
            textBaseline:       this.textBaseline,
            lineJoin:           this.lineJoin,
            miterLimit:         this.miterLimit
        };

        if (this.lineHeight >= 0) {
            style.lineHeight = this.lineHeight;
        }

        node.style = style;
    },

    onBeforeSerialize: function () {
        SpriteWrapper.prototype.onBeforeSerialize.call(this);

        this._text = this.text;
    },

    createNode: function (node) {
        node = node || new PIXI.Text(this._text, {});

        SpriteWrapper.prototype.createNode.call(this, node);

        this.updateStyle(node);

        return node;
    }
});

Runtime.TextWrapper = module.exports = TextWrapper;
