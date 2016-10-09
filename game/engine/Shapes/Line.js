var Line = function (width, color) {
    var material = new THREE.LineBasicMaterial({
        color: color || 0xff0000,
        lineWidth: width || 1
    });

    this.geometry = new THREE.Geometry();

    this.geometry.vertices.push(new THREE.Vector3(0, 0.1, 0));
    this.geometry.vertices.push(new THREE.Vector3(0,0.1, 0));

    this.object = new THREE.Line(this.geometry, material);
};

Line.prototype.setStart = function (vec3) {
    this.geometry.vertices[0] = vec3;
};

Line.prototype.setEnd = function (vec3) {
    this.geometry.vertices[1] = vec3;
    this.geometry.verticesNeedUpdate = true;
};