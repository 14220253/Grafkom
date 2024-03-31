class Roda{
    object = null;
    MODEL_MATRIX = null;
    constructor(GL, rad, shader_vertex_source, shader_fragment_source) {
        //generate vertex and face
        var vertex = [];
        for (var i=0;i<361;i++) {
            var a = rad*Math.cos((i/180)*Math.PI);
            var b = rad*Math.sin((i/180)*Math.PI);
            vertex.push(0);
            vertex.push(a);
            vertex.push(b);
    
            vertex.push(1);
            vertex.push(1);
            vertex.push(1);

            vertex.push(rad);
            vertex.push(a);
            vertex.push(b);
    
            vertex.push(1);
            vertex.push(1);
            vertex.push(1);
        }
        var faces = [];
        for (var i=0;i< ((vertex.length/5) - 147);i+=2) {
            faces.push(i);
            faces.push(i+1);
            faces.push(i+2);
    
            faces.push(i+1);
            faces.push(i+2);
            faces.push(i+3);
        }

        this.object = new MyObject(GL, vertex, faces, shader_vertex_source, shader_fragment_source);
    }

    setup(){
        this.object.setup();
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        this.object.MODEL_MATRIX = this.MODEL_MATRIX;
        this.object.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}