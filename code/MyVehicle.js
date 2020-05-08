/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {

    constructor(scene) {
        super(scene);
        this.reset();
        this.balloon = new MySphere(scene, 12, 6);
        this.board = new MyCylinder(scene, 6);
        this.texture = this.initTexture("zeppelin");
        this.black = this.initColor(33, 17, 19);

        this.Rudders = [new MyPentagon(scene), new MyPentagon(scene), new MyPentagon(scene), new MyPentagon(scene)];
        this.propeller = new MyPropeller(scene, 6);
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
        aux.setAmbient(5 * r, 5 * g, 5 * b, 1.0);
        aux.setDiffuse(0.0, 0.0, 0.0, 1);
        aux.setSpecular(0.0, 0.0, 0.0, 1);
        aux.setShininess(1.0);
        return aux;
    }

    update(factor, turn = 0) {
        this.z += Math.cos(this.rotation) * this.speed * factor;
        this.x += Math.sin(this.rotation) * this.speed * factor;
        this.propeller.update(factor);
        this.turning = turn;
    }

    turn(val) {
        this.rotation += val;
    }

    accelerate(val) {
        this.speed += val;
        if (this.speed < 0)
            this.speed = 0;
        this.propeller.accelerate(val);
    }

    display(scale) {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.rotation, 0, 1, 0);

        this.scene.pushMatrix();
        this.scene.rotate(-3 * Math.PI / 8, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.5 * scale, 1.5 * scale, 0.5 * scale);
        this.texture.apply();
        this.balloon.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.5 * scale, 1 * scale, 0.5 * scale);
        this.scene.translate(0, 0.2, 0.9);
        this.scene.scale(0.15, 0.3, 0.2);
        this.black.apply();
        this.board.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.scale(0.2 * scale, 0.2 * scale, 0.2 * scale);

        this.scene.pushMatrix();
        this.scene.translate(1, 0, -6);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.Rudders[0].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 0, -6);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.Rudders[1].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, -6);
        this.scene.rotate(this.turning * Math.PI / 15, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.Rudders[2].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1, -6);
        this.scene.rotate(this.turning * Math.PI / 15, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.Rudders[3].display();
        this.scene.popMatrix();

        for (let i = -1; i <= 1; i += 2) {
            this.scene.pushMatrix();
            this.scene.translate(i * 1.5, -2.5, 0);
            this.scene.scale(0.1, 0.1, 0.1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.propeller.display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.scene.translate(0, -2.5, -4.5);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.propeller.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.popMatrix();
    }


}