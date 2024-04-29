var SHAPE = {
    cube: function(cube_size, posX, posY, posZ, r, g, b) {
        return cube = [ // X, Y, Z           R, G, B
                // Top
                -cube_size + posX, cube_size + posY, -cube_size + posZ ,   r, g, b,
                -cube_size + posX, cube_size + posY, cube_size + posZ,    r, g, b,
                cube_size + posX, cube_size + posY, cube_size + posZ,     r, g, b,
                cube_size + posX, cube_size + posY, -cube_size + posZ,    r, g, b,

                // Left
                -cube_size + posX, cube_size + posY, cube_size + posZ,    r, g, b,
                -cube_size + posX, -cube_size + posY, cube_size + posZ,   r, g, b,
                -cube_size + posX, -cube_size + posY, -cube_size + posZ,  r, g, b,
                -cube_size + posX, cube_size + posY, -cube_size + posZ,   r, g, b,

                // Right
                cube_size + posX, cube_size + posY, cube_size + posZ,    r, g, b,
                cube_size + posX, -cube_size + posY, cube_size + posZ,   r, g, b,
                cube_size + posX, -cube_size + posY, -cube_size + posZ,  r, g, b,
                cube_size + posX, cube_size + posY, -cube_size + posZ,   r, g, b,

                // Front
                cube_size + posX, cube_size + posY, cube_size + posZ,    r, g, b,
                cube_size + posX, -cube_size + posY, cube_size + posZ,    r, g, b,
                -cube_size + posX, -cube_size + posY, cube_size + posZ,   r, g, b,
                -cube_size + posX, cube_size + posY, cube_size + posZ,    r, g, b,

                // Back
                cube_size + posX, cube_size + posY, -cube_size + posZ,    r, g, b,
                cube_size + posX, -cube_size + posY, -cube_size + posZ,   r, g, b,
                -cube_size + posX, -cube_size + posY, -cube_size + posZ,   r, g, b,
                -cube_size + posX, cube_size + posY, -cube_size + posZ,    r, g, b,

                // Bottom
                -cube_size + posX, -cube_size + posY, -cube_size + posZ,   r, g, b,
                -cube_size + posX, -cube_size + posY, cube_size + posZ,    r, g, b,
                cube_size + posX, -cube_size + posY, cube_size + posZ,     r, g, b,
                cube_size + posX, -cube_size + posY, -cube_size + posZ,    r, g, b,
            ];
    },
    squareFaces: function() {
        return cube_faces = [
            // Top
            0, 1, 2,
            0, 2, 3,

            // Left
            5, 4, 6,
            6, 4, 7,

            // Right
            8, 9, 10,
            8, 10, 11,

            // Front
            12, 13, 14,
            12, 14, 15,

            // Back
            16, 17, 18,
            16, 18, 19,

            // Bottom
            20, 21, 22,
            20, 22, 23
        ];

    },

    rectangle: function(panjang, lebar, tinggi, posX, posY, posZ, r, g, b) {
        return vertex = [
            // Top
            posX, posY + tinggi, posZ,                        r,g,b,
            posX, posY + tinggi, posZ + panjang,              r,g,b,
            posX + lebar, posY + tinggi, posZ + panjang,      r,g,b,
            posX + lebar, posY + tinggi, posZ,                r,g,b,

            // Left
            posX, posY + tinggi, posZ + panjang,              r,g,b,
            posX, posY, posZ + panjang,                       r,g,b,
            posX, posY, posZ,                                 r,g,b,
            posX, posY + tinggi, posZ,                        r,g,b,

            // Right
            posX + lebar, posY + tinggi, posZ + panjang,      r,g,b,
            posX + lebar, posY, posZ + panjang,               r,g,b,
            posX + lebar, posY, posZ,                         r,g,b,
            posX + lebar, posY + tinggi, posZ,                r,g,b,

            // Front
            posX + lebar, posY + tinggi, posZ,                r,g,b,
            posX + lebar, posY, posZ,                         r,g,b,
            posX, posY, posZ,                                 r,g,b,
            posX, posY + tinggi, posZ,                        r,g,b,

            // Back
            posX + lebar, posY + tinggi, posZ + panjang,      r,g,b,
            posX + lebar, posY, posZ + panjang,               r,g,b,
            posX, posY, posZ + panjang,                       r,g,b,
            posX, posY + tinggi, posZ + panjang,              r,g,b,

            // Bottom
            posX, posY, posZ,                                 r,g,b,
            posX, posY, posZ + panjang,                       r,g,b,
            posX + lebar, posY, posZ + panjang,               r,g,b,
            posX + lebar, posY, posZ,                         r,g,b,
        ];
    },
    rectangle2: function(panjang, lebar, tinggi, posX, posY, posZ, r, g, b, r2, g2, b2) {
        return vertex = [
            // Top
            posX, posY + tinggi, posZ,                        r,g,b,
            posX, posY + tinggi, posZ + panjang,              r,g,b,
            posX + lebar, posY + tinggi, posZ + panjang,      r,g,b,
            posX + lebar, posY + tinggi, posZ,                r,g,b,

            // Left
            posX, posY + tinggi, posZ + panjang,              r2,g2,b2,
            posX, posY, posZ + panjang,                       r2,g2,b2,
            posX, posY, posZ,                                 r2,g2,b2,
            posX, posY + tinggi, posZ,                        r2,g2,b2,

            // Right
            posX + lebar, posY + tinggi, posZ + panjang,      r2,g2,b2,
            posX + lebar, posY, posZ + panjang,               r2,g2,b2,
            posX + lebar, posY, posZ,                         r2,g2,b2,
            posX + lebar, posY + tinggi, posZ,                r2,g2,b2,

            // Front
            posX + lebar, posY + tinggi, posZ,                r2,g2,b2,
            posX + lebar, posY, posZ,                         r2,g2,b2,
            posX, posY, posZ,                                 r2,g2,b2,
            posX, posY + tinggi, posZ,                        r2,g2,b2,

            // Back
            posX + lebar, posY + tinggi, posZ + panjang,      r2,g2,b2,
            posX + lebar, posY, posZ + panjang,               r2,g2,b2,
            posX, posY, posZ + panjang,                       r2,g2,b2,
            posX, posY + tinggi, posZ + panjang,              r2,g2,b2,

            // Bottom
            posX, posY, posZ,                                 r,g,b,
            posX, posY, posZ + panjang,                       r,g,b,
            posX + lebar, posY, posZ + panjang,               r,g,b,
            posX + lebar, posY, posZ,                         r,g,b,
        ];
    },
    cylinder: function(rad, lebar, posX, posY, posZ, r, g, blu) {
        var vertex = [];
        for (var i=0;i<361;i++) {
            var a = rad*Math.cos((i/180)*Math.PI) + posY;
            var b = rad*Math.sin((i/180)*Math.PI) + posX;
            vertex.push(b);
            vertex.push(a);
            vertex.push(-lebar + posZ);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(blu);

            vertex.push(b);
            vertex.push(a);
            vertex.push(lebar + posZ);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(blu);
        }

        for (var i=0;i<181;i++) {
            var a = rad*Math.cos((i/180)*Math.PI) + posY;
            var b = rad*Math.sin((i/180)*Math.PI) + posX;
            var c = rad*Math.cos(((i + 180)/180)*Math.PI) + posY;
            var d = rad*Math.sin(((i + 180)/180)*Math.PI) + posX;
            vertex.push(b);
            vertex.push(a);
            vertex.push(lebar + posZ);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(blu);

            vertex.push(d);
            vertex.push(c);
            vertex.push(lebar + posZ);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(blu);
        }

        for (var i=0;i<181;i++) {
            var a = rad*Math.cos((i/180)*Math.PI) + posY;
            var b = rad*Math.sin((i/180)*Math.PI) + posX;
            var c = rad*Math.cos(((i + 180)/180)*Math.PI) + posY;
            var d = rad*Math.sin(((i + 180)/180)*Math.PI) + posX;
            vertex.push(b);
            vertex.push(a);
            vertex.push(-lebar + posZ);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(blu);

            vertex.push(d);
            vertex.push(c);
            vertex.push(-lebar + posZ);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(blu);
        }
        return vertex;
    },
    cylinderFaces: function(vertex) {
        var faces = [];
        for (var i = 0;i< vertex.length / 7;i+=2) {
            faces.push(i);
            faces.push(i+1);
            faces.push(i+2);
    
            faces.push(i+1);
            faces.push(i+2);
            faces.push(i+3);
        }
        
        return faces;
    },
    hyperboloid12: function(GL, radius, sector, stack, smooth, posX, posY, posZ, r, g, b) {
    let sphere = new Sphere(GL, 1, 36, 18, false, posX -10, posY + 6, posZ + 0.1, r, g, b);

    sphere.setRadius(radius);
    sphere.setSectorCount(sector);
    sphere.setStackCount(stack);
    sphere.setSmooth(smooth);

    return sphere;
    },
    hyperboloid1: function(GL, radius, sector, stack, smooth, posX, posY, posZ, r, g, b) {
    let sphere = new Sphere2(GL, 1, 36, 18, false, posX, -posZ + 1, -posY + 0.3, r, g, b);

    sphere.setRadius(radius);
    sphere.setSectorCount(sector);
    sphere.setStackCount(stack);
    sphere.setSmooth(smooth);


    return sphere;
    },
    base: function(panjang, lebar, tinggi, posX, posY, posZ, r, g, b) {
        vertex = [];

        vertex.push(this.rectangle(panjang, lebar, tinggi, posX, posY, posZ, r, g, b))
        vertex.push(posX);
        vertex.push(posY);
        vertex.push(posZ);
        vertex.push(r);
        vertex.push(g);
        vertex.push(b);
        vertex.push(this.rectangle(panjang / 10, lebar, tinggi + 3, posX, posY - 3, posZ, r, g, b))
    },

    cubicSlope: function(slope, lebar, posX, posY, posZ, r, g, b, r2, g2, b2) {
        var vertex = [];
        for (var i=0;i<slope;i+= 0.1) {
            vertex.push(this.slopeFormula(i) + posX);
            vertex.push(posY);
            vertex.push(-lebar + posZ);
    
            vertex.push(r2);
            vertex.push(g2);
            vertex.push(b2);

            vertex.push(this.slopeFormula(i) + posX);
            vertex.push(posY);
            vertex.push(lebar + posZ);
    
            vertex.push(r2);
            vertex.push(g2);
            vertex.push(b2);
        }
        for (var i=0;i<slope;i+= 0.5) {
            vertex.push(this.slopeFormula(i) + posX);
            vertex.push(posY - 0.5);
            vertex.push(-lebar + posZ);
    
            vertex.push(r2);
            vertex.push(g2);
            vertex.push(b2);

            vertex.push(this.slopeFormula(i) + posX);
            vertex.push(posY - 0.5);
            vertex.push(lebar + posZ);
    
            vertex.push(r2);
            vertex.push(g2);
            vertex.push(b2);
        }
        return vertex;
    },
    normalFaces: function(vertex) {
        var face = [];
        for(i = 0; i < vertex - 2; i+=3) {
            face.push(i);
            face.push(i + 1);
            face.push(i + 2);
            face.push(i);
            face.push(i + 2);
            face.push(i + 3);
        }
        return face;
    },
    slopeFormula: function(x) {
        return -((x - 2)/1.5)^3;
    },
    elipticParaboloid: function(GL, radius, sector, stack, smooth, posX, posY, posZ, r, g, b) {
    let sphere = new Sphere3(GL, 1, 36, 18, false, posX, posZ + 5.5, -posY - 1.5, r, g, b);

    sphere.setRadius(radius);
    sphere.setSectorCount(sector);
    sphere.setStackCount(stack);
    sphere.setSmooth(smooth);

    return sphere;
    },
    
    cylinderRoof: function(rad, lebar, posX, posY, posZ, r, g, blu) {
        var vertex = [];
        for (var i=45;i<145;i+= 0.01) {
            var a = rad*Math.cos((i/180)*Math.PI) + posY;
            var b = rad*Math.sin((i/180)*Math.PI) + posX;

            vertex.push(-lebar + posZ);
            vertex.push(a);
            vertex.push(-b);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(blu);

            vertex.push(lebar + posZ);
            vertex.push(a);
            vertex.push(-b);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(blu);

            

            vertex.push(lebar + posZ);
            vertex.push(a);
            vertex.push(-b - 0.3);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(blu);

            vertex.push(-lebar + posZ);
            vertex.push(a);
            vertex.push(-b - 0.3);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(blu);
        }
        return vertex;
    },
    roofFaces: function(vertex) {
        var faces = [];
        for (var i = 0;i< (vertex.length / 7);i+=2) {
            faces.push(i);
            faces.push(i+1);
            faces.push(i+2);
    
            faces.push(i+1);
            faces.push(i+2);
            faces.push(i+3);
        }
        
        return faces;
    },
    sphere: function(GL, radius, sector, stack, smooth, posX, posY, posZ, r, g, b, scaleX, scaleY, scaleZ) {
    let sphere = new Sphere4(GL, 1, 36, 18, false, posX, posY, posZ, r, g, b, scaleX, scaleY, scaleZ);

    sphere.setRadius(radius);
    sphere.setSectorCount(sector);
    sphere.setStackCount(stack);
    sphere.setSmooth(smooth);

    return sphere;
    },
    ellipsoid: function(GL, rx, ry, rz, sector, stack, smooth, posX, posY, posZ, r, g, b) {
    let sphere = new Sphere5(GL, rx, ry, rz, 36, 18, true, posX, posY, posZ, r, g, b);
    
    sphere.setSectorCount(sector);
    sphere.setStackCount(stack);
    sphere.setSmooth(smooth);
    
    return sphere;
    },
    cone: function(rad,x,y,z,height,r,g,b) {
        var list = [];
        list.push(0 + x);
        list.push(0 + y);
        list.push(0 + z);
        list.push(r);
        list.push(g); 
        list.push(b);
        for  (var i = 0; i < 361; i++) {
            var a = rad * Math.cos((i/180) * Math.PI) ;
            var b = rad * Math.sin((i/180) * Math.PI) ;
            list.push(a + x);
            list.push(height + y);
            list.push(b + z);
            list.push(r);
            list.push(g);
            list.push(b);
        }
        return list;
    },
    
    coneFaces: function() {
        var list = [];
        for (var i = 1; i < 361; i++) {
            list.push(0);
            list.push(i);
            list.push(i+1);
        }
        for (var i = 1; i < 361; i++) {
            list.push(1);
            list.push(i+1);
            list.push(i+2);
        }
        return list;
    },
      
      generateBSpline1: function(controlPoint, m, degree){
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
            console.log(C);
            x+=(controlPoint[key*2] * C);
            y+=(controlPoint[key*2+1] * C);
            console.log(t+" "+degree+" "+x+" "+y+" "+C);
          }
          curves.push(x);
          curves.push(y);
          curves.push(0);

          curves.push(1,1,1);
         
        }
        console.log(curves)
        return curves;
      }
}
