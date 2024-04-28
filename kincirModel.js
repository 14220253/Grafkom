class Kincir {
    object = null;
    pipe= null;
    head= null;
    pintu= null;
    baling1= null;
    baling2= null;
    baling3= null;
    baling4= null;
    back1= null;
    back2= null;
    back3= null;
    back4= null;
    BALING_MODEL_MATRIX = null;
    yOffset = null;
    xOffset = null;
    zOffset = null;
    constructor(GL, shader_vertex_source, shader_fragment_source, yOffset) {
        this.object = new KincirObject(GL, generateCylinderVertices(0, -11 + yOffset, 0, 3, 3, 2, 2, 15, 0.7411764705882353, 0.6352941176470588, 0.41568627450980394), generateCylinderIndices(), shader_vertex_source, shader_fragment_source);
        this.object.setup();
        this.pipe = new KincirObject(GL, generatePipeVertices(0, 0 + yOffset, 0, 0.3, 0.3, 3.5, 0.5490196078431373, 0.4549019607843137, 0.28627450980392155), generateCylinderIndices(), shader_vertex_source, shader_fragment_source);
        this.pipe.setup();
        this.head = new KincirObject(GL, createSphere(0, 4 + yOffset, 0, 2,2,2,100,100, 0.7098039215686275, 0.5882352941176471, 0.043137254901960784).vertices, createSphere(0,0,5, 2,2,2,100,100, 0, 0, 0).indices, shader_vertex_source, shader_fragment_source);
        this.head.setup();

        this.yOffset = (yOffset);
        this.xOffset =0;
        this.zOffset = 0.1;
    
        this.baling1 = new KincirObject(GL, generateFanVertices(-0.5, 1, 4, 1, 0.5, 6, 0.8784313725490196, 0.7411764705882353, 0.11372549019607843), generateFanIndices(), shader_vertex_source, shader_fragment_source);
        this.baling1.setup();
        this.baling2 = new KincirObject(GL, generateFanVertices(1, -0.5, 4, 6.5, 0.5, 1, 0.8784313725490196, 0.7411764705882353, 0.11372549019607843), generateFanIndices(), shader_vertex_source, shader_fragment_source);
        this.baling2.setup();
        this.baling3 = new KincirObject(GL, generateFanVertices(-0.5, -1, 4, 1, 0.5, -6, 0.8784313725490196, 0.7411764705882353, 0.11372549019607843), generateFanIndices(), shader_vertex_source, shader_fragment_source);
        this.baling3.setup();
        this.baling4 = new KincirObject(GL, generateFanVertices(-1, -0.5, 4, -6.5, 0.5, 1, 0.8784313725490196, 0.7411764705882353, 0.11372549019607843), generateFanIndices(), shader_vertex_source, shader_fragment_source);
        this.baling4.setup();
    
        this.back1 = new KincirObject(GL, generateFanVertices(-0.25, 0, 3.5, 0.5, 0.5, 3, 0, 0, 0), generateFanIndices(), shader_vertex_source, shader_fragment_source);
        this.back1.setup();
        this.back2 = new KincirObject(GL, generateFanVertices(0, -0.25, 3.5, 3, 0.5, 0.5, 0, 0, 0), generateFanIndices(), shader_vertex_source, shader_fragment_source);
        this.back2.setup();
        this.back3 = new KincirObject(GL, generateFanVertices(-0.25 , 0, 3.5, 0.5, 0.5, -3, 0, 0, 0), generateFanIndices(), shader_vertex_source, shader_fragment_source);
        this.back3.setup();
        this.back4 = new KincirObject(GL, generateFanVertices(0, -0.25, 3.5, -3, 0.5, 0.5, 0, 0, 0), generateFanIndices(), shader_vertex_source, shader_fragment_source);
        this.back4.setup();
        
        this.pintu = new KincirObject(GL, generateFanVertices(-1.5, -10.5 + yOffset, 2.97, 3, 1, 6, 0.47843137254901963, 0.34901960784313724, 0.01568627450980392), generateFanIndices(), shader_vertex_source, shader_fragment_source);
        this.pintu.setup();
        
        this.object.child.push(this.pipe);
        this.object.child.push(this.head);
        this.object.child.push(this.baling1);
        this.object.child.push(this.baling2);
        this.object.child.push(this.baling3);
        this.object.child.push(this.baling4);
        this.object.child.push(this.pintu);
        this.object.child.push(this.back1);
        this.object.child.push(this.back2);
        this.object.child.push(this.back3);
        this.object.child.push(this.back4);
    }
    setup() {
        var DEFAULT_MODEL = LIBS.get_I4();

        this.BALING_MODEL_MATRIX = LIBS.get_I4();

        this.object.MODEL_MATRIX = DEFAULT_MODEL;
        this.pipe.MODEL_MATRIX = DEFAULT_MODEL;
        this.head.MODEL_MATRIX = DEFAULT_MODEL;
        this.pintu.MODEL_MATRIX = DEFAULT_MODEL;

        this.baling1.MODEL_MATRIX = this.BALING_MODEL_MATRIX;
        this.baling2.MODEL_MATRIX = this.BALING_MODEL_MATRIX;
        this.baling3.MODEL_MATRIX = this.BALING_MODEL_MATRIX;
        this.baling4.MODEL_MATRIX = this.BALING_MODEL_MATRIX;
        this.back1.MODEL_MATRIX = this.BALING_MODEL_MATRIX;
        this.back2.MODEL_MATRIX = this.BALING_MODEL_MATRIX;
        this.back3.MODEL_MATRIX = this.BALING_MODEL_MATRIX;
        this.back4.MODEL_MATRIX = this.BALING_MODEL_MATRIX;

        LIBS.translateX(this.BALING_MODEL_MATRIX, this.xOffset);
        LIBS.translateY(this.BALING_MODEL_MATRIX, this.yOffset)
        LIBS.translateZ(this.BALING_MODEL_MATRIX, this.zOffset);
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        LIBS.rotateZ(this.BALING_MODEL_MATRIX, 0.01);
        this.object.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}