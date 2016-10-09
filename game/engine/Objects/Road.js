var Road = function (start, end) {
    this.index;
    this.id;

    this.start = start.clone();
    this.end = end.clone();
    this.width = 10;
    var halfWidth = this.width / 2;

    this.centerStart = start.clone();
    this.centerEnd = end.clone();

    var angle = Math.atan2(this.centerStart.z - this.centerEnd.z, this.centerStart.x - this.centerEnd.x) + THREE.Math.degToRad(90);

    var distanceFromGround = 0.1;

    var geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3(
            this.centerStart.x + halfWidth * Math.cos(angle),
            distanceFromGround,
            this.centerStart.z + halfWidth * Math.sin(angle)
        )
    );

    geometry.vertices.push(
        new THREE.Vector3(
            this.centerEnd.x + halfWidth * Math.cos(angle),
            distanceFromGround,
            this.centerEnd.z + halfWidth * Math.sin(angle)
        )
    );

    geometry.vertices.push(
        new THREE.Vector3(
            this.centerEnd.x - halfWidth * Math.cos(angle),
            distanceFromGround,
            this.centerEnd.z - halfWidth * Math.sin(angle)
        )
    );

    geometry.vertices.push(
        new THREE.Vector3(
            this.centerStart.x - halfWidth * Math.cos(angle),
            distanceFromGround,
            this.centerStart.z - halfWidth * Math.sin(angle)
        )
    );

    geometry.vertices.push(
        new THREE.Vector3(
            this.centerStart.x + halfWidth * Math.cos(angle),
            distanceFromGround,
            this.centerStart.z + halfWidth * Math.sin(angle)
        )
    );

    geometry.faces.push(new THREE.Face3(0, 1, 3));
    geometry.faces.push(new THREE.Face3(2, 3, 1));

    var material = new THREE.MeshBasicMaterial({color: 0x999999, side: THREE.DoubleSide});

    this.object = new THREE.Mesh(geometry, material);

    GLOBAL.mainScene.addObject(this.object);
};