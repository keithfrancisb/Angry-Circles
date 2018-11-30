import Matter from 'matter-js';

const level1 = () => {
  let { Engine, Render, World, Bodies, Mouse, MouseConstraint, Constraint, Events } = Matter;
  let { Composites } = Matter;

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
        background: "#16161D",
        wireframes: false
      }
  });

  const { canvas } = render;

  // create static objects in the world

  const renderBasePlatform = () => {
    const ground = Bodies.rectangle(canvas.width/2, canvas.height-20, canvas.width, 60, { label: "base", isStatic: true });
    World.add(engine.world, ground);
    return ground;
  };

  const renderLeftWall = () => {
    const leftWall = Bodies.rectangle(0, 20, 20, canvas.height+550, { isStatic: true });
    World.add(engine.world, leftWall);
    return leftWall;
  };

  const renderRightWall = () => {
    const rightWall = Bodies.rectangle(canvas.width, 20, 20, canvas.height+550, { isStatic: true });
    World.add(engine.world, rightWall);
    return rightWall;
  };

  const renderTopWall = () => {
    const topWall = Bodies.rectangle(canvas.width/2, 10, canvas.width + 350, 20, { isStatic: true });
    World.add(engine.world, topWall);
    return topWall;
  };

  const createAngryCircle = () => {
    let angryCircle = Bodies.circle(240, canvas.height-240, 25, { restitution: 0.8 });
    World.add(engine.world, angryCircle);
    return angryCircle;
  };


  const setupSlingshot = () => {
    const slingShot = Constraint.create({
      pointA: { x:240, y: canvas.height-240 },
      bodyB: angryCircle,
      stiffness: 0.05
    });
    World.add(engine.world, slingShot);
    return slingShot;
  }


  Events.on(engine, 'afterUpdate', () => {
    if((mouseConstraint.mouse.button === -1 && angryCircle.position.y < canvas.height-260) || angryCircle === undefined) {
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

  let base = renderBasePlatform();
  let leftWall = renderLeftWall();
  let rightWall = renderRightWall();
  let topWall = renderTopWall();
  let angryCircle = createAngryCircle();
  let slingShot = setupSlingshot();

  // run the engine
  Engine.run(engine);
  // run the renderer
  Render.run(render);


  const x = (coordinate) => (canvas.width - coordinate);
  const y = (coordinate) => (canvas.height - coordinate);


  // ----------- LEVEL 1 ----------- //

  const renderFloor1 = () => {
    const floor = Bodies.rectangle(x(300), y(400), 300, 30, { isStatic: true });
    World.add(engine.world, floor);
    return floor;
  };

  const createBox = (x, y) => {
    return Bodies.rectangle(x, y, 20,20, { density: 0.5 });
  }

  const renderObstacle1 = () => {
    const obs = Composites.stack(x(450), y(600), 2, 8, 1, 1, createBox);
    World.add(engine.world, obs);
    return obs;
  };

  const renderTarget = () => {
    const triangle = Bodies.polygon(x(300), y(600), 3, 30, { label: "target", density: 0.4 });
    World.add(engine.world, triangle);
    return triangle;
  };

  const floor1 = renderFloor1();
  const obs1 = renderObstacle1();
  const target = renderTarget();

  const level1 = [floor1, obs1, target];

  Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for(let i=0; i < pairs.length; i++){
      if(pairs[i].bodyA.label === "target" && pairs[i].bodyB.label === "base" ||
          pairs[i].bodyB.label === "target" && pairs[i].bodyA.label === "base" ) {

            setTimeout(() => World.clear(engine.world, false), 2000);
            clearTimeout();
      }
    }
  });

}
// ------------------------------- //

export default level1;
