function main() {
    var CANVAS = document.getElementById("myCanvas");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
  
    /*========================= CAPTURE MOUSE EVENTS ========================= */
  
    var AMORTIZATION = 0.95;
    var drag = false;
    var x_prev, y_prev;
    var dX = 0, dY = 0;
  
    var mouseDown = function(e) {
      drag = true;
      x_prev = e.pageX, y_prev = e.pageY;
      e.preventDefault();
      return false;
    };
  
    var mouseUp = function(e){
      drag = false;
    };
  
    var mouseMove = function(e) {
      if (!drag) return false;
      dX = (e.pageX-x_prev) * Math.PI / CANVAS.width,
        dY = (e.pageY-y_prev) * Math.PI / CANVAS.height;
      THETA += dX;
      PHI += dY;
      x_prev = e.pageX, y_prev = e.pageY;
      e.preventDefault();
    };
  
    CANVAS.addEventListener("mousedown", mouseDown, false);
    CANVAS.addEventListener("mouseup", mouseUp, false);
    CANVAS.addEventListener("mouseout", mouseUp, false);
    CANVAS.addEventListener("mousemove", mouseMove, false);
  
    /*========================= GET WEBGL CONTEXT ========================= */
    var GL;
    try {
      GL = CANVAS.getContext("webgl", {antialias: true});
      var EXT = GL.getExtension("OES_element_index_uint");
    } catch (e) {
      alert("WebGL context cannot be initialized");
      return false;
    }
  
    /*========================= SHADERS ========================= */
    /*jshint multistr: true */
  
    var shader_vertex_source = `
      attribute vec3 position;
      attribute vec3 normal;
      attribute vec2 uv;
      uniform mat4 Pmatrix, Vmatrix, Mmatrix;
      varying vec2 vUV;
      varying vec3 vNormal;
  
      void main(void) {
        gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position, 1.);
        vUV = uv;
        vNormal = vec3(Mmatrix * vec4(normal,1.));
  }`;
  
  
  
    var shader_fragment_source = `
      precision mediump float;
      uniform sampler2D sampler;
      varying vec2 vUV;
      varying vec3 vNormal;
  
      //Light Source
      const vec3 source_ambient_color = vec3(1.,1.,1.);
      const vec3 source_diffuse_color = vec3(1.,1.,1.);
      const vec3 source_specular_color = vec3(1.,1.,1.);
      const vec3 source_direction = vec3(0.,0.,1.);
      const vec3 view_direction = vec3(0., -4., -20.);
  
      //Material Object
      const vec3 mat_ambient_color = vec3(0.,0.2,0.5);
      const vec3 mat_diffuse_color = vec3(0.,1.,0.2);
      const vec3 mat_specular_color = vec3(1.,1.,1.);
  
      void main(void) {
        vec3 color = vec3(texture2D(sampler,vUV));

        //vec3 color = vColor;
        vec3 I_ambient = source_ambient_color*mat_ambient_color;
        vec3 I_diffuse = source_diffuse_color*mat_diffuse_color*max(0.,dot(source_direction, vNormal));
        vec3 R = reflect(source_direction, vNormal);
        vec3 V = normalize(view_direction);
        vec3 I_specular = source_specular_color*mat_specular_color*pow(max(0.,dot(R, V)), 64.);
        vec3 I = I_ambient+I_diffuse+I_specular;
        gl_FragColor = vec4(color*I, 1.);
        //gl_FragColor = texture2D(sampler, vUV);
    }`;
  
  
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
  
    var SHADER_PROGRAM = GL.createProgram();
    GL.attachShader(SHADER_PROGRAM, shader_vertex);
    GL.attachShader(SHADER_PROGRAM, shader_fragment);
  
    GL.linkProgram(SHADER_PROGRAM);
  
    var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
    var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
    var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");
    var _sampler = GL.getUniformLocation(SHADER_PROGRAM, "sampler");
  
    var _uv = GL.getAttribLocation(SHADER_PROGRAM, "uv");
    var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");
    var _normal = GL.getAttribLocation(SHADER_PROGRAM, "normal");
  
    GL.enableVertexAttribArray(_uv);
    GL.enableVertexAttribArray(_position);
    GL.enableVertexAttribArray(_normal);
  
    GL.useProgram(SHADER_PROGRAM);
    GL.uniform1i(_sampler, 0);


    let sphere = new Sphere(GL, 1, 36, 18, false);

    sphere.setRadius(2);
    sphere.setSectorCount(10);
    sphere.setStackCount(20);
    sphere.setSmooth(true);
  
  
  
    /*========================= MATRIX ========================= */
    var PROJMATRIX = LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1, 100);
    var MOVEMATRIX = LIBS.get_I4();
    var VIEWMATRIX = LIBS.get_I4();
  
    LIBS.translateZ(VIEWMATRIX, -20);
    LIBS.translateY(VIEWMATRIX, -4);
    var THETA = 0,
        PHI = 0;
  
    /*========================= TEXTURES ========================= */
    var load_texture = function(image_URL){
      var texture = GL.createTexture();
  
      var image = new Image();
      image.src = image_URL;
      image.onload = function(e) {
        GL.bindTexture(GL.TEXTURE_2D, texture);
        GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR);
        GL.generateMipmap(GL.TEXTURE_2D);
        GL.bindTexture(GL.TEXTURE_2D, null);
      };
  
      return texture;
    };
  
    var dragon_texture = load_texture("ressources/gray.jpg");
  
    /*========================= DRAWING ========================= */
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);
    GL.clearColor(0.0, 0.0, 0.0, 0.0);
    GL.clearDepth(1.0);
  
    var time_prev = 0;
    var animate = function(time) {
      var dt = time-time_prev;
      if (!drag) {
        dX *= AMORTIZATION, dY *= AMORTIZATION;
        THETA += dX, PHI += dY;
      }
      LIBS.set_I4(MOVEMATRIX);
      LIBS.rotateY(MOVEMATRIX, THETA);
      LIBS.rotateX(MOVEMATRIX, PHI);
      time_prev = time;
  
      GL.viewport(0, 0, CANVAS.width, CANVAS.height);
      GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
      GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
      GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
      GL.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);
  
      GL.activeTexture(GL.TEXTURE0);
      GL.bindTexture(GL.TEXTURE_2D, dragon_texture);

      GL.bindBuffer(GL.ARRAY_BUFFER, sphere.vboVertex);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, sphere.stride, 0);
      GL.vertexAttribPointer(_normal, 3, GL.FLOAT, false, sphere.stride, 12);
      GL.vertexAttribPointer(_uv, 2, GL.FLOAT, false, sphere.stride, 24);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, sphere.vboIndex);
      GL.drawElements(GL.LINE_STRIP, sphere.getIndexCount(), GL.UNSIGNED_SHORT, 0);
  
      GL.flush();
      window.requestAnimationFrame(animate);
    };
    animate(0);
  }
  
  window.addEventListener('load', main);