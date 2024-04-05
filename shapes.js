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

    cylinder: function(rad, lebar, posX, posY, posZ, r, g, b) {
        var vertex = [];
        for (var i=0;i<361;i++) {
            var a = rad*Math.cos((i/180)*Math.PI) + posY;
            var b = rad*Math.sin((i/180)*Math.PI) + posX;
            vertex.push(b);
            vertex.push(a);
            vertex.push(-lebar + posZ);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(b);

            vertex.push(b);
            vertex.push(a);
            vertex.push(lebar + posZ);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(b);
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
            vertex.push(b);

            vertex.push(d);
            vertex.push(c);
            vertex.push(lebar + posZ);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(b);
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
            vertex.push(b);

            vertex.push(d);
            vertex.push(c);
            vertex.push(-lebar + posZ);
    
            vertex.push(r);
            vertex.push(g);
            vertex.push(b);
        }
        return vertex;
    },
    cylinderFaces: function(vertex) {
        var faces = [];
        for (var i = 0;i< vertex.length / 2;i+=2) {
            faces.push(i);
            faces.push(i+1);
            faces.push(i+2);
    
            faces.push(i+1);
            faces.push(i+2);
            faces.push(i+3);
        }
        
        return faces;
    }
}