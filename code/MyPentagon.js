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
            0, 1, 4,
            4, 1, 0,

            1, 4, 2,
            2, 4, 1,

            4, 3, 2,
            2, 3, 4
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

