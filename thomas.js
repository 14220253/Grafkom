class Thomas{
    body = null;
    face_front = null;
    face_back = null;
    MODEL_MATRIX = null;
    roda1 = null;
    roda2 = null;
    roda3 = null;
    roda4 = null;
    roda5 = null;
    roda6 = null;
    objects = [];
    constructor(GL, posX, posY, posZ, shader_vertex_source, shader_fragment_source) {
        //generate vertex and face
        var tinggi = 2.0;
        var panjang = 3.0;
        var lebar = 2.5;
        //0-255 rgb
        var r = 74 / 255;
        var g = 125 / 255;
        var b = 255 / 255;

        var body_vertex = SHAPE.rectangle(panjang, lebar, tinggi, posX, posY, posZ, r, g, b);
        var body_faces = SHAPE.squareFaces();

        var face_front_vertex = SHAPE.cylinder(1, 0.5, posX + 1.3, posY + 1.5, posZ + 3.5, 0, 0, 0);
        var cylinderFaces = SHAPE.cylinderFaces(face_front_vertex);
        
        var face_back_vertex = SHAPE.cylinder(1, 1, posX + 1.3, posY + 1.5, posZ + 2, r, g, b);

        this.body = new MyObject(GL, body_vertex, body_faces, shader_vertex_source, shader_fragment_source);
        this.face_front = new MyObject(GL, face_front_vertex, cylinderFaces, shader_vertex_source, shader_fragment_source);
        this.face_back = new MyObject(GL, face_back_vertex, cylinderFaces, shader_vertex_source, shader_fragment_source);

        this.roda1 = new Roda(GL, posX + 0.5, posY + 0.2, posZ + 0.3, 0, 0, shader_vertex_source, shader_fragment_source);
        this.roda2 = new Roda(GL, posX + 0.5, posY + 0.2, posZ + 1.5, 0, 0,  shader_vertex_source, shader_fragment_source);
        this.roda3 = new Roda(GL, posX + 0.5, posY + 0.2, posZ + 2.7, 0, 0,  shader_vertex_source, shader_fragment_source);
        this.roda4 = new Roda(GL, posX + 0.5, posY + 0.2, posZ + 0.3, 0, lebar,  shader_vertex_source, shader_fragment_source);
        this.roda5 = new Roda(GL, posX + 0.5, posY + 0.2, posZ + 1.5, 0, lebar,  shader_vertex_source, shader_fragment_source);
        this.roda6 = new Roda(GL, posX + 0.5, posY + 0.2, posZ + 2.7, 0, lebar,  shader_vertex_source, shader_fragment_source);

        this.objects.push(this.body);
        this.objects.push(this.face_front);
        this.objects.push(this.face_back);
        this.objects.push(this.roda1);
        this.objects.push(this.roda2);
        this.objects.push(this.roda3);
        this.objects.push(this.roda4);
        this.objects.push(this.roda5);
        this.objects.push(this.roda6);
    }

    setup(){
        this.objects.forEach(object => {
            object.setup();
        });
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        this.objects.forEach(object => {
            object.MODEL_MATRIX = this.MODEL_MATRIX;
            object.render(VIEW_MATRIX, PROJECTION_MATRIX);
        });
    }
}