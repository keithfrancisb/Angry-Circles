import Matter from 'matter-js';
import { level0 } from '../assets/javascript/levels/level0';
import { level1 } from '../assets/javascript/levels/level1';
import { level2 } from '../assets/javascript/levels/level2';
import { level3 } from '../assets/javascript/levels/level3';

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
        width: window.innerWidth,
        height: window.innerHeight,
        background: "#16161D",
        wireframes: false
      }
  });


  let mouseConstraint = createMouseConstraint(render,engine);

  const createAngryCircle = () => {
    let angryCircle = Bodies.circle(300, canvas.height-240, 30, { label: 'angry', restitution: 0.8 });
    return angryCircle;
  };

  const setupSlingshot = (angryCircle) => {
    const slingShot = Constraint.create({
      pointA: { x:300, y: canvas.height-240 },
      bodyB: angryCircle,
      stiffness: 0.05
    });
    return slingShot;
  };

  let angryCircle = createAngryCircle();
  World.add(engine.world, angryCircle);
  let slingShot = setupSlingshot(angryCircle);
  World.add(engine.world, slingShot);

  let gameProgress = 0;
  const resetWorld = () => {
      World.clear(engine.world);
      levels[gameProgress].forEach( object => World.add(engine.world, object()) );
      mouseConstraint = createMouseConstraint(render,engine);
      angryCircle = createAngryCircle();
      World.add(engine.world, angryCircle);
      slingShot = setupSlingshot(angryCircle);
      World.add(engine.world, slingShot);
  };

  let tries = 4;

  Events.on(engine, 'afterUpdate', () => {
    if(mouseConstraint.mouse.button === -1 && angryCircle.position.y < canvas.height-250) {
      angryCircle = createAngryCircle();
      World.add(engine.world, angryCircle);
      slingShot.bodyB = angryCircle;
      tries--;
      if(tries === 0) {
        resetWorld();
        tries = 4;
        const ctx = document.getElementById('canvas').getContext('2d');

      }
    }
  });

  // LEVEL HANDLER
  const levels = [level0, level1, level2, level3];

  levels[gameProgress].forEach( object => World.add(engine.world, object()) );

  Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for(let i=0; i < pairs.length; i++){
      if(pairs[i].bodyA.label === "target" && pairs[i].bodyB.label === "base" ||
          pairs[i].bodyB.label === "target" && pairs[i].bodyA.label === "base" ) {
        gameProgress++;
        if(gameProgress !== levels.length){
          tries = 4;
          setTimeout(resetWorld, 3000);
        }
      } else if ((pairs[i].bodyA.label === "angry" && pairs[i].bodyB.label === "startGame" ||
          pairs[i].bodyB.label === "angry" && pairs[i].bodyA.label === "startGame" ) && gameProgress === 0) {

        if(gameProgress === 0){
          gameProgress++;
          setTimeout(resetWorld, 2000);
        }
      }
    }
  });

  // run the engine
  Engine.run(engine);
  // run the renderer
  Render.run(render);
});
