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

  const renderStartGameStack = () => {
    const obs = Composites.stack(x(500), y(700), 11, 30, 0, 0, createPolygon);
    return obs;
  };

  export const objects = [baseObjects, [renderStartGameStack]].flat();
  export const info = "<div class='start-over'><span>You Won!!</span><button>Start Over</button></div>";

  // ------------------------------- //
