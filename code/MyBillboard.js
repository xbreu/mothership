class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.nSuppliesDelivered = 0;
    }

    incrementSupplies() {
        this.nSuppliesDelivered++;
    }

    decrementSupplies() {
        this.nSuppliesDelivered--;
    }
}