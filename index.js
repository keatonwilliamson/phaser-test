
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

let playC = false
let playDb = false
let playD = false
let playEb = false
let playE = false
let playF = false
let playGb = false
let playG = false
let playAb = false
let playA = false
let playBb = false
let playB = false

let allCNotes = []
for (let i = 0; i < 11; i++) {
    allCNotes.push(i * 12)
}
console.log("carraaaay", allCNotes)



function gotMIDImessage(messageData) {
    console.log("data", messageData.data)
    let notePlayed = messageData.data[1]
    let pressNoteDown = false
    if (messageData.data[0] === 144) {
        pressNoteDown = true
    }
    else if (messageData.data[0] === 128) {
        pressNoteDown = false
    }
    // ------C------
    if (pressNoteDown && allCNotes.includes(notePlayed)) {
        playC = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed)) {
        playC = false
    }
    // ------Db------
    if (pressNoteDown && allCNotes.includes(notePlayed - 1)) {
        playDb = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed - 1)) {
        playDb = false
    }
    // ------D------
    if (pressNoteDown && allCNotes.includes(notePlayed - 2)) {
        playD = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed - 2)) {
        playD = false
    }
    // ------Eb------
    if (pressNoteDown && allCNotes.includes(notePlayed - 3)) {
        playEb = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed - 3)) {
        playEb = false
    }
    // ------E------
    if (pressNoteDown && allCNotes.includes(notePlayed - 4)) {
        playE = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed - 4)) {
        playE = false
    }
    // ------F------
    if (pressNoteDown && allCNotes.includes(notePlayed - 5)) {
        playF = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed - 5)) {
        playF = false
    }
    // ------Gb------
    if (pressNoteDown && allCNotes.includes(notePlayed - 6)) {
        playGb = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed - 6)) {
        playGb = false
    }
    // ------G------
    if (pressNoteDown && allCNotes.includes(notePlayed - 7)) {
        playG = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed - 7)) {
        playG = false
    }
    // ------Ab------
    if (pressNoteDown && allCNotes.includes(notePlayed - 8)) {
        playAb = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed - 8)) {
        playAb = false
    }
    // ------A------
    if (pressNoteDown && allCNotes.includes(notePlayed - 9)) {
        playA = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed - 9)) {
        playA = false
    }
    // ------Bb------
    if (pressNoteDown && allCNotes.includes(notePlayed - 10)) {
        playBb = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed - 10)) {
        playBb = false
    }
    // ------B------
    if (pressNoteDown && allCNotes.includes(notePlayed - 11)) {
        playB = true
    }
    if (!pressNoteDown && allCNotes.includes(notePlayed - 11)) {
        playB = false
    }

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
    this.load.image('pallet-town', 'assets/light-grass.png');
    this.load.image('ball', 'assets/pixel-ball.png')
}

function create() {


    // var boom = this.add.sprite(400, 300, 'boom');

    grassMap = this.add.tileSprite(600, 480, 600, 480, 'pallet-town');
    grassMap.scaleX = 1.7
    grassMap.scaleY = 1.7
    absol = this.matter.add.sprite(100, 450, 'absol-sheet', 0);
    absol.scaleX = 2.5
    absol.scaleY = 2.5
    absol.setBody({
        type: 'circle',
        width: 128,
        height: 128
    });
    ball = this.matter.add.sprite(200, 450, 'ball', 0);
    ball.scaleX = 0.15
    ball.scaleY = 0.15
    ball.setBody({
        type: 'circle',
        width: 50,
        height: 50
    });
    ball.setFrictionAir(0.01);
    ball.setMass(1);
    ball.setBounce(1);

    // grassMap = this.matter.add.image(100, 450, 'grass-map', 0);


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
    absol.setFrictionAir(0.3);
    absol.setMass(10);

    this.matter.world.setBounds(0, 0, 1200, 960);

    cursors = this.input.keyboard.createCursorKeys();

    // cursors = this.input.keyboard.createCursorKeys();
    // yeahh = this.input.on('pointerdown', function (pointer) {
    //     console.log(this.input)
    //     // this.matter.add.sprite(pointer.x, pointer.y, 'sheet', 'banana', { shape: shapes.banana });
    // }, this);

}

function update() {
    if (Math.abs(absol.body.velocity.x) < 1 && Math.abs(absol.body.velocity.y) < 1) {
        animationDirectionProxy.absol = "stop"
    }
    if (cursors.left.isDown) {
        animationDirectionProxy.absol = "walk-left"
        absol.thrustBack(0.18);
    }
    else if (cursors.right.isDown) {
        absol.thrust(0.18);
        animationDirectionProxy.absol = "walk-right"
    }

    if (cursors.up.isDown) {
        absol.thrustLeft(0.18);
        animationDirectionProxy.absol = "walk-up"
    }
    else if (cursors.down.isDown) {
        console.log(playC)
        absol.thrustRight(0.18);
        animationDirectionProxy.absol = "walk-down"
    }

    // Midi control

    if (playC && playEb && playAb ) {
        animationDirectionProxy.absol = "walk-left"
        absol.thrustBack(0.18);
    }
    else if (playDb && playGb && playBb) {
        absol.thrust(0.18);
        animationDirectionProxy.absol = "walk-right"
    }

    if (playEb && playGb && playBb) {
        absol.thrustLeft(0.18);
        animationDirectionProxy.absol = "walk-up"
    }
    else if (playDb && playF && playAb) {
        // console.log(playDb && playF && playAb)
        absol.thrustRight(0.18);
        animationDirectionProxy.absol = "walk-down"
    }
}

