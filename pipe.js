class Pipes{
    x;
    top; //height top pipe
    bottom; //height bottom pipe
    gap;
    width;

    constructor(){
        this.width = 50;
        this.gap = 150;
        this.top = Math.round(Math.random()*400)+50;
        this.x = canvas.width;
        this.bottom = canvas.height - this.top - this.gap;
    }
    show(){
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, (this.top+this.gap), this.width, this.bottom)


    }
    update(s){
        this.x -= 1.5;
    }
}