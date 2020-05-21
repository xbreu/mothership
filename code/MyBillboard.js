class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.nSuppliesDelivered = 0;
        this.support = new MyQuad(scene);
        this.board = new MyQuad(scene);
        this.gray = new CGFappearance(this.scene);
        this.gray.setAmbient(5 * 0.5, 5 * 0.5, 5 * 0.5, 1.0);
        this.gray.setDiffuse(0.0, 0.0, 0.0, 1);
        this.gray.setSpecular(0.0, 0.0, 0.0, 1);
        this.gray.setShininess(1.0);
        this.black = new CGFappearance(this.scene);
        this.black.setAmbient(5 * 0.2, 5 * 0.2, 5 * 0.2, 1.0);
        this.black.setDiffuse(0.0, 0.0, 0.0, 1);
        this.black.setSpecular(0.0, 0.0, 0.0, 1);
        this.black.setShininess(1.0);
    }

    resetSupplies() {
        this.nSuppliesDelivered = 0;
    }

    incrementSupplies() {
        this.nSuppliesDelivered++;
    }

    display(scale) {
        this.scene.pushMatrix();
        this.gray.apply();
        this.scene.translate(0, 1.5, 5);

        this.scene.pushMatrix();
        this.scene.scale(2 * scale, scale, scale);
        this.board.display();
        this.scene.scale(1, -1, 1);
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

        this.scene.popMatrix();
    }
}