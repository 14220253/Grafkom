

function main() {
    var CANVAS = document.getElementById("myCanvas");


    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    var SWING = 0;

    var keys = {};

    var handleKeyDown = function (e) {
        keys[e.key] = true;
    };

    var handleKeyUp = function (e) {
        keys[e.key] = false;
    };

    var handleKeys = function () {
        if (keys["r"]) {
            SWING += 0.05; 
        }
    };

    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("keyup", handleKeyUp, false);


    var mouseDown = function (e) {
        drag = true;
        X_prev = e.pageX;
        Y_prev = e.pageY;
    }


    var mouseUp = function (e) {
        drag = false;
    }


    var mouseMove = function (e) {
        if (!drag) { return false; }
        dX = e.pageX - X_prev;
        dY = e.pageY - Y_prev;
        console.log(dX + " " + dY);
        X_prev = e.pageX;
        Y_prev = e.pageY;


        THETA += dX * 2 * Math.PI / CANVAS.width;
        ALPHA += dY * 2 * Math.PI / CANVAS.height;
    }


    var keyDown = function (e) {
        e.preventDefault();
        console.log(e);
    }


    CANVAS.addEventListener("mousedown", mouseDown, false);
    CANVAS.addEventListener("mouseup", mouseUp, false);
    CANVAS.addEventListener("mouseout", mouseUp, false);
    CANVAS.addEventListener("mousemove", mouseMove, false);
    CANVAS.addEventListener("keydown", keyDown);



    try {
        GL = CANVAS.getContext("webgl", { antialias: true });
    } catch (e) {
        alert("WebGL context cannot be initialized");
        return false;
    }
    //shaders
    var shader_vertex_source = `
      attribute vec3 position;
      attribute vec3 color;


      uniform mat4 PMatrix;
      uniform mat4 VMatrix;
      uniform mat4 MMatrix;
     
      varying vec3 vColor;
      void main(void) {
      gl_Position = PMatrix*VMatrix*MMatrix*vec4(position, 1.);
      vColor = color;


      gl_PointSize=20.0;
      }`;
    var shader_fragment_source = `
      precision mediump float;
      varying vec3 vColor;
      // uniform vec3 color;


      uniform float greyScality;


      void main(void) {
      float greyScaleValue = (vColor.r + vColor.g + vColor.b)/3.;
      vec3 greyScaleColor = vec3(greyScaleValue, greyScaleValue, greyScaleValue);
      vec3 color = mix(greyScaleColor, vColor, greyScality);
      gl_FragColor = vec4(color, 1.);
      }`;

    //matrix
    var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
    var VIEW_MATRIX = LIBS.get_I4();


    LIBS.translateZ(VIEW_MATRIX, -50);

    
    
    var object = new MyObject(generateCylinderVertices(0, -11, 0, 3, 3, 2, 2, 15, 0.7411764705882353, 0.6352941176470588, 0.41568627450980394), generateCylinderIndices(), shader_vertex_source, shader_fragment_source);
    object.setup();
    var pipe = new MyObject(generatePipeVertices(0, 0, 0, 0.3, 0.3, 3.5, 0.5490196078431373, 0.4549019607843137, 0.28627450980392155), generateCylinderIndices(), shader_vertex_source, shader_fragment_source);
    pipe.setup();
    var head = new MyObject(createSphere(0, 4, 0, 2,2,2,100,100, 0.7098039215686275, 0.5882352941176471, 0.043137254901960784).vertices, createSphere(0,0,5, 2,2,2,100,100, 0, 0, 0).indices, shader_vertex_source, shader_fragment_source);
    head.setup();

    var baling1 = new MyObject(generateFanVertices(-0.5, 1, 4, 1, 0.5, 6, 0.8784313725490196, 0.7411764705882353, 0.11372549019607843), generateFanIndices(), shader_vertex_source, shader_fragment_source);
    baling1.setup();
    var baling2 = new MyObject(generateFanVertices(1, -0.5, 4, 6.5, 0.5, 1, 0.8784313725490196, 0.7411764705882353, 0.11372549019607843), generateFanIndices(), shader_vertex_source, shader_fragment_source);
    baling2.setup();
    var baling3 = new MyObject(generateFanVertices(-0.5, -1, 4, 1, 0.5, -6, 0.8784313725490196, 0.7411764705882353, 0.11372549019607843), generateFanIndices(), shader_vertex_source, shader_fragment_source);
    baling3.setup();
    var baling4 = new MyObject(generateFanVertices(-1, -0.5, 4, -6.5, 0.5, 1, 0.8784313725490196, 0.7411764705882353, 0.11372549019607843), generateFanIndices(), shader_vertex_source, shader_fragment_source);
    baling4.setup();

    var back1 = new MyObject(generateFanVertices(-0.25, 0, 3.5, 0.5, 0.5, 3, 0, 0, 0), generateFanIndices(), shader_vertex_source, shader_fragment_source);
    back1.setup();
    var back2 = new MyObject(generateFanVertices(0, -0.25, 3.5, 3, 0.5, 0.5, 0, 0, 0), generateFanIndices(), shader_vertex_source, shader_fragment_source);
    back2.setup();
    var back3 = new MyObject(generateFanVertices(-0.25, 0, 3.5, 0.5, 0.5, -3, 0, 0, 0), generateFanIndices(), shader_vertex_source, shader_fragment_source);
    back3.setup();
    var back4 = new MyObject(generateFanVertices(0, -0.25, 3.5, -3, 0.5, 0.5, 0, 0, 0), generateFanIndices(), shader_vertex_source, shader_fragment_source);
    back4.setup();
    
    var pintu = new MyObject(generateFanVertices(-1.5, -10.5, 2.97, 3, 1, 6, 0.47843137254901963, 0.34901960784313724, 0.01568627450980392), generateFanIndices(), shader_vertex_source, shader_fragment_source);
    pintu.setup();
    
    object.child.push(pipe);
    object.child.push(head);
    object.child.push(baling1);

    var baling2 = new KincirObject(vertexBalok(1, -0.5, 4, 6.5, 0.5, 1, 0.8784313725490196, 0.7411764705882353, 0.11372549019607843), indeksBalok(), shader_vertex_source, shader_fragment_source);
    baling2.setup();
    object.child.push(baling2);

    var baling3 = new KincirObject(vertexBalok(-0.5, -1, 4, 1, 0.5, -6, 0.8784313725490196, 0.7411764705882353, 0.11372549019607843), indeksBalok(), shader_vertex_source, shader_fragment_source);
    baling3.setup();
    object.child.push(baling3);

    var baling4 = new KincirObject(vertexBalok(-1, -0.5, 4, -6.5, 0.5, 1, 0.8784313725490196, 0.7411764705882353, 0.11372549019607843), indeksBalok(), shader_vertex_source, shader_fragment_source);
    baling4.setup();
    object.child.push(baling4);

    var back1 = new KincirObject(vertexBalok(-0.25, 0, 3.5, 0.5, 0.5, 3, 0, 0, 0), indeksBalok(), shader_vertex_source, shader_fragment_source);
    back1.setup();
    object.child.push(back1);

    var back2 = new KincirObject(vertexBalok(0, -0.25, 3.5, 3, 0.5, 0.5, 0, 0, 0), indeksBalok(), shader_vertex_source, shader_fragment_source);
    back2.setup();
    object.child.push(back2);

    var back3 = new KincirObject(vertexBalok(-0.25, 0, 3.5, 0.5, 0.5, -3, 0, 0, 0), indeksBalok(), shader_vertex_source, shader_fragment_source);
    back3.setup();
    object.child.push(back3);

    var back4 = new KincirObject(vertexBalok(0, -0.25, 3.5, -3, 0.5, 0.5, 0, 0, 0), indeksBalok(), shader_vertex_source, shader_fragment_source);
    back4.setup();
    object.child.push(back4);
    
    var pintu = new KincirObject(vertexBalok(-1.5, -10.5, 2.97, 3, 1, 6, 0.47843137254901963, 0.34901960784313724, 0.01568627450980392), indeksBalok(), shader_vertex_source, shader_fragment_source);
    pintu.setup();
    object.child.push(pintu);
    

    /*========================= DRAWING ========================= */
    GL.clearColor(0, 0, 0, 1);


    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);

    var time_prev = 0;
    var animate = function (time) {

        GL.viewport(0, 0, CANVAS.width, CANVAS.height);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.D_BUFFER_BIT);
        var dt = time - time_prev;
        time_prev = time;


        DEFAULT_MODEL = LIBS.get_I4();

        BALING_MODEL_MATRIX = LIBS.get_I4();
        LIBS.rotateZ(BALING_MODEL_MATRIX, -SWING);

        object.MODEL_MATRIX = DEFAULT_MODEL;
        tabungTengah.MODEL_MATRIX = DEFAULT_MODEL;
        kepala.MODEL_MATRIX = DEFAULT_MODEL;
        pintu.MODEL_MATRIX = DEFAULT_MODEL;
        baling1.MODEL_MATRIX = BALING_MODEL_MATRIX;
        baling2.MODEL_MATRIX = BALING_MODEL_MATRIX;
        baling3.MODEL_MATRIX = BALING_MODEL_MATRIX;
        baling4.MODEL_MATRIX = BALING_MODEL_MATRIX;
        back1.MODEL_MATRIX = BALING_MODEL_MATRIX;
        back2.MODEL_MATRIX = BALING_MODEL_MATRIX;
        back3.MODEL_MATRIX = BALING_MODEL_MATRIX;
        back4.MODEL_MATRIX = BALING_MODEL_MATRIX;

        object.render(VIEW_MATRIX, PROJECTION_MATRIX);
        
        handleKeys();

        window.requestAnimationFrame(animate);
    };
    animate(0);
}
window.addEventListener('load', main);
