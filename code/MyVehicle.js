/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {

    constructor(scene) {
        super(scene);
        this.pyramid = new MyPyramid(scene,4,1);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5,1,0.5);
        this.pyramid.display();
        this.scene.popMatrix();
    }


}