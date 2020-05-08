class MyTerrain extends CGFobject {
    constructor(scene, image = "images/terrain.jpg", heightmap = "images/heightmap.jpg") {
        super(scene);
        this.plane = new MyPlane(scene, 1);
        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    }

    display() {
        this.scene.setActiveShader(this.terrainShader);
        this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}