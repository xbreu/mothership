const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);
        this.state = SupplyStates.INACTIVE;
        this.velocity = 0;
        this.initFaces();
        this.initTexture();
    }

    initFaces() {
        this.top = new MyQuad(this.scene);
        this.bottom = new MyQuad(this.scene);
        this.front = new MyQuad(this.scene);
        this.back = new MyQuad(this.scene);
        this.right = new MyQuad(this.scene);
        this.left = new MyQuad(this.scene);
        this.texRight = this.initTexture("right");
        this.texLeft = this.initTexture("left");
        this.texFront = this.initTexture("front");
        this.texBack = this.initTexture("back");
        this.texTop = this.initTexture("top");
        this.texBottom = this.initTexture("bottom");
    }

    initTexture(image, wrap1 = 'REPEAT', wrap2 = wrap1) {
        let texture = new CGFappearance(this.scene);
        texture.setAmbient(10.0, 10.0, 10.0, 1);
        texture.setDiffuse(0.0, 0.0, 0.0, 1);
        texture.setSpecular(0.0, 0.0, 0.0, 1);
        texture.setShininess(1.0);
        texture.loadTexture('images/split_box/night-' + image + '.png');
        texture.setTextureWrap(wrap1, wrap2);
        return texture;
    }

    displayShape(shape, color) {
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        color.apply();
        shape.display();
        this.scene.popMatrix();
    }

    drop(x, y, z) {
        this.state = SupplyStates.FALLING;
        this.velocity = 0;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    update() {
        if (this.state === SupplyStates.FALLING) {
            this.velocity += 0.1;
            this.y -= this.velocity;
            if (this.y <= 0) {
                this.y = 0;
                this.state = SupplyStates.LANDED;
            }
        }
    }

    display(scale) {
        if (this.state === SupplyStates.INACTIVE)
            return;
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(0.4 * scale, 0.4 * scale, 0.4 * scale);

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.displayShape(this.top, this.texTop);

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.bottom, this.texBottom);

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.displayShape(this.right, this.texRight);

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.displayShape(this.left, this.texLeft);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.displayShape(this.front, this.texFront);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.displayShape(this.back, this.texBack);

        this.scene.popMatrix();
    }
}