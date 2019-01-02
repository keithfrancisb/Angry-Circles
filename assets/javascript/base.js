import Matter from 'matter-js';

let { Engine, Render, World, Bodies, Mouse, MouseConstraint, Constraint, Events } = Matter;

const canvas = document.getElementById('canvas');

  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;

const renderBasePlatform = () => {
  const ground = Bodies.rectangle(canvas.width/2, canvas.height+130, canvas.width+220, 80, { label: "base", isStatic: true, collisionFilter: { category: 0x0004 } });
  // World.add(engine.world, ground);
  return ground;
};

const renderLeftWall = () => {
  const leftWall = Bodies.rectangle(-100, 20, 50, canvas.height*3, { isStatic: true, collisionFilter: { category: 0x0004 }  });
  // World.add(engine.world, leftWall);
  return leftWall;
};

const renderRightWall = () => {
  const rightWall = Bodies.rectangle(canvas.width+130, 20, 50, canvas.height*3, { isStatic: true, collisionFilter: { category: 0x0004 }  });
  // World.add(engine.world, rightWall);
  return rightWall;
};

const renderTopWall = () => {
  const topWall = Bodies.rectangle(canvas.width/2, 10, canvas.width + 350, 50, { isStatic: true, collisionFilter: { category: 0x0004 }  });
  // World.add(engine.world, topWall);
  return topWall;
};


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
