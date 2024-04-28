class KincirObject {
    GL = null;

    canvas = null;
    vertex = [];
    faces = [];


    SHADER_PROGRAM = null;
    _color = null;
    _position = null;


    _MMatrix = LIBS.get_I4();
    _PMatrix = LIBS.get_I4();
    _VMatrix = LIBS.get_I4();
    _greyScality = 0;


    TRIANGLE_VERTEX = null;
    TRIANGLE_FACES = null;


    MODEL_MATRIX = LIBS.get_I4();

    child = [];

    constructor(GL, vertex, faces, source_shader_vertex, source_shader_fragment) {
        this.vertex = vertex;
        this.faces = faces;
        this.GL = GL;

        var compile_shader = function (source, type, typeString) {
            var shader = GL.createShader(type);
            GL.shaderSource(shader, source);
            GL.compileShader(shader);
            if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
                alert("ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader));
                return false;
            }
            return shader;
        };

        var shader_vertex = compile_shader(source_shader_vertex, this.GL.VERTEX_SHADER, "VERTEX");

        var shader_fragment = compile_shader(source_shader_fragment, this.GL.FRAGMENT_SHADER, "FRAGMENT");

        this.SHADER_PROGRAM = this.GL.createProgram();
        this.GL.attachShader(this.SHADER_PROGRAM, shader_vertex);
        this.GL.attachShader(this.SHADER_PROGRAM, shader_fragment);

        this.GL.linkProgram(this.SHADER_PROGRAM);


        //vao
        this._color = this.GL.getAttribLocation(this.SHADER_PROGRAM, "color");
        this._position = this.GL.getAttribLocation(this.SHADER_PROGRAM, "position");


        //uniform
        this._PMatrix = this.GL.getUniformLocation(this.SHADER_PROGRAM, "PMatrix"); //projection
        this._VMatrix = this.GL.getUniformLocation(this.SHADER_PROGRAM, "VMatrix"); //View
        this._MMatrix = this.GL.getUniformLocation(this.SHADER_PROGRAM, "MMatrix"); //Model
        this._greyScality = this.GL.getUniformLocation(this.SHADER_PROGRAM, "greyScality");//GreyScality


        this.GL.enableVertexAttribArray(this._color);
        this.GL.enableVertexAttribArray(this._position);
        this.GL.useProgram(this.SHADER_PROGRAM);




        this.TRIANGLE_VERTEX = this.GL.createBuffer();
        this.TRIANGLE_FACES = this.GL.createBuffer();
    }


    setup() {
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.TRIANGLE_VERTEX);
        this.GL.bufferData(this.GL.ARRAY_BUFFER,
            new Float32Array(this.vertex),
            this.GL.STATIC_DRAW);


        this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.TRIANGLE_FACES);
        this.GL.bufferData(this.GL.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(this.faces),
            this.GL.STATIC_DRAW);

        this.child.forEach(obj => {
            obj.render(VIEW_MATRIX, PROJECTION_MATRIX);
        });
    }


    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        this.GL.useProgram(this.SHADER_PROGRAM);
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.TRIANGLE_VERTEX);
        this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.TRIANGLE_FACES);
        this.GL.vertexAttribPointer(this._position, 3, this.GL.FLOAT, false, 4 * (3 + 3), 0);
        this.GL.vertexAttribPointer(this._color, 3, this.GL.FLOAT, false, 4 * (3 + 3), 3 * 4);

        this.GL.uniformMatrix4fv(this._PMatrix, false, PROJECTION_MATRIX);
        this.GL.uniformMatrix4fv(this._VMatrix, false, VIEW_MATRIX);
        this.GL.uniformMatrix4fv(this._MMatrix, false, this.MODEL_MATRIX);
        this.GL.uniform1f(this._greyScality, 1);

        this.GL.drawElements(this.GL.TRIANGLES, this.faces.length, this.GL.UNSIGNED_SHORT, 0);

        this.child.forEach(obj => {
            obj.render(VIEW_MATRIX, PROJECTION_MATRIX);
        });

        this.GL.flush();
    }
    model(MODEL_MATRIXX){
        for (let i = 0; i < this.child.length; i++) {
            this.child[i].MODEL_MATRIX = MODEL_MATRIXX;
        }
    }
}

