// hard code for browserify

require('./texture');

if ( FIRE_EDITOR && Editor.assets ) {
    [
        'sprite-sheet',
    ].forEach(function (typeInEditor) {
        Editor.assets[typeInEditor] = require('./' + typeInEditor);
    });
}