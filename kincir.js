class KincirAngin {
    object = null;
    MODEL_MATRIX = null;

    constructor(GL, radius, height, bladeLength, bladeWidth, shader_vertex_source, shader_fragment_source) {
        var vertex = [];
        var faces = [];

        // Membuat baling-baling
        for (var i = 0; i < 360; i += 120) { 
            var angle1 = (i / 180) * Math.PI;
            var angle2 = ((i + bladeWidth) / 180) * Math.PI;
            var x1 = radius * Math.cos(angle1);
            var y1 = radius * Math.sin(angle1);
            var x2 = (radius + bladeLength) * Math.cos(angle2);
            var y2 = (radius + bladeLength) * Math.sin(angle2);
            vertex.push(0, 0, 0); 
            vertex.push(0.55, 0.27, 0.07); //warna
            vertex.push(x1, y1, 0); 
            vertex.push(0.55, 0.27, 0.07);
            vertex.push(x2, y2, 0);
            vertex.push(0.55, 0.27, 0.07);
            vertex.push(0, 0, 0); 
            vertex.push(0.55, 0.27, 0.07); 
            vertex.push(x1, y1, 0); 
            vertex.push(0.55, 0.27, 0.07);
            vertex.push(0, 0, height); 
            vertex.push(0.55, 0.27, 0.07); 

            var index = i / 120 * 6;
            faces.push(index, index + 1, index + 2); 
            faces.push(index + 3, index + 4, index + 5);
        }

        this.object = new MyObject(GL, vertex, faces, shader_vertex_source, shader_fragment_source);
    }

    setup() {
        this.object.setup();
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        this.object.MODEL_MATRIX = this.MODEL_MATRIX;
        this.object.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}
