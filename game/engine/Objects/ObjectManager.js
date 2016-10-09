var ObjectManager = function (name) {
    this.name = name;
    this.idStart = name.substr(0,1);

    this.debugLines = [];

    this.items = [];
};

ObjectManager.prototype.add = function (object) {
    var _index = this.items.length;
    var _id = this.idStart + _index;

    object.index = _index;
    object.id = _id;

    console.log(object);
    this.items.push(object);
};

ObjectManager.prototype.getNearest = function (position) {
    var OM = this;
    if (this.debugLines && this.debugLines.length !== 0) {
        this.debugLines.forEach(function (line) {
            GLOBAL.mainScene.removeObject(line.object);
        });
    }
    this.items.forEach(function (item) {
        var startLine = new Line();
        var endLine = new Line();
        var interceptLine = new Line(5, 0x0000ff);
        var _centerStart = item.centerStart.clone();
        var _centerEnd = item.centerEnd.clone();

        var angle = Math.atan2(_centerStart.z - position.z, _centerStart.x - position.x);
        var hypotenuse = _centerStart.distanceTo(position);
        var perpendicularAngle = Math.atan2(_centerStart.z - _centerEnd.z, _centerStart.x - _centerEnd.x) + THREE.Math.degToRad(90);

        console.log(THREE.Math.radToDeg(angle), THREE.Math.radToDeg(perpendicularAngle));

        interceptLine.setStart(position.clone());
        interceptLine.setEnd(new THREE.Vector3(
            position.x + 100 * Math.cos(perpendicularAngle),
            _centerStart.y,
            position.z + 100 * Math.sin(perpendicularAngle)
        ));

        startLine.setStart(_centerStart);
        startLine.setEnd(position);

        endLine.setStart(_centerEnd);
        endLine.setEnd(position);

        GLOBAL.mainScene.addObject(startLine.object);
        GLOBAL.mainScene.addObject(endLine.object);
        GLOBAL.mainScene.addObject(interceptLine.object);

        console.log()

        OM.debugLines.push(startLine);
        OM.debugLines.push(endLine);
        OM.debugLines.push(interceptLine);
    });
};