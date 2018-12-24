import Matter from 'matter-js';

let { Engine, Render, World, Bodies, Mouse, MouseConstraint, Constraint, Events } = Matter;

const canvas = document.getElementById('canvas');

  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;

const renderBasePlatform = () => {
  const ground = Bodies.rectangle(canvas.width/2, canvas.height+130, canvas.width+220, 80, { label: "base", isStatic: true });
  // World.add(engine.world, ground);
  return ground;
};

const renderLeftWall = () => {
  const leftWall = Bodies.rectangle(-100, 20, 50, canvas.height*3, { isStatic: true });
  // World.add(engine.world, leftWall);
  return leftWall;
};

const renderRightWall = () => {
  const rightWall = Bodies.rectangle(canvas.width+130, 20, 50, canvas.height*3, { isStatic: true });
  // World.add(engine.world, rightWall);
  return rightWall;
};

const renderTopWall = () => {
  const topWall = Bodies.rectangle(canvas.width/2, 10, canvas.width + 350, 50, { isStatic: true });
  // World.add(engine.world, topWall);
  return topWall;
};

// export const createAngryCircle = (x, y) => {
//   let angryCircle = Bodies.circle(x, y, 25, { restitution: 0.8 });
//   // World.add(engine.world, angryCircle);
//   return angryCircle;
// };
//
//
// export const setupSlingshot = (x, y) => {
//   let angryCircle = Bodies.circle(x, y, 0, 25, { restitution: 0.8 });
//   const slingShot = Constraint.create({
//     pointA: { x: x, y: y },
//     bodyB: angryCircle,
//     stiffness: 0.05
//   });
//   return slingShot;
// }

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


// let base = renderBasePlatform();
// let leftWall = renderLeftWall();
// let rightWall = renderRightWall();
// let topWall = renderTopWall();


export const baseObjects = [renderBasePlatform,renderLeftWall,renderRightWall,renderTopWall];
// export const baseObjects = [base,leftWall,rightWall,topWall];
