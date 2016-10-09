var Circle = function () {
    this.material = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });

    this.radius = 5;
    this.segments = 16;

    this.circleGeo = new THREE.CircleGeometry(this.radius, this.segments);

    this.object = new THREE.Mesh(this.circleGeo, this.material);
};