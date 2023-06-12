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

  gl.clearColor(0, 0, 0, 1);
  
 
  canvas.addEventListener('click', triangleRender);

  let vertices = [];
   
  let vertexCount = 0;

  let firstColor= gl.getUniformLocation(program, "firstColor");


  function pixelToClip2D(vertices){

  let verticesClip = [];

  let canvasWidth = gl.canvas.width;

  let canvasHeight = gl.canvas.height;



  for (let i=0;  i < vertices.length; i+=2){
      
      let x = (vertices[i]/canvasWidth) * 2 - 1;

      let y =  1 - (vertices[i+1]/ canvasHeight) * 2;

    

      verticesClip.push(x, y);
  }
  

    return verticesClip;
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

  //let vertices = pixelToClip2D([0, 100, 50, 0, 100, 100]);
 
  

  function TRIANGLES01(vertices){

   let vBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, 
       vBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, 

      vertices.length * Float32Array.BYTES_PER_ELEMENT, 

      gl.STATIC_DRAW);

    gl.bufferSubData(gl.ARRAY_BUFFER, 

      0, 

      new Float32Array(vertices)
      
      );

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

  function triangleRender(event){

    gl.clear(gl.COLOR_BUFFER_BIT);

    let inspectview = canvas.getBoundingClientRect();

    let x = event.clientX - inspectview.left;

    let y = event.clientY - inspectview.top;

    vertices.push(x, y);

    
    vertexCount++;


    if(vertexCount === 3){

      let verticesOfClip = pixelToClip2D(vertices);

      let randomColor = [Math.random(), Math.random(), Math.random(), 1];

      gl.uniform4fv(firstColor, randomColor);

       TRIANGLES01(verticesOfClip);

       vertexCount = 0;
       vertices = [];
    }
  }
    gl.clear(gl.COLOR_BUFFER_BIT);
  
}
    