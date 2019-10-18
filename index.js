/*
 *  This example show how to load complex shapes created with PhysicsEditor (https://www.codeandweb.com/physicseditor)
 */


var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 960,
    backgroundColor: '#1b1464',
    parent: 'game',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
};


// var game = new Phaser.Game(config);

// function preload() {
//     // Load sprite sheet generated with TexturePacker
//     this.load.atlas('sheet', 'assets/fruit-sprites.png', 'assets/fruit-sprites.json');

//     // Load body shapes from JSON file generated using PhysicsEditor
//     this.load.json('shapes', 'assets/fruit-shapes.json');
// }

// function create() {
//     var shapes = this.cache.json.get('shapes');

//     this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
//     this.add.image(0, 0, 'sheet', 'background').setOrigin(0, 0);

//     // sprites are positioned at their center of mass
//     var ground = this.matter.add.sprite(0, 0, 'sheet', 'ground', {shape: shapes.ground});
//     ground.setPosition(0 + ground.centerOfMass.x, 280 + ground.centerOfMass.y);  // corrected position: (0,280)

//     this.matter.add.sprite(200, 50, 'sheet', 'crate', {shape: shapes.crate});
//     this.matter.add.sprite(250, 250, 'sheet', 'banana', {shape: shapes.banana});
//     this.matter.add.sprite(360, 50, 'sheet', 'orange', {shape: shapes.orange});
//     this.matter.add.sprite(400, 250, 'sheet', 'cherries', {shape: shapes.cherries});

//     this.input.on('pointerdown', function (pointer) {
//         this.matter.add.sprite(pointer.x, pointer.y, 'sheet', 'banana', {shape: shapes.banana});
//     }, this);
// }


// var config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,

//     parent: 'phaser-example',
//     physics: {
//         default: 'matter',
//         matter: {
//             gravity: {
//                 x: 0,
//                 y: 0
//             }
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };

var absol;
var cursors;
const animationDirection = {
    absol: "",
}
const animationDirectionHandler = {
    set: function (obj, prop, value) {
        if (obj[prop] === value) {
        }
        else if (value === "stop"){
            obj[prop] = value;
            console.log("stop maaan")
            absol.anims.stop();
        }
        else {
            obj[prop] = value;
           console.log(Math.abs(absol.body.velocity.x), Math.abs(absol.body.velocity.y)) 
            absol.anims.play(`${value}`);
        }
        return true;
    }
}

const animationDirectionProxy = new Proxy(animationDirection, animationDirectionHandler);

var game = new Phaser.Game(config);

function preload() {


    // this.load.spritesheet('sheet', 'assets/mega-absol.png', 64, 64);
    this.load.spritesheet('absol-sheet', 'assets/mega-absol.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('grass-map', 'assets/grass-map.jpeg');
}

function create() {


    // var boom = this.add.sprite(400, 300, 'boom');


    absol = this.matter.add.sprite(100, 450, 'absol-sheet', 0);
    absol.scaleX = 2.5
    absol.scaleY = 2.5
    grassMap = this.matter.add.image(100, 450, 'grass-map', 0);


    this.anims.create({
        key: 'walk-down',
        repeat: -1,
        frames: this.anims.generateFrameNumbers('absol-sheet', { start: 0, end: 3, first: 0 }),
        frameRate: 7
    });
    this.anims.create({
        key: 'walk-left',
        repeat: -1,
        frames: this.anims.generateFrameNumbers('absol-sheet', { start: 4, end: 7, first: 4 }),
        frameRate: 7
    });
    this.anims.create({
        key: 'walk-right',
        repeat: -1,
        frames: this.anims.generateFrameNumbers('absol-sheet', { start: 8, end: 11, first: 8 }),
        frameRate: 7
    });
    this.anims.create({
        key: 'walk-up',
        repeat: -1,
        frames: this.anims.generateFrameNumbers('absol-sheet', { start: 12, end: 15, first: 12 }),
        frameRate: 7
    });



    console.log(absol);


    // this.anims.create({
    //     key: 'walk',
    //     repeat: -1,
    //     frames: this.anims.generateFrameNames('absol', {start: 0, end: 3})
    // })
    // absol.play('walk')
    // absol.anims.add('down', [0, 1, 2, 3], 10, true);
    // mysprite.animations.play('down');

    // absol = this.matter.add.image(400, 300, 'absol');
    absol.setFixedRotation();
    absol.setAngle(0);
    absol.setFrictionAir(0.08);
    absol.setMass(15);

    this.matter.world.setBounds(0, 0, 1200, 960);

    cursors = this.input.keyboard.createCursorKeys();

    // cursors = this.input.keyboard.createCursorKeys();
    // yeahh = this.input.on('pointerdown', function (pointer) {
    //     console.log(this.input)
    //     // this.matter.add.sprite(pointer.x, pointer.y, 'sheet', 'banana', { shape: shapes.banana });
    // }, this);

}

function update() {
    if(Math.abs(absol.body.velocity.x) < 1 && Math.abs(absol.body.velocity.y) < 1) {
        animationDirectionProxy.absol = "stop"
    }
    if (cursors.left.isDown) {
        animationDirectionProxy.absol = "walk-left"
        absol.thrustBack(0.06);
    }
    else if (cursors.right.isDown) {
        absol.thrust(0.06);
        animationDirectionProxy.absol = "walk-right"
    }

    if (cursors.up.isDown) {
        absol.thrustLeft(0.06);
        animationDirectionProxy.absol = "walk-up"
    }
    else if (cursors.down.isDown) {
        absol.thrustRight(0.06);
        animationDirectionProxy.absol = "walk-down"
    }
}

