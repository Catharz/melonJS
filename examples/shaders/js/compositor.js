var lightingCompositor = me.WebGLRenderer.Compositor.extend({
  init: function(renderer) {
    this._super(me.WebGLRenderer.Compositor, "init", [ renderer ]);
    var gl = renderer.gl;

    // WebGL context
    var vertexSrc = document.getElementById("player-vertex-shader").innerText;
    var fragSrc = document.getElementById("player-fragment-shader").innerText;
    this.modelMatrix = new me.Matrix2d();
    this.lightingShader = me.video.shader.createShader(gl, vertexSrc, fragSrc);
    this.useShader(this.lightingShader.handle);

    this.reset();
  }
});
