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
        this.terrain = new MyTerrain(this);

        //Initialize textures
        this.initTextures();

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCylinder = false;
        this.displaySphere = false;
        this.displayNormals = false;
        this.displayTerrain = true;
        this.nightMode = false;

        this.selectedMapTexture = 0;
        this.textureIds = {'Day': 0, 'Night': 1};
        this.speedFactor = 1;
        this.scaleFactor = 1;
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

    initTextures() {
        this.earthTexture = new CGFappearance(this);
        this.earthTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.earthTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earthTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.earthTexture.setShininess(10.0);
        this.earthTexture.loadTexture('images/earth.jpg');
        this.earthTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.terrainTexture = new CGFappearance(this);
        this.terrainTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.terrainTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.terrainTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.terrainTexture.setShininess(10.0);
        this.terrainTexture.loadTexture('images/terrain.jpg');
        this.terrainTexture.setTextureWrap('REPEAT', 'REPEAT');
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    updateMapTexture() {
        console.log(this.selectedMapTexture);
        this.cubemap.setNightMode(this.selectedMapTexture == 1);
    }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        // Check for key codes e.g. in ​ https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            keysPressed = true;
            this.vehicle.accelerate(0.01);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;
            this.vehicle.accelerate(-0.01);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            text += " W ";
            keysPressed = true;
            this.vehicle.turn(0.1);
        }
        if (this.gui.isKeyPressed("KeyD")) {
            text += " S ";
            keysPressed = true;
            this.vehicle.turn(-0.1);
        }
        if (this.gui.isKeyPressed("KeyR")) {
            text += " S ";
            keysPressed = true;
            this.vehicle.reset();
        }
        if (keysPressed)
            console.log(text);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.checkKeys();
        this.vehicle.update(this.speedFactor);
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

        this.vehicle.display(this.scaleFactor);

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

        this.scale(10, 10, 10);
        let terrainScale = 50;
        if (this.displayTerrain) {
            this.pushMatrix();
            this.translate(0, -terrainScale / 2 + 0.1, 0);
            this.rotate(Math.PI / 2, 1, 0, 0);
            this.rotate(Math.PI, 0, 1, 0);
            this.scale(terrainScale, terrainScale, 1);
            this.terrain.display();
            this.popMatrix();
        }
        this.scale(terrainScale, terrainScale, terrainScale);
        this.cubemap.display();
        // ---- END Primitive drawing section
    }
}