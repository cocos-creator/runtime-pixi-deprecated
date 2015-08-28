if (FIRE_EDITOR) {
    var Url = require('fire-url');
    Fire.Texture.createNodeByUrl = function (url, callback) {
        var sprite;

        try {
            sprite = new PIXI.Sprite.fromImage(url);
        }
        catch(err) {
            return callback(err);
        }

        var wrapper = Fire(sprite);
        wrapper.name = Url.basenameNoExt(url);
        wrapper.anchor = Fire.v2(0.5, 0.5);

        return callback(null, sprite);
    };
}
