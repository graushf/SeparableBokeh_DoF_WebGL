var shaderProgramDepth;
var shaderProgramDepthObjectSpace;
var shaderProgramLightingPhong;
var shaderProgramBufferRendToText;
var shaderProgramHdrColor;
var shaderProgramFirstPassBlur;
var shaderProgramSecondPassBlur;
var shaderProgramDepthPass;
var shaderProgramCoCSizePass;
var shaderProgramApplyDoFPass;
var shaderProgramDebugCoC;
var shaderProgramDebugPass1;
var shaderProgramDebugPass1;

var shaderProgramCoCPass;
var shaderProgramAlternateDepthDebugPass;
var shaderProgramAlternateDepthPass;

function getShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	var str = "";
	var k = shaderScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}

	var shader;
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type = "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	gl.shaderSource(shader, str);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

function initShadersDepth() {
	var fragmentShader = getShader(gl, "fragment-depth-fs");
	var vertexShader = getShader(gl, "fragment-depth-vs");

	shaderProgramDepth = gl.createProgram();
	gl.attachShader(shaderProgramDepth, vertexShader);
	gl.attachShader(shaderProgramDepth, fragmentShader);
	gl.linkProgram(shaderProgramDepth);

	if (!gl.getProgramParameter(shaderProgramDepth, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}

	shaderProgramDepth.vertexPositionAttribute = gl.getAttribLocation(shaderProgramDepth, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgramDepth.vertexPositionAttribute);

	shaderProgramDepth.pMatrixUniform = gl.getUniformLocation(shaderProgramDepth, "uPMatrix");
	shaderProgramDepth.modelMatrixUniform = gl.getUniformLocation(shaderProgramDepth, "uMMatrix");
	shaderProgramDepth.viewMatrixUniform = gl.getUniformLocation(shaderProgramDepth, "uVMatrix");

	shaderProgramDepth.nearUniform = gl.getUniformLocation(shaderProgramDepth, "uNear");
	shaderProgramDepth.farUniform = gl.getUniformLocation(shaderProgramDepth, "uFar");
}

function initShadersDepthObjectSpace() {
    var fragmentShader = getShader(gl, "depth-objectspace-fs");
    var vertexShader = getShader(gl, "depth-objectspace-vs");

    shaderProgramDepthObjectSpace = gl.createProgram();
    gl.attachShader(shaderProgramDepthObjectSpace, vertexShader);
    gl.attachShader(shaderProgramDepthObjectSpace, fragmentShader);
    gl.linkProgram(shaderProgramDepthObjectSpace);

    if (!gl.getProgramParameter(shaderProgramDepthObjectSpace, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    shaderProgramDepthObjectSpace.vertexPositionAttribute = gl.getAttribLocation(
        shaderProgramDepthObjectSpace, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramDepthObjectSpace.vertexPositionAttribute);

    shaderProgramDepthObjectSpace.pMatrixUniform = gl.getUniformLocation(shaderProgramDepthObjectSpace, "uPMatrix");
    shaderProgramDepthObjectSpace.modelMatrixUniform = gl.getUniformLocation(
        shaderProgramDepthObjectSpace, "uMMatrix");
    shaderProgramDepthObjectSpace.viewMatrixUniform = gl.getUniformLocation(
        shaderProgramDepthObjectSpace, "uVMatrix");

    shaderProgramDepthObjectSpace.nearUniform = gl.getUniformLocation(shaderProgramDepthObjectSpace, "uNear");
    shaderProgramDepthObjectSpace.farUniform = gl.getUniformLocation(shaderProgramDepthObjectSpace, "uFar");

}

function initShaderLightingPhong()
{
    var fragmentShader = getShader(gl, "lighting-phong-fs");
    var vertexShader = getShader(gl, "lighting-phong-vs");

    shaderProgramLightingPhong = gl.createProgram();
    gl.attachShader(shaderProgramLightingPhong, vertexShader);
    gl.attachShader(shaderProgramLightingPhong, fragmentShader);
    gl.linkProgram(shaderProgramLightingPhong);

    if (!gl.getProgramParameter(shaderProgramLightingPhong, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    shaderProgramLightingPhong.vertexPositionAttribute = gl.getAttribLocation(shaderProgramLightingPhong, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramLightingPhong.vertexPositionAttribute);

    shaderProgramLightingPhong.vertexNormalAttribute = gl.getAttribLocation(shaderProgramLightingPhong, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgramLightingPhong.vertexNormalAttribute);


    shaderProgramLightingPhong.textureCoordAttribute = gl.getAttribLocation( shaderProgramLightingPhong, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgramLightingPhong.textureCoordAttribute);

    shaderProgramLightingPhong.pMatrixUniform = gl.getUniformLocation(shaderProgramLightingPhong, "uPMatrix");
    shaderProgramLightingPhong.modelMatrixUniform = gl.getUniformLocation(shaderProgramLightingPhong, "uMMatrix");
    shaderProgramLightingPhong.viewMatrixUniform = gl.getUniformLocation( shaderProgramLightingPhong, "uVMatrix");
    //shaderProgramLightingPhong.nMatrixUniform = gl.getUniformLocation(shaderProgramLightingPhong, "uNMatrix");

    //shaderProgramLightingPhong.objectColorUniform = gl.getUniformLocation(shaderProgramLightingPhong, "objectColor");
    shaderProgramLightingPhong.lightColorUniform = gl.getUniformLocation(shaderProgramLightingPhong, "lightColor");
    shaderProgramLightingPhong.lightPosUniform = gl.getUniformLocation(shaderProgramLightingPhong, "lightPos");
    shaderProgramLightingPhong.viewPosUniform = gl.getUniformLocation(shaderProgramLightingPhong, "viewPos"); 
}

function initShadersRendToText() 
{
    var fragmentShader = getShader(gl, "rend-to-texture-fs");
    var vertexShader = getShader(gl, "rend-to-texture-vs");

    shaderProgramBufferRendToText = gl.createProgram();
    gl.attachShader(shaderProgramBufferRendToText, vertexShader);
    gl.attachShader(shaderProgramBufferRendToText, fragmentShader);
    gl.linkProgram(shaderProgramBufferRendToText);

    if (!gl.getProgramParameter(shaderProgramBufferRendToText, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function initShadersFirstPassBlur() {
    var fragmentShader = getShader(gl, "BlurPass1");
    var vertexShader = getShader(gl, "shader-vs-postprocess");

    shaderProgramFirstPassBlur = gl.createProgram();
    gl.attachShader(shaderProgramFirstPassBlur, vertexShader);
    gl.attachShader(shaderProgramFirstPassBlur, fragmentShader);
    gl.linkProgram(shaderProgramFirstPassBlur);

    if (!gl.getProgramParameter(shaderProgramFirstPassBlur, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function initShadersSecondPassBlur() {
    var fragmentShader = getShader(gl, "BlurPass2");
    var vertexShader = getShader(gl, "shader-vs-postprocess");

    shaderProgramSecondPassBlur = gl.createProgram();
    gl.attachShader(shaderProgramSecondPassBlur, vertexShader);
    gl.attachShader(shaderProgramSecondPassBlur, fragmentShader);
    gl.linkProgram(shaderProgramSecondPassBlur);

    if (!gl.getProgramParameter(shaderProgramSecondPassBlur, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function initShadersDepthPass() {
    var fragmentShader = getShader(gl, "DepthPass-fs");
    var vertexShader = getShader(gl, "DepthPass-vs");

    shaderProgramDepthPass = gl.createProgram();
    gl.attachShader(shaderProgramDepthPass, vertexShader);
    gl.attachShader(shaderProgramDepthPass, fragmentShader);
    gl.linkProgram(shaderProgramDepthPass);

    if (!gl.getProgramParameter(shaderProgramDepthPass, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    shaderProgramDepthPass.vertexPositionAttribute = gl.getAttribLocation(
        shaderProgramDepthPass, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramDepthPass.vertexPositionAttribute);

    shaderProgramDepthPass.pMatrixUniform = gl.getUniformLocation(shaderProgramDepthPass, "uPMatrix");
    shaderProgramDepthPass.modelMatrixUniform = gl.getUniformLocation(
        shaderProgramDepthPass, "uMMatrix");
    shaderProgramDepthPass.viewMatrixUniform = gl.getUniformLocation(
        shaderProgramDepthPass, "uVMatrix");
}

function initShadersCoCSizePass() {
    var fragmentShader = getShader(gl, "CoCSizePass-fs");
    var vertexShader = getShader(gl, "CoCSizePass-vs");

    shaderProgramCoCSizePass = gl.createProgram();
    gl.attachShader(shaderProgramCoCSizePass, vertexShader);
    gl.attachShader(shaderProgramCoCSizePass, fragmentShader);
    gl.linkProgram(shaderProgramCoCSizePass);

    if (!gl.getProgramParameter(shaderProgramCoCSizePass, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function initShadersApplyDoFPass() {
    var fragmentShader = getShader(gl, "ApplyDoFPass-fs");
    var vertexShader = getShader(gl, "shader-vs-postprocess");

    shaderProgramApplyDoFPass = gl.createProgram();
    gl.attachShader(shaderProgramApplyDoFPass, vertexShader);
    gl.attachShader(shaderProgramApplyDoFPass, fragmentShader);
    gl.linkProgram(shaderProgramApplyDoFPass);

    if (!gl.getProgramParameter(shaderProgramApplyDoFPass, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function initShadersDebugCoC() {
    var fragmentShader = getShader(gl,"DebugCoC-fs");
    var vertexShader = getShader(gl, "rend-to-texture-vs");

    shaderProgramDebugCoC = gl.createProgram();
    gl.attachShader(shaderProgramDebugCoC, vertexShader);
    gl.attachShader(shaderProgramDebugCoC, fragmentShader);
    gl.linkProgram(shaderProgramDebugCoC);

    if (!gl.getProgramParameter(shaderProgramDebugCoC, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

//DebugPass-fs
function initShadersDebugPasses() {
    var fragmentShader = getShader(gl, "DebugPass-fs");
    var vertexShader = getShader(gl, "shader-vs-postprocess");

    shaderProgramDebugPass1 = gl.createProgram();
    gl.attachShader(shaderProgramDebugPass1, vertexShader);
    gl.attachShader(shaderProgramDebugPass1, fragmentShader);
    gl.linkProgram(shaderProgramDebugPass1);

    if (!gl.getProgramParameter(shaderProgramDebugPass1, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}


// Alternate Blurring Method

// shaderProgramAlternateDepthPass
function initShadersAlternateDepthPass() {
    var fragmentShader = getShader(gl, "DepthPass-Alternate-fs");
    var vertexShader = getShader(gl, "DepthPass-Alternate-vs");

    shaderProgramAlternateDepthPass = gl.createProgram();
    gl.attachShader(shaderProgramAlternateDepthPass, vertexShader);
    gl.attachShader(shaderProgramAlternateDepthPass, fragmentShader);
    gl.linkProgram(shaderProgramAlternateDepthPass);

    if (!gl.getProgramParameter(shaderProgramAlternateDepthPass, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    shaderProgramAlternateDepthPass.vertexPositionAttribute = gl.getAttribLocation(shaderProgramAlternateDepthPass, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramAlternateDepthPass.vertexPositionAttribute);

    shaderProgramAlternateDepthPass.pMatrixUniform = gl.getUniformLocation(shaderProgramAlternateDepthPass, "uPMatrix");
    shaderProgramAlternateDepthPass.modelMatrixUniform = gl.getUniformLocation(shaderProgramAlternateDepthPass, "uMMatrix");
    shaderProgramAlternateDepthPass.viewMatrixUniform = gl.getUniformLocation(shaderProgramAlternateDepthPass, "uVMatrix");

    shaderProgramAlternateDepthPass.nearUniform = gl.getUniformLocation(shaderProgramAlternateDepthPass, "uNear");
    shaderProgramAlternateDepthPass.farUniform = gl.getUniformLocation(shaderProgramAlternateDepthPass, "uFar");
}

function initShadersCoCPass() {
    var fragmentShader = getShader(gl, "CoCQuantityPass-fs");
    var vertexShader = getShader(gl, "CoCQuantityPass-vs");

    shaderProgramCoCPass = gl.createProgram();
    gl.attachShader(shaderProgramCoCPass, vertexShader);
    gl.attachShader(shaderProgramCoCPass, fragmentShader);
    gl.linkProgram(shaderProgramCoCPass);

    if (!gl.getProgramParameter(shaderProgramCoCPass, gl.LINK_STATUS)) {
        alert("Could not inialise shaders");
    }
}

function initShadersAlternateDepthDebugPass() {
    var fragmentShader =  getShader(gl, "DebugAlternateDepthPass-fs");
    var vertexShader = getShader(gl, "DebugAlternateDepthPass-vs");

    shaderProgramAlternateDepthDebugPass = gl.createProgram();
    gl.attachShader(shaderProgramAlternateDepthDebugPass, vertexShader);
    gl.attachShader(shaderProgramAlternateDepthDebugPass, fragmentShader);
    gl.linkProgram(shaderProgramAlternateDepthDebugPass);

    if (!gl.getProgramParameter(shaderProgramAlternateDepthDebugPass, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}