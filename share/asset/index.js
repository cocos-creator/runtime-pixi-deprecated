// hard code for browserify

require('./texture');
require('./sprite-sheet');
require('./video');

if ( FIRE_EDITOR && Editor.assets ) {
    [
        'sprite-sheet',
        'video',
    ].forEach(function (typeInEditor) {
        Editor.assets[typeInEditor] = require('./' + typeInEditor);
    });
}