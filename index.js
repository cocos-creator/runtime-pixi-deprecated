
if (Editor.isCoreLevel) {
    global.Runtime = {};

    require('./share');
    require('./core');
}
else {
    window.Runtime = {};

    require('./share');
    require('./page');
}

module.exports = Runtime;
