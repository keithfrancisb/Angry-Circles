import Matter from 'matter-js';
import * as level0 from '../assets/javascript/levels/level0';
import * as level1 from '../assets/javascript/levels/level1';
import * as level2 from '../assets/javascript/levels/level2';
import * as level3 from '../assets/javascript/levels/level3';
import * as level4 from '../assets/javascript/levels/level4';
import * as level5 from '../assets/javascript/levels/level5';
import * as finalLevel from '../assets/javascript/levels/final_level';

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
        width: 1400,
        height: 700,
        background: "#16161D",
        wireframes: false,
        showMousePosition: false
      }
  });

  const createAngryCircle = () => {
    let angryCircle = Bodies.circle(400, 400, 30, {
      label: 'angry',
      restitution: 0.8,
      density: 0.3,
      collisionFilter: { category: 0x0003, mask: 0x0003 | 0x0004 }
     });

    return angryCircle;
  };

  let mouseConstraint = createMouseConstraint(render,engine);
  mouseConstraint.collisionFilter.category = 0x0001;
  mouseConstraint.collisionFilter.mask = 0x0001;


  const setupSlingshot = (angryCircle) => {
    const slingShot = Constraint.create({
      pointA: { x: 400, y: 400 },
      bodyB: angryCircle,
      stiffness: 0.1
    });
    return slingShot;
  };

  let angryCircle = createAngryCircle();
  World.add(engine.world, angryCircle);
  let slingShot = setupSlingshot(angryCircle);
  World.add(engine.world, slingShot);

  let gameProgress = 0; let levelUpCount = 0;

  function startOver() {
    setTimeout(() => {
      gameProgress = 1;
      levelUpCount = 0;
      resetWorld();
    }, 1000);
  }

  const resetWorld = () => {
    World.clear(engine.world);
    levelUpCount = 0;
    tries = 4;
    levels[gameProgress].objects.forEach( object => World.add(engine.world, object(engine)) );
    mouseConstraint = createMouseConstraint(render,engine);
    angryCircle = createAngryCircle();
    World.add(engine.world, angryCircle);
    slingShot = setupSlingshot(angryCircle);
    World.add(engine.world, slingShot);
    document.getElementById('tries-count').innerHTML = tries;
    document.getElementById('level-count').innerHTML = gameProgress;
    document.getElementById('level-info').innerHTML = levels[gameProgress].info;
  };


  let tries = 5;
  let failInfo; let failRender;
  Events.on(engine, 'afterUpdate', () => {
    if(mouseConstraint.mouse.button === -1 && (angryCircle.position.y < 380 || angryCircle.position.x > 420) && (tries > 0 || gameProgress === 6) ) {
      document.getElementById('tries-count').innerHTML = tries;
      tries--;
      angryCircle = createAngryCircle();
      World.add(engine.world, angryCircle);
      slingShot.bodyB = angryCircle;
      document.getElementById('tries-count').innerHTML = gameProgress >= 6 ? '-' : tries;
      if(tries === 0 && gameProgress < 6) {
        failInfo = setTimeout(() => { document.getElementById('level-info').innerHTML = 'You Lost..... Try Again!'; }, 4000);
        failRender = setTimeout(() => {
          resetWorld();
          tries = 4;
          document.getElementById('tries-count').innerHTML = tries;
        }, 7000);
      }
    }
  });

  // LEVEL HANDLER
  const levels = [level0, level1, level2, level3, level4, level5, finalLevel, finalLevel];

  levels[gameProgress].objects.forEach( object => World.add(engine.world, object(engine)) );

  Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for(let i=0; i < pairs.length; i++){
      if(pairs[i].bodyA.label === "target" && pairs[i].bodyB.label === "base" ||
          pairs[i].bodyB.label === "target" && pairs[i].bodyA.label === "base" ) {
          clearTimeout(failInfo);
          clearTimeout(failRender);
        if(gameProgress !== levels.length){
          ++levelUpCount;
          ++levelUpCount;
          gameProgress++;
          tries = 4;
          if(levelUpCount <= 2) {
            document.getElementById('level-info').innerHTML = "Level Passed!";
            setTimeout(() => {
              resetWorld();
            }, 3000);
          }
        }
      } else if ((pairs[i].bodyA.label === "angry" && pairs[i].bodyB.label === "startGame" ||
          pairs[i].bodyB.label === "angry" && pairs[i].bodyA.label === "startGame" ) && gameProgress === 0) {

        if(gameProgress === 0){
          gameProgress++;

          setTimeout(() => {
            resetWorld();
            document.getElementById('level-info').classList.remove('base');
            document.getElementById('start').classList.add('hide');
            document.getElementById('game-info').classList.remove('hide');
            document.getElementById('level-count').innerHTML = gameProgress;
            document.getElementById('tries-count').innerHTML = tries;
          }, 2000);
        }
      }
    }
  });

  // run the engine
  Engine.run(engine);
  // run the renderer
  Render.run(render);

  // fit the render viewport to the scene
  Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 1400, y: 700 }
  });


  const reset = document.getElementById('reset');

  reset.addEventListener('click', (e) => {
    gameProgress = 1;
    reset.disabled = true;
    setTimeout(() => {
    resetWorld();
    tries = 4;
    document.getElementById('tries-count').innerHTML = tries;
    setTimeout(() => (reset.disabled = false), 4000);
  }, 500);
  });

  const container = document.getElementById('main-container');
  const canvas = document.getElementById('canvas');
  container.appendChild(canvas);

});
