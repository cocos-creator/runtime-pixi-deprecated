var packageJson = require('../package.json');

Runtime.init = function (assetdb) {
    var ED = global.Editor;
    if ( ED && ED.isCoreLevel ) {
        ED.versions['pixi'] = packageJson['engine-version'];
        ED.versions['runtime-pixi'] = packageJson['version'];

        // Editor.assetdb.register( '.plist', false, Editor.metas['sprite-atlas'] );
        // Editor.assetdb.register( '.plist', false, Editor.metas['particle'] );
        // Editor.assetdb.register( '.animation', false, Editor.metas['sprite-animation'] );
        // Editor.assetdb.register( '.tmx', false, Editor.metas['tiled-map'] );
    }
};
