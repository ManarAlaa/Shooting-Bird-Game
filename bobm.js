class Objecttt{
 
     constructor(src)
     {
         if (new.target.img === 'Objectt') {
             throw new Error("This class cannot be instantiated directly.") }
 
         let createimg=document.createElement("img");
             createimg.src=src;
             createimg.style.position="absolute";
             createimg.style.height="100px";
             createimg.style.width="100px";   
             this.image=createimg;       
      }
 
 }
 
 class Bomb extends Objecttt{
     constructor(src,speed=20)
     {
         super(src);
         document.body.append(this.image);
         this.image.style.top=0 +"px";
         this.image.style.left=this.randomLeft()+"px";
         this.speed=speed;
 
      
     }
     moving_down(speed)
     {
         let top=3;
         let id=setInterval(()=>
         {
            top+=speed;
             
              if(top<innerHeight-this.image.height)
              {
                 this.image.style.top=top+"px";
                 
              }
              else
             {
                 this.image.remove();
                 clearInterval(id);                   
             }       
         },160);
 
     }//moveRight
 
     randomLeft()
     {
         let randLeft=0;
         randLeft= Math.ceil(Math.random()*(window.innerWidth-this.image.width));
         return randLeft;
         
     }   
     
     Explosion()
     {
        this.image.onclick = ()=>{ 

            var audio = document.querySelector('#myAudio');
            if(audio.currentTime >0.4)
            {
                audio.currentTime=0;
            } 
            audio.play();

            this.image.src='images/exp2.gif';
           

            let remove=0;
            let id2=setInterval(()=>
             {  if(remove==0) {}
                else
                {
                    this.image.remove();
                    clearInterval(id2);
                }     
             remove=1;  
             },180);
          
        

           //  let killedBird=document.querySelectorAll("img.birds");
             let bombWidth=parseInt(this.image.style.width) ;
             let bombHeight=parseInt(this.image.style.height);
             let bombTop=parseInt(this.image.style.top);
             let bombleft=parseInt(this.image.style.left);
             let score=0;
             let birdTop=0;
             let birdHeight=0;
             let birdWidth =0;
             let birdLeft=0;
             for(let i=0; i<document.querySelectorAll("img.birds").length ; i++)
             {
                 birdTop=parseInt(document.querySelectorAll("img.birds")[i].style.top);
                 birdHeight=parseInt(document.querySelectorAll("img.birds")[i].style.height);
                 birdWidth=parseInt(document.querySelectorAll("img.birds")[i].style.width) ;
                 birdLeft=parseInt(document.querySelectorAll("img.birds")[i].style.left);

                 if((bombleft + bombWidth) >= birdLeft && bombleft <= ( birdLeft + birdWidth ) && ( bombTop + bombHeight ) >= birdTop && bombTop <= ( birdTop +birdHeight ))
                {
                  
                    Objectt.setcount(1);
                   
                    if(document.querySelectorAll("img.birds")[i].classList[1]=='white' )
                        {score=5;}
                    else if(document.querySelectorAll("img.birds")[i].classList[1]=='black' )
                        {score=10;}
                    else if(document.querySelectorAll("img.birds")[i].classList[1]=='cyan')
                        {score=-10;}

                        Objectt.setTotalScore(score);
                        
                    let birdKilled = document.querySelector("#BirdKill");
                    let TotalScore=document.querySelector("#score");    

                    birdKilled.innerText = 'Birds Killed :'+Number(Objectt.getcount()) ;
                    TotalScore.innerText = 'Score : '+Number(Objectt.getTotalScore())  ;

                   document.querySelectorAll("img.birds")[i].remove();

                }


              // ( bombleft + bombWidth) >= birdLeft && bombleft <= ( birdLeft + birdWidth ) && ( bombTop + bombHeight ) >= birdTop && bombTop <= ( birdTop +birdHeight )
                // (birdTop > (bombTop-birdHeight-35) && birdTop < (bombTop + bombHeight +birdHeight +35) &&  birdLeft < ( bombleft + bombWidth  + birdWidth +35) &&  birdLeft > ( bombleft - birdWidth -35))
            }



        };
     }
}
function createBombs(){
    let id=setInterval(()=>
    {
        let bomb=0;
        bomb=new Bomb('images/bomb1.png');
        bomb.moving_down(6); 
        bomb.Explosion();
        
    },9000);
}


