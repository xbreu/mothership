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
        this.balloon = new MySphere(scene, 16, 8);
        this.board = new MyCylinder(scene, 6);
        this.texture = this.initTexture("zeppelin");
        this.black = this.initColor(0, 0, 0);
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = 0;
        this.speed = 0;
    }

    initTexture(image, wrap1 = 'REPEAT', wrap2 = wrap1) {
        let texture = new CGFappearance(this.scene);
        texture.setAmbient(10.0, 10.0, 10.0, 1);
        texture.setDiffuse(0.0, 0.0, 0.0, 1);
        texture.setSpecular(0.0, 0.0, 0.0, 1);
        texture.setShininess(1.0);
        texture.loadTexture('images/' + image + '.png');
        texture.setTextureWrap(wrap1, wrap2);
        return texture;
    }

    initColor(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        let aux = new CGFappearance(this.scene);
        aux.setAmbient(r, g, b, 1.0);
        aux.setDiffuse(0, 0, 0, 1.0);
        aux.setSpecular(1.0, 1.0, 1.0, 1.0);
        aux.setShininess(10.0);
        return aux;
    }

    update(factor) {
        this.z += Math.cos(this.rotation) * this.speed * factor;
        this.x += Math.sin(this.rotation) * this.speed * factor;
    }

    turn(val) {
        this.rotation += val;
    }

    accelerate(val) {
        this.speed += val;
        if (this.speed < 0)
            this.speed = 0;
    }

    display(scale) {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.rotation, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.5 * scale, 1 * scale, 0.5 * scale);
        this.black.apply();
        this.balloon.display();
        this.scene.translate(0, 0.1, 0.8);
        this.scene.scale(0.5, 0.4, 0.4);
        this.board.display();
        this.scene.popMatrix();
    }


}