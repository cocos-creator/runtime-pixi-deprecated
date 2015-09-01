var Fs = require('fire-fs');
var Path = require('fire-path');


var $super = Editor.metas.asset;

function SpriteSheetMeta () {
    $super.call(this);
}

SpriteSheetMeta.validate = function ( assetpath ) {
    var object = JSON.parse( Fs.readFileSync(assetpath, 'utf8') );
    return typeof object.frames === 'object';
};

Editor.JS.extend(SpriteSheetMeta, $super);

SpriteSheetMeta.prototype.export = null;

module.exports = SpriteSheetMeta;

