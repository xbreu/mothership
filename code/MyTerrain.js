class MyTerrain extends CGFobject {
    constructor(scene, image="images/terrain.jpg", heightmap="images/heightmap.jpg") {
        super(scene);
        this.plane = new MyPlane(scene, 1);
    }

    display() {
        this.plane.display();
    }
}