
var LIBS = {

  degToRad: function(angle){

    return(angle*Math.PI/180);

  },



  get_projection: function(angle, a, zMin, zMax) {

    var tan = Math.tan(LIBS.degToRad(0.5*angle)),

        A = -(zMax+zMin)/(zMax-zMin),

        B = (-2*zMax*zMin)/(zMax-zMin);



    return [

      0.5/tan, 0 ,   0, 0,

      0, 0.5*a/tan,  0, 0,

      0, 0,         A, -1,

      0, 0,         B, 0

    ];

  },

  set_I4: function(m) {

      m[0]=1, m[1]=0, m[2]=0, m[3]=0, m[4]=0, m[5]=1, m[6]=0, m[7]=0, m[8]=0, m[9]=0, m[10]=1, m[11]=0, m[12]=0, m[13]=0, m[14]=0, m[15]=1; 

    },

  
    get_I4: function() {

      return [1,0,0,0,

              0,1,0,0,

              0,0,1,0,

              0,0,0,1];

    },

    rotateX: function(m, angle) {

      var c = Math.cos(angle);

      var s = Math.sin(angle);

      var mv1=m[1], mv5=m[5], mv9=m[9];

      m[1]=m[1]*c-m[2]*s;

      m[5]=m[5]*c-m[6]*s;

      m[9]=m[9]*c-m[10]*s;

  

      m[2]=m[2]*c+mv1*s;

      m[6]=m[6]*c+mv5*s;

      m[10]=m[10]*c+mv9*s;

    },

  

    rotateY: function(m, angle) {

      var c = Math.cos(angle);

      var s = Math.sin(angle);

      var mv0=m[0], mv4=m[4], mv8=m[8];

      m[0]=c*m[0]+s*m[2];

      m[4]=c*m[4]+s*m[6];

      m[8]=c*m[8]+s*m[10];

  

      m[2]=c*m[2]-s*mv0;

      m[6]=c*m[6]-s*mv4;

      m[10]=c*m[10]-s*mv8;

    },

  

    rotateZ: function(m, angle) {

      var c = Math.cos(angle);

      var s = Math.sin(angle);

      var mv0=m[0], mv4=m[4], mv8=m[8];

      m[0]=c*m[0]-s*m[1];

      m[4]=c*m[4]-s*m[5];

      m[8]=c*m[8]-s*m[9];

  

      m[1]=c*m[1]+s*mv0;

      m[5]=c*m[5]+s*mv4;

      m[9]=c*m[9]+s*mv8;

    },

    translateZ: function(m, t){

      m[14]+=t;

    },

    translateY: function(m, t){

      m[13]+=t;

    },

    translateX: function(m, t){

      m[12]+=t;

    },

    teleportZ: function(m, t){

      m[14]=t;

    },

    teleportY: function(m, t){

      m[13]=t;

    },

    teleportX: function(m, t){

      m[12]=t;

    },

    multiply1: function(a, b) {
      var a00 = a[0 * 4 + 0];
      var a01 = a[0 * 4 + 1];
      var a02 = a[0 * 4 + 2];
      var a03 = a[0 * 4 + 3];
      var a10 = a[1 * 4 + 0];
      var a11 = a[1 * 4 + 1];
      var a12 = a[1 * 4 + 2];
      var a13 = a[1 * 4 + 3];
      var a20 = a[2 * 4 + 0];
      var a21 = a[2 * 4 + 1];
      var a22 = a[2 * 4 + 2];
      var a23 = a[2 * 4 + 3];
      var a30 = a[3 * 4 + 0];
      var a31 = a[3 * 4 + 1];
      var a32 = a[3 * 4 + 2];
      var a33 = a[3 * 4 + 3];
      var b00 = b[0 * 4 + 0];
      var b01 = b[0 * 4 + 1];
      var b02 = b[0 * 4 + 2];
      var b03 = b[0 * 4 + 3];
      var b10 = b[1 * 4 + 0];
      var b11 = b[1 * 4 + 1];
      var b12 = b[1 * 4 + 2];
      var b13 = b[1 * 4 + 3];
      var b20 = b[2 * 4 + 0];
      var b21 = b[2 * 4 + 1];
      var b22 = b[2 * 4 + 2];
      var b23 = b[2 * 4 + 3];
      var b30 = b[3 * 4 + 0];
      var b31 = b[3 * 4 + 1];
      var b32 = b[3 * 4 + 2];
      var b33 = b[3 * 4 + 3];
      return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
      ];
    },

    scaleflex: function (m, x, y, z) {
      var sm = [x, 0, 0, 0,
                0, y, 0, 0,
                0, 0, z, 0,
                0, 0, 0, 1];
  
      m[12] = m[12] * x;
      m[13] = m[13] * y;
      m[14] = m[14] * z;
      return this.multiply1(m, sm);
    },
  
    scaleuniform: function (m, s) {
      var sm = [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1 / s];
  
      m[12] = m[12] * s;
      m[13] = m[13] * s;
      m[14] = m[14] * s;
      return this.multiply1(m, sm);
    },
  

    inverse: function(m) {
      var m00 = m[0 * 4 + 0];
      var m01 = m[0 * 4 + 1];
      var m02 = m[0 * 4 + 2];
      var m03 = m[0 * 4 + 3];
      var m10 = m[1 * 4 + 0];
      var m11 = m[1 * 4 + 1];
      var m12 = m[1 * 4 + 2];
      var m13 = m[1 * 4 + 3];
      var m20 = m[2 * 4 + 0];
      var m21 = m[2 * 4 + 1];
      var m22 = m[2 * 4 + 2];
      var m23 = m[2 * 4 + 3];
      var m30 = m[3 * 4 + 0];
      var m31 = m[3 * 4 + 1];
      var m32 = m[3 * 4 + 2];
      var m33 = m[3 * 4 + 3];
      var tmp_0  = m22 * m33;
      var tmp_1  = m32 * m23;
      var tmp_2  = m12 * m33;
      var tmp_3  = m32 * m13;
      var tmp_4  = m12 * m23;
      var tmp_5  = m22 * m13;
      var tmp_6  = m02 * m33;
      var tmp_7  = m32 * m03;
      var tmp_8  = m02 * m23;
      var tmp_9  = m22 * m03;
      var tmp_10 = m02 * m13;
      var tmp_11 = m12 * m03;
      var tmp_12 = m20 * m31;
      var tmp_13 = m30 * m21;
      var tmp_14 = m10 * m31;
      var tmp_15 = m30 * m11;
      var tmp_16 = m10 * m21;
      var tmp_17 = m20 * m11;
      var tmp_18 = m00 * m31;
      var tmp_19 = m30 * m01;
      var tmp_20 = m00 * m21;
      var tmp_21 = m20 * m01;
      var tmp_22 = m00 * m11;
      var tmp_23 = m10 * m01;
  
      var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
          (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
      var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
          (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
      var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
          (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
      var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
          (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
  
      var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
  
      return [
        d * t0,
        d * t1,
        d * t2,
        d * t3,
        d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
              (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
        d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
              (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
        d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
              (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
        d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
              (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
        d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
              (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
        d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
              (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
        d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
              (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
        d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
              (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
        d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
              (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
        d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
              (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
        d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
              (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
        d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
              (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
      ];
    },

    setPosition: function(m, x, y, z) {
      m[12] = x, m[13] = y, m[14] = z;
    },

    multiply: function(m1, m2) {
      var res = this.get_I4();
      var N = 4;

      for(var i=0;i<N;i++) {
        for(var j = 0; j < N;j++) {
          res[i*N+j] = 0;
          for(var k = 0; k < N; k++) {
            res[i*N+j] += m1[i*N+k] * m2[k*N+j];
          }
        }
      }
      return res;
    },


    rotateAbrAxis: function (m, xv, yv, zv, angle) {
      var mv = [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            xv, yv, zv, 1];
  
      var tx = m[12], ty = m[13], tz = m[14];
  
      //translate m ke origin point (0, 0, 0)
      m[12] -= tx;
      m[13] -= ty;
      m[14] -= tz;
  
      //translate mv sesuai m
      mv[12] -= tx;
      mv[13] -= ty;
      mv[14] -= tz;
  
      //rotate mv ke plane-yz
      var THETA = Math.atan(xv / yv); //THETA sudah dalam bentuk radian
      LIBS.rotateY(mv, -THETA);
  
      //rotate mv ke plane-xz
      var PHI = Math.atan(yv / Math.sqrt(Math.pow(xv,2) + Math.pow(zv,2))) // PHI sudah dalam bentuk radian
      LIBS.rotateX(mv, PHI);
  
      //rotate m sesuai dengan mv
      LIBS.rotateY(m, -THETA);
      LIBS.rotateX(m, PHI);
  
      //rotate m sesuai angle yang diinginkan
      LIBS.rotateZ(m, LIBS.degToRad(angle));
  
      //reverse rotasi yang td dilakukan
      LIBS.rotateX(m, -PHI);
      LIBS.rotateY(m, THETA);
  
      //translate m ke letak utama
      m[12] += tx;
      m[13] += ty;
      m[14] += tz;
    },
    normalizeScreen: function(x,y,width,height){
      var nx = 2*x/width - 1
      var ny = -2*y/height + 1
    
      return [nx,ny]
    },
    
  generateBSpline: function(controlPoint, m, degree){
      var curves = [];
      var knotVector = []
  
      var n = controlPoint.length/2;
  
  
      // Calculate the knot values based on the degree and number of control points
      for (var i = 0; i < n + degree+1; i++) {
          if (i < degree + 1) {
          knotVector.push(0);
          } else if (i >= n) {
          knotVector.push(n - degree);
          } else {
          knotVector.push(i - degree);
          }
      }
  
  
  
      var basisFunc = function(i,j,t){
          if (j == 0){
              if(knotVector[i] <= t && t<(knotVector[(i+1)])){
              return 1;
              }else{
              return 0;
              }
          }
  
          var den1 = knotVector[i + j] - knotVector[i];
          var den2 = knotVector[i + j + 1] - knotVector[i + 1];
          
          var term1 = 0;
          var term2 = 0;
          
  
          if (den1 != 0 && !isNaN(den1)) {
              term1 = ((t - knotVector[i]) / den1) * basisFunc(i,j-1,t);
          }
          
          if (den2 != 0 && !isNaN(den2)) {
              term2 = ((knotVector[i + j + 1] - t) / den2) * basisFunc(i+1,j-1,t);
          }
          
          return term1 + term2;
      }
  
  
      for(var t=0;t<m;t++){
          var x=0;
          var y=0;
          
          var u = (t/m * (knotVector[controlPoint.length/2] - knotVector[degree]) ) + knotVector[degree] ;
  
          //C(t)
          for(var key =0;key<n;key++){
  
          var C = basisFunc(key,degree,u);
          // console.log(C);
          x+=(controlPoint[key*2] * C);
          y+=(controlPoint[key*2+1] * C);
          // console.log(t+" "+degree+" "+x+" "+y+" "+C);
          }
          curves.push(x);
          curves.push(y);
      }
      // console.log(curves)
      return curves;
  }
};