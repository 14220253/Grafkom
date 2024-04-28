function main(){
    var CANVAS = document.getElementById("myCanvas"); //canvas dari html 
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    /**
     * @type {WebGLRenderingContext}
     */
    var GL;
    try{
        GL = CANVAS.getContext("webgl",{antialias:false});
    }catch(e){
        alert(e);
        return false;
    }

    //shader vertex
    var shader_vertex_source = `
        attribute vec3 position;
        attribute vec3 color;
        uniform mat4 PMatrix; //Projection
        uniform mat4 VMatrix; //View
        uniform mat4 MMatrix; //Model/World

        varying vec3 vColor;
        void main(void){
            gl_Position = PMatrix*VMatrix*MMatrix*vec4(position, 1.); 
            vColor = color;
            gl_PointSize=20.0;
        }

    `;

    //shader fragment
    var shader_fragment_source =`
        precision mediump float;
        varying vec3 vColor;
        uniform float greyScality;
        void main(void){
            gl_FragColor = vec4(vColor,1.);
            
            float greyScaleValue = (vColor.r + vColor.g + vColor.b)/3.;
            vec3 greyScaleColor = vec3(greyScaleValue, greyScaleValue, greyScaleValue);
            vec3 color = mix(greyScaleColor, vColor, greyScality);
        }
    `;

    //event listener
    
    var AMORTIZATION = 0;
    var drag = false;
    var x_prev, y_prev;
    var dX = 0, dY = 0;
    var THETA = 0,
        PHI = 0;
    var dx = 0;
    var dy = 0;
    var dz = 0;



    var mouseDown = function(e) {
        drag = true;
        x_prev = e.pageX;
        e.preventDefault();
        return false;
      };
    
      var mouseUp = function(e){
        drag = false;
      };
    
      var mouseMove = function(e) {
        if (!drag) return false;
        dX = (e.pageX-x_prev) * Math.PI / CANVAS.width,
        THETA += dX;
        PHI += dY;
        x_prev = e.pageX;
        e.preventDefault();
      };

      var speed = 0.2;

      var buttonA = function(e) {
        if(e.keyCode == 65) {
            dx = speed;
        }
    }
    var buttonD = function(e) {
        if(e.keyCode == 68) {
            dx = -speed;
        }
    }
    var buttonW = function(e) {
        if(e.keyCode == 87) {
            dz = speed;
        }
    }
    var buttonS = function(e) {
        if(e.keyCode == 83) {
            dz = -speed;
        }
    }   
    var buttonQ = function(e) {
        if(e.keyCode == 81) {
            dy = speed;
        }
    }
    var buttonE = function(e) {
        if(e.keyCode == 69) {
            dy = -speed;
        }
    }   
    var keyUp = function(e) {
        dx = 0;
        dy = 0;
        dz = 0;
    }   
    
      CANVAS.addEventListener("mousedown", mouseDown, false);
      CANVAS.addEventListener("mouseup", mouseUp, false);
      CANVAS.addEventListener("mouseout", mouseUp, false);
      CANVAS.addEventListener("mousemove", mouseMove, false);
      document.addEventListener("keydown", buttonA, true);
      document.addEventListener("keydown", buttonD, true);
      document.addEventListener("keydown", buttonW, true);
      document.addEventListener("keydown", buttonS, true);
      document.addEventListener("keydown", buttonQ, true);
      document.addEventListener("keydown", buttonE, true);
      document.addEventListener("keyup", keyUp, true);



    let cube_size = 500.0;
    //vertices of object
    var cube = SHAPE.cube(cube_size, 0, 0, 0, 0.5, 0.7, 1);
  
    var cube_faces = SHAPE.squareFaces();

    var sea_v = SHAPE.rectangle(cube_size, cube_size, 2, -cube_size/2, -5, -cube_size/2, 0, 0, 1);

    var island_obj = SHAPE.sphere(GL, 20, 18, 36, true, 0, -15, 0, 1, 1, 0);

    
    var cameraMatrix = LIBS.get_I4();
    LIBS.rotateY(cameraMatrix, 0);
    LIBS.translateZ(cameraMatrix, 10);
    //matrix 
    var PROJECTION_MATRIX = LIBS.get_projection(40,CANVAS.width/CANVAS.height,0.01,9999); //a ratio, 1 itu zmin diana jarak terdekat 100 merupakan zmax yaitu jarak terjauh
    var MODEL_MATRIX = LIBS.get_I4();
    var VIEW_MATRIX = LIBS.inverse(cameraMatrix);
    var VIEW_PROJECTION_MATRIX = LIBS.multiply(PROJECTION_MATRIX, VIEW_MATRIX);

    var MODEL_MATRIX2 = LIBS.get_I4();

    // LIBS.translateY(VIEW_MATRIX, 0);
    var time_prev = 0;



    var thomas = new Thomas(GL, -10, 6, 0, shader_vertex_source, shader_fragment_source);
    var sky = new MyObject(GL, cube, cube_faces, shader_vertex_source, shader_fragment_source);
    var sea = new MyObject(GL, sea_v, cube_faces, shader_vertex_source, shader_fragment_source);
    var island = new MyObject(GL, island_obj.getInterleaved(), island_obj.getFaces(), shader_vertex_source, shader_fragment_source);
    var kincirangin = new Kincir(GL, shader_vertex_source, shader_fragment_source, 15.7);
    var manusia = new Manusia(GL, 10, 10, 10, 1, shader_vertex_source, shader_fragment_source);

    thomas.setup();
    sky.setup();
    sea.setup();
    island.setup();
    kincirangin.setup();
    manusia.setup();

    LIBS.translateY(VIEW_MATRIX, -10);
    LIBS.translateZ(VIEW_MATRIX, -20);

    var time_prev = 0;
    var animate = function(time){
        var matrix = VIEW_PROJECTION_MATRIX;

        LIBS.translateX(matrix, THETA);
        LIBS.translateY(matrix, PHI);
        // LIBS.translateZ(matrix, -THETA);

        var dt = time-time_prev;
        if (!drag) {
          dX *= AMORTIZATION, dY *= AMORTIZATION;
          THETA += dX, PHI += dY;
        }
        MODEL_MATRIX = LIBS.get_I4();
        LIBS.rotateY(VIEW_MATRIX, THETA);
        LIBS.rotateX(VIEW_MATRIX, PHI);

        
        MODEL_MATRIX2 = LIBS.get_I4();
        LIBS.rotateY(MODEL_MATRIX2, THETA);
        LIBS.rotateX(MODEL_MATRIX2, PHI);
        time_prev = time;

        THETA = 0;
        PHI = 0;

        LIBS.translateX(VIEW_MATRIX, dx);
        LIBS.translateY(VIEW_MATRIX, dy);
        LIBS.translateZ(VIEW_MATRIX, dz);
        // GL.viewport(0,0,CANVAS.width,CANVAS.height);
        GL.clearColor(0,0,0,0);
        GL.enable(GL.DEPTH_TEST);
        GL.depthFunc(GL.LEQUAL);
        GL.clearDepth(cube_size);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.D_BUFFER_BIT);

        sky.MODEL_MATRIX = MODEL_MATRIX;
        sky.render(VIEW_MATRIX, PROJECTION_MATRIX);
        sea.MODEL_MATRIX = MODEL_MATRIX;
        sea.render(VIEW_MATRIX, PROJECTION_MATRIX);
        island.MODEL_MATRIX = MODEL_MATRIX;
        island.render(VIEW_MATRIX, PROJECTION_MATRIX);
        manusia.render(VIEW_MATRIX, MODEL_MATRIX);

        thomas.MODEL_MATRIX = MODEL_MATRIX2;
        thomas.render(VIEW_MATRIX, PROJECTION_MATRIX);

        kincirangin.render(VIEW_MATRIX, PROJECTION_MATRIX);

        GL.flush();

        

        window.requestAnimationFrame(animate);

    }
    animate(0);

}
//siapkan semua data nya dulu
//ketika window nay dalam kondisi load aku apnggil main
window.addEventListener("load", main);
//shader pertama akaan menerima titik2 koordinat kita dan akan diterima ke fragment 
