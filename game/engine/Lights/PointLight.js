var PointLight = function (color, x, y, z) {
    var light = new THREE.PointLight(color);

    light.position.x = x;
    light.position.y = y;
    light.position.z = z;

    return light;
};