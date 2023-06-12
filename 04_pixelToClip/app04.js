onload = () => {
    let canvas = document.getElementById('webgl-canvas');

    let gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { 
        alert("Couldn't setup webgl"); 
        return; 
    }
 
     
    let program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    
    gl.useProgram(program);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
    gl.clearColor(1, 0, 1, 0.5);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let firstColor= gl.getUniformLocation(program, "firstColor");

    let randomColor = [Math.random(), Math.random(), Math.random(), 1];

    gl.uniform4fv(firstColor, randomColor);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
    gl.clearColor(0, 0, 1, 0.5);
    gl.clear(gl.COLOR_BUFFER_BIT);


    function pixelToClip2D(vertices){

    let verticesClip = [];

    let canvasWidth = gl. canvas.width;

    let canvasHeight = gl.canvas.height;

    let clipLocation= [];

    for (let i=0; i<vertices.length; i+=2){
        
        let x = vertices[i];

        let y = vertices[i+1];

        let clippedX = (2 * x/ canvasWidth) - 1;

        let clippedY = - ((2 * y / canvasHeight) - 1);

        clipLocation.push(clippedX, clippedY);
    }
    

      return clipLocation;
    }
    //let vertices = [

      //  -1, -1,
// 0, 1, 
        
       // 1, -1,
  //  ];

   //let pixelVertices = [

    //0, 

    //100,

   // 50,

   // 0,

   // 100,

    //100,

  //];

    let vertices = pixelToClip2D([0, 100, 50, 0, 100, 100]);

    let vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, 
        vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    let vPosition = gl.getAttribLocation
    (program, 'vPosition');
    gl.vertexAttribPointer(
        
        vPosition,

        2,

        gl.FLOAT,

        false,

        0,

        0,

    )

    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}