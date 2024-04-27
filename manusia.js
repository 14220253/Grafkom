class Manusia{
    MODEL_MATRIX = null;
    body = null;
    muka = null;
    objects = [];
    matrixes = [];
    timer = 0;
    up = true;
    constructor(GL, posX, posY, posZ, shader_vertex_source, shader_fragment_source) {
        //generate vertex and face
        var tinggi = 2.0;
        var panjang = 6;
        var lebar = 2.5;
        //0-255 rgb
        var r = 74 / 255;
        var g = 125 / 255;
        var b = 255 / 255;

        var body_vertex = SHAPE.ellipsoid(GL, 1.2, 1.5, 1.2, 20, 30, true, posX, posY, posZ, 0, 0.5, 0);
        var upper_arm_vertex = SHAPE.ellipsoid(GL, 0.4, 0.7, 0.4, 20, 30, true, posX, posY, posZ, 1, 0.5, 0);

        // var face_front_vertex = SHAPE.cylinder(0.75, 0.5, posX + 1.3, posY + 1.5, posZ + 3.5, 0, 0, 0);
        // var cylinderFaces = SHAPE.cylinderFaces(face_front_vertex);
        
        // var face_back_vertex = SHAPE.cylinder(0.75, 1, posX + 1.3, posY + 1.5, posZ + 2, r, g, b);

        // var muka_object = SHAPE.hyperboloid1(GL, 0.75, 20, 30, true, 1.3, 1.5, 3.8, 0.7, 0.7, 0.7);

        // var base_vertex = SHAPE.rectangle2(panjang + 2, lebar + 1, tinggi / 8, posX - 0.5, posY, posZ - 4.3, 0.4, 0.4, 0.4, 1, 0, 0);

        // var back_vertex = SHAPE.rectangle2(panjang/8, lebar + 1, tinggi / 3, posX - 0.5, posY - 0.5, posZ - 4.3, 0.4, 0.4, 0.4, 1, 0, 0);

        // var slope_vertex = SHAPE.cubicSlope(2.5, lebar, posX , posY, posZ, 0.4, 0.4, 0.4, 1, 0, 0);
        // var slopeFaces = SHAPE.normalFaces(slope_vertex);
        // var black_chim_vertex = SHAPE.hyperboloid(GL, 0.75, 20, 30, true, 0, 3, 0, 0, 0, 0);        

        this.body = new MyObject(GL, body_vertex.getInterleaved(), body_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
        this.upper_arm = new MyObject(GL, upper_arm_vertex.getInterleaved(), upper_arm_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
        // this.face_front = new MyObject(GL, face_front_vertex, cylinderFaces, shader_vertex_source, shader_fragment_source);
        // this.face_back = new MyObject(GL, face_back_vertex, cylinderFaces, shader_vertex_source, shader_fragment_source);
        // this.muka = new MyObject(GL, muka_object.getInterleaved(), muka_object.getFaces(), shader_vertex_source, shader_fragment_source);
        // this.base = new MyObject(GL, base_vertex, cube_faces, shader_vertex_source, shader_fragment_source);
        // this.back_bulge = new MyObject(GL, back_vertex, cube_faces, shader_vertex_source, shader_fragment_source);
        // this.front_slope = new MyObject(GL, slope_vertex, slopeFaces, shader_vertex_source, shader_fragment_source);
        // this.chimney_black = new MyObject(GL, black_chim_vertex.getInterleaved(), black_chim_vertex.getFaces(), shader_vertex_source, shader_fragment_source);

        // this.roda1 = new Roda(GL, 1, 0.1, posX + 2.5, posY - 0.7, posZ - 2.5, shader_vertex_source, shader_fragment_source, LIBS.get_I4());
        // this.roda2 = new Roda(GL, 1, 0.1, posX + 2.5, posY - 0.7, posZ + 0, shader_vertex_source, shader_fragment_source, LIBS.get_I4());
        // this.roda3 = new Roda(GL, 1, 0.1, posX + 2.5, posY - 0.7, posZ + 2.5, shader_vertex_source, shader_fragment_source, LIBS.get_I4());
        // this.roda4 = new Roda(GL, 1, 0.1, posX + 0, posY - 0.7, posZ - 2.5,  shader_vertex_source, shader_fragment_source, LIBS.get_I4());
        // this.roda5 = new Roda(GL, 1, 0.1, posX + 0, posY - 0.7, posZ + 0,  shader_vertex_source, shader_fragment_source, LIBS.get_I4());
        // this.roda6 = new Roda(GL, 1, 0.1, posX + 0, posY - 0.7, posZ + 2.5,  shader_vertex_source, shader_fragment_source, LIBS.get_I4());
        // LIBS.rotateY(this.upper_arm.MODEL_MATRIX, 0.5);
        // LIBS.translateX(this.upper_arm.MODEL_MATRIX, 2);
        // this.body.MODEL_MATRIX = LIBS.scaleflex(this.body.MODEL_MATRIX, 2, 2, 2);
        LIBS.translateX(this.upper_arm.MODEL_MATRIX, 4);

        this.objects.push(this.body);
        this.objects.push(this.upper_arm);
        // this.objects.push(this.face_front);
        // this.objects.push(this.face_back);
        // this.objects.push(this.muka);
        // this.objects.push(this.roda1);
        // this.objects.push(this.roda2);
        // this.objects.push(this.roda3);
        // this.objects.push(this.roda4);
        // this.objects.push(this.roda5);
        // this.objects.push(this.roda6);
        // this.objects.push(this.base);
        // this.objects.push(this.back_bulge);
        // this.objects.push(this.front_slope);
        // this.objects.push(this.chimney_black);

        this.counter = this.objects.length;
    }

    setup(){
        this.objects.forEach(object => {
            
            object.MODEL_MATRIX = LIBS.scaleuniform(object.MODEL_MATRIX, 3);

            if (object == this.upper_arm) {
                LIBS.rotateX(object.MODEL_MATRIX, 10);
            }
            
            object.setup();
        });
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){


        this.objects.forEach(object => {
            if (object == this.upper_arm) {
            //     if (this.up) {
            //         LIBS.rotateX(object.MODEL_MATRIX, 0.01);
            //         this.timer++;
            //     }
            //     else {
            //         LIBS.rotateX(object.MODEL_MATRIX, -0.01);
            //         this.timer--
            //     }
            //     if (this.up && this.timer > 100) {
            //         this.up = false;
            //     }
            //     if (!this.up && this.timer < 0) {
            //         this.up = true;
            //     }
            }

            object.render(VIEW_MATRIX, PROJECTION_MATRIX);
        });
    }
}