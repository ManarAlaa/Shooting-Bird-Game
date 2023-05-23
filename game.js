

let welcomeDiv= document.querySelector("#welcome"); 
welcomeDiv.innerText += localStorage.getItem("name");

Swal.fire({
    title: 'Welcome '+localStorage.getItem("name")+' !', 
    text:'to win your score must be greater than 100',
    confirmButtonText: 'Let\'s Play '
  });

 let alertButton= document.querySelector('.swal2-confirm') ;
 alertButton.addEventListener('click', startGame );

function startGame()
{
    Objectt.setTotalScore(0);
    Objectt.setcount(0);
    creatBirds();
    timeLimit();
    createBombs();
    var Birdaudio = document.querySelector('#birds');
    Birdaudio.play();

}


class Objectt{

   //#mage;
   static #count=0;
   static #TotalScore=0;

    constructor(src ,type)

    {
        if (new.target.img === 'Objectt') {
            throw new Error("This class cannot be instantiated directly.") }

        let createimg=document.createElement("img");
            createimg.src=src;
            createimg.style.position="absolute";
            createimg.style.height="100px";
            createimg.style.width="100px";   
            createimg.classList.add("birds"); 
            createimg.classList.add(type);   
            this.image=createimg;        
    }

    static setcount(countt){
        if(countt==0)
        {    Objectt.#count =0 ; }
        else
        {    Objectt.#count +=1; }     
    }

    static setTotalScore(score)
    {
        Objectt.#TotalScore += score;
    }
    
    static getcount(){return Objectt.#count}
    static getTotalScore(){return Objectt.#TotalScore}

}

class Bird extends Objectt{
    constructor(src,type,score=0)
    {
        super(src,type);
        this.score=score;
        this.image.style.top=this.random()+"px";
        this.image.style.left=0 +"px";
        document.body.append(this.image);
    }

    moving_left(speed) 
    {
        let left=0;
        let id=setInterval(()=>
        {
           left+=speed;       
             if(left<window.innerWidth)
             {
                this.image.style.left=left+"px";        
             }
             else
            {
                this.image.remove();
                clearInterval(id);                   
            }       
        },160);

    }//moveRight

    random()
    {
        let randLeft=0;
        randLeft= Math.ceil(Math.random()*(window.innerHeight-120));
        return randLeft;     
    }

    shooting()
    {
        this.image.onclick = ()=>{ 

            var audio = document.querySelector('#myAudio');
            if(audio.currentTime >0.4)
            {
                audio.currentTime=0;
            } 
            audio.play();

            Objectt.setcount(1);
            Objectt.setTotalScore(this.score);

            let birdKilled = document.querySelector("#BirdKill");
            let TotalScore = document.querySelector("#score");    

            birdKilled.innerText = 'Birds Killed :'+ Number(Objectt.getcount()) ;
            TotalScore.innerText = 'Score : '+Number(Objectt.getTotalScore())  ;
          
            if(this.image.classList[1]=='cyan')
            {
                this.image.src='images/wrongmark.gif';  
            }
            else
            {
                this.image.src='images/hunted2.gif'; 
            }
               
            let remove=0;
            let id2=setInterval(()=>
             {  if(remove==0) {}
                else
                {
                    this.image.remove();
                    clearInterval(id2);
                }     
             remove=1;  
             },150);        
        };     
    } 
}

function creatBirds(){
let id=setInterval(()=>
{
    let Whitebird=0;
    let Blackbird=0;
    let Cyanbird=0;
    Whitebird=new Bird('images/white.gif','white',5);
    Blackbird=new Bird('images/black.gif','black',10);
    Cyanbird=new Bird('images/cyan.gif','cyan',-10);

    Whitebird.moving_left(16);
    Blackbird.moving_left(16);
    Cyanbird.moving_left(18);

    Whitebird.shooting();
    Blackbird.shooting();
    Cyanbird.shooting();
 
},2500);
}// creatBirds();

function timeLimit()
{
    let min=1;
    let sec=59;
    let timeDiv=document.querySelector("#timLim");    
    let id=setInterval(()=>
    {
        if (min==1)
        {
            timeDiv.innerText='Time Limit '+ '01:00'; 
            min=min-1;
            console.log(min);
        }
        else {     
            if(sec>10)
            {
                timeDiv.innerText='Time Limit '+ '00:'+sec;
                sec--;
            }       
             else if(sec==10)
            {
                timeDiv.innerText='Time Limit '+ '00:'+sec;
                sec--;
                timeDiv.style.color='red';
            }
            else if(sec<10 && sec>=0)
            {
                timeDiv.innerText='Time Limit '+ '00:0'+sec;
                sec--;
                timeDiv.style.color='rgb(248, 6, 6)';
            }
            else if(sec<0)
            {          
                if(Objectt.getTotalScore()>100)
                {
                clearInterval(id);  

                swal.fire({
                    title: 'Congratulations '+localStorage.getItem("name")+' !<br>You Win',
                    text: 'Your Score '+  Objectt.getTotalScore(),
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Play Again',
                    cancelButtonText: " cancel",
                    closeOnConfirm: false,
                    closeOnCancel: false
                    }).then((result) => {
                    if (result['isConfirmed']){
                        window.location = "http://127.0.0.1:5500/game.html?name="+ localStorage.getItem("name");
                    }
                    else{
                        window.location = "http://127.0.0.1:5500/index.html?name="+ localStorage.getItem("name");
                    }
                    });
                }
                else
                {
                    clearInterval(id);  

                    swal.fire({
                        title: 'Game Over '+localStorage.getItem("name")+' !'+'<br>  You lost',
                        titleColor:"red",
                        text: 'Your Score '+  Objectt.getTotalScore(),
                        icon: 'error',
                        showCancelButton: true,
                        //confirmButtonColor: "green",
                        confirmButtonText: 'Play Again',
                        cancelButtonText: " cancel",
                        closeOnConfirm: false,
                        closeOnCancel: false
                        }).then((result) => {
                        if (result['isConfirmed']){
                            window.location = "http://127.0.0.1:5500/game.html?name="+ localStorage.getItem("name");
                        }
                        else{
                            window.location = "http://127.0.0.1:5500/index.html?name="+ localStorage.getItem("name");
                        }
                        });
                }
                 
            }
        }                        
    },1000);
}



