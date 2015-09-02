
var $super = Editor.metas.asset;

function VideoMeta () {
    $super.call(this);
}

Editor.JS.extend(VideoMeta, $super);

VideoMeta.prototype.export = null;

module.exports = VideoMeta;

