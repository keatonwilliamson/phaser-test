
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

var midi, data;
// start talking to MIDI controller
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    console.warn("No MIDI support in your browser")
}

// on success
function onMIDISuccess(midiData) {
    console.log("midi works")
    // this is all our MIDI data
    midi = midiData;
    var allInputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = allInputs.next(); input && !input.done; input = allInputs.next()) {
        // when a MIDI value is received call the onMIDIMessage function
        input.value.onmidimessage = gotMIDImessage;
    }
}

// mother object
playingNote = {}
for (let i = 0; i < 12; i++) {
    playingNote[i] = false
}

// console.log("obbbjecttt", playingNote)

// creates an array 0, 12, 24, 36 etc..
let allCNotes = []
for (let i = 0; i < 11; i++) {
    allCNotes.push(i * 12)
}

const chordPack = {
    // north
    0: {
        notes: [2, 5, 9],
        playingChord: false
    },
    // northeast
    1: {
        notes: [0, 5, 9],
        playingChord: false
    },
    // east
    2: {
        notes: [0, 4, 9],
        playingChord: false
    },
    // southeast
    3: {
        notes: [11, 4, 8],
        playingChord: false
    },
    // south
    4: {
        notes: [0, 4, 7],
        playingChord: false
    },
    // southwest
    5: {
        notes: [11, 4, 7],
        playingChord: false
    },
    // west
    6: {
        notes: [11, 2, 7],
        playingChord: false
    },
    // northwest
    7: {
        notes: [10, 2, 5],
        playingChord: false
    }
}

let playerIsKicking;

function gotMIDImessage(messageData) {
    console.log("data", messageData.data)
    let notePlayed = messageData.data[1]
    let pressingNoteDown = false
    if (messageData.data[0] === 144) {
        pressingNoteDown = true
    }
    else if (messageData.data[0] === 128) {
        pressingNoteDown = false
    }

    // sustain pedal
    if (messageData.data[0] === 176) {
        if (messageData.data[2] === 127) { playerIsKicking = true }
        else if (messageData.data[2] === 0) { playerIsKicking = false }
    }
    else {
        for (let i = 0; i < 12; i++) {
            if (pressingNoteDown && allCNotes.includes(notePlayed - i)) {
                playingNote[i] = true
            }
            if (!pressingNoteDown && allCNotes.includes(notePlayed - i)) {
                playingNote[i] = false
            }
        }
    }

    // console.log(playingNote)
    for (let i = 0; i < 8; i++) {
        chordPack[i].playingChord = chordPack[i].notes.every(note => playingNote[note])
    }


    // console.log(chordPack)
}





// on failure
function onMIDIFailure() {
    console.warn("Not recognising MIDI controller")
}




// end midi stuff
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
        else if (value === "stop") {
            obj[prop] = value;
            // console.log("stop maaan")
            absol.anims.stop();
        }
        else {
            obj[prop] = value;
            //    console.log(Math.abs(absol.body.velocity.x), Math.abs(absol.body.velocity.y)) 
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
    this.load.image('light-grass', 'assets/light-grass.png');
    this.load.image('ball', 'assets/pixel-ball.png')
    this.load.image('walter', 'assets/walter.png')
}

