import Matter from 'matter-js';
import { baseObjects } from '../base';

  let { Bodies, Constraint, Composites } = Matter;

  const canvas = document.getElementById('canvas');

  const x = (coordinate) => (canvas.width - coordinate);
  const y = (coordinate) => (canvas.height - coordinate);

  // ----------- LEVEL 0 ----------- //

  const renderStartGameSensor = () => {
    const ghostWall = Bodies.rectangle(700, canvas.height/2, 40, canvas.height*2, { isSensor: true });
  };

  export const level0 = [baseObjects, [renderStartGameSensor]].flat();

  // ------------------------------- //
