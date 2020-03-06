class Bird{
    x;
    y;
    gravity;
    velocity;
    jumpForce;
    brain;
    fitness;
    probability;
    h;
    s;
    l;

    constructor(h, s ,l){
        if(h instanceof  Bird){
            this.x = 75;
            this.y = canvas.height/2;
            this.gravity = 0.9;
            this.jumpForce = 22;
            this.velocity = 0;
            this.brain = h.brain.copy();
            this.fitness = 0;
            this.probability = 0;
            this.h = h.h;
            this.s = h.s;
            this.l = h.l;
        }
        else{
        this.x = 75;
        this.y = canvas.getAttribute("height")/2;
        this.gravity = 0.9;
        this.jumpForce = 22;
        this.velocity = 0;
        this.brain = new NeuralNetwork(5, 5, 1);
        this.fitness = 0;
        this.probability = 0;
        this.h = h;
        this.s = s;
        this.l = l;
        }
    }
    show(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 16, 0, 2 * Math.PI);
        ctx.fillStyle = 'hsl('+this.h+','+ this.s+'%,'+ this.l+'%)';
        ctx.fill();
        //ctx.lineWidth = 5;
        //ctx.strokeStyle = 'hsl('+this.h+','+ this.s+','+ this.l+')';
        //ctx.stroke();
        
    }
    update(){
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
        this.fitness+=1;
        if(this.y > canvas.height -16){
            this.y = canvas.height -16;
            this.velocity = 0;
        }
        if(this.y < 0){
            this.y = 0;
            
        }
    }
    up(){

            this.velocity -= this.jumpForce;
            this.show();
            if(this.velocity < -30){
                this.velocity = -30;
            }

    }
    think(p){
        let nearestPipe = p;
        let input = [];
        input[0] = this.y/canvas.height;
        input[1] = this.velocity/canvas.height;
        input[2] = nearestPipe.top/canvas.height;
        input[3] = (nearestPipe.top + nearestPipe.gap)/canvas.height;
        input[4] = (nearestPipe.x -this.x)/canvas.width;
        let out = this.brain.predict(input);
        if(out[0] >= 0.5){
            this.up();
        }
    }
    hits(pipe){
        let p = pipe;
        if((this.x+32 >= p.x && this.x-32 <= p.x + p.width)&&(this.y-32<=p.top || this.y+16 >= p.top + p.gap)){
            return true;
        }else{
            return false;
        }

    }
    clone(b){
        this.brain = b;
        this.brain.mutate();
    }
    evolve(){
        this.brain.mutate((e) => {
            return Math.max(Math.min((Math.random() * 2 - 1)/10 + e, 1), -1);
        });
    }
    hitsBottom(){
        if(this.y===canvas.height-16)
            return true;
        return false;
    }
    hitsTop(){
        if(this.y===0)
            return true;
        return false;
    }
}