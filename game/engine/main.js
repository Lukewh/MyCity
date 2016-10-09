var ENGINE_SCRIPTS = [
    'engine/helpers.js',
    'engine/lib/three.min.js',
    'engine/lib/three.Projector.js',
    'engine/lib/three.OrbitControls.js',
    'engine/MouseTools.js',
    'engine/Scene.js',

    // Shapes
    'engine/Shapes/Sphere.js',
    'engine/Shapes/Circle.js',
    'engine/Shapes/Line.js',

    // Materials
    'engine/Materials/SphereMaterial.js',

    // Lights
    'engine/Lights/PointLight.js',

    // Types
    'engine/ToolTypes.js',

    // Objects
    'engine/Objects/ObjectManager.js',
    'engine/Objects/Road.js'
];

var CACHE = {};

CACHE.scripts = [];
CACHE.shaders = [];

var singleLoad = function (script, fn) {
    console.time(script);
    if (CACHE.scripts.indexOf(script) !== -1 || CACHE.shaders.indexOf(script) !== -1) {
        console.timeEnd(script);
        fn(script);
        return;
    }

    if (script.indexOf('.js') !== -1) {
        var ele = document.createElement('script');

        var loadHandler = function(){
            if(!this.readyState || '/ded|co/'.test(this.readyState)){
                ele.onload = ele.onreadystatechange = null;
                CACHE.scripts.push(script);
                console.timeEnd(script);
                fn && fn(script);
                script = null;
            }
        };

        ele.onload = ele.onreadystatechange = loadHandler;

        ele.setAttribute('src', script);
        ele.setAttribute('id', script);
        ele.setAttribute('type', 'application/javascript');

        document.getElementsByTagName('head')[0].appendChild(ele);

    }

    //ele.setAttribute(', true);
};

var multiLoad = function (scripts, fn) {
    var expect = scripts.length;
    var received = 0;

    var complete = function () {
        received += 1;
        if (received === expect) {
            if (fn) {
                fn();
            }
        } else {
            next();
        }
    };

    var next = function () {
        var script = scripts.splice(0, 1);

        singleLoad(script[0], complete);
    };

    next();
};

// Setup global objects
var GLOBAL = {};

GLOBAL.MAP_SIZE = 1000; // 1 unit = 1 meter
GLOBAL.MAP_SEGMENT_SIZE = 100; // 100 meters

GLOBAL.layerTiles = [];

GLOBAL.mouse = {
    x: 0,
    y: 0
};

GLOBAL.selectedTool = false;

GLOBAL.objects = {};

var setFlat = function (obj, elevation) {
    obj.rotation.set(degToRad(-90), 0, 0);
    if (elevation) {
        obj.position.y = elevation;
    }
};

multiLoad(ENGINE_SCRIPTS, function () {
    GLOBAL.mainScene = new Scene();

    GLOBAL.objects.roads = new ObjectManager('roads');

    var mainScene = GLOBAL.mainScene;
    var MAP_SIZE = GLOBAL.MAP_SIZE;
    var MAP_SEGMENT_SIZE = GLOBAL.MAP_SEGMENT_SIZE;

    var layerTiles = GLOBAL.layerTiles;
    var groundGeo = new THREE.PlaneBufferGeometry(MAP_SIZE, MAP_SIZE);
    var grassMaterial = new THREE.MeshBasicMaterial({
        color: 0xBEFFAD,
        side: THREE.DoubleSide
    });
    var ground = new THREE.Mesh(groundGeo, grassMaterial);
    GLOBAL.ground = ground;
    //var light = new PointLight(0xFFFFFF, 0, 0, 1);

    setFlat(ground);
    mainScene.addObject(ground);
    //mainScene.addObject(light);

    GLOBAL.pointer = new Circle();
    setFlat(GLOBAL.pointer.object, 0.1);
    mainScene.addObject(GLOBAL.pointer.object);


    GLOBAL.selectedTool = TOOL_TYPES.select('road');


    var startX = 0 - (MAP_SIZE / 2);
    var startZ = 0 - (MAP_SIZE / 2);

    var mesh;
    var i;
    var j;
    var x;
    var z;

    layerTiles.push([]);

    for (i = 0; i < MAP_SIZE / MAP_SEGMENT_SIZE; i += 1) {
        x = startX + (MAP_SEGMENT_SIZE * i);
        x += (MAP_SEGMENT_SIZE / 2);
        for (j = 0; j < MAP_SIZE / MAP_SEGMENT_SIZE; j += 1) {
            z = startZ + (MAP_SEGMENT_SIZE * j);
            z += (MAP_SEGMENT_SIZE / 2);

            mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(MAP_SEGMENT_SIZE, MAP_SEGMENT_SIZE),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    wireframe: true,
                    opacity: 0.2,
                    vertexColors: THREE.FaceColors
                })
            );

            mesh.position.set(x, 0.5, z);
            mesh.rotation.set(degToRad(-90), 0, 0);
            layerTiles[0].push(mesh);
        }
    }

    layerTiles.forEach(function (layer) {
        layer.forEach(function (tile) {
    //        mainScene.addObject(tile);
        });
    });

    var controls = new THREE.OrbitControls(mainScene.camera);


    var projector = new THREE.Projector();


    var step = function (delta) {
        controls.update();

        mainScene.render();

        window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);

});