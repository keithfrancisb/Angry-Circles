import Matter from 'matter-js';

let { Engine, Render, World, Bodies, Mouse, MouseConstraint, Constraint, Events } = Matter;

const canvas = document.getElementById('canvas');

  canvas.width = window.innerWidth-300;
  canvas.height = window.innerHeight-100;

const renderBasePlatform = () => {
  const ground = Bodies.rectangle(canvas.width/2, canvas.height-20, canvas.width, 60, { label: "base", isStatic: true });
  // World.add(engine.world, ground);
  return ground;
};

const renderLeftWall = () => {
  const leftWall = Bodies.rectangle(0, 20, 20, canvas.height+550, { isStatic: true });
  // World.add(engine.world, leftWall);
  return leftWall;
};

const renderRightWall = () => {
  const rightWall = Bodies.rectangle(canvas.width, 20, 20, canvas.height+550, { isStatic: true });
  // World.add(engine.world, rightWall);
  return rightWall;
};

const renderTopWall = () => {
  const topWall = Bodies.rectangle(canvas.width/2, 10, canvas.width + 350, 20, { isStatic: true });
  // World.add(engine.world, topWall);
  return topWall;
};

export const createAngryCircle = () => {
  let angryCircle = Bodies.circle(240, canvas.height-240, 25, { restitution: 0.8 });
  // World.add(engine.world, angryCircle);
  return angryCircle;
};


const setupSlingshot = () => {
  let angryCircle = Bodies.circle(240, canvas.height-240, 25, { restitution: 0.8 });
  const slingShot = Constraint.create({
    pointA: { x:240, y: canvas.height-240 },
    bodyB: angryCircle,
    stiffness: 0.05
  });
  // World.add(engine.world, slingShot);
  return slingShot;
}

export const createMouseConstraint = (render, engine) => {
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
  render.mouse = mouse;
  World.add(engine.world, mouseConstraint);
  return mouseConstraint;
};


let base = renderBasePlatform();
let leftWall = renderLeftWall();
let rightWall = renderRightWall();
let topWall = renderTopWall();
let angryCircle = createAngryCircle();
let slingShot = setupSlingshot();

export const baseObjects = [base,leftWall,rightWall,topWall,slingShot];