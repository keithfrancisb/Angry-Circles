let { Engine, Render, World, Bodies, Mouse, MouseConstraint, Constraint, Events } = Matter;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    element: document.body,
    canvas: document.getElementById('canvas'),
    engine: engine,
    options: {
      width: window.innerWidth-300,
      height: window.innerHeight-100,
      background: "black",
      wireframes: false
    }
});

const { canvas } = render;
canvas.background = 'gray';


// create static objects in the world

const renderBasePlatform = () => {
  const ground = Bodies.rectangle(400, 690, canvas.width, 20, { isStatic: true });
  World.add(engine.world, ground);
  return ground;
}

const renderBaseWall = () => {
  const leftWall = Bodies.rectangle(0, 20, 20, canvas.height+200, { isStatic: true });
  World.add(engine.world, leftWall);
  return leftWall;
}

const createAngryCircle = () => {
  let angryCircle = Bodies.circle(240, canvas.height-240, 25, { restitution: 0.8 });
  World.add(engine.world, angryCircle);
  return angryCircle;
}

let angryCircle = createAngryCircle();
const slingShot = Constraint.create({
  pointA: { x:240, y: canvas.height-240 },
  bodyB: angryCircle,
  stiffness: 0.05
});
World.add(engine.world, slingShot);


Events.on(engine, 'afterUpdate', () => {
  if(mouseConstraint.mouse.button === -1 && angryCircle.position.y < canvas.height-260) {
    angryCircle = createAngryCircle();
    slingShot.bodyB = angryCircle;
  }
});


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

renderBasePlatform();
renderBaseWall();


// ----------- LEVEL 1 ----------- //
