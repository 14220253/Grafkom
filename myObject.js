class MyObject {
    vertex = [];
    faces = [];
    childs = [];

    SHADER_PROGRAM = null;
    _color = null;
    position_vao = null;

    _MMATRIX = null;
    _PMATRIX = null;
    _VMATRIX = null;
    _greyScality = null;

    cube_vbo = null;
    cube_ebo = null;
    GL = null;

    MODEL_MATRIX = LIBS.get_I4();
    constructor(GL, vertex, faces, shader_vertex_source, shader_fragment_source) {
        this.GL = GL;
        this.vertex = vertex;
        this.faces = faces;

        var compile_shader = function(source, type, typeString) {
            
            var shader = GL.createShader(type);
            GL.shaderSource(shader, source);
            GL.compileShader(shader);

            if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
              alert("ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader));
              return false;
            }
            return shader;
        };
    
        var shader_vertex = compile_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
        var shader_fragment = compile_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");
    
        this.SHADER_PROGRAM = GL.createProgram();

        GL.attachShader(this.SHADER_PROGRAM, shader_vertex);
        GL.attachShader(this.SHADER_PROGRAM, shader_fragment);
        GL.linkProgram(this.SHADER_PROGRAM);
    
        this.position_vao = this.GL.getAttribLocation(this.SHADER_PROGRAM, "position");
        GL.enableVertexAttribArray(this.position_vao);
    
        this.color_vao = this.GL.getAttribLocation(this.SHADER_PROGRAM, "color");
        GL.enableVertexAttribArray(this.color_vao);
    
        this._PMATRIX = GL.getUniformLocation(this.SHADER_PROGRAM, "PMatrix");
        this._VMATRIX = GL.getUniformLocation(this.SHADER_PROGRAM, "VMatrix");
        this._MMATRIX = GL.getUniformLocation(this.SHADER_PROGRAM, "MMatrix"); 
        this._greyScality = GL.getUniformLocation(this.SHADER_PROGRAM, "greyScality"); 
    
        GL.useProgram(this.SHADER_PROGRAM);

        this.cube_vbo = GL.createBuffer();
        this.cube_ebo = GL.createBuffer();
    }

    

    addChild(object) {
        this.childs.push(object);
    }


    setup() {
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.cube_vbo);
        this.GL.bufferData(this.GL.ARRAY_BUFFER,
            new Float32Array(this.vertex),
            this.GL.STATIC_DRAW);

        this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.cube_ebo);
        this.GL.bufferData(this.GL.ELEMENT_ARRAY_BUFFER, 
            new Uint16Array(this.faces), 
            this.GL.STATIC_DRAW);

            this.childs.forEach(child => {
                child.setup();
            });
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        this.GL.useProgram(this.SHADER_PROGRAM);

        // this.GL.uniformMatrix4fv(this._PMATRIX, false, PROJECTION_MATRIX);

        this.GL.uniformMatrix4fv(this._PMATRIX, false, PROJECTION_MATRIX);
        this.GL.uniformMatrix4fv(this._VMATRIX, false, VIEW_MATRIX);
        this.GL.uniformMatrix4fv(this._MMATRIX, false, this.MODEL_MATRIX);
        this.GL.uniform1f(this._greyScality, 1);

        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.cube_vbo);
        this.GL.vertexAttribPointer(this.position_vao, 3, this.GL.FLOAT, false, 4*(3+3), 0);
        this.GL.vertexAttribPointer(this.color_vao, 3, this.GL.FLOAT, false, 4*(3+3), 3*4);

        this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.cube_ebo);
        this.GL.drawElements(this.GL.TRIANGLES, this.faces.length, this.GL.UNSIGNED_SHORT, 0);

        // this.GL.uniformMatrix4fv(this._MMATRIX, false, MODEL_MATRIX2);
        // this.GL.uniform1f(this._greyScality, 0.3);
        // this.GL.drawElements(this.GL.TRIANGLES, this.faces.length, this.GL.UNSIGNED_SHORT, 0);

        this.childs.forEach(child => {
            child.render(VIEW_MATRIX, PROJECTION_MATRIX);
        });
    }
}



