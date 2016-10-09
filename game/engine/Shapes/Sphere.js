var Sphere = function (radius, segments, rings, material) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(
            radius,
            segments,
            rings),

        material
    );
};