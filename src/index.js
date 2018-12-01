import Matter from 'matter-js';
import { level1 } from '../assets/javascript/levels/level1';
import { level2 } from '../assets/javascript/levels/level2';
import { createMouseConstraint } from '../assets/javascript/base';

let { Engine, Render, World, Bodies, Mouse, MouseConstraint, Constraint, Events } = Matter;
let { Composites, Runner } = Matter;


document.addEventListener('DOMContentLoaded', () => {

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


  let mouseConstraint = createMouseConstraint(render,engine);

  const createAngryCircle = () => {
    let angryCircle = Bodies.circle(240, canvas.height-240, 25, { restitution: 0.8 });
    // World.add(engine.world, angryCircle);
    return angryCircle;
  };

  let angryCircle = createAngryCircle();

  Events.on(engine, 'afterUpdate', () => {
    if(mouseConstraint.mouse.button === -1 && angryCircle.position.y < canvas.height-260) {
      angryCircle = createAngryCircle();
      World.add(engine.world, angryCircle);
      slingShot.bodyB = angryCircle;
    }
  });


  // LEVEL HANDLER
  const levels = [level1, level2];
  let gameProgress = 0;

  World.add(engine.world, levels[0]);

  debugger
  Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for(let i=0; i < pairs.length; i++){
      if(pairs[i].bodyA.label === "target" && pairs[i].bodyB.label === "base" ||
          pairs[i].bodyB.label === "target" && pairs[i].bodyA.label === "base" ) {

            gameProgress++;

            setTimeout(() => {
              World.clear(engine.world);
              World.add(engine.world, levels[gameProgress]);
              mouseConstraint = createMouseConstraint(render,engine);
               // TODO: Setup levels array, use them here.
            }, 3000);

      }
    }
  });

  // run the engine
  Engine.run(engine);
  // run the renderer
  Render.run(render);
});
