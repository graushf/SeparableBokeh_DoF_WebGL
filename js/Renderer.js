function drawBokehEffects() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferSetupSceneRGBA32F);
      gl.viewport(0, 0, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

      //drawHDRBokehScene2D(shaderProgramLightingPhong);
      drawScene(shaderProgramLightingPhong);

      gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferDepth);
      gl.viewport(0, 0, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

      drawScene(shaderProgramDepthPass);

      gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferCoCSize);
      gl.viewport(0, 0, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

      drawCoCSizePass();

      gl.bindFramebuffer(gl.FRAMEBUFFER, MRTfbData.f);

      var bufferList = [
          ext3.COLOR_ATTACHMENT0_WEBGL,
          ext3.COLOR_ATTACHMENT1_WEBGL
      ];
      ext3.drawBuffersWEBGL(bufferList);

      drawFirstPassBokeh(0.0);

      gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferApplyDoFPass);
      gl.viewport(0, 0, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      drawSecondPassBokeh(0.0, 0.0, 0.0, 0.0, 0.0);


      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      //drawScreenTexture(MRTfbData.t[0], 0);
      //gl.viewport(0, 2*gl.viewportHeight/5.0 , gl.viewportWidth/4.0 * 3.0, gl.viewportHeight/5.0*3.0); low canvas version
      gl.viewport(0, 4*gl.viewportHeight/7.0 , gl.viewportWidth/8.0 * 3.0, gl.viewportHeight/7.0*3.0);
      drawApplyDoFPass();
      //drawScreenTexture(textureFramebufferApplyDoF, 0, 0.0, 0.0, 0.0);

      gl.viewport(3 * (gl.viewportWidth/8.0), 6*(gl.viewportHeight/7.0), gl.viewportWidth/8.0, gl.viewportHeight/7.0);
      drawScreenTexture(textureFramebufferDepth, 1, 0.0, 0.0, 0.0);

      gl.viewport(3 * (gl.viewportWidth/8.0), 5*(gl.viewportHeight/7.0), gl.viewportWidth/8.0, gl.viewportHeight/7.0);
      drawScreenTexture(textureFramebufferSetupScene, 1, 0.0, 0.0, 0.0);

      //drawScreenTexture(textureFramebufferCoCSize, 1, 0.0, 0.0, 0.0);

      gl.viewport(3 * (gl.viewportWidth/8.0), 4*(gl.viewportHeight/7.0), gl.viewportWidth/8.0, gl.viewportHeight/7.0);
      //drawScreenTexture(textureFramebufferCoCSize, 1, 0.0, 0.0, 0.0);

      //shaderProgramDebugCoC
      drawDebugPixelCoC(1);
      //drawScreenTexture(textureFramebufferCoCSize, 0.0, 0.0, 0.0, 0.0);

      gl.viewport(0 * (gl.viewportWidth/8.0), 2*(gl.viewportHeight/7.0), 2*gl.viewportWidth/8.0, 2*gl.viewportHeight/7.0);
      drawScreenTexture(MRTfbData.t[0], 1, 0.0, 0.0, 0.0);
      //MRTfbData.t[0]

      gl.viewport(0 * (gl.viewportWidth/8.0), 0*(gl.viewportHeight/7.0), 2*gl.viewportWidth/8.0, 2*gl.viewportHeight/7.0);
      drawScreenTexture(MRTfbData.t[0], 1, 1.0, 0.0, 1.0);


      gl.viewport(2 * (gl.viewportWidth/8.0), 2*(gl.viewportHeight/7.0), 2*gl.viewportWidth/8.0, 2*gl.viewportHeight/7.0);
      drawScreenTexture(MRTfbData.t[1], 1, 0.0, 1.0, 0.0);

      gl.viewport(2 * (gl.viewportWidth/8.0), 0*(gl.viewportHeight/7.0), 2*gl.viewportWidth/8.0, 2*gl.viewportHeight/7.0);
      drawScreenTexture(MRTfbData.t[1], 1, 1.0, 0.0, 1.0);


      gl.viewport(4 * (gl.viewportWidth/8.0), 2*(gl.viewportHeight/7.0), 2*gl.viewportWidth/8.0, 2*gl.viewportHeight/7.0);
      drawSecondPassBokeh(1.0, 0.0, 0.0, 0.0, 0.0);

      gl.viewport(4 * (gl.viewportWidth/8.0), 0*(gl.viewportHeight/7.0), 2*gl.viewportWidth/8.0, 2*gl.viewportHeight/7.0);
      drawSecondPassBokeh(0.0, 1.0, 0.0, 0.0, 1.0);


      gl.viewport(6 * (gl.viewportWidth/8.0), 2*(gl.viewportHeight/7.0), 2*gl.viewportWidth/8.0, 2*gl.viewportHeight/7.0);
      drawSecondPassBokeh(0.0, 0.0, 1.0, 0.0, 0.0);

      gl.viewport(6 * (gl.viewportWidth/8.0), 0*(gl.viewportHeight/7.0), 2*gl.viewportWidth/8.0, 2*gl.viewportHeight/7.0);
      drawSecondPassBokeh(0.0, 0.0, 0.0, 1.0, 1.0);




      gl.viewport(4 * (gl.viewportWidth/8.0), 6*(gl.viewportHeight/7.0), gl.viewportWidth/8.0, gl.viewportHeight/7.0);
      drawDebugPass1(); // Draws focal plane

      gl.viewport(4 * (gl.viewportWidth/8.0), 4*(gl.viewportHeight/7.0), gl.viewportWidth/8.0, gl.viewportHeight/7.0);
      drawScreenTexture(MRTfbData.t[0], 1, 1.0, 0.0, 50.0);

      gl.viewport(5 * (gl.viewportWidth/8.0), 4*(gl.viewportHeight/7.0), gl.viewportWidth/8.0, gl.viewportHeight/7.0);
      drawScreenTexture(MRTfbData.t[1], 1, 1.0, 0.0, 50.0);

      gl.viewport(6 * (gl.viewportWidth/8.0), 4*(gl.viewportHeight/7.0), gl.viewportWidth/8.0, gl.viewportHeight/7.0);
      drawSecondPassBokeh(0.0, 1.0, 0.0, 0.0, 50.0);

      gl.viewport(7 * (gl.viewportWidth/8.0), 4*(gl.viewportHeight/7.0),  gl.viewportWidth/8.0, gl.viewportHeight/7.0);
      drawSecondPassBokeh(0.0, 0.0, 0.0, 1.0, 50.0);


      //gl.viewport(4 * (gl.viewportWidth/8.0), 5*(gl.viewportHeight/7.0), gl.viewportWidth/8.0, gl.viewportHeight/7.0);
      //drawFirstPassBokeh(1.0);


}






