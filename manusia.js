class Manusia{
    MODEL_MATRIX = null;
    scale = null;
    objects = [];
    matrixes = [];
    timer = 0;
    up = true;
    counter = 0;
    up = true;
    constructor(GL, posX, posY, posZ, scale, shader_vertex_source, shader_fragment_source) {
        this.scale = scale;
        //generate vertex and face
        var head_vertex = SHAPE.ellipsoid(GL, 0.8, 0.8, 0.8, 20, 30, true, 0, 0, 0, 1, 0.5, 0);
        
        var nose_vertex = SHAPE.cone(0.2, 0, 2.25, 0.7, -0.5,1, 0.4, 0);
        var nose_faces = SHAPE.coneFaces();
        var eye_left_vertex = SHAPE.ellipsoid(GL, 0.1, 0.2, 0.1, 20, 30, true, 0.3, 0.2, 0.7, 0, 0, 0);
        var eye_right_vertex = SHAPE.ellipsoid(GL, 0.1, 0.2, 0.1, 20, 30, true, -0.3, 0.2, 0.7, 0, 0, 0);
        var mouth_vertex = SHAPE.generateBSpline1([-0.3, 0, 0, -0.6, 0.3, 0], 50, 2);
        console.log(mouth_vertex);
        var body_vertex = SHAPE.ellipsoid(GL, 1, 1.5, 0.8, 20, 30, true, posX, posY, posZ, 0, 0.5, 0);
        var upper_arm_vertex = SHAPE.ellipsoid(GL, 0.3, 0.7, 0.3, 20, 30, true, 0, 0.5, 0, 1, 0.5, 0);
        var lower_arm_vertex = SHAPE.ellipsoid(GL, 0.3, 0.7, 0.3, 20, 30, true, -0.9, 1.2, 0, 1, 0.5, 0);
        var hand_vertex = SHAPE.ellipsoid(GL, 0.3, 0.3, 0.3, 20, 30, true, -0.9, 2, 0, 1, 0.6, 0);

        var upper_leg_vertex = SHAPE.cylinder(0.3, 0.8, 0, 0, 0.8, 0, 0.5, 1);
        var upper_leg_faces = SHAPE.cylinderFaces(upper_leg_vertex);
        var lower_leg_vertex = SHAPE.cylinder(0.3, 0.8, 0, 0.15, 2.3, 0, 0.5, 1);
        var lower_leg_faces = SHAPE.cylinderFaces(lower_leg_vertex);
        var feet_vertex = SHAPE.ellipsoid(GL, 0.3, 0.3, 0.6, 20, 30, true, 0, -3.2, 0.3, 1, 0.6, 0);

        var mouth_faces = [];
        for (let i = 0; i < 49; i++) {
            mouth_faces.push(i);
            mouth_faces.push(49);
            mouth_faces.push(i+1);
        }

        // var slope_vertex = SHAPE.cubicSlope(2.5, lebar, posX , posY, posZ, 0.4, 0.4, 0.4, 1, 0, 0);
        // var slopeFaces = SHAPE.normalFaces(slope_vertex);
        // var black_chim_vertex = SHAPE.hyperboloid(GL, 0.75, 20, 30, true, 0, 3, 0, 0, 0, 0);      


        this.head = new MyObject(GL, head_vertex.getInterleaved(), head_vertex.getFaces(), shader_vertex_source, shader_fragment_source);

        this.nose = new MyObject(GL, nose_vertex, nose_faces, shader_vertex_source, shader_fragment_source);
        this.eye_left = new MyObject(GL, eye_left_vertex.getInterleaved(), eye_left_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
        this.eye_right = new MyObject(GL, eye_right_vertex.getInterleaved(), eye_right_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
        this.mouth = new MyObject(GL, mouth_vertex, mouth_faces, shader_vertex_source, shader_fragment_source);

        this.body = new MyObject(GL, body_vertex.getInterleaved(), body_vertex.getFaces(), shader_vertex_source, shader_fragment_source);

        this.upper_arm_left = new MyObject(GL, upper_arm_vertex.getInterleaved(), upper_arm_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
        this.upper_arm_right = new MyObject(GL, upper_arm_vertex.getInterleaved(), upper_arm_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
        

        this.lower_arm_left = new MyObject(GL, lower_arm_vertex.getInterleaved(), upper_arm_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
        this.lower_arm_right = new MyObject(GL, lower_arm_vertex.getInterleaved(), upper_arm_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
    
        this.hand_left = new MyObject(GL, hand_vertex.getInterleaved(), hand_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
        this.hand_right = new MyObject(GL, hand_vertex.getInterleaved(), hand_vertex.getFaces(), shader_vertex_source, shader_fragment_source);

        this.upper_leg_left = new MyObject(GL, upper_leg_vertex, upper_leg_faces, shader_vertex_source, shader_fragment_source);
        this.upper_leg_right = new MyObject(GL, upper_leg_vertex, upper_leg_faces, shader_vertex_source, shader_fragment_source);

        this.lower_leg_left = new MyObject(GL, lower_leg_vertex, lower_leg_faces, shader_vertex_source, shader_fragment_source);
        this.lower_leg_right = new MyObject(GL, lower_leg_vertex, lower_leg_faces, shader_vertex_source, shader_fragment_source);

        this.feet_left = new MyObject(GL, feet_vertex.getInterleaved(), feet_vertex.getFaces(), shader_vertex_source, shader_fragment_source);
        this.feet_right = new MyObject(GL, feet_vertex.getInterleaved(), feet_vertex.getFaces(), shader_vertex_source, shader_fragment_source);


        //mouth
        LIBS.translateZ(this.mouth.MODEL_MATRIX, 0.7);
        LIBS.translateY(this.mouth.MODEL_MATRIX, 1.6 + posY);
        LIBS.translateX(this.mouth.MODEL_MATRIX, 0 + posX);

        //head
        LIBS.translateY(this.head.MODEL_MATRIX, 2 + posY);
        LIBS.translateX(this.head.MODEL_MATRIX, 0 + posX);
        
        //eyes
        LIBS.translateY(this.eye_left.MODEL_MATRIX, 2 + posY);
        LIBS.translateY(this.eye_right.MODEL_MATRIX, 2 + posY);

        //upper left arm
        LIBS.translateX(this.upper_arm_left.MODEL_MATRIX, 0.8 + posX);
        LIBS.translateY(this.upper_arm_left.MODEL_MATRIX, 0.7 + posY);

        //upper right arm
        LIBS.translateX(this.upper_arm_right.MODEL_MATRIX, -0.8 + posX);
        LIBS.translateY(this.upper_arm_right.MODEL_MATRIX, 0.7 + posY);

        //lower left arm
        LIBS.translateX(this.lower_arm_left.MODEL_MATRIX, 0.3 + posX);
        LIBS.translateY(this.lower_arm_left.MODEL_MATRIX, 0.4 + posY);

        //lower right arm
        LIBS.translateX(this.lower_arm_right.MODEL_MATRIX, -0.8 + posX);
        LIBS.translateY(this.lower_arm_right.MODEL_MATRIX, 0.7 + posY);

        //hands
        LIBS.translateX(this.hand_left.MODEL_MATRIX, 2.2 + posX);
        LIBS.translateY(this.hand_left.MODEL_MATRIX, -3.5 + posY);

        LIBS.translateX(this.hand_right.MODEL_MATRIX, -0.8 + posX);
        LIBS.translateY(this.hand_right.MODEL_MATRIX, 0.7 + posY);

        //upper left leg
        LIBS.translateY(this.upper_leg_left.MODEL_MATRIX, -1.2 + posY);
        LIBS.translateX(this.upper_leg_left.MODEL_MATRIX, 0.3 + posX);

        //upper right leg
        LIBS.translateY(this.upper_leg_right.MODEL_MATRIX, -1.2 + posY);
        LIBS.translateX(this.upper_leg_right.MODEL_MATRIX, -0.3 + posX);

        //lower left leg
        LIBS.translateY(this.lower_leg_left.MODEL_MATRIX, -1.2 + posY);
        LIBS.translateX(this.lower_leg_left.MODEL_MATRIX, 0.45 + posX);

        //lower right leg
        LIBS.translateY(this.lower_leg_right.MODEL_MATRIX, -1.2 + posY);
        LIBS.translateX(this.lower_leg_right.MODEL_MATRIX, -0.45 + posX);

        //feet
        LIBS.translateY(this.feet_left.MODEL_MATRIX, -1.2 + posY);
        LIBS.translateX(this.feet_left.MODEL_MATRIX, 0.45 + posX);
        
        LIBS.translateY(this.feet_right.MODEL_MATRIX, -1.2 + posY);
        LIBS.translateX(this.feet_right.MODEL_MATRIX, -0.45 + posX);
        
        LIBS.translateY(this.nose.MODEL_MATRIX, 0 + posY);
        LIBS.translateX(this.nose.MODEL_MATRIX, 0 + posX);
        
        LIBS.translateY(this.eye_left.MODEL_MATRIX, 0);
        LIBS.translateX(this.eye_left.MODEL_MATRIX, 0 + posX);
        
        LIBS.translateY(this.eye_right.MODEL_MATRIX, 0);
        LIBS.translateX(this.eye_right.MODEL_MATRIX, 0 + posX);

        this.objects.push(this.mouth);
        this.objects.push(this.head);
        this.objects.push(this.nose);
        this.objects.push(this.eye_left);
        this.objects.push(this.eye_right);
        this.objects.push(this.body);
        this.objects.push(this.upper_arm_left);
        this.objects.push(this.upper_arm_right);
        this.objects.push(this.lower_arm_left);
        this.objects.push(this.lower_arm_right);
        this.objects.push(this.hand_left);
        this.objects.push(this.hand_right);
        this.objects.push(this.upper_leg_left);
        this.objects.push(this.upper_leg_right);
        this.objects.push(this.lower_leg_left);
        this.objects.push(this.lower_leg_right);
        this.objects.push(this.feet_left);
        this.objects.push(this.feet_right);

        this.counter = this.objects.length;
    }

    setup(){
        this.objects.forEach(object => {
            
            // object.MODEL_MATRIX = LIBS.scaleuniform(object.MODEL_MATRIX, this.scale);

            if (object == this.upper_arm_left)
                LIBS.rotateZ(object.MODEL_MATRIX, 3.6);
            if (object == this.upper_arm_right)
                LIBS.rotateZ(object.MODEL_MATRIX, 1);
            if (object == this.lower_arm_left)
                LIBS.rotateZ(object.MODEL_MATRIX, 3.2);
            if (object == this.upper_leg_left) {
                LIBS.rotateX(object.MODEL_MATRIX, 1.5);
                LIBS.rotateZ(object.MODEL_MATRIX, 0.1);
            }
            if (object == this.upper_leg_right) {
                LIBS.rotateX(object.MODEL_MATRIX, 1.5);
                LIBS.rotateZ(object.MODEL_MATRIX, -0.1);
            }
            if (object == this.lower_leg_left) {
                LIBS.rotateX(object.MODEL_MATRIX, 1.6);
            }
            if (object == this.lower_leg_right) {
                LIBS.rotateX(object.MODEL_MATRIX, 1.6);
            }
               
            object.setup();
        });
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        this.objects.forEach(object => {
            if (object == this.upper_arm_right || object == this.lower_arm_right || object == this.hand_right) {
                if (this.up) {
                    LIBS.rotateZ(object.MODEL_MATRIX, 0.01);
                    this.timer++;
                }
                else {
                    LIBS.rotateZ(object.MODEL_MATRIX, -0.01);
                    this.timer--
                }
                if (this.up && this.timer > 100) {
                    this.up = false;
                }
                if (!this.up && this.timer < 0) {
                    this.up = true;
                }
            }

            if (object == this.head || object == this.eye_left || object == this.eye_right || object == this.nose || object == this.mouth) {
                if(this.up && this.timer < 50) {
                    LIBS.rotateY(object.MODEL_MATRIX, -0.05);
                } else if (this.up && this.timer > 50) {
                    LIBS.rotateY(object.MODEL_MATRIX, 0.05);
                }
            }
            if (this.counter > 100 && up == true) {
                up = false;
            }
            if (this.counter < 0 && up == false) {
                up = true;
            }
            if (this.up){
                LIBS.translateY(object.MODEL_MATRIX, 0.02);
                object.MODEL_MATRIX = LIBS.scaleuniform(object.MODEL_MATRIX, this.scale + 0.01);
                LIBS.translateX(object.MODEL_MATRIX, -0.1)
            }
            else {
                LIBS.translateY(object.MODEL_MATRIX, -0.02);
                object.MODEL_MATRIX = LIBS.scaleuniform(object.MODEL_MATRIX, this.scale - 0.01);
                LIBS.translateX(object.MODEL_MATRIX, +0.1)
            }

            

            object.render(VIEW_MATRIX, PROJECTION_MATRIX);
        });
    }
}
