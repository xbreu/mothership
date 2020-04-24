/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {

    constructor(scene) {
        super(scene);
        this.reset();
        this.pyramid = new MyPyramid(scene, 4, 1);
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = 0;
        this.speed = 0;
    }

    update() {
        this.z += Math.cos(this.rotation) * this.speed;
        this.x += Math.sin(this.rotation) * this.speed;
    }

    turn(val) {
        this.rotation += val;
    }

    accelerate(val) {
        this.speed += val;
        if (this.speed < 0)
            this.speed = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.rotation, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.5, 1, 0.5);
        this.pyramid.display();
        this.scene.popMatrix();
    }


}