var packageJson = require('../package.json');

Runtime.init = function (assetdb) {
    var ED = global.Editor;
    if ( ED && ED.isCoreLevel ) {
        ED.versions['pixi'] = packageJson['engine-version'];
        ED.versions['runtime-pixi'] = packageJson['version'];

        Editor.assetdb.register( '.json', false, Editor.metas['sprite-sheet'] );
        Editor.assetdb.register( '.mp4',  false, Editor.metas['video'] );
    }
};