function create() {


    // var boom = this.add.sprite(400, 300, 'boom');
    leftBounds = this.matter.add.rectangle(75, 480, 150, 960)

    grassMap = this.add.tileSprite(1000, 480, 1000, 480, 'light-grass');
    grassMap.scaleX = 1.7
    grassMap.scaleY = 1.7
    absol = this.matter.add.sprite(300, 450, 'absol-sheet', 0);
    absol.scaleX = 2.5
    absol.scaleY = 2.5
    absol.setBody({
        type: 'polygon',
        sides: 8,
        radius: 70
    });
    absol.setBounce(1)
    ball = this.matter.add.sprite(400, 450, 'ball', 0);
    ball.scaleX = 0.2
    ball.scaleY = 0.2
    ball.setBody({
        type: 'circle',
        width: 50,
        height: 50
    });
    ball.setFrictionAir(0.1);
    ball.setMass(10);
    ball.setBounce(0.9);
    ball.worldBounce = 0

    walter = this.matter.add.sprite(300, 600, 'walter', 0);
    walter.scaleX = 0.15
    walter.scaleY = 0.15
    walter.setBody({
        type: 'circle',
        width: 100,
        height: 100
    });
    walter.setFrictionAir(0);
    walter.setMass(9000);
    walter.setBounce(2);
    walter.setVelocity(50, 50);
    walter.setFixedRotation();
    walter.setAngle(0);
    // walter.setVelocity(Math.min(5, Math.abs(absol.body.velocity.x)));

    // grassMap = this.matter.add.image(100, 450, 'grass-map', 0);

    // Smoothly follow the player
    this.cameras.main.startFollow(absol, false, 0.5, undefined);
    this.cameras.main.setBounds(0, 0, 2000, 960)


    this.anims.create({
        key: 'walk-down',
        repeat: -1,
        frames: this.anims.generateFrameNumbers('absol-sheet', { start: 0, end: 3, first: 0 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'walk-left',
        repeat: -1,
        frames: this.anims.generateFrameNumbers('absol-sheet', { start: 4, end: 7, first: 4 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'walk-right',
        repeat: -1,
        frames: this.anims.generateFrameNumbers('absol-sheet', { start: 8, end: 11, first: 8 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'walk-up',
        repeat: -1,
        frames: this.anims.generateFrameNumbers('absol-sheet', { start: 12, end: 15, first: 12 }),
        frameRate: 10
    });


    const addAnimation = (subject, sheet) => {
        this.anims.create({
            key: `${sheet}-walk-down`,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(`${sheet}`, { start: 0, end: 3, first: 0 }),
            frameRate: 10
        });
        this.anims.create({
            key: `${sheet}-walk-left`,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(`${sheet}`, { start: 4, end: 7, first: 4 }),
            frameRate: 10
        });
        this.anims.create({
            key: `${sheet}-walk-right`,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(`${sheet}`, { start: 8, end: 11, first: 8 }),
            frameRate: 10
        });
        this.anims.create({
            key: `${sheet}-walk-up`,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(`${sheet}`, { start: 12, end: 15, first: 12 }),
            frameRate: 10
        });


    }


    // console.log("graaas", grassMap);



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
    absol.setFrictionAir(0.7);
    absol.setMass(10);
    // absol.setFrictionStatic(0)
    // absol.allowDrag = true
    // absol.useDamping = true
    // absol.acceleration = 0
    // absol.drag = 0.5


    this.matter.world.setBounds(0, 0, 2000, 960);

    cursors = this.input.keyboard.createCursorKeys();

    // cursors = this.input.keyboard.createCursorKeys();
    // yeahh = this.input.on('pointerdown', function (pointer) {
    //     console.log(this.input)
    //     // this.matter.add.sprite(pointer.x, pointer.y, 'sheet', 'banana', { shape: shapes.banana });
    // }, this);

}
const setMaxVelocity = (subject, max) => {
    if (subject.body.velocity.x < -max) {
        subject.setVelocityX(-max);
    }
    if (subject.body.velocity.x > max) {
        subject.setVelocityX(max);
    }
    if (subject.body.velocity.y < -max) {
        walter.setVelocityY(-max);
    }
    if (subject.body.velocity.y > max) {
        subject.setVelocityY(max);
    }
}

const limitBounceByVelocity = (subject, max) => {
    if (subject.body.velocity.x < -max) {
        subject.setBounce(0)
    }
    if (subject.body.velocity.x > max) {
        subject.setBounce(0)
    }
    if (subject.body.velocity.y < -max) {
        subject.setBounce(0)
    }
    if (subject.body.velocity.y > max) {
        subject.setBounce(0)
    }
    else {
        subject.setBounce(1)
    }
}


const resetIfOutOfBounds = (body) => {
    if (body.x < 0 || body.y < 0 || body.x > 2000 || body.y > 960) {
        body.setVelocity(1)
        body.x = 600
        body.y = 480
    }
}





function update() {
    // limitBounceByVelocity(ball, 50)
    setMaxVelocity(walter, 20)
    // setMaxVelocity(ball, 60)
    // setMaxVelocity(absol, 60)
    resetIfOutOfBounds(ball)
    resetIfOutOfBounds(absol)

    if (playerIsKicking) {
        absol.setBounce(10)
        console.log("kicking")
    }
    else if (!playerIsKicking) {
        absol.setBounce(0)
    }

    thrustValue = 0.5

    if (Math.abs(absol.body.velocity.x) < 1 && Math.abs(absol.body.velocity.y) < 1) {
        animationDirectionProxy.absol = "stop"
    }
    if (cursors.left.isDown) {
        animationDirectionProxy.absol = "walk-left"
        absol.thrustBack(0.5);
    }
    else if (cursors.right.isDown) {
        absol.thrust(0.5);
        animationDirectionProxy.absol = "walk-right"
    }

    if (cursors.up.isDown) {
        absol.thrustLeft(0.5);
        animationDirectionProxy.absol = "walk-up"
    }
    else if (cursors.down.isDown) {
        absol.thrustRight(0.5);
        animationDirectionProxy.absol = "walk-down"
        console.log(absol)
    }

    // Midi control

    else if (chordPack[0].playingChord) {
        absol.thrustLeft(thrustValue);
        animationDirectionProxy.absol = "walk-up"
    }

    else if (chordPack[1].playingChord) {
        absol.thrustLeft(thrustValue);
        absol.thrust(thrustValue);
        animationDirectionProxy.absol = "walk-up"
    }

    else if (chordPack[2].playingChord) {
        absol.thrust(thrustValue + 0.1);
        animationDirectionProxy.absol = "walk-right"
    }

    else if (chordPack[3].playingChord) {
        absol.thrust(thrustValue);
        absol.thrustRight(thrustValue);
        animationDirectionProxy.absol = "walk-down"
    }

    else if (chordPack[4].playingChord) {
        // console.log(playDb && playF && playAb)
        absol.thrustRight(thrustValue);
        animationDirectionProxy.absol = "walk-down"
    }

    else if (chordPack[5].playingChord) {
        // console.log(playDb && playF && playAb)
        absol.thrustBack(thrustValue);
        absol.thrustRight(thrustValue);
        animationDirectionProxy.absol = "walk-down"
    }

    else if (chordPack[6].playingChord) {
        animationDirectionProxy.absol = "walk-left"
        absol.thrustBack(thrustValue + 0.1);
    }

    else if (chordPack[7].playingChord) {
        animationDirectionProxy.absol = "walk-up"
        absol.thrustBack(thrustValue);
        absol.thrustLeft(thrustValue);
    }




}

