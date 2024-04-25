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
