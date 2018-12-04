import Matter from 'matter-js';
import { baseObjects } from '../base';

  let { Body, Bodies, Constraint, Composites } = Matter;

  const canvas = document.getElementById('canvas');

  const x = (coordinate) => (canvas.width - coordinate);
  const y = (coordinate) => (canvas.height - coordinate);

  const xPerc = (coordinate) => (canvas.width * (coordinate/100));
  const yPerc = (coordinate) => (canvas.height * (coordinate/100));

  // ----------- LEVEL 4 ----------- //

  const renderFloor1 = () => {
    const floor = Bodies.rectangle(x(500), y(400), 200, 30, { isStatic: true });
    floor.friction = 100;
    return floor;
  };

  const renderRightWall = () => {
    const wall = Bodies.rectangle(x(380), y(420), 30, 100, { isStatic: true });
    Body.rotate(wall, 1);
    return wall;
  };

  const box1 = () => {
    const box = Bodies.rectangle(x(500), y(450), 70, 70, { density: 0.5 });
    box.friction = 100;
    return box;
  };

  const box2 = () => {
    const box = Bodies.rectangle(x(430), y(450), 70, 70, { density: 0.5 });
    box.friction = 100;
    return box;
  };

  const renderTarget = () => {
    const triangle = Bodies.polygon(x(400), y(600), 3, 40, { label: "target", density: 0.1 });
    Body.rotate(triangle, 1);
    return triangle;
  };

  export const objects = [baseObjects, [renderFloor1, renderRightWall, box1, box2, renderTarget]].flat();
  export const info = "You get the gist of it. Have Fun!";

  // ------------------------------- //
