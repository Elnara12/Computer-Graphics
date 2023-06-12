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
  
    gl.clearColor(0, 0, 1, 0.5);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let vertices = [

        -1, -1,

        0, 1, 
        
        1, -1,
    ];

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