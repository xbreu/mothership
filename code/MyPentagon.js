class MyPentagon extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0,    0,   0,
            2,    0,   0,
            2,    1,   0,
            0.7,  1,   0,
            0,    0.3, 0
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            1, 2, 5,
            5, 2, 1,

            2, 5, 3,
            3, 5, 2,

            5, 4, 3,
            3, 4, 5
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

