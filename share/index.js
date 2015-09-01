// asset
if ( Editor.isCoreLevel || Editor.isRuntime ) {
    require('./asset');
}

// meta and meta inspector
[
    'sprite-sheet',
].forEach( function ( name ) {

    if ( !Editor.isRuntime ) {
        // meta
        Editor.metas[name] = require('./meta/' + name);
        Editor.metas[name]['asset-type'] = name;
        Editor.metas[name]['asset-icon'] = 'app://runtime/runtime-pixi/static/icon/' + name + '.png';

        // inspector
        if ( Editor.isPageLevel ) {
            Editor.inspectors[name] = 'app://runtime/runtime-pixi/share/inspector/' + name + '.html';
        }
    }

});

//
if ( !Editor.isRuntime ) {
    if ( Editor.isPageLevel ) {
        // register inspector
        Editor.inspectors['Runtime.DisplayObjectWrapper'] = 'app://runtime/runtime-pixi/share/inspector/display-object-wrapper.html';
        Editor.inspectors['Runtime.ContainerWrapper'] = 'app://runtime/runtime-pixi/share/inspector/container-wrapper.html';
        Editor.inspectors['Runtime.SpriteWrapper'] = 'app://runtime/runtime-pixi/share/inspector/sprite-wrapper.html';
        Editor.inspectors['Runtime.MovieClipWrapper'] = 'app://runtime/runtime-pixi/share/inspector/movie-clip-wrapper.html';

        // register property
        Editor.properties['Runtime.SpriteSheet'] = function ( fieldEL, info ) {
            return Editor.bindAsset( fieldEL, info.value, info.attrs, 'sprite-sheet' );
        };

        Editor.properties['Runtime.DisplayObjectWrapper'] = function ( fieldEL, info ) {
            return Editor.bindNode( fieldEL, info.value, info.attrs, 'Runtime.DisplayObjectWrapper' );
        };
    }
}

