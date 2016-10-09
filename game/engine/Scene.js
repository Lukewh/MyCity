var Scene = function (canvas) {
    this.near = 0.1;
    this.far = 10000;

    this.renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    this.renderer.setClearColor( 0xADE4FF, 1 );

    var VIEW_ANGLE = 45;
    var ASPECT = window.innerWidth / window.innerHeight;
    var NEAR = 0.1;
    var FAR = 10000;

    this.camera = new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );

    this.scene = new THREE.Scene();

    this.scene.add(this.camera);

    this.camera.position.set(0, 150, 400);

    this.camera.lookAt(this.scene.position);

    this.camera.position.z = 300;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
};

Scene.prototype.addObject = function (obj) {
    this.scene.add(obj);
};

Scene.prototype.removeObject = function (obj) {
    this.scene.remove(obj);
};

Scene.prototype.render = function () {
    this.renderer.render(this.scene, this.camera);
};