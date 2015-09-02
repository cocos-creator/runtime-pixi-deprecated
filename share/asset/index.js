// hard code for browserify

require('./texture');
require('./sprite-sheet');
require('./video');
require('./spine');

if ( FIRE_EDITOR && Editor.assets ) {
    [
        'sprite-sheet',
        'video',
        'spine',
    ].forEach(function (typeInEditor) {
        Editor.assets[typeInEditor] = require('./' + typeInEditor);
    });
}