function createFramebuffers() {
      var ext = gl.getExtension('OES_texture_float');
      var ext2 = gl.getExtension('OES_texture_float_linear');

	framebufferSetupSceneRGBA32F = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferSetupSceneRGBA32F);

	var texture = createAndSetupTexture();
	textureFramebufferSetupScene = texture;

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient, 0, gl.RGBA, gl.FLOAT, null);

	var renderbuffer = gl.createRenderbuffer();
	gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

	
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);


      framebufferDepth = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferDepth);

      var textureDepth = createAndSetupTexture();
      textureFramebufferDepth = textureDepth;

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient, 0, gl.RGBA, gl.FLOAT, null);

      var renderbufferDepth = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, renderbufferDepth);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textureDepth, 0);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbufferDepth);
      


      framebufferCoCSize = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferCoCSize);

      var textureCoC = createAndSetupTexture();
      textureFramebufferCoCSize = textureCoC;

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient, 0, gl.RGBA, gl.FLOAT, null);

      var renderbufferCoC = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, renderbufferCoC);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textureCoC, 0);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbufferCoC);
      textureFramebufferCoCSize = textureCoC;



      framebufferSecondBlurPass = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferSecondBlurPass);

      var textureApplySecBlur = createAndSetupTexture();
      textureSecondBlurrPass = textureApplySecBlur;

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth/2.0, gl.viewportHeight/2.0, 0, gl.RGBA, gl.FLOAT, null);

      var renderbufferSecondBlurPass = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, renderbufferSecondBlurPass);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth, gl.viewportHeight);

      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textureApplySecBlur, 0);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbufferSecondBlurPass);




      framebufferApplyDoFPass = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferApplyDoFPass);

      var textureApplyDoF = createAndSetupTexture();
      textureFramebufferApplyDoF = textureApplyDoF;


      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient, 0, gl.RGBA, gl.FLOAT, null);

      var renderbufferApplyDoF = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, renderbufferApplyDoF);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth/downsampleCoefficient, gl.viewportHeight/downsampleCoefficient);

      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textureApplyDoF, 0);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbufferApplyDoF);

}