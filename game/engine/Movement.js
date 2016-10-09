var Movement = function () {
    var M = this;
    this.UP_KEY_PRESSED = false;
    this.DOWN_KEY_PRESSED = false;
    this.LEFT_KEY_PRESSED = false;
    this.RIGHT_KEY_PRESSED = false;
    this.ZOOM_IN_PRESSED = false;
    this.ZOOM_OUT_PRESSED = false;
    this.ROTATE_LEFT_KEY_PRESSED = false;
    this.ROTATE_RIGHT_KEY_PRESSED = false;
    this.TILT_DOWN_KEY_PRESSED = false;
    this.TILT_UP_KEY_PRESSED = false;

    this.velX = 0;
    this.velY = 0;
    this.turnAcceleration = 0;
    this.tiltAcceleration = 0;

    window.addEventListener('keydown', function (e) {
        if (e.keyCode === Movement.UP_KEY) {
            M.UP_KEY_PRESSED = true;
        }
        if (e.keyCode === Movement.DOWN_KEY) {
            M.DOWN_KEY_PRESSED = true;
        }
        if (e.keyCode === Movement.LEFT_KEY) {
            M.LEFT_KEY_PRESSED = true;
        }
        if (e.keyCode === Movement.RIGHT_KEY) {
            M.RIGHT_KEY_PRESSED = true;
        }
        if (e.keyCode === Movement.ZOOM_IN_KEY) {
            M.ZOOM_IN_PRESSED = true;
        }
        if (e.keyCode === Movement.ZOOM_OUT_KEY) {
            M.ZOOM_OUT_PRESSED = true;
        }
        if (e.keyCode === Movement.ROTATE_LEFT_KEY) {
            M.ROTATE_LEFT_KEY_PRESSED = true;
        }
        if (e.keyCode === Movement.ROTATE_RIGHT_KEY) {
            M.ROTATE_RIGHT_KEY_PRESSED = true;
        }
        /*if (e.keyCode === Movement.TILT_DOWN_KEY) {
            M.TILT_DOWN_KEY_PRESSED = true;
        }
        if (e.keyCode === Movement.TILT_UP_KEY) {
            M.TILT_UP_KEY_PRESSED = true;
        }*/
    }, false);

    window.addEventListener('keyup', function (e) {
        if (e.keyCode === Movement.UP_KEY) {
            M.UP_KEY_PRESSED = false;
        }
        if (e.keyCode === Movement.DOWN_KEY) {
            M.DOWN_KEY_PRESSED = false;
        }
        if (e.keyCode === Movement.LEFT_KEY) {
            M.LEFT_KEY_PRESSED = false;
        }
        if (e.keyCode === Movement.RIGHT_KEY) {
            M.RIGHT_KEY_PRESSED = false;
        }
        if (e.keyCode === Movement.ZOOM_IN_KEY) {
            M.ZOOM_IN_PRESSED = false;
        }
        if (e.keyCode === Movement.ZOOM_OUT_KEY) {
            M.ZOOM_OUT_PRESSED = false;
        }
        if (e.keyCode === Movement.ROTATE_LEFT_KEY) {
            M.ROTATE_LEFT_KEY_PRESSED = false;
        }
        if (e.keyCode === Movement.ROTATE_RIGHT_KEY) {
            M.ROTATE_RIGHT_KEY_PRESSED = false;
        }
        if (e.keyCode === Movement.TILT_DOWN_KEY) {
            M.TILT_DOWN_KEY_PRESSED = false;
        }
        if (e.keyCode === Movement.TILT_UP_KEY) {
            M.TILT_UP_KEY_PRESSED = false;
        }
    }, false);
};
Movement.UP_KEY = 87;
Movement.DOWN_KEY = 83;
Movement.LEFT_KEY = 65
Movement.RIGHT_KEY = 68;
Movement.ZOOM_IN_KEY = 90;
Movement.ZOOM_OUT_KEY = 88;
Movement.ROTATE_LEFT_KEY = 81;
Movement.ROTATE_RIGHT_KEY = 69;
Movement.TILT_UP_KEY = 82;
Movement.TILT_DOWN_KEY = 70;
Movement.MAX_ZOOM = 300;
Movement.MIN_ZOOM = 30;
Movement.MOVE_SPEED = 0.1;
Movement.ZOOM_SPEED = 1;

Movement.prototype.move = function (entity, delta) {
    // http://www.kirupa.com/developer/actionscript/trigonometry.htm
    // x        left and right
    // y        up and down
    // z        zoom
    // pitch    tilt
    var x = entity.position.x;
    var y = entity.position.y;
    var z = entity.position.z;
    var radians = entity.rotation.z;
    var tilt = entity.rotation.x;

    if (this.ZOOM_IN_PRESSED) {
        z += Movement.ZOOM_SPEED;
    } else if (this.ZOOM_OUT_PRESSED) {
        z -= Movement.ZOOM_SPEED;
    }

    if (z > Movement.MAX_ZOOM) {
        z = Movement.MAX_ZOOM;
    }
    if (z < Movement.MIN_ZOOM) {
        z = Movement.MIN_ZOOM;
    }

    if (this.TILT_DOWN_KEY_PRESSED) {
        this.tiltAcceleration += 0.0001;
    } else if (this.TILT_UP_KEY_PRESSED) {
        this.tiltAcceleration -= 0.0001;
    }

    if (this.ROTATE_LEFT_KEY_PRESSED) {
        this.turnAcceleration += 0.001;
    } else if (this.ROTATE_RIGHT_KEY_PRESSED) {
        this.turnAcceleration -= 0.001;
    }

    this.tiltAcceleration *= 0.98;
    this.turnAcceleration *= 0.9;

    tilt += this.tiltAcceleration;
    radians += this.turnAcceleration;

    var movementRadians = radians * -1;


    if (this.UP_KEY_PRESSED) {
        this.velY += Math.cos(movementRadians) * (Movement.MOVE_SPEED * -1);
        this.velX += Math.sin(movementRadians) * (Movement.MOVE_SPEED * -1);
    } else if (this.DOWN_KEY_PRESSED) {
        this.velY += Math.cos(movementRadians) * Movement.MOVE_SPEED;
        this.velX += Math.sin(movementRadians) * Movement.MOVE_SPEED;
    } else if (this.LEFT_KEY_PRESSED) {
        this.velY += Math.cos(movementRadians - 1.571) * (Movement.MOVE_SPEED * -1);
        this.velX += Math.sin(movementRadians - 1.571) * (Movement.MOVE_SPEED * -1);
    } else if (this.RIGHT_KEY_PRESSED) {
        this.velY += Math.cos(movementRadians - 1.571) * (Movement.MOVE_SPEED);
        this.velX += Math.sin(movementRadians - 1.571) * (Movement.MOVE_SPEED);
    }

    this.velX *= 0.9;
    this.velY *= 0.9;

    entity.position.x = x - this.velX;
    entity.position.y = y - this.velY;
    entity.position.z = z;
    entity.rotation.z = radians;
    entity.rotation.x = tilt;
};