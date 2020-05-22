class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.nSuppliesDelivered = 0;
        this.support = new MyQuad(scene);
        this.board = new MyQuad(scene);
        this.gray = new CGFappearance(this.scene);
        this.gray.setAmbient(5 * 0.8, 5 * 0.8, 5 * 0.8, 1.0);
        this.gray.setDiffuse(0.0, 0.0, 0.0, 1);
        this.gray.setSpecular(0.0, 0.0, 0.0, 1);
        this.gray.setShininess(1.0);
        this.black = new CGFappearance(this.scene);
        this.black.setAmbient(5 * 0.2, 5 * 0.2, 5 * 0.2, 1.0);
        this.black.setDiffuse(0.0, 0.0, 0.0, 1);
        this.black.setSpecular(0.0, 0.0, 0.0, 1);
        this.black.setShininess(1.0);

        this.texture = this.initTexture("billboard");

        this.progressShader = new CGFshader(this.scene.gl, "shaders/billboard.vert", "shaders/billboard.frag");
        this.progressShader.setUniformsValues({uSampler2: 1});
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

    resetSupplies() {
        this.nSuppliesDelivered = 0;
    }

    incrementSupplies() {
        this.nSuppliesDelivered++;
    }

    display(scale) {
        this.scene.pushMatrix();
        this.texture.apply();
        this.scene.translate(0, 1.5, 5);

        this.scene.pushMatrix();
        this.scene.scale(2 * scale, scale, scale);
        this.board.display();
        this.scene.scale(-1, 1, 1);
        this.board.display();
        this.scene.popMatrix();

        this.black.apply();
        for (let j = -1; j < 2; j += 2) {
            for (let i = -1; i < 2; i += 2) {
                this.scene.pushMatrix();
                this.scene.scale(0.05 * scale, scale, 0.05 * scale);
                this.scene.translate(15 * i, -1, 0);
                this.scene.scale(1, j, 1);
                this.support.display();
                this.scene.popMatrix();
            }
        }

        this.progressShader.setUniformsValues({normScale: this.scaleFactor});
        this.progressShader.setUniformsValues({nSuppliesDelivered: this.nSuppliesDelivered});
        this.scene.setActiveShader(this.progressShader);
        this.black.apply();
        this.scene.pushMatrix();
        this.scene.scale(1.5 * scale, 0.2 * scale, scale);
        this.scene.translate(0, -1, -0.001);
        this.board.display();
        this.scene.popMatrix();


        this.scene.popMatrix();
    }
}