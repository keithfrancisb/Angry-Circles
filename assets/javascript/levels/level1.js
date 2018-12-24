import Matter from 'matter-js';
import { baseObjects } from '../base';

  let { Bodies, Constraint, Composites } = Matter;

  const canvas = document.getElementById('canvas');

  const x = (coordinate) => (canvas.width - coordinate);
  const y = (coordinate) => (canvas.height - coordinate);

  // ----------- LEVEL 3 ----------- //

  const renderFloor1 = () => {
    const floor = Bodies.rectangle(x(300), y(200), 300, 30, { isStatic: true });
    // World.add(engine.world, floor);
    return floor;
  };

  const createBox = (x, y) => {
    return Bodies.rectangle(x, y, 20,20, { density: 0.9 });
  };

  const renderObstacle1 = () => {
    const obs = Composites.stack(x(450), y(400), 5, 8, 1, 1, createBox);
    // World.add(engine.world, obs);
    return obs;
  };

  const renderTarget = () => {
    const triangle = Bodies.polygon(x(200), y(500), 3, 40, { label: "target", density: 0.5 });
    // World.add(engine.world, triangle);
    return triangle;
  };

  const floor1 = renderFloor1();
  const obs1 = renderObstacle1();
  const target = renderTarget();

  export const objects = [baseObjects, [renderFloor1, renderObstacle1, renderTarget]].flat();
  export const info = "Knock the triangle down to pass the level.";

// ------------------------------- //