function drawFirstPassBokeh(drawInputCoC) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(shaderProgramFirstPassBlur);

      shaderProgramFirstPassBlur.vertexPositionAttribute = gl.getAttribLocation(shaderProgramFirstPassBlur, "aVertexPosition");
      gl.enableVertexAttribArray(shaderProgramFirstPassBlur.vertexPositionAttribute);

      shaderProgramFirstPassBlur.textureCoordAttribute = gl.getAttribLocation(
          shaderProgramFirstPassBlur, "aTextureCoord");
      gl.enableVertexAttribArray(shaderProgramFirstPassBlur.textureCoordAttribute);

      shaderProgramFirstPassBlur.samplerUniform = gl.getUniformLocation(shaderProgramFirstPassBlur, "uSampler");

      shaderProgramFirstPassBlur.resolutionUniform = gl.getUniformLocation(shaderProgramFirstPassBlur, "uResolution");

      shaderProgramFirstPassBlur.bokehStrengthUniform = gl.getUniformLocation(shaderProgramFirstPassBlur, "bokehStrength");

      shaderProgramFirstPassBlur.timeUnifom = gl.getUniformLocation(shaderProgramFirstPassBlur, "uTime");

      shaderProgramFirstPassBlur.farBlurdistancelimitUniform = gl.getUniformLocation(shaderProgramFirstPassBlur, "farBlurdistancelimit");

      shaderProgramFirstPassBlur.iterationSampleUniform = gl.getUniformLocation(shaderProgramFirstPassBlur, "iterationSample");

      //shaderProgramFirstPassBlur.drawInputCoC = gl.getUniformLocation(shaderProgramFirstPassBlur, "drawInputCoC");

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgramFirstPassBlur.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
      gl.vertexAttribPointer(shaderProgramFirstPassBlur.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureFramebufferCoCSize);
      gl.uniform1i(shaderProgramFirstPassBlur.samplerUniform, 0);

      gl.uniform2f(shaderProgramFirstPassBlur.resolutionUniform, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

      gl.uniform1f(shaderProgramFirstPassBlur.bokehStrengthUniform, bokehStrength);

      gl.uniform1f(shaderProgramFirstPassBlur.timeUniform, elapsed);

      gl.uniform1f(shaderProgramFirstPassBlur.farBlurdistancelimitUniform, farBlurdistancelimit);

      gl.uniform1i(shaderProgramFirstPassBlur.iterationSampleUniform, indexIterationBlur.toFixed(0));

      //gl.uniform1f(shaderProgramFirstPassBlur.drawInputCoC, drawInputCoC);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
      gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  }

  function drawSecondPassBokeh(drawFirstBlur, drawFirstBlurCoC, drawSecondBlur, drawSecondBlurCoC, multiplyColor) {
      gl.useProgram(shaderProgramSecondPassBlur);


      shaderProgramSecondPassBlur.vertexPositionAttribute = gl.getAttribLocation(shaderProgramSecondPassBlur, "aVertexPosition");
      gl.enableVertexAttribArray(shaderProgramSecondPassBlur.vertexPositionAttribute);

      shaderProgramSecondPassBlur.textureCoordAttribute = gl.getAttribLocation(shaderProgramSecondPassBlur, "aTextureCoord");
      gl.enableVertexAttribArray(shaderProgramSecondPassBlur.textureCoordAttribute);


      shaderProgramSecondPassBlur.samplerUniform0 = gl.getUniformLocation(shaderProgramSecondPassBlur, "BlurPass1_0");
      shaderProgramSecondPassBlur.samplerUniform1 = gl.getUniformLocation(shaderProgramSecondPassBlur, "BlurPass1_1");


      shaderProgramSecondPassBlur.resolutionUniform = gl.getUniformLocation(shaderProgramSecondPassBlur, "uResolution");

      shaderProgramSecondPassBlur.bokehStrengthUniform = gl.getUniformLocation(shaderProgramSecondPassBlur, "bokehStrength");

      shaderProgramSecondPassBlur.timeUnifom = gl.getUniformLocation(shaderProgramFirstPassBlur, "uTime");

      shaderProgramSecondPassBlur.farBlurdistancelimitUniform = gl.getUniformLocation(shaderProgramSecondPassBlur, "farBlurdistancelimit");

      shaderProgramSecondPassBlur.iterationSampleUniform = gl.getUniformLocation(shaderProgramSecondPassBlur, "iterationSample");


      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgramSecondPassBlur.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
      gl.vertexAttribPointer(shaderProgramSecondPassBlur.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, MRTfbData.t[0]);
      gl.uniform1i(shaderProgramSecondPassBlur.samplerUniform0, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, MRTfbData.t[1]);
      gl.uniform1i(shaderProgramSecondPassBlur.samplerUniform1, 1);

      gl.uniform2f(shaderProgramSecondPassBlur.resolutionUniform, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

      gl.uniform1f(shaderProgramSecondPassBlur.bokehStrengthUniform, bokehStrength);

      gl.uniform1f(shaderProgramSecondPassBlur.timeUniform, elapsed);

      shaderProgramSecondPassBlur.drawFirstBlurUniform = gl.getUniformLocation(shaderProgramSecondPassBlur, "drawFirstBlur");
      shaderProgramSecondPassBlur.drawFirstBlurCoCUniform = gl.getUniformLocation(shaderProgramSecondPassBlur, "drawFirstBlurCoC");
      shaderProgramSecondPassBlur.drawSecondBlurUniform = gl.getUniformLocation(shaderProgramSecondPassBlur, "drawSecondBlur");
      shaderProgramSecondPassBlur.drawSecondBlurCoCUniform = gl.getUniformLocation(shaderProgramSecondPassBlur, "drawSecondBlurCoC");

      shaderProgramSecondPassBlur.multiplyColor = gl.getUniformLocation(shaderProgramSecondPassBlur, "multiplyColor");

      gl.uniform1f(shaderProgramSecondPassBlur.drawFirstBlurUniform, drawFirstBlur);
      gl.uniform1f(shaderProgramSecondPassBlur.drawFirstBlurCoCUniform, drawFirstBlurCoC);
      gl.uniform1f(shaderProgramSecondPassBlur.drawSecondBlurUniform, drawSecondBlur);
      gl.uniform1f(shaderProgramSecondPassBlur.drawSecondBlurCoCUniform, drawSecondBlurCoC);

      gl.uniform1f(shaderProgramSecondPassBlur.multiplyColor, multiplyColor);

      gl.uniform1f(shaderProgramSecondPassBlur.farBlurdistancelimitUniform, farBlurdistancelimit);

      gl.uniform1i(shaderProgramSecondPassBlur.iterationSampleUniform, indexIterationBlur.toFixed(0));

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
      gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawCoCSizePass() {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(shaderProgramCoCSizePass);

      shaderProgramCoCSizePass.vertexPositionAttribute = gl.getAttribLocation(shaderProgramCoCSizePass, "aVertexPosition");
      gl.enableVertexAttribArray(shaderProgramCoCSizePass.vertexPositionAttribute);

      shaderProgramCoCSizePass.textureCoordAttribute = gl.getAttribLocation(shaderProgramCoCSizePass, "aTextureCoord");
      gl.enableVertexAttribArray(shaderProgramCoCSizePass.textureCoordAttribute);

      shaderProgramCoCSizePass.samplerUniform0 = gl.getUniformLocation(shaderProgramCoCSizePass, "colorChannel");
      shaderProgramCoCSizePass.samplerUniform1 = gl.getUniformLocation(shaderProgramCoCSizePass, "depthChannel");

      shaderProgramCoCSizePass.CoCScaleUniform = gl.getUniformLocation(shaderProgramCoCSizePass, "CoCScale"); 
      shaderProgramCoCSizePass.CoCBiasUniform = gl.getUniformLocation(shaderProgramCoCSizePass, "CoCBias");

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgramCoCSizePass.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
      gl.vertexAttribPointer(shaderProgramCoCSizePass.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureFramebufferSetupScene);
      gl.uniform1i(shaderProgramCoCSizePass.samplerUniform0, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textureFramebufferDepth);
      gl.uniform1i(shaderProgramCoCSizePass.samplerUniform1, 1);

      var zNear = myCamera.GetNearValue();
      var zFar = myCamera.GetFarValue();

      //var CoCScale = (Aperture * focalLength * focalPlane * (zFar - zNear)) / ((focalPlane - focalLength) * zNear * zFar);
      //var CoCBias = (Aperture * focalLength * (zNear - focalPlane)) / (focalPlane - focalLength) * zNear;
      auxFocalPlane = _focalPlane*zFar;

      CoCScale = (Aperture * focalLength * auxFocalPlane * (zFar - zNear)) / ((auxFocalPlane - focalLength) * zNear * zFar);
      CoCBias = (Aperture * focalLength * (zNear - auxFocalPlane)) / ((auxFocalPlane - focalLength) * zNear);

      gl.uniform1f(shaderProgramCoCSizePass.CoCScaleUniform, CoCScale);
      gl.uniform1f(shaderProgramCoCSizePass.CoCBiasUniform, CoCBias);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
      gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  }

  function drawApplyDoFPass() {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(shaderProgramApplyDoFPass);

      shaderProgramApplyDoFPass.vertexPositionAttribute = gl.getAttribLocation(shaderProgramApplyDoFPass, "aVertexPosition");
      gl.enableVertexAttribArray(shaderProgramApplyDoFPass.vertexPositionAttribute);

      shaderProgramApplyDoFPass.textureCoordAttribute = gl.getAttribLocation(shaderProgramApplyDoFPass, "aTextureCoord");
      gl.enableVertexAttribArray(shaderProgramApplyDoFPass.textureCoordAttribute);

      shaderProgramApplyDoFPass.samplerChannel0Uniform = gl.getUniformLocation(shaderProgramApplyDoFPass, "uChannelOriginalScene");
      shaderProgramApplyDoFPass.samplerChannel1Uniform = gl.getUniformLocation(shaderProgramApplyDoFPass, "uChannelBluredScene");


      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgramApplyDoFPass.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
      gl.vertexAttribPointer(shaderProgramApplyDoFPass.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureFramebufferSetupScene);
      gl.uniform1i(shaderProgramApplyDoFPass.samplerChannel0Uniform, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textureFramebufferApplyDoF);
      gl.uniform1i(shaderProgramApplyDoFPass.samplerChannel1Uniform, 1);


      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
      gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  }

  function drawDebugPass1() {
      //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(shaderProgramDebugPass1);

      shaderProgramDebugPass1.vertexPositionAttribute = gl.getAttribLocation(shaderProgramDebugPass1, "aVertexPosition");
      gl.enableVertexAttribArray(shaderProgramDebugPass1.vertexPositionAttribute);

      shaderProgramDebugPass1.textureCoordAttribute = gl.getAttribLocation(
          shaderProgramDebugPass1, "aTextureCoord");
      gl.enableVertexAttribArray(shaderProgramDebugPass1.textureCoordAttribute);

      shaderProgramDebugPass1.samplerUniform = gl.getUniformLocation(shaderProgramDebugPass1, "uSampler");

      shaderProgramDebugPass1.resolutionUniform = gl.getUniformLocation(shaderProgramDebugPass1, "uResolution");

      shaderProgramDebugPass1.bokehStrengthUniform = gl.getUniformLocation(shaderProgramDebugPass1, "bokehStrength");

      shaderProgramDebugPass1.timeUnifom = gl.getUniformLocation(shaderProgramDebugPass1, "uTime");

      //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgramDebugPass1.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
      gl.vertexAttribPointer(shaderProgramDebugPass1.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureFramebufferCoCSize);
      gl.uniform1i(shaderProgramDebugPass1.samplerUniform, 0);

      gl.uniform2f(shaderProgramDebugPass1.resolutionUniform, gl.viewportWidth, gl.viewportHeight);

      gl.uniform1f(shaderProgramDebugPass1.bokehStrengthUniform, bokehStrength);

      gl.uniform1f(shaderProgramDebugPass1.timeUniform, elapsed);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
      gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);        
  }

   function drawDebugPixelCoC(enableBorder) {
      //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(shaderProgramDebugCoC);

      shaderProgramDebugCoC.vertexPositionAttribute = gl.getAttribLocation(shaderProgramDebugCoC, "aVertexPosition");
      gl.enableVertexAttribArray(shaderProgramDebugCoC.vertexPositionAttribute);

      shaderProgramDebugCoC.textureCoordAttribute = gl.getAttribLocation(shaderProgramDebugCoC, "aTextureCoord");
      gl.enableVertexAttribArray(shaderProgramDebugCoC.textureCoordAttribute);


      shaderProgramDebugCoC.samplerUniform = gl.getUniformLocation(shaderProgramDebugCoC, "inputChannel");

      shaderProgramDebugCoC.modelMatrixUniform = gl.getUniformLocation(shaderProgramDebugCoC, "model");

      //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
      gl.disable(gl.DEPTH_TEST);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgramDebugCoC.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
      gl.vertexAttribPointer(shaderProgramDebugCoC.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureFramebufferCoCSize);
      gl.uniform1i(shaderProgramDebugCoC.samplerUniform, 0);

      mat4.identity(mMatrix);
      var aux = mat4.create();

      mat4.fromScaling(aux, [1.0, 1.0, 1.0]);
      mat4.multiply(mMatrix, mMatrix, aux);

      gl.uniformMatrix4fv(shaderProgramDebugCoC.modelMatrixUniform, false, mMatrix);

      if (enableBorder == 0) {
          gl.uniform1i(gl.getUniformLocation(shaderProgramDebugCoC, "uDrawBorder"), 0);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
          gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
      } else {
          gl.uniform1i(gl.getUniformLocation(shaderProgramDebugCoC, "uDrawBorder"), 1);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
          gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

          mat4.fromScaling(aux, [0.97, 0.97, 1.0]);
          mat4.multiply(mMatrix, mMatrix, aux);

          gl.uniformMatrix4fv(shaderProgramDebugCoC.modelMatrixUniform, false, mMatrix);

          gl.uniform1i(gl.getUniformLocation(shaderProgramDebugCoC, "uDrawBorder"), 0);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
          gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
      }

      gl.enable(gl.DEPTH_TEST);
  }

function drawTeapot(programShading, translatePos) {
      gl.useProgram(programShading);

      if (teapotVertexPositionBuffer == null || teapotVertexNormalBuffer == null || teapotVertexTextureCoordBuffer == null || teapotVertexIndexBuffer == null) {
            return;
      }

      pMatrix = myCamera.GetProjectionMatrix();

      if (programShading == shaderProgramLightingPhong) {
          gl.enableVertexAttribArray(programShading.vertexPositionAttribute);
          gl.enableVertexAttribArray(programShading.vertexNormalAttribute);
          gl.enableVertexAttribArray(programShading.textureCoordAttribute);

          gl.uniform3f(programShading.objectColorUniform, 1.0, 0.5, 0.31);
          gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
          gl.uniform3f(programShading.lightPosUniform, lightPos[0], lightPos[1], lightPos[1]);
          gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

          gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 1);
          gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, metalsurfaceTexture);
          gl.uniform1i(gl.getUniformLocation(programShading, "material.diffuse"), 0);
          gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
          gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1, -0.3);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.00, 0.05, 0.05);
          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 100 * 181/255, 20 * 134/255, 20 * 144/255);
          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
          gl.uniform1f(gl.getUniformLocation(programShading, "pointLights[0].constant"), 1.0);
          gl.uniform1f(gl.getUniformLocation(programShading, "pointLights[0].linear"), 0.02);
          gl.uniform1f(gl.getUniformLocation(programShading, "pointLights[0].quadratic"), 0.010);

          gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexNormalBuffer);
          gl.vertexAttribPointer(programShading.vertexNormalAttribute, teapotVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer);
          gl.vertexAttribPointer(programShading.textureCoordAttribute, teapotVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
      }

      mat4.identity(mMatrix);
      mat4.identity(vMatrix);
      vMatrix = myCamera.GetViewMatrix();

      mat4.translate(mMatrix, mMatrix, [translatePos[0], translatePos[1], translatePos[2]]);

      gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexPositionBuffer);
      gl.vertexAttribPointer(programShading.vertexPositionAttribute, teapotVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teapotVertexIndexBuffer);
      setMatrixUniforms(programShading);
      gl.drawElements(gl.TRIANGLES, teapotVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawPlane(programShading) {
      gl.useProgram(programShading);
      
      pMatrix = myCamera.GetProjectionMatrix();
     
      if (programShading == shaderProgramLightingPhong) {

          gl.enableVertexAttribArray(programShading.vertexPositionAttribute);
          gl.enableVertexAttribArray(programShading.vertexNormalAttribute);
          gl.enableVertexAttribArray(programShading.textureCoordAttribute);

          gl.uniform3f(programShading.objectColorUniform, 1.0, 0.5, 0.31);
          gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
          gl.uniform3f(programShading.lightPosUniform, lightPos[0], lightPos[1], lightPos[1]);
          gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

          gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 1);
          gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, checkerGrayTexture);
          gl.uniform1i(gl.getUniformLocation(programShading, "material.diffuse"), 0);
          gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 1.0);
          gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 0);

          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1, -0.3);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 0.05, 0.05, 0.05);
          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 0.8, 0.8, 0.8);
          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 1.0, 1.0, 1.0);
          gl.uniform1f(gl.getUniformLocation(programShading, "pointLights[0].constant"), 1.0);
          gl.uniform1f(gl.getUniformLocation(programShading, "pointLights[0].linear"), 0.09);
          gl.uniform1f(gl.getUniformLocation(programShading, "pointLights[0].quadratic"), 0.032);

          gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexNormalBuffer);
          gl.vertexAttribPointer(programShading.vertexNormalAttribute, planeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexTextureCoordBuffer);
          gl.vertexAttribPointer(programShading.textureCoordAttribute, planeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
      }

      mat4.identity(mMatrix);
      var aux = mat4.create();
      mat4.identity(aux);

      mat4.identity(vMatrix);
      vMatrix = myCamera.GetViewMatrix();

      mat4.translate(mMatrix, mMatrix, [0, 0, -60]);
      mat4.fromScaling(aux, [2000.0, 2000.0, 2000.0]);
      mat4.multiply(mMatrix, mMatrix, aux);

      gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexPositionBuffer);
      gl.vertexAttribPointer(programShading.vertexPositionAttribute, planeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planeVertexIndexBuffer);
      setMatrixUniforms(programShading);
      gl.drawElements(gl.TRIANGLES, planeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawPlaneHorizon(programShading) {
      gl.useProgram(programShading);
      pMatrix = myCamera.GetProjectionMatrix();

      if (programShading == shaderProgramLightingPhong) {
          gl.enableVertexAttribArray(programShading.vertexPositionAttribute);
          gl.enableVertexAttribArray(programShading.vertexNormalAttribute);
          gl.enableVertexAttribArray(programShading.textureCoordAttribute);

          gl.uniform3f(programShading.objectColorUniform, 1.0, 0.5, 0.31);
          gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
          gl.uniform3f(programShading.lightPosUniform, lightPos[0], lightPos[1], lightPos[1]);
          gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

          gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 1);
          gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, skyTexture);
          gl.uniform1i(gl.getUniformLocation(programShading, "material.diffuse"), 0);
          gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 1.0);
          gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 0);

          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1, -0.3);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 0.05, 0.05, 0.05);
          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 0.8, 0.8, 0.8);
          gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 1.0, 1.0, 1.0);
          gl.uniform1f(gl.getUniformLocation(programShading, "pointLights[0].constant"), 1.0);
          gl.uniform1f(gl.getUniformLocation(programShading, "pointLights[0].linear"), 0.09);
          gl.uniform1f(gl.getUniformLocation(programShading, "pointLights[0].quadratic"), 0.032);


          gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexNormalBuffer);
          gl.vertexAttribPointer(programShading.vertexNormalAttribute, planeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexTextureCoordBuffer);
          gl.vertexAttribPointer(programShading.textureCoordAttribute, planeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
      }

      mat4.identity(mMatrix);
      var aux = mat4.create();
      mat4.identity(aux);

      mat4.identity(vMatrix);
      //mat4.translate(vMatrix, vMatrix, [0, 0, -300]);
      vMatrix = myCamera.GetViewMatrix();


      mat4.translate(mMatrix, mMatrix, [0, 170, -1200]);
      mat4.rotate(mMatrix, mMatrix, degToRad(90), [1, 0, 0]);

      mat4.fromScaling(aux, [2000.0, 2000.0, 2000.0]);
      mat4.multiply(mMatrix, mMatrix, aux);

      
      gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexPositionBuffer);
      gl.vertexAttribPointer(programShading.vertexPositionAttribute, planeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planeVertexIndexBuffer);
      setMatrixUniforms(programShading);
      gl.drawElements(gl.TRIANGLES, planeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawSphere(programShading, translatePos, scaleVal, color) {
      gl.useProgram(programShading);

      pMatrix = myCamera.GetProjectionMatrix();


      if (programShading == shaderProgramLightingPhong) {
          gl.enableVertexAttribArray(programShading.vertexPositionAttribute);
          gl.enableVertexAttribArray(programShading.vertexNormalAttribute);
          gl.enableVertexAttribArray(programShading.textureCoordAttribute);

          gl.uniform3f(programShading.objectColorUniform, 1.0, 0.5, 0.31);
          gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
          gl.uniform3f(programShading.lightPosUniform, lightPos[0], lightPos[1], lightPos[1]);
          gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

          gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 0);
          gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 1);

          gl.activeTexture(gl.TEXTURE0); 
          gl.bindTexture(gl.TEXTURE_2D, galvanizedTexture);
          gl.uniform1i(gl.getUniformLocation(programShading, "material.diffuse"), 0);
          gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 128.0);
          gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1, -0.3);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
          gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

          gl.uniform3f(gl.getUniformLocation(programShading, "staticColor"), color[0], color[1], color[2]);

          gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexNormalBuffer);
          gl.vertexAttribPointer(programShading.vertexNormalAttribute, sphereVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexTextureCoordBuffer);
          gl.vertexAttribPointer(programShading.textureCoordAttribute, sphereVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
      }

      mat4.identity(mMatrix);
      var aux = mat4.create();
      mat4.identity(aux);

      mat4.identity(vMatrix);
      vMatrix = myCamera.GetViewMatrix();

      mat4.translate(mMatrix, mMatrix, [translatePos[0], translatePos[1], translatePos[2]]);
      mat4.fromScaling(aux, [scaleVal[0], scaleVal[1], scaleVal[2]]);
      mat4.multiply(mMatrix, mMatrix, aux);

      gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
      gl.vertexAttribPointer(programShading.vertexPositionAttribute, sphereVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
      setMatrixUniforms(programShading);
      gl.drawElements(gl.TRIANGLES, sphereVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawScene(programToDraw) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      drawPlaneHorizon(programToDraw);
      drawPlane(programToDraw);

      drawTeapot(programToDraw, vec3.fromValues(0, 8.0, 400.0));
      drawTeapot(programToDraw, vec3.fromValues(0, 8.0, 100.0));
      drawTeapot(programToDraw, vec3.fromValues(0, 8.0, 0.0));
      drawTeapot(programToDraw, vec3.fromValues(0, 8.0, -60));
      drawTeapot(programToDraw, vec3.fromValues(0, 8.0, -150));
      drawTeapot(programToDraw, vec3.fromValues(0, 8.0, -300));
      drawTeapot(programToDraw, vec3.fromValues(0, 8.0, -800));

      drawSphere(programToDraw, vec3.fromValues(lightPointPos[0], lightPointPos[1], lightPointPos[2]), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(100 * 181/255, 20 * 134/255, 20 * 144/255));

      drawSphere(programToDraw, vec3.fromValues(0,55,0), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(181/255, 20 * 134/255, 80 * 144/255));
      drawSphere(programToDraw, vec3.fromValues(0,40,-20), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(10 * 214/255, 10 * 211/255, 10 * 218/255));
      drawSphere(programToDraw, vec3.fromValues(20,30,-40), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(10 * 242/255, 10 * 240/255, 10 * 241/255));
      drawSphere(programToDraw, vec3.fromValues(-30,20,-60), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(10 * 57/255, 10 * 93/255, 10 * 109/255));
      drawSphere(programToDraw, vec3.fromValues(-50,40,-120), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(10 * 62/255, 10 * 101/255, 10 * 54/255));
      drawSphere(programToDraw, vec3.fromValues(-80,25,-200), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(10 * 197/255, 10 * 197/255, 10 * 197/255));

      drawSphere(programToDraw, vec3.fromValues(20,55,-50), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(10 * 142/255, 10 * 90/255, 10 * 92/255));
      drawSphere(programToDraw, vec3.fromValues(-10,40,-90), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(10 * 83/255, 10 * 79/255, 10 * 114/255));
      drawSphere(programToDraw, vec3.fromValues(50,30,-100), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(10 * 132/255, 10 * 86/255, 10 * 133/255));
      drawSphere(programToDraw, vec3.fromValues(-60,20,-105), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(10 * 132/255, 10 * 86/255, 10 * 133/255));
      drawSphere(programToDraw, vec3.fromValues(-50,40,-120), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(10 * 132/255, 10 * 86/255, 10 * 133/255));
      drawSphere(programToDraw, vec3.fromValues(-35,25,-200), vec3.fromValues(2.0, 2.0, 2.0), vec3.fromValues(10 * 132/255, 10 * 86/255, 10 * 133/255));
}

function drawScreenTexture(textureToDraw, enableBorder, drawCoC, normColor, multiplyColor) {
      gl.useProgram(shaderProgramBufferRendToText);

      shaderProgramBufferRendToText.vertexPositionAttribute = gl.getAttribLocation(shaderProgramBufferRendToText, "aVertexPosition");
      gl.enableVertexAttribArray(shaderProgramBufferRendToText.vertexPositionAttribute);

      shaderProgramBufferRendToText.textureCoordAttribute = gl.getAttribLocation(shaderProgramBufferRendToText, "aTextureCoord");
      gl.enableVertexAttribArray(shaderProgramBufferRendToText.textureCoordAttribute);

      shaderProgramBufferRendToText.samplerUniform = gl.getUniformLocation(shaderProgramBufferRendToText, "uSampler");

      shaderProgramBufferRendToText.modelMatrixUniform = gl.getUniformLocation(shaderProgramBufferRendToText, "model");

      //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
      gl.disable(gl.DEPTH_TEST);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgramBufferRendToText.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
      gl.vertexAttribPointer(shaderProgramBufferRendToText.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureToDraw);
      gl.uniform1i(shaderProgramBufferRendToText.samplerUniform, 0);

      gl.uniform1f(gl.getUniformLocation(shaderProgramBufferRendToText, "drawCoC"), drawCoC);
      gl.uniform1f(gl.getUniformLocation(shaderProgramBufferRendToText, "normColor"), normColor);
      gl.uniform1f(gl.getUniformLocation(shaderProgramBufferRendToText, "multiplyColor"), multiplyColor);


      mat4.identity(mMatrix);
      var aux = mat4.create();

      mat4.fromScaling(aux, [1.0, 1.0, 1.0]);
      mat4.multiply(mMatrix, mMatrix, aux);

      gl.uniformMatrix4fv(shaderProgramBufferRendToText.modelMatrixUniform, false, mMatrix);

      if (enableBorder == 0) {
          gl.uniform1i(gl.getUniformLocation(shaderProgramBufferRendToText, "uDrawBorder"), 0);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
          gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
      } else {
          gl.uniform1i(gl.getUniformLocation(shaderProgramBufferRendToText, "uDrawBorder"), 1);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
          gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

          mat4.fromScaling(aux, [0.97, 0.97, 1.0]);
          mat4.multiply(mMatrix, mMatrix, aux);

          gl.uniformMatrix4fv(shaderProgramBufferRendToText.modelMatrixUniform, false, mMatrix);

          gl.uniform1i(gl.getUniformLocation(shaderProgramBufferRendToText, "uDrawBorder"), 0);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
          gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
      }

      gl.enable(gl.DEPTH_TEST);
}

function degToRad(degrees) {
   return degrees * Math.PI / 180;
}