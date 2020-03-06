
function select(oldBirds){


    let sum = 0;
    let r = Math.random();
    for(let b of oldBirds){
        sum+=Math.pow(b.fitness,2);

    }
    for(let bi of oldBirds){
        bi.probability = Math.pow(bi.fitness,2)/sum;
    }
    let counter = 0;
    while(r>0){
        r-=oldBirds[counter].probability;
        counter++;
    }
    counter-=1;
    return oldBirds[counter];

}
function newGen(){
    for(let i=0;i<POPULATIONSIZE;i++){
        birds[i] = new Bird(select(oldBirds));
        birds[i].evolve();
    }
    return birds;
}