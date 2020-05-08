class MyTerrain extends CGFobject {
    constructor(scene, image = "images/terrain.jpg", heightmap = "images/heightmap.jpg") {
        super(scene);
        this.plane = new MyPlane(scene, 1);
        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.color = new CGFtexture(this.scene, image);
        this.map = new CGFtexture(this.scene, heightmap);
        this.terrainShader.setUniformsValues({uSampler2: 2});
    }

    display() {
        this.terrainShader.setUniformsValues({normScale: this.scaleFactor});
        this.scene.setActiveShader(this.terrainShader);
        this.color.bind(1);
        this.map.bind(2);
        this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}