// function main() {
//     /**
//      * @type {HTMLCanvasElement}
//      */
//     var CANVAS = document.getElementById("myCanvas");
//     CANVAS.width = window.innerWidth;
//     CANVAS.height = window.innerHeight;

//     var drag = false;
//     var x_prev = 0;
//     var y_prev = 0;
//     var dx = 0;
//     var dy = 0;
//     var THETA = 0;
//     var ALPHA = 0;
//     var FRICTION = 0.95;

//     var mouseDown = function(e) {
//         drag = true;
//         x_prev = e.pageX;
//         y_prev = e.pageY;
//     }

//     var mouseUp = function(e) {
//         drag = false;
//     }

//     var mouseOut = function(e) {
//         console.log("out");
//     }

//     var mouseMove = function(e) {
//         if (!drag) {
//             return false;
//         };
//         dx = e.pageX - x_prev;
//         dy = e.pageY - y_prev;
//         console.log(dx + " " + dy);
//         x_prev = e.pageX;
//         y_prev = e.pageY;

//         THETA += dx * 2*Math.PI / CANVAS.width;
//         ALPHA += dy * 2*Math.PI / CANVAS.height;
//     }

//     CANVAS.addEventListener("mousedown", mouseDown, false);
//     CANVAS.addEventListener("mouseup", mouseUp, false);
//     CANVAS.addEventListener("mouseout", mouseOut, false);
//     CANVAS.addEventListener("mousemove", mouseMove, false);

//     /**
//      * @type {WebGLRenderingContext}
//      */
    
//     try{
//         this.GL = CANVAS.getContext("webgl", {antialias:true});
//     }catch(e){
//         alert(e);
//         return false;
//     }

//     var shader_vertex_source = `
//         attribute vec3 position;
//         attribute vec3 color;

//         uniform mat4 PMatrix; //projection
//         uniform mat4 VMatrix; //view
//         uniform mat4 MMatrix; //model
        
//         varying vec3 vColor;
//         void main(void){
//             gl_Position = PMatrix*VMatrix*MMatrix*vec4(position, 1.);
//             vColor = color;

//             gl_PointSize = 20.0;
//         }
   
//     `;
//     var shader_fragment_source = `
//         precision mediump float;
//         // uniform vec3 outColor;

//         varying vec3 vColor;

//         uniform float greyScality;
       
//         void main(void){
//             float greyScaleValue = (vColor.r + vColor.b + vColor.g)/3.;
//             vec3 greyScaleColor = vec3(greyScaleValue, greyScaleValue, greyScaleValue);
//             vec3 color = mix(greyScaleColor, vColor, greyScality);
//             gl_FragColor = vec4(color,1.);
//         }
//     `;

//     var triangle_vertices = [
//         0, 0.5,
//         0.7, -0.5,
//         -0.7, -0.5  
//     ];

//     var cube = [
//         //belakang
//         -1,-1,-1,   1,1,0,
//         1,-1,-1,     1,1,0,
//         1,1,-1,     1,1,0,
//         -1,1,-1,    1,1,0,
  
  
//         //depan
//         -1,-1,1,    0,0,1,
//         1,-1,1,     0,0,1,
//         1,1,1,      0,0,1,
//         -1,1,1,     0,0,1,
  
  
//         //kiri
//         -1,-1,-1,   0,1,1,
//         -1,1,-1,    0,1,1,
//         -1,1,1,     0,1,1,
//         -1,-1,1,    0,1,1,
  
  
//         //kanan
//         1,-1,-1,    1,0,0,
//         1,1,-1,     1,0,0,
//         1,1,1,      1,0,0,
//         1,-1,1,     1,0,0,
  
  
//         //bawah
//         -1,-1,-1,   1,0,1,
//         -1,-1,1,    1,0,1,
//         1,-1,1,     1,0,1,
//         1,-1,-1,    1,0,1,
  
  
//         //atas
//         -1,1,-1,    0,1,0,
//         -1,1,1,     0,1,0,
//         1,1,1,      0,1,0,
//         1,1,-1,     0,1,0
//       ]
  
  
//   var cube_faces = [
//           0,1,2,
//           0,2,3,
  
  
//           4,5,6,
//           4,6,7,
  
  
//           8,9,10,
//           8,10,11,
  
  
//           12,13,14,
//           12,14,15,
  
  
//           16,17,18,
//           16,18,19,
  
  
//           20,21,22,
//           20,22,23
//         ];

