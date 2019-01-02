import Matter from 'matter-js';
import { baseObjects } from '../base';

  let { World, Body, Bodies, Constraint, Composites } = Matter;

  const canvas = document.getElementById('canvas');

  const x = (coordinate) => (canvas.width - coordinate);
  const y = (coordinate) => (canvas.height - coordinate);

  const xPerc = (coordinate) => (canvas.width * (coordinate/100));
  const yPerc = (coordinate) => (canvas.height * (coordinate/100));

  // ----------- LEVEL 5 ----------- //

  const renderRightWall = () => {
    const wall = Bodies.rectangle(x(350), y(420), 30, 300, { isStatic: true, friction: 5000, collisionFilter: { category: 0x0004 } });
    Body.rotate(wall, 1);
    return wall;
  };

  const constraint1 = (engine) => {
    const fan = Bodies.rectangle(x(590), y(450), 280, 50, { density: 0.8, collisionFilter: { category: 0x0002 | 0x0004, mask: 0x0002 | 0x0004 } });
    World.add(engine.world, fan);
    setInterval(() => fan.torque = -6500, 100);
    const constraint = Constraint.create({
      pointA: { x: x(590), y: y(450) },
      bodyB: fan,
      stiffness: 1
    });
    return constraint;
  };

  const renderTarget = () => {
    const triangle = Bodies.polygon(x(400), y(600), 3, 40, { label: "target", density: 0.9, friction: 5000, collisionFilter: { category: 0x0002 | 0x0004, mask: 0x0002 | 0x0004 } });
    Body.rotate(triangle, 1);
    return triangle;
  };

  export const objects = [baseObjects, [renderRightWall, constraint1, renderTarget]].flat();
  export const info = "Can you get the timing right?";

  // ------------------------------- //
