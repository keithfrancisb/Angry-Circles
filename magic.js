

let { Engine, Render, World, Bodies } = Matter;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    element: document.getElementById('angry'),
    engine: engine,
});

render.canvas.width = 900;
render.canvas.height = 700;

// create static objects in the world
let ground = Bodies.rectangle(400, 610, 1000, 20, { isStatic: true });
let leftWall = Bodies.rectangle(0, 20, 20, 1150, { isStatic: true });


let boxA = Bodies.rectangle(400, 200, 40, 40);
let boxB = Bodies.rectangle(420, 50, 40, 40);
let circleA = Bodies.circle(390, 300, 25);

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, circleA, ground, leftWall]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
