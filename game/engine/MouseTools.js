(function () {
    var worldPosition = [0,0];
    var firstClick = false;

    function onDocumentMouseMove(event) {
        var mouse = GLOBAL.mouse;
        var mainScene = GLOBAL.mainScene;
        var layerTiles = GLOBAL.layerTiles;
        var pointer = GLOBAL.pointer;
        var tool = GLOBAL.selectedTool;
        // the following line would stop any other event handler from firing
        // (such as the mouse's TrackballControls)
        // event.preventDefault();

        // update the mouse variable
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

        //pointer.protoShape.position.set()

        // find intersections

        // create a Ray with origin at the mouse position
        //   and direction into the scene (camera direction)
        var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
        vector.unproject(mainScene.camera);
        var ray = new THREE.Raycaster(mainScene.camera.position, vector.sub(mainScene.camera.position).normalize());

        // create an array containing all objects in the scene with which the ray intersects
        // Only works if underneath the plane atm
        var intersects = ray.intersectObject(GLOBAL.ground);

        // if there is one (or more) intersections
        if (intersects.length > 0) {
            // change the color of the closest face.
            pointer.object.position.set(intersects[0].point.x, pointer.object.position.y, intersects[0].point.z);
            worldPosition[0] = intersects[0].point.x;
            worldPosition[1] = intersects[0].point.z;

            if (tool) {
                if (tool.move) {
                    tool.move(new THREE.Vector3(worldPosition[0], 1, worldPosition[1]));
                }
                if (firstClick) {
                    tool.protoShape.setEnd(new THREE.Vector3(worldPosition[0], 1, worldPosition[1]));
                }
            }
        }
    };

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    function onDocumentMouseUp(event) {
        if (event.button === 0) {
            var x = worldPosition[0];
            var z = worldPosition[1];
            var tool = GLOBAL.selectedTool;
            if (tool) {
                if (!firstClick) {
                    tool.protoShape.setStart(new THREE.Vector3(x, 1, z));
                    firstClick = true;
                } else {
                    tool.protoShape.setEnd(new THREE.Vector3(x, 1, z));
                    tool.end();
                    firstClick = false;
                }
            }
        }
    };

    document.addEventListener('mouseup', onDocumentMouseUp, false);
}());