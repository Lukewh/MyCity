var TOOL_TYPES = {
    select: function (name) {
        if (TOOL_TYPES[name]) {
            TOOL_TYPES[name].protoShape = TOOL_TYPES[name].createShape();
            GLOBAL.mainScene.addObject(TOOL_TYPES[name].protoShape.object);
            return TOOL_TYPES[name];
        }
    },
    road: {
        createShape: function() {
            return new Line();
        },
        protoShape: false,
        move: function (position) {
            GLOBAL.objects.roads.getNearest(position);
        },
        end: function () {
            console.log(this);
            var vertices = this.protoShape.object.geometry.vertices;
            GLOBAL.objects.roads.add(new Road(vertices[0], vertices[1]));

            GLOBAL.mainScene.removeObject(this.protoShape.object);
            this.protoShape = null;

            TOOL_TYPES.select('road');
        }
    }
};