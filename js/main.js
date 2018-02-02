var gl;

// Camera
var myCamera;
var lastX;
var lastY;
var firstMouse = true;
var enableMouse = true;

// Deltatime
var deltaTime = 0.0;	// Time between current frame and last frame
var lastFrame = 0.0;	// Time of last frame

var framebufferSetupSceneRGBA32F;


var framebufferDepth;
var textureFramebufferDepth;

var framebufferCoCSize;
var textureFramebufferCoCSize;

var framebufferApplyDoFPass;
var textureFramebufferApplyDoF;

var screenFillingVertexPositionBuffer;
var screenFillingTextureCoordBuffer;
var screenFillingIndexBuffer;

var elapsed;
var time_start;

var bokehStrength = 1.0;

var lightPos = vec3.fromValues(10.0, 0.0, 0.0);

var lightPointPos = vec3.fromValues(10.0, 10.0, 15.0);

var ext3;
var MRTfbData;

var Aperture = 2.29; // 1.0 // 0.6 // Old: 0.6 
var focalLength = 5.52; //Old: 0.021
var _focalPlane = 0.0034;

var CoCScale;
var CoCBias;

var farBlurdistancelimit = 2.0;

var framebufferSecondBlurPass;
var textureSecondBlurrPass;

var downsampleCoefficient = 4.0;

var indexIterationBlur = 0.0;

var enableIndividualIteration = true;

var mMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();
var vMatrix = mat4.create();

// Alternate algorithm
var framebufferDepthAlternate;
var framebufferDepthAlternateTexture;
var framebufferAlternateCoCSize;
var framebufferAlternateCoCSizeTexture;

var focusdistance = 160.0;
var focallength = 350.0;
var fstop = 1.4;

function initGL(canvas) {
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
	}
}

function setMatrixUniforms(program) {
	gl.uniformMatrix4fv(program.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(program.modelMatrixUniform, false, mMatrix);

	gl.uniformMatrix4fv(program.viewMatrixUniform, false, vMatrix);


    if ((program == shaderProgramLightingPhong)) {
        var normalMatrix = mat3.create();
        mat3.normalFromMat4(normalMatrix, mMatrix)
        gl.uniformMatrix3fv(program.nMatrixUniform, false, normalMatrix);   
    }
}

function init3DScene() {
	initBuffersPlane();
	loadTeapot();
    initSphereObject();
    initBuffersSphere();
}

var teapotAngle = 180;
var lastTime = 0;

function animate() {
	var timeNow = new Date().getTime();
	if (lastTime != 0) {
		var elapsed = timeNow - lastTime;

		teapotAngle += 0.05 * elapsed;
	}
	lastTime = timeNow;
}

function calculateDeltaTime() {
	var currentFrame = new Date().getTime();
	deltaTime = (currentFrame - lastFrame)/100;
	lastFrame = currentFrame;
}

function clock() 
{
	var timeNow = new Date().getTime();
	if (time_start != 0)
	{
		elapsed = timeNow - time_start;
		elapsed /= 1000;
	}
}

function tick() {
	requestAnimFrame(tick);
	handleKeys();
	
    drawBokehEffects();

	animate();
	calculateDeltaTime();
	clock();

    handleStatistics();
}

function webGLStart() {
	var canvas = document.getElementById("3D_scene-canvas");
	initGL(canvas);

	initTextures();

	initCamera();

    initShaderLightingPhong();

    initShadersRendToText();
    initShadersDepthObjectSpace();


	initScreenFillingBuffers();

	createFramebuffers();

	init3DScene();

    setupMRT();
    initShadersFirstPassBlur();
    initShadersSecondPassBlur();

    initShadersDepthPass();
    initShadersCoCSizePass();

    initShadersApplyDoFPass();

    initShadersDebugCoC();

	initShadersDebugPasses();
	
	// CoC Alternate
	initShadersAlternateDepthPass();
	initShadersAlternateDepthDebugPass();
	initShadersCoCPass();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	time_start = new Date().getTime();

	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	document.onmousemove = handleMouseMove;

    initStatistics();

	tick();
}