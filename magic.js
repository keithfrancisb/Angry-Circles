let { Engine, Render, World, Bodies } = Matter;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    canvas: document.getElementById('canvas'),
    engine: engine,
    options: {
      width: window.innerWidth-300,
      height: window.innerHeight-100
    }
});

let { canvas } = render;

// create static objects in the world
let ground = Bodies.rectangle(400, 690, canvas.width, 20, { isStatic: true });
let leftWall = Bodies.rectangle(0, 20, 20, canvas.height+200, { isStatic: true });
let slingShotPlatform = Bodies.rectangle(200, canvas.height-200, 80, 10, { isStatic: true });


let boxA = Bodies.rectangle(400, 200, 40, 40);
let boxB = Bodies.rectangle(420, 50, 40, 40);
let circleA = Bodies.circle(390, 300, 25);

// add all of the bodies to the world
// STATIC
World.add(engine.world, [ground, leftWall, slingShotPlatform]);

// NON-STATIC
World.add(engine.world, [boxA, boxB, circleA]);


// run the engine
Engine.run(engine);
// run the renderer
Render.run(render);
