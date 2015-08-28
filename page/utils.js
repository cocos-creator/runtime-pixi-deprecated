
Fire.Color.fromHex = function (hex) {
    var c = hex;

    if (typeof hex === 'string') {
        hex = hex.replace(/^#?/, "0x");
        c = parseInt(hex);
    }

    var r = (c >> 16) / 255;
    var g = ((c >> 8) % 256) / 255;
    var b = (c % 256) / 255;

    return new Fire.Color(r, g, b, 255);
};

Fire.Color.prototype.toPixiHex = function () {
    var c = this.toHEX('#rrggbb');
    c = c.replace(/^#?/, "0x");
    c = parseInt(c);
    return c;
};


Runtime.deepQueryChildren = function (root, cb) {
    function traversal (node, cb) {
        var children = node.children;

        for (var i = 0; i<children.length; i++) {
            var child = children[i];

            if (!cb( child )) break;

            traversal(child, cb);
        }
    }

    traversal(root, cb);
}