//    var roda = new roda(wadhgdoada);

//     var Roda = new MyObject(GL, roda, dsadadwda);
    

//     var obj = new MyObject(cube, cube_faces, shader_vertex_source, shader_fragment_source);

//     var obj2 = new MyObject(cube, cube_faces, shader_vertex_source, shader_fragment_source);
//     obj.childs.push(obj2);
//     obj.setup();

//     var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1, 100);

//     var MODEL_MATRIX = LIBS.get_I4();

//     var VIEW_MATRIX = LIBS.get_I4();

//     LIBS.translateZ(VIEW_MATRIX, -5);

//     this.GL.enable(this.GL.DEPTH_TEST);
//     this.GL.depthFunc(this.GL.LEQUAL);

//     LIBS.translateZ(VIEW_MATRIX, -10);
//     // LIBS.translateY(VIEW_MATRIX, 2);
//     LIBS.translateX(VIEW_MATRIX, 4);
//     var pref_time = 0;

//     var animate = function(time) {
//         var dt = time-pref_time;
//         pref_time = time;
//         this.GL.clearColor(0, 0, 0, 0);
//         this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.D_BUFFER_BIT);

//         // LIBS.rotateZ(MODEL_MATRIX, LIBS.degToRad(90*dt/1000));
//         // LIBS.rotateX(MODEL_MATRIX, LIBS.degToRad(30*dt/1000));
//         // LIBS.rotateY(MODEL_MATRIX, LIBS.degToRad(-60*dt/1000));

//         if (!drag) {
//             dx *= FRICTION;
//             dy *= FRICTION;

//             THETA += dx * 2*Math.PI / CANVAS.width;
//             ALPHA += dy * 2*Math.PI / CANVAS.height;
//         }

//         var radius = 2;
//         var pos_x = radius * Math.cos(ALPHA) * Math.cos(THETA);
//         var pos_y = radius * Math.sin(ALPHA);
//         var pos_z = radius * Math.cos(ALPHA) * Math.sin(THETA);

//         MODEL_MATRIX = LIBS.get_I4();
//         LIBS.translateX(MODEL_MATRIX, -4);
//         LIBS.rotateY(MODEL_MATRIX, THETA);
//         LIBS.rotateX(MODEL_MATRIX, ALPHA);
        
//         MODEL_MATRIX2 = LIBS.get_I4();
//         LIBS.rotateY(MODEL_MATRIX2, -THETA);
//         LIBS.rotateX(MODEL_MATRIX2, -ALPHA);
//         //LIBS.setPosition(MODEL_MATRIX2, pos_x, -pos_y, pos_z);

//         var temp = LIBS.get_I4();
//         LIBS.translateX(temp, -6);
//         MODEL_MATRIX2 = LIBS.multiply(MODEL_MATRIX2, temp);
//         LIBS.rotateY(temp, ALPHA);
//         MODEL_MATRIX2 = LIBS.multiply(MODEL_MATRIX2, temp);
//         LIBS.translateX(temp, 6);
//         MODEL_MATRIX2 = LIBS.multiply(MODEL_MATRIX2, temp);

//         obj.MODEL_MATRIX = MODEL_MATRIX;
//         obj.render(VIEW_MATRIX, PROJECTION_MATRIX);

//         obj2.MODEL_MATRIX = MODEL_MATRIX2;
//         // obj.render(VIEW_MATRIX, PROJECTION_MATRIX);
        

//         this.GL.flush();


//         window.requestAnimationFrame(animate);
//     }
//     animate(0);
// }

// window.addEventListener("load", main);