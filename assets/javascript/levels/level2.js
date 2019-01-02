import Matter from 'matter-js';
import { baseObjects } from '../base';

  let { Bodies, Constraint, Composites } = Matter;

  const canvas = document.getElementById('canvas');

  const x = (coordinate) => (canvas.width - coordinate);
  const y = (coordinate) => (canvas.height - coordinate);

  // ----------- LEVEL 2 ----------- //

  const renderFloor1 = () => {
    const floor = Bodies.rectangle(x(300), y(400), 300, 30, { isStatic: true, collisionFilter: { category: 0x0004 } });
    // World.add(engine.world, floor);
    return floor;
  };

  const createBox = (x, y) => {
    return Bodies.rectangle(x, y, 20,20, { density: 0.9, collisionFilter: { category: 0x0002 | 0x0004, mask: 0x0002 | 0x0004 } });
  };

  const renderObstacle1 = () => {
    const obs = Composites.stack(x(450), y(600), 4, 8, 1, 1, createBox);
    return obs;
  };

  const renderTarget = () => {
    const triangle = Bodies.polygon(x(300), y(600), 3, 40, { label: "target", density: 0.5, collisionFilter: { category: 0x0002 | 0x0004, mask: 0x0002 | 0x0004 } });
    return triangle;
  };

  const floor1 = renderFloor1();
  const obs1 = renderObstacle1();
  const target = renderTarget();

  export const objects= [baseObjects, [renderFloor1, renderObstacle1, renderTarget]].flat();
  export const info = "Good Job! Can you get past through a thinner stack?";

// ------------------------------- //
