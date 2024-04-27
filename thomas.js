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
    muka = null;
    base = null;
    back_bulge  = null;
    objects = [];
    matrixes = [];
    counter = null;
    front_slope = null;
    chimney_black = null;
    blue_buldge = null;
    tiang1= null;
    tiang2= null;
    tiang3= null;
    tiang4= null;
    roof = null;
    constructor(GL, posX, posY, posZ, shader_vertex_source, shader_fragment_source) {
        //generate vertex and face
        var tinggi = 2.0;
        var panjang = 6;
        var lebar = 2.5;
        //0-255 rgb
        var r = 74 / 255;
        var g = 125 / 255;
        var b = 255 / 255;

        var body_vertex = SHAPE.rectangle(panjang, lebar, tinggi, posX, posY, posZ -3, r, g, b);
        var cube_faces = SHAPE.squareFaces();

        var face_front_vertex = SHAPE.cylinder(0.75, 0.5, posX + 1.3, posY + 1.85, posZ + 3.5, 0, 0, 0);
        var cylinderFaces = SHAPE.cylinderFaces(face_front_vertex);
        
        var face_back_vertex = SHAPE.cylinder(0.75, 2.2, posX + 1.3, posY + 1.85, posZ + 0.8, r, g, b);

        var muka_object = SHAPE.hyperboloid12(GL, 0.75, 20, 30, true, 1.3, 1.85, 3.8, 0.7, 0.7, 0.7);

        var base_vertex = SHAPE.rectangle2(panjang + 2, lebar + 1, tinggi / 8, posX - 0.5, posY, posZ - 4.3, 0.4, 0.4, 0.4, 1, 0, 0);

        var back_vertex = SHAPE.rectangle2(panjang/8, lebar + 1, tinggi / 3, posX - 0.5, posY - 0.5, posZ - 4.3, 0.4, 0.4, 0.4, 1, 0, 0);

        var slope_vertex = SHAPE.cubicSlope(2.5, lebar, posX , posY, posZ, 0.4, 0.4, 0.4, 1, 0, 0);
        var slopeFaces = SHAPE.normalFaces(slope_vertex);
        var black_chim_vertex = SHAPE.hyperboloid1(GL, 0.3, 200, 300, true, 1.25, 3.5, -3, 0, 0, 0);   
        
        var blue_buldge_vertex = SHAPE.elipticParaboloid(GL, 0.25, 20, 30, true, 1.5, 2, -3.2, r, g, b);

        var tiang1_vertex = SHAPE.rectangle(3, 2.5, 0.3, 0, -1, -4, r, g, b);
        var tiang2_vertex = SHAPE.rectangle(3, 0.2, 0.3, 0, -1.5, -4, r, g, b);
        var tiang3_vertex = SHAPE.rectangle(3, 2.5, 0.3, 0, -2.8, -4, r, g, b);
        var tiang4_vertex = SHAPE.rectangle(3, 0.2, 0.3, 2.3, -1.5, -4, r, g, b);

        var roof_vertex = SHAPE.cylinderRoof(3, 1.5, 1, -2, 1.25, 0, 0, 0);

        this.body = new MyObject(GL, body_vertex, cube_faces, shader_vertex_source, shader_fragment_source);
        this.face_front = new MyObject(GL, face_front_vertex, cylinderFaces, shader_vertex_source, shader_fragment_source);
        this.face_back = new MyObject(GL, face_back_vertex, cylinderFaces, shader_vertex_source, shader_fragment_source);
        this.muka = new MyObject(GL, muka_object.getInterleaved(), muka_object.getFaces(), shader_vertex_source, shader_fragment_source);
        this.base = new MyObject(GL, base_vertex, cube_faces, shader_vertex_source, shader_fragment_source);
        this.back_bulge = new MyObject(GL, back_vertex, cube_faces, shader_vertex_source, shader_fragment_source);
        this.front_slope = new MyObject(GL, slope_vertex, slopeFaces, shader_vertex_source, shader_fragment_source);
        this.chimney_black = new MyObject(GL, black_chim_vertex.getInterleaved(), black_chim_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
        this.blue_buldge = new MyObject(GL, blue_buldge_vertex.getInterleaved(), blue_buldge_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
        this.tiang1 = new MyObject(GL, tiang1_vertex, cube_faces, shader_vertex_source, shader_fragment_source);
        this.tiang2 = new MyObject(GL, tiang2_vertex, cube_faces, shader_vertex_source, shader_fragment_source);
        this.tiang3 = new MyObject(GL, tiang3_vertex, cube_faces, shader_vertex_source, shader_fragment_source);
        this.tiang4 = new MyObject(GL, tiang4_vertex, cube_faces, shader_vertex_source, shader_fragment_source);
        this.roof = new MyObject(GL, roof_vertex, SHAPE.roofFaces(roof_vertex), shader_vertex_source, shader_fragment_source);

        this.roda1 = new Roda(GL, 1, 0.1, posX + 2.5, posY - 0.7, posZ - 2.5, shader_vertex_source, shader_fragment_source, LIBS.get_I4());
        this.roda2 = new Roda(GL, 1, 0.1, posX + 2.5, posY - 0.7, posZ + 0, shader_vertex_source, shader_fragment_source, LIBS.get_I4());
        this.roda3 = new Roda(GL, 1, 0.1, posX + 2.5, posY - 0.7, posZ + 2.5, shader_vertex_source, shader_fragment_source, LIBS.get_I4());
        this.roda4 = new Roda(GL, 1, 0.1, posX + 0, posY - 0.7, posZ - 2.5,  shader_vertex_source, shader_fragment_source, LIBS.get_I4());
        this.roda5 = new Roda(GL, 1, 0.1, posX + 0, posY - 0.7, posZ + 0,  shader_vertex_source, shader_fragment_source, LIBS.get_I4());
        this.roda6 = new Roda(GL, 1, 0.1, posX + 0, posY - 0.7, posZ + 2.5,  shader_vertex_source, shader_fragment_source, LIBS.get_I4());

        this.objects.push(this.body);
        this.objects.push(this.face_front);
        this.objects.push(this.face_back);
        this.objects.push(this.muka);
        this.objects.push(this.roda1);
        this.objects.push(this.roda2);
        this.objects.push(this.roda3);
        this.objects.push(this.roda4);
        this.objects.push(this.roda5);
        this.objects.push(this.roda6);
        this.objects.push(this.base);
        this.objects.push(this.back_bulge);
        this.objects.push(this.front_slope);
        this.objects.push(this.chimney_black);
        this.objects.push(this.blue_buldge);
        this.objects.push(this.tiang1);
        this.objects.push(this.tiang2);
        this.objects.push(this.tiang3);
        this.objects.push(this.tiang4);
        this.objects.push(this.roof);

        this.counter = this.objects.length;
    }

    setup(){
        this.objects.forEach(object => {
            object.setup();
        });
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        this.objects.forEach(object => {

            if (!(object instanceof Roda)) {
                object.MODEL_MATRIX = this.MODEL_MATRIX;
            }

            if (object == this.chimney_black) {
                LIBS.rotateX(object.MODEL_MATRIX, 1.5);
            }
            
            object.render(VIEW_MATRIX, PROJECTION_MATRIX);
        });
    }
}