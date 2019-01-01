[Play now!](https://keithfrancisb.github.io/Angry-Circles/)
![](angry-circle.gif)
# Angry Circle
Angry Circle is inspired by the game Angry Birds. Angry Birds is a game where you sling birds from one side of the screen with a goal to hit the pigs on the other side. Angry Circles would have same concept just with circles and triangles instead of birds and pigs.

### How to Play
* Click on the circle on the left side of the screen and hold it.
* Drag the circle to the left to increase the tension of the slingshot.
* Release the circle and watch it fly and hit the other objects.
* Knock the triangle down within 4 tries to go to the next level.
* Level will reset if player fails to knock the triangle down within 4 tries.
* Restart button is available if the player wishes to start the game from the first level.

### Technologies and Libraries
* *HTML* : Used to contain the canvas that will run the game.
* *CSS* : Used to format the background, canvas, game instructions, and my contact info.
* *JavaScript* : Used to create the game on the canvas.
* *Matter.js* : Used to handle the necessary physics such as collision impacts, density, weight, friction, and gravity.

### Features
1. ##### Implement physics as accurate as the original game.
  In order to simulate physics as closely as the original Angry Birds game, I decided to use a helper library known as *Matter.js*. *Matter.js* is a 2D rigid body physics engine that does an amazing job handling physical properties of 2D shapes rendered on the screen.

  ```javascript
  const createBox = (x, y, friction) => {
    const box = Bodies.rectangle(x, y, 70, 70, { density: 0.5 });
    box.friction = friction;
    return box;
  };
  ```

  The code snippet above is a great example of one of the many functions that I have implemented in the game that utilizes physical properties, in this case the friction and density of a created box. The function Bodies.rectangle not only simplifies the process of constantly typing out the following code:

  ```javascript
  ctx.beginPath();
  ctx.rect(20, 40, 70, 70);
  ctx.fill();
  ctx.closePath();
  // where ctx is the 2D context of the canvas HTML tag
  ```

  It also creates the rectangle with physical properties that the developer can then utilize at their discretion.

* Render the obstacles and the triangles to be hit by the slung circles.
* Render the circles to be slung at the obstacles and the target triangles.
* Players have 5 levels to beat where difficulty increases as they progress.
* Background is easy on the eyes with clear instructions around the canvas containing the game.
