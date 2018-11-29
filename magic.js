let { Engine, Render, World, Bodies, Mouse, MouseConstraint, Constraint, Events } = Matter;

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

const { canvas } = render;

// create static objects in the world
const ground = Bodies.rectangle(400, 690, canvas.width, 20, { isStatic: true });
const leftWall = Bodies.rectangle(0, 20, 20, canvas.height+200, { isStatic: true });
// const slingShotPlatform = Bodies.rectangle(240, canvas.height-200, 80, 10, { isStatic: true });


const boxA = Bodies.rectangle(400, 200, 40, 40);
const boxB = Bodies.rectangle(420, 50, 40, 40);
let angryCircle = Bodies.circle(240, canvas.height-240, 25, { restitution: 1 });

const slingShot = Constraint.create({
  pointA: { x:240, y: canvas.height-240 },
  bodyB: angryCircle,
  stiffness: 0.05
});

Events.on(engine, 'afterUpdate', () => {
  if(mouseConstraint.mouse.button === -1 && angryCircle.position.y < canvas.height-260) {
    angryCircle = Bodies.circle(240, canvas.height-240, 25, { restitution: 1.3});
    World.add(engine.world, angryCircle);
    slingShot.bodyB = angryCircle;
  }
});

World.add(engine.world, slingShot);

// add all of the bodies to the world
// STATIC
World.add(engine.world, [ground, leftWall]);

// NON-STATIC
World.add(engine.world, [boxA, boxB, angryCircle]);


const mouse = Mouse.create(canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});
World.add(engine.world, mouseConstraint);

render.mouse = mouse;

// run the engine
Engine.run(engine);
// run the renderer
Render.run(render);
