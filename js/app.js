var Entity = function(x, y, sprite) {
    this.x=x;
    this.y=y;
    this.sprite=sprite;
}
Entity.prototype.update = function(dt) {} // do overload

// Draw the enemy on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// ** Enemy ** //
var Enemy = function(y) {
    Entity.call(this, 1, y*78, 'images/enemy-bug.png');
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += 10*dt;
    if (this.x>(505))
        this.x = 1;
    this.render();
}


// ** Player ** //
var Player = function() {
    Entity.call(this, 202, 5*78, 'images/char-boy.png');
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.handleInput = function(key){
    if(key=='up')
        this.y -= 83;
    else if(key=='down')
        this.y += 83;
    else if(key=='left')
        this.x -= 101;
    else if(key=='right')
        this.x += 101;
}
Player.prototype.update = function(dt) {
    this.render();
}

// Now instantiate your objects.
var allEnemies = [new Enemy( Math.floor((Math.random() * 3) + 1) )];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
