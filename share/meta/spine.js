var Fs = require('fire-fs');
var Path = require('fire-path');


var $super = Editor.metas.asset;

function SpineSheetMeta () {
    $super.call(this);
}

SpineSheetMeta.validate = function ( assetpath ) {
    var object = JSON.parse( Fs.readFileSync(assetpath, 'utf8') );
    return typeof object.bones === 'object' && typeof object.slots === 'object';
};

Editor.JS.extend(SpineSheetMeta, $super);

SpineSheetMeta.prototype.export = null;

module.exports = SpineSheetMeta;

