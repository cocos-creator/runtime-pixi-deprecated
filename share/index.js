// asset
if ( Editor.isCoreLevel || Editor.isRuntime ) {
    require('./asset');
}

// meta and meta inspector
// [
//     'particle',
//     'sprite-animation',
//     'sprite-atlas',
//     'tiled-map'
// ].forEach( function ( name ) {

//     if ( !Editor.isRuntime ) {
//         // meta
//         Editor.metas[name] = require('./meta/' + name);
//         Editor.metas[name]['asset-type'] = name;
//         Editor.metas[name]['asset-icon'] = 'app://runtime/runtime-cocos2d-js/static/icon/' + name + '.png';

//         // inspector
//         if ( Editor.isPageLevel ) {
//             Editor.inspectors[name] = 'app://runtime/runtime-cocos2d-js/share/inspector/' + name + '.html';
//         }
//     }

// });

//
if ( !Editor.isRuntime ) {
    if ( Editor.isPageLevel ) {
        // register inspector
        Editor.inspectors['Runtime.DisplayObjectWrapper'] = 'app://runtime/runtime-pixi/share/inspector/display-object-wrapper.html';
        Editor.inspectors['Runtime.SpriteWrapper'] = 'app://runtime/runtime-pixi/share/inspector/sprite-wrapper.html';
    }
}

