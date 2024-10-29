const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let paddleLeft;
let paddleRight;
let ball;

function preload() {
    this.load.image('ball', 'assets/to/ball.png'); // Replace with your ball image path
    this.load.image('paddle', 'assets/to/paddle.png'); // Replace with your paddle image path
}

function create() {
    paddleLeft = this.physics.add.image(50, this.cameras.main.height / 2, 'paddle').setImmovable();
    paddleRight = this.physics.add.image(this.cameras.main.width - 50, this.cameras.main.height / 2, 'paddle').setImmovable();

    ball = this.physics.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ball').setBounce(1);
    ball.setVelocity(200, 200);
    ball.setCollideWorldBounds(true);

    this.physics.add.collider(ball, paddleLeft);
    this.physics.add.collider(ball, paddleRight);

    this.input.on('pointermove', function (pointer) {
        paddleLeft.y = pointer.y;
    });
}

function update() {
    if (paddleLeft.y < 0) paddleLeft.y = 0;
    if (paddleLeft.y > config.height) paddleLeft.y = config.height;
}
