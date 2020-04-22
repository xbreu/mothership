/**
 * MyScene
 * @constructor
 */
class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 10, 0);
        this.cubemap = new MyUnitCubeQuad(this);
        this.vehicle = new MyVehicle(this);

        //Initialize textures
        this.earthTexture = new CGFappearance(this);
        this.earthTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.earthTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earthTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.earthTexture.setShininess(10.0);
        this.earthTexture.loadTexture('images/earth.jpg');
        this.earthTexture.setTextureWrap('REPEAT', 'REPEAT');

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCylinder = true;
        this.displaySphere = false;
        this.displayNormals = false;
        this.nightMode = false;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        // Check for key codes e.g. in ​ https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;
        }
        if (keysPressed)
            console.log(text);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.checkKeys();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates

        this.vehicle.display();

        if (this.displayCylinder) {
            this.earthTexture.apply();
            this.cylinder.display();
        }
        if (this.displaySphere) {
            this.earthTexture.apply();
            this.incompleteSphere.display();
        }
        if (this.displayNormals)
            this.cylinder.enableNormalViz();

        this.cubemap.setNightMode(this.nightMode);
        this.scale(50, 50, 50);
        this.cubemap.display();
        // ---- END Primitive drawing section
    }
}