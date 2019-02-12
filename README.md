# glimmerstrands

SVG sparklines for javascript.

Might work in some browsers.

Does the things I want and likely not the things anyone else wants.

## Example

```
let glimmer = new GlimmerStrands(document.body);
glimmer.addLine(new Line([0.1, 0.2, 0.1, 0.3, 0.0], "fill:none;stroke:red;stroke-width:2"));
glimmer.addLine(new Line([0.4, 0.2, 0.5, 0.6, 0.8], "fill:none;stroke:black;stroke-width:2"));
glimmer.render();

let button = document.createElement('button');
button.textContent = "Add Point";
button.onclick = function () {
    glimmer.addData([Math.random(), Math.random()]);
    glimmer.render();
}
document.body.appendChild(button);
```

## Build

```
npm install -g gulp-cli
npm install
gulp
```
