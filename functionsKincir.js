  function generateCylinderVertices(x, y, z, radiusX1, radiusZ1, radiusX2, radiusZ2, height, r, g, b) {
    var vertices = [];
    vertices.push(x);
    vertices.push(y);
    vertices.push(z);
    vertices.push(r);
    vertices.push(g);
    vertices.push(b);
    for (let i = 0; i <= 360; i++) {
      var angleInRadians = (i * Math.PI) / 180;
      var newX = x + Math.cos(angleInRadians) * radiusX1; // Rotate around X-axis
      var newY = y; // Y-coordinate remains the same
      var newZ = z + Math.sin(angleInRadians) * radiusZ1; // Translate along Z-axis
      vertices.push(newX);
      vertices.push(newY);
      vertices.push(newZ);
      vertices.push(r);
      vertices.push(g);
      vertices.push(b);
    }
    vertices.push(x);
    vertices.push(y + height);
    vertices.push(z);
    vertices.push(r);
    vertices.push(g);
    vertices.push(b);
    for (let i = 0; i <= 360; i++) {
      var angleInRadians = (i * Math.PI) / 180;
      var newX = x + Math.cos(angleInRadians) * radiusX2; // Rotate around X-axis
      var newY = y + height; // Y-coordinate remains the same
      var newZ = z + Math.sin(angleInRadians) * radiusZ2; // Translate along Z-axis
      vertices.push(newX);
      vertices.push(newY);
      vertices.push(newZ);
      vertices.push(r);
      vertices.push(g);
      vertices.push(b);
    }
    return vertices;
  }
  function generateCylinderIndices() {
    var faces = [];
  
    for (let i = 0; i <= 360; i++) {
      faces.push(0);
      faces.push(i + 1);
      faces.push(i + 2);
    }
    for (let i = 362; i < 722; i++) {
      faces.push(362);
      faces.push(i + 1);
      faces.push(i + 2);
    }
    for (let i = 0; i < 361; i++) {
      faces.push(i);
      faces.push(360 + i);
      faces.push(361 + i);
  
      faces.push(361 + i);
      faces.push(i);
      faces.push(i + 1);
    }
    return faces;
  }
  function generatePipeVertices(x, y, z, radiusX ,radiusY, height, r, g, b) {
    var vertices = [];
    vertices.push(x);
    vertices.push(y);
    vertices.push(z);
    vertices.push(r);
    vertices.push(g);
    vertices.push(b);
    for (let i = 0; i <= 360; i++) {
      var angleInRadians = (i * Math.PI) / 180;
      var newX = x + Math.sin(angleInRadians) * radiusX; // Rotate around X-axis
      var newY = y + Math.cos(angleInRadians) * radiusY; // Y-coordinate remains the same
      var newZ = z; // Translate along Z-axis
      vertices.push(newX);
      vertices.push(newY);
      vertices.push(newZ);
      vertices.push(r);
      vertices.push(g);
      vertices.push(b);
    }
    vertices.push(x);
    vertices.push(y);
    vertices.push(z + height);
    vertices.push(r);
    vertices.push(g);
    vertices.push(b);
    for (let i = 0; i <= 360; i++) {
      var angleInRadians = (i * Math.PI) / 180;
      var newX = x + Math.sin(angleInRadians) * radiusX; // Rotate around X-axis
      var newY = y + Math.cos(angleInRadians) * radiusY; // Y-coordinate remains the same
      var newZ = z + height;// Translate along Z-axis
      vertices.push(newX);
      vertices.push(newY);
      vertices.push(newZ);
      vertices.push(r);
      vertices.push(g);
      vertices.push(b);
    }
    return vertices;
  }

  function createSphere(x, y, z, xRadius, yRadius, zRadius, latitudeBands, longitudeBands, r, g, b) {
    const vertices = [];
    const indices = [];
  
    for (let lat = 0; lat <= latitudeBands; lat++) {
      const theta = lat * Math.PI / latitudeBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
  
      for (let long = 0; long <= longitudeBands; long++) {
        const phi = long * 2 * Math.PI / longitudeBands;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
  
        const xPosition = x + xRadius * cosPhi * sinTheta;
        const yPosition = y + yRadius * sinPhi * sinTheta;
        const zPosition = z + zRadius * cosTheta;
  
        vertices.push(xPosition, yPosition, zPosition, r, g, b);
      }
    }
  
    for (let lat = 0; lat < latitudeBands; lat++) {
      for (let long = 0; long < longitudeBands; long++) {
        const first = (lat * (longitudeBands + 1)) + long;
        const second = first + longitudeBands + 1;
  
        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }
  
    return { vertices, indices };
  }

  function generateFanVertices(startX, startY, startZ, p, l, t, r, g, b,){

    var vertices = [];
  
    vertices.push(startX,startY,startZ,r,g,b);//0 - kiri bwh
    vertices.push(startX+p,startY,startZ,r,g,b);//1 - kanan bwh
    vertices.push(startX+p,startY+t,startZ,r,g,b);//2 - kanan atas
    vertices.push(startX,startY+t,startZ,r,g,b);//3 - kiri atas
    
    vertices.push(startX,startY,startZ-l,r,g,b);//4 -kiri bwh
    vertices.push(startX+p,startY,startZ-l,r,g,b);//5 - kanan bwh
    vertices.push(startX+p,startY+t,startZ-l,r,g,b);//6 - kanan atas
    vertices.push(startX,startY+t,startZ-l,r,g,b);//7 - kiri atas
  
    return vertices;
  }
  function generateFanIndices(){
    var indices = [];
  
    indices.push(0);
    indices.push(1);
    indices.push(2);
  
    indices.push(2);
    indices.push(0);
    indices.push(3);
    
    indices.push(1);
    indices.push(2);
    indices.push(5);
  
    indices.push(2);
    indices.push(5);
    indices.push(6);
    
    indices.push(4);
    indices.push(5);
    indices.push(6);
  
    indices.push(4);
    indices.push(6);
    indices.push(7);
  
    indices.push(3);
    indices.push(0);
    indices.push(4);
  
    indices.push(3);
    indices.push(4);
    indices.push(7);
    
    indices.push(3);
    indices.push(2);
    indices.push(7);
    
    indices.push(2);
    indices.push(6);
    indices.push(7);
    
    indices.push(0);
    indices.push(1);
    indices.push(4);
  
    indices.push(1);
    indices.push(4);
    indices.push(5);
    
    return indices;
  }
