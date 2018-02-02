var currentlyPressedKeys = {};

function handleKeyDown(event) {
	//console.log(event.keyCode);
	currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
	currentlyPressedKeys[event.keyCode] = false;
}

//var positionFocalPlane = vec3.fromValues(0.0, 0.0, -450.0);
var positionFocalPlane = vec3.fromValues(0.0, 0.0, 0.0);

function handleKeys() {
	

	// FORWARD
	if (currentlyPressedKeys[87]) {
		//console.log("forward");
		myCamera.ProcessKeyboard(0, deltaTime); // 0 is forward direction
	}
	// BACKWARD
	if (currentlyPressedKeys[83]) {
		myCamera.ProcessKeyboard(1, deltaTime); // 0 is forward direction
	}
	// RIGHT
	if (currentlyPressedKeys[68]) {
		myCamera.ProcessKeyboard(3, deltaTime); // 0 is forward direction
	}
	// LEFT
	if (currentlyPressedKeys[65]) {
		myCamera.ProcessKeyboard(2, deltaTime); // 0 is forward direction
	}
	if (currentlyPressedKeys[27]) {
		enableMouse = !enableMouse;
	}

	if (currentlyPressedKeys[82]) {
		//console.log(distanceFocalPlane);
		distanceFocalPlane += 10;
		uFocalDistance += 10;
	}
	if (currentlyPressedKeys[70]) {
		//console.log(distanceFocalPlane);
		distanceFocalPlane -= 10;
		uFocalDistance -= 10;
	}
    if (currentlyPressedKeys[84]) {
        bokehStrength += 0.01;
    }
    if (currentlyPressedKeys[71]) {
        if (bokehStrength >= 0.01) {
            bokehStrength -= 0.01;
        } else {
            bokehStrength = 0.0;
        }
    }

    if (currentlyPressedKeys[85]) {
		//Aperture += 0.01;
		focallength += 0.5;
    }
    if (currentlyPressedKeys[74]) {
		//Aperture -= 0.01;
		if (focallength > 10.0) {
			focallength -= 0.5;
		}
    }

    if (currentlyPressedKeys[73]) {
        //if (_focalPlane < 0.99) {
        //    _focalPlane += 0.0001;    
		//}
		if (focusdistance < 500.0) {
			focusdistance += 0.5;
		}
    }
    if (currentlyPressedKeys[75]) {
        // if (_focalPlane > 0.0) {
        //     _focalPlane -= 0.0001;
		// }
		if (focusdistance > 0.5) {
			focusdistance -= 0.5;
		}
    }

    if (currentlyPressedKeys[79]) {
		//focalLength += 0.1;
		fstop += 0.1;
    }
    if (currentlyPressedKeys[76]) {
		//focalLength -= 0.1;
		if (fstop > 1.4) {
			fstop -= 0.1;
		}
    }

    if (currentlyPressedKeys[89]) {
        farBlurdistancelimit += 0.01;
    }

    if (currentlyPressedKeys[72]) {
        farBlurdistancelimit -= 0.01;
    }

    if (currentlyPressedKeys[90]) {
        if (indexIterationBlur > 0.1) {
            indexIterationBlur -= 0.1;
        }
    }
    if (currentlyPressedKeys[88]) {
        if (indexIterationBlur < 7.0) {
            indexIterationBlur += 0.1;
        }
    }
}

function handleMouseMove(event) {
	//console.log(event);
	//console.log(event.screenX);
	//console.log(event.screenY);
	if (enableMouse) {
		var xpos = event.clientX;
		var ypos = event.clientY;

		if (firstMouse) {
			lastX = xpos;
			lastY = ypos;
			firstMouse = false;
		}

		var xoffset = xpos - lastX;
		var yoffset = lastY - ypos;	// Reversed since y-coordinates go from bottom to left

		lastX = xpos;
		lastY = ypos;

		//console.log(xoffset);
		//console.log(yoffset);

		myCamera.ProcessMouseMovement(xoffset, yoffset, true);
	}
}