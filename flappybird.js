const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const POPULATIONSIZE = 500;
const text = document.getElementById("score");
const gen = document.getElementById("generation");
const slider = document.getElementById("myRange");
const highs = document.getElementById("highScore");
const checkbox = document.getElementById("check");
let birds = [];
let pipes = [];
let best;
let newBirds = [];
let oldBirds = [];
let generationCount = 0;
let score = 0;
let cycles = 0;
let divid = slider.value;
let highScore = 0;
function setup(){
    for(let i = 0;i<POPULATIONSIZE;i++){
        let h=Math.round(Math.random()*360);
        let s=100;
        let l=50;
        birds[i] = new Bird(h, s, l);
    }
    pipes.push(new Pipes());
        draw();
}

function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //logic


        for (let i = 0; i < divid; i++) {
            if (pipes[0].x === 91) {
                pipes.push(new Pipes());
                score++;
                if (score > highScore) {
                    highScore = score;
                    highs.innerHTML = "Highscore: " + highScore
                }
                text.innerHTML = "Score: " + score;
            }
            for (let i = 0; i < birds.length; i++) {

                birds[i].think(pipes[0]);
                if (birds[i].hits(pipes[0]) || birds[i].hitsBottom() || birds[i].hitsTop()) {
                    oldBirds.push(birds.splice(i, 1)[0]);
                    if (birds.length === 1) {
                        best = new Bird(birds[0]);
                    }
                }
            }

            if (pipes[0].x === -50) {
                pipes.splice(0, 1);
            }
            if (birds.length == 0) {
                newBirds = newGen(oldBirds);
                birds = [];
                birds = newBirds;
                oldBirds = [];
                generationCount++;
                gen.innerHTML = "Generations: " + generationCount;
                score = 0;
                text.innerHTML = "Score: " + score;
                resetGame();
            }
            cycles++;
            for (let p of pipes) {
                p.update();
            }
            for (let b of birds) {
                b.update();
            }
        }



//drawing



        for (let p of pipes) {

            p.show();

        }
        for (let bird of birds) {
            bird.show();
        }

    requestAnimationFrame(draw);


}
function resetGame(){
    pipes = [];
    pipes.push(new Pipes());
}
setup();

slider.oninput = function() {
    divid = this.value;
}


