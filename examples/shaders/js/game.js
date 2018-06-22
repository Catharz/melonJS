/**
 * main
 */
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

var game = {

    /**
     *
     * Initialize the application
     */
    onload: function() {
        // init the video
        console.log("initializing game");

        if (!me.video.init(
                800, 600, {
                    wrapper: "screen",
                    renderer: me.video.WEBGL,
                    doubleBuffering: true,
                    scale: "auto",
                    scaleMethod: "fit",
                    antiAlias: true,
                    compositor: lightingCompositor
                })) {
            alert("Your browser does not support WebGL.");
            return;
        }

        // set all ressources to be loaded
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    update: function (dt) {
        this._super(me.Entity, "update", [dt]);
        return true;
    },

    /**
     * callback when everything is loaded
     */
    loaded: function() {

        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // set the fade transition effect
        me.state.transition("fade", "#FFFFFF", 250);

        // register our objects entity in the object pool
        me.pool.register("mainPlayer", game.PlayerEntity);

        // switch to PLAY state
        me.state.change(me.state.PLAY);
    }
};
