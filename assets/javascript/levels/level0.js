import Matter from 'matter-js';
import { baseObjects } from '../base';

  let { Bodies, Constraint, Composites } = Matter;

  const canvas = document.getElementById('canvas');

  const x = (coordinate) => (canvas.width - coordinate);
  const y = (coordinate) => (canvas.height - coordinate);

  // ----------- LEVEL 0 ----------- //

  const renderStartGameSensor = () => {
    const ghostWall = Bodies.rectangle(900, canvas.height/2, 40, canvas.height*2, { label: "startGame", isSensor: true, isStatic: true });
    return ghostWall;
  };

  const createBox = (x, y) => {
    return Bodies.rectangle(x, y, 40,40, { density: 0.001 });
  };

  const renderStartGameStack = () => {
    const obs = Composites.stack(x(500), y(700), 11, 40, 0, 0, createBox);
    // World.add(engine.world, obs);
    return obs;
  };

  export const level0 = [baseObjects, [renderStartGameSensor, renderStartGameStack]].flat();

  // ------------------------------- //