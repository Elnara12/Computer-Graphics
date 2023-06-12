# CSCI 2408: Computer Graphics - Assignment 1

- CRN: 30019
- Summer 2023
- Assignment 1
- **Deadline:** 11 Jun 23:00
- **Student Name Surname ID:** Elnara Mammadli 12293

---

Your goal is to understand JavaScript syntax, set up WebGL, gain experience with shaders, event handling, etc. After solving tasks you will be ready for the next assignment.

## Constraints, notes, etc.
- See blackboard course content for tutorials.
- Each solved task (there are five of them) should be built upon the previous one. It means that, after completing each task, you should copy both files (`index.html` and `app.js`) to the next folder and update them. The code and program logic should be interrelated among tasks.
- You cannot use any additional libraries.
- You should not use `flatten()` or vector functions (`vec2()`) of `MV.js` libary. We are obviously not talking about the `vec()` functions of the GL Shader Language. Inside shaders it is fine to use them.
- You can copy small code snippets (~%10 of you code) from internet or textbook website but you should put the URL of the snippet and explain which modifications have been made (if any).
- You should comment your code whenever you feel necessary. But do not overuse commenting. Function and variable names should be self-explanatory in most cases.
- You should use a version-control system called `git` and make reasonable commits. If you have never used git, make sure to go through this [quick tutorial](https://www.youtube.com/watch?v=USjZcfj8yxE). You will use git/github consistently in the future and will reap a huge benefit out of knowing how to use them effectively.
- Grading will be based on whether the code achieves the purpose, is readable, whether all conditions mentioned in this file are followed. Untidy code may or may not affect grading.
- You should submit your code to the blackboard in a compressed `.zip` format with the title **STUDENTNAME_SURNAME_ID_assignment1.zip**. Late submissions won't be accepted.

---

## 01_triangle [1 point]

Render a triangle in WebGL.

## 02_square [1 point]

Copy paste the code from `01_triangle`.

Change the code to render a square with 
1. gl.TRIANGLE_STRIP
2. gl.TRIANGLE_FAN

> Note: You can use if else to switch between rendering modes.

## 03_randomTriangle [2 points]

Copy paste the code from `01_triangle` again. This time, your triangle should have a random color when rendered. You will have to modify **shaders** on `index.html`.

## 04_pixelToClip [3 points]

Copy paste the code from `03_randomTriangle`.

Add a function `pixelToClip2D()`, which will take a vertex array with pixel coordinates as its input and return a new array with clip coordinates. You shouldn't modify the original array (you may want to use `array.slice(0)`).

Clip space stretches from -1 till 1 in both axes. 

```js
let vertices = [
    -1, -1,
    0, 1,
    1, -1,
];
```
in clip coordinates corresponds to the following pixel vertex array in a **100x100** canvas:

```js
let pixelVertices = [
    0, 100,
    50, 0,
    100, 100,
];
```
Try to draw this triangle on a paper.

Your goal is to automatically convert the pixel coordinates to the corresponding clip coordinates. After defining the function, you should be able to define vertices in a new way: 

```js
let vertices = pixelToClip2D([
    0, 100,
    50, 0,
    100, 100,
]);
```

> **HINT:** You will make use of `gl.canvas.height/width` 

> **IMPORTANT:** WebGL coordinate system _origin_ (bottom-left) is different from HTML canvas' (top-left). 


## 05_dynamicTriangle [3 points + 1 bonus]

Copy paste the code from `04_pixelToClip`. This time, your goal is to deal with [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). 

Initially, the canvas should be empty (only cleared with black background). A user will click on three points on the canvas -- that will be your triangle vertex coordinates. Upon the third click, you should render a random colored triangle along these vertices (here you will reap the benefit of `pixelToClip2D()` function). You will get an extra point, if every third click will render a new triangle on the canvas.\