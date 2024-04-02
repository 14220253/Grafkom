class Thomas {
    obj1 = null;
    obj2 = null;
    MODEL_MATRIX = null;

    constructor(GL, shader_vertex_source, shader_fragment_source) {




        this.obj1 = new Roda(GL, 1, 0.3, shader_vertex_source, shader_fragment_source);
        this.obj2 = new Roda(GL, 2, 0.3, shader_vertex_source, shader_fragment_source);
        this.obj1.object.childs.push(this.obj2);
    }

    setup() {
        this.obj1.setup();
        // this.obj2.setup();
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        this.obj1.MODEL_MATRIX = this.MODEL_MATRIX;
        this.obj1.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}