import Matter from 'matter-js';
import { baseObjects } from '../base';

  let { Bodies, Constraint, Composites } = Matter;

  const canvas = document.getElementById('canvas');

  const x = (coordinate) => (canvas.width - coordinate);
  const y = (coordinate) => (canvas.height - coordinate);

  // ----------- LEVEL 0 ----------- //

  const createPolygon = (x, y) => {
    return Bodies.polygon(x, y, 8, 40);
  };

  const createBox = (x, y) => {
    return Bodies.rectangle(x, y, 40,40, { density: 0.001 });
  };

  const renderStartGameStack = () => {
    const obs = Composites.stack(x(500), y(700), 11, 40, 0, 0, createPolygon);
    return obs;
  };

  export const objects = [baseObjects, [renderStartGameSensor, renderStartGameStack]].flat();
  export const info = "Congratulations! You beat the most difficult level in the game! Knock yourself out with the balls!"
  
  // ------------------------------- //
