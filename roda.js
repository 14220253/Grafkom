class Roda{
    object = null;
    MODEL_MATRIX = null;
    posX = null;
    posY = null;
    posZ = null;
    constructor(GL, rad, h, posX, posY, posZ, shader_vertex_source, shader_fragment_source, MM) {
        //generate vertex and face
        //Cylinder luar = 4320 vertex
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        var vertex = [];
        for (var i=0;i<361;i++) {
            var a = rad*Math.cos((i/180)*Math.PI);
            var b = rad*Math.sin((i/180)*Math.PI);
            vertex.push(-h);
            vertex.push(a);
            vertex.push(b);
    
            vertex.push(1);
            vertex.push(0);
            vertex.push(1);

            vertex.push(h);
            vertex.push(a);
            vertex.push(b);
    
            vertex.push(1);
            vertex.push(0);
            vertex.push(1);
        }

        //cylinder dalam = 4320 vertex
        for (var i=0;i<361;i++) {
            var a = 0.85 * rad*Math.cos((i/180)*Math.PI);
            var b = 0.85 * rad*Math.sin((i/180)*Math.PI);
            vertex.push(-h);
            vertex.push(a);
            vertex.push(b);
    
            vertex.push(1);
            vertex.push(1);
            vertex.push(1);

            vertex.push(h);
            vertex.push(a);
            vertex.push(b);
    
            vertex.push(1);
            vertex.push(1);
            vertex.push(1);
        }

        //cylinder tengah = 4320 vertex
        for (var i=0;i<361;i++) {
            var a = 0.2 * rad*Math.cos((i/180)*Math.PI);
            var b = 0.2 * rad*Math.sin((i/180)*Math.PI);
            vertex.push(-h);
            vertex.push(a);
            vertex.push(b);
    
            vertex.push(0);
            vertex.push(1);
            vertex.push(0);

            vertex.push(h);
            vertex.push(a);
            vertex.push(b);
    
            vertex.push(1);
            vertex.push(1);
            vertex.push(0);
        }
       
        //tiap face perlu ada 720 jaraknya (4320 / 6) g tau kenapa dibagi 6
        var faces = [];

        //face untuk cylinder luar
        for (var i = 0;i< 720;i+=2) {
            faces.push(i);
            faces.push(i+1);
            faces.push(i+2);
    
            faces.push(i+1);
            faces.push(i+2);
            faces.push(i+3);
        }

        //face untuk cylinder dalam
        for (var i = 722;i< 1441;i+=2) {
            faces.push(i);
            faces.push(i+1);
            faces.push(i+2);
    
            faces.push(i+1);
            faces.push(i+2);
            faces.push(i+3);
        }

        //face untuk cylinder tengah
        for (var i = 1444;i< 2163;i+=2) {
            faces.push(i);
            faces.push(i+1);
            faces.push(i+2);
    
            faces.push(i+1);
            faces.push(i+2);
            faces.push(i+3);
        }

        //face untuk penutup cylinder luar dan dalam
        for (var i = 0, j = 722; i < 720, j < 1442; i++, j++) {
            faces.push(i);
            faces.push(j);
            faces.push(i+2);

            faces.push(j);
            faces.push(i+2);
            faces.push(j+2);
        }
        
        //face untuk spoke
        for (var i = 722, j = 1444;i < 1442, j < 2164;i +=45, j += 45) {
            faces.push(i);
            faces.push(j);
            faces.push(i+10);

            faces.push(j);
            faces.push(j+30);
            faces.push(i+10);

            faces.push(i+1);
            faces.push(j+1);
            faces.push(i+11);
            
            faces.push(j+1);
            faces.push(j+31);
            faces.push(i+11);
        }

        //face untuk dinding spoke
        for (var i = 722, j = 1444;i < 1442, j < 2164;i +=45, j += 45) {
            faces.push(i);
            faces.push(j);
            faces.push(i+1);

            faces.push(j+1);
            faces.push(i+1);
            faces.push(j);

            faces.push(i+10);
            faces.push(j+30);
            faces.push(i+11);

            faces.push(j+31);
            faces.push(i+11);
            faces.push(j+30);
        }

        //face untuk penutup cylinder tengah
        for (var i = 1444; i < 2164; i += 2) {
            faces.push(1444);
            faces.push(i+2);
            faces.push(i+4);
            faces.push(1445);
            faces.push(i+1);
            faces.push(i+3);
        }

        this.MODEL_MATRIX = MM;
        LIBS.translateX(this.MODEL_MATRIX, posX);
        LIBS.translateY(this.MODEL_MATRIX, posY);
        LIBS.translateZ(this.MODEL_MATRIX, posZ);

        this.object = new MyObject(GL, vertex, faces, shader_vertex_source, shader_fragment_source);
    }

    setup(){
        this.object.setup();
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        this.object.MODEL_MATRIX = this.MODEL_MATRIX;
        LIBS.translateX(this.MODEL_MATRIX, this.posX);
        LIBS.translateY(this.MODEL_MATRIX, this.posY);
        LIBS.translateZ(this.MODEL_MATRIX, this.posZ);
        LIBS.rotateX(this.MODEL_MATRIX, 0.05);
        LIBS.translateX(this.MODEL_MATRIX, -this.posX);
        LIBS.translateY(this.MODEL_MATRIX, -this.posY);
        LIBS.translateZ(this.MODEL_MATRIX, -this.posZ);
        this.object.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}
