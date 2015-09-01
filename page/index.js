
// require engine
var EngineWrapper = require('./engine');

// require modules
require('./utils');
require('./extends');

// register engine wrapper
Fire.Runtime.registerEngine( new EngineWrapper(true) );

// register node type
var types = [
    [PIXI.fireball, 'Stage',            require('./stage')],

    [PIXI,          'Container',        require('./container'),             'Container'],
    [PIXI,          'DisplayObject',    require('./display-object')],
    [PIXI,          'Sprite',           require('./sprite'),                'Sprite'],
    [PIXI,          'Text',             require('./text'),                  'Text'],
    [PIXI,          'Graphics',         require('./graphics'),              'Graphics'],

    [PIXI.extras,   'MovieClip',        require('./extras/movie-clip'),     'MovieClip'],
];


types.forEach(function (type) {
    registerObjectType( type[0], type[1], type[2], type[3] );
});


function registerObjectType (namespace, name, wrapper, menuPath) {
    var nodeType = namespace[name];
    Fire.Runtime.registerNodeType(nodeType, wrapper, menuPath);
}


Fire.Runtime.Settings = {
    "mapping-v": [0, 1, 1],
    "mapping-h": [0, 1, 1],
};
