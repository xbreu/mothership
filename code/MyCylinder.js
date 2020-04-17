/**
 * MyCylinder
 * @constructor
 */
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {

            this.vertices.push(Math.cos(ang), 0.5, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), -0.5, -Math.sin(ang));
            this.indices.push(i * 2, (i * 2 + 1) % (this.slices * 2), (i * 2 + 2) % (this.slices * 2));
            this.indices.push((i * 2 + 3) % (this.slices * 2), (i * 2 + 2) % (this.slices * 2), (i * 2 + 1) % (this.slices * 2));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.texCoords.push(i/this.slices-1,0);
            this.texCoords.push(i/this.slices-1,1);
            ang += alphaAng;
        }

        console.log(this.texCoords);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


