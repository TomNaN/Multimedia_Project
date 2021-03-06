function addRadioActive(){
  powerUps.radioActive = {
    active:false,
    name:"radioActive",
    sound:audRadioActive,
    description:"Makes mice and dogs run away from you for 5 seconds",
    repelRadius:6*spriteWidth,
    timer:null,
    flag:false,
    duration:450,
    icon: {y:1,x:2,width:powerUpSpriteWidth,height:powerUpSpriteWidth,
      positionX:(0*iconWidth)+iconBlankSpace,positionY:(4*iconHeight)+iconBlankSpace,
      draw:function(){
        this.parent = powerUps.radioActive;
        joyCtx.drawImage(powerUpIcons,this.x*this.width,this.y*this.height,
          this.width,this.height,this.positionX,this.positionY,iconWidth,iconHeight);
        this.drawDurationBar();
      }, 
      drawDurationBar:function(){
        if(this.parent.active){
          /*joyCtx.fillStyle = "#FF0000";
          joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);
          joyCtx.fillStyle = "#00FF00";
          joyCtx.fillRect(this.positionX,
          this.positionY+iconHeight-iconBlankSpace/2,iconWidth*(this.parent.timer.delay/this.parent.duration),iconBlankSpace);*/
          
          joyCtx2.save();
          if(this.parent.flag){
            joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
            //joyCtx2.globalAlpha = 0.3;
            joyCtx2.fillStyle = "#00FF00";
            joyCtx2.beginPath();
            joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2,Math.PI*2,0);
            joyCtx2.closePath();
            joyCtx2.fill();          
            joyCtx2.beginPath();
            joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/3,Math.PI*2,0);
            joyCtx2.closePath();
            joyCtx2.clip();
            joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
            this.parent.flag = false;
          }
          joyCtx2.beginPath();
          joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2+1,1.5*Math.PI,1.5*Math.PI-((2*Math.PI)*(this.parent.timer.delay/this.parent.duration)),false);
          joyCtx2.lineTo(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2));
          joyCtx2.clip();
          joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
          joyCtx2.restore();             
        }
        else{
       /*   joyCtx.fillStyle = "#FF0000";
          joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);  */
        }
      }
    },
    activate:function(){
      this.active = true;
      this.timer = null;
      this.flag = true;
      hero.spriteY = 7;
      this.timer = {duration:this.duration,delay:this.duration,parent:this,callback:function(){
        this.active=false;
        this.timer=null;
        if(powerUps.shield.active){
          hero.spriteY = 10;
        }
        else if(powerUps.catnip.active){
          hero.spriteY = 15;
        }
        else{
          hero.spriteY = 2;
        }
      },args:null,caller:this};
      this.timer.tick = function(){
        this.delay--;
        this.parent.icon.drawDurationBar();        
        if(this.delay>this.duration/2){}
        else if(this.delay>this.duration/4){
          this.delay%30==0?(hero.spriteY==7?hero.spriteY=2:hero.spriteY=7):null;
        }                    
        else if(this.delay>0){
          this.delay%10==0?(hero.spriteY==7?hero.spriteY=2:hero.spriteY=7):null;
        }            
        else{
          this.callback.call(this.caller,this.args);
        }
      }          
    }       
  }
}
function addFreeze(){
  powerUps.freeze = {
    active:false,
    name:"freeze",
    sound:audIce,
    description:"Makes mice and dog solid frozen for 7.5 seconds",
    timer:null,
    flag:false,
    duration:450,
    icon: {y:1,x:1,width:powerUpSpriteWidth,height:powerUpSpriteWidth,
      positionX:(1*iconWidth)+iconBlankSpace*2,positionY:(1*iconHeight)+iconBlankSpace,
      draw:function(){
        this.parent = powerUps.freeze;
        joyCtx.drawImage(powerUpIcons,this.x*this.width,this.y*this.height,
          this.width,this.height,this.positionX,this.positionY,iconWidth,iconHeight);
        this.drawDurationBar();
      }, 
      drawDurationBar:function(){
        if(this.parent.active){
          /*joyCtx.fillStyle = "#FF0000";
          joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);
          joyCtx.fillStyle = "#00FF00";
          joyCtx.fillRect(this.positionX,
          this.positionY+iconHeight-iconBlankSpace/2,iconWidth*(this.parent.timer.delay/this.parent.duration),iconBlankSpace);*/
          
          joyCtx2.save();
          if(this.parent.flag){
            joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
            //joyCtx2.globalAlpha = 0.3;
            joyCtx2.fillStyle = "#00FF00";
            joyCtx2.beginPath();
            joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2,Math.PI*2,0);
            joyCtx2.closePath();
            joyCtx2.fill();
            joyCtx2.beginPath();
            joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/3,Math.PI*2,0);
            joyCtx2.closePath();
            joyCtx2.clip();
            joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
            this.parent.flag = false;
          }
          joyCtx2.beginPath();
          joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2+1,1.5*Math.PI,1.5*Math.PI-((2*Math.PI)*(this.parent.timer.delay/this.parent.duration)),false);
          joyCtx2.lineTo(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2));
          joyCtx2.clip();
          joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
          joyCtx2.restore();             
        }
        else{
       /*   joyCtx.fillStyle = "#FF0000";
          joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);  */
        }
      }
    },
    activate:function(){
      this.active = true;
      this.timer = null;
      this.flag = true;
    //  this.timer = new Timeout(this.duration,function(){this.active=false;this.timer=null;},null,this);
      this.timer = {duration:this.duration,parent:this,delay:this.duration,
        callback:function(){
          this.active=false;
          this.timer=null;
        },args:null,caller:this
      };
      this.timer.tick = function(){
        this.delay--;
        this.parent.icon.drawDurationBar();
        if(this.delay<=0){  
          this.callback.call(this.caller,this.args);
        }
      }
    }
  };
}
function initializePowerUps(){
  powerUps = {
    catnip: {
      active:false,
      name:"catnip",
      sound:audSpeed,
      flag:false,
      description:"Makes you move faster for 15 seconds",
      timer:null,
      duration:900,
      fadeArray:[],
      icon: {y:1,x:0,width:powerUpSpriteWidth,height:powerUpSpriteWidth,
        positionX:(0*iconWidth)+iconBlankSpace,positionY:(0*iconHeight),
        draw:function(){
          this.parent = powerUps.catnip;
          joyCtx.drawImage(powerUpIcons,this.x*this.width,this.y*this.height,
            this.width,this.height,this.positionX,this.positionY,iconWidth,iconHeight);
          this.drawDurationBar();
        }, 
        drawDurationBar:function(){
          if(this.parent.active){
            /*joyCtx.fillStyle = "#FF0000";
            joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);
            joyCtx.fillStyle = "#00FF00";
            joyCtx.fillRect(this.positionX,
            this.positionY+iconHeight-iconBlankSpace/2,iconWidth*(this.parent.timer.delay/this.parent.duration),iconBlankSpace);*/
            
            joyCtx2.save();
            if(this.parent.flag){
              joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
              //joyCtx2.globalAlpha = 0.3;
              joyCtx2.fillStyle = "#00FF00";
              joyCtx2.beginPath();
              joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2,Math.PI*2,0);
              joyCtx2.closePath();
              joyCtx2.fill();
              joyCtx2.beginPath();
              joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/3,Math.PI*2,0);
              joyCtx2.closePath();
              joyCtx2.clip();
              joyCtx2.clearRect(this.positionX,this.positionY,iconWidth+1,iconHeight+1);
              this.parent.flag = false;
            }
            joyCtx2.beginPath();
            joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2+1,1.5*Math.PI,1.5*Math.PI-((2*Math.PI)*(this.parent.timer.delay/this.parent.duration)),false);
            joyCtx2.lineTo(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2));
            joyCtx2.clip();
            joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
            joyCtx2.restore();             
          }
          else{
         /*   joyCtx.fillStyle = "#FF0000";
            joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);  */
          }
        }
      },
      activate:function(){
        this.flag = true;
        this.active = true;
        hero.spriteY = hero.spriteY==2?15:hero.spriteY;
        this.fadeArray = [];
        hero.speed = hero.initialSpeed+1*scaledWidth;
        this.timer = null;
        this.timer = {duration:this.duration,parent:this,delay:this.duration,
          callback:function(){
            this.active=false;
            this.timer=null;
            if(powerUps.shield.active){
              hero.spriteY = 10;
            }
            else if(powerUps.radioActive&&powerUps.radioActive.active){
              hero.spriteY = 7;
            }
            else{
              hero.spriteY=2;
            }
            hero.speed = hero.initialSpeed;
          },args:null,caller:this};
        this.timer.tick = function(){
          this.delay--;
          this.parent.icon.drawDurationBar();
          if(this.delay%4==0){
            effects.push(new FadeOut(0.5,hero.dir,hero.x,hero.y,12));
          }
          if(this.delay<=0){  
            if(timeouts.indexOf(this)>-1){
              timeouts.splice(timeouts.indexOf(this),1);
            }
            this.callback.call(this.caller,this.args);
          }
        }
      }  
    },
    sausage: {
      active:false,
      name:"sausage",
      flag:false,
      sound:audSausage,
      description:"Makes all dogs chase you for 15 seconds",
      timer:null,
      duration:900,
      icon: {y:0,x:2,width:powerUpSpriteWidth,height:powerUpSpriteWidth,
        positionX:(0*iconWidth)+iconBlankSpace,positionY:(1*iconHeight)+iconBlankSpace,
        draw:function(){
          this.parent = powerUps.sausage;
          joyCtx.drawImage(powerUpIcons,this.x*this.width,this.y*this.height,
            this.width,this.height,this.positionX,this.positionY,iconWidth,iconHeight);
          this.drawDurationBar();
        }, 
        drawDurationBar:function(){
          if(this.parent.active){
            /*joyCtx.fillStyle = "#FF0000";
            joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);
            joyCtx.fillStyle = "#00FF00";
            joyCtx.fillRect(this.positionX,
            this.positionY+iconHeight-iconBlankSpace/2,iconWidth*(this.parent.timer.delay/this.parent.duration),iconBlankSpace);*/
            joyCtx2.save();
            if(this.parent.flag){
              joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
              //joyCtx2.globalAlpha = 0.3;
              joyCtx2.fillStyle = "#00FF00";
              joyCtx2.beginPath();
              joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2,Math.PI*2,0);
              joyCtx2.closePath();
              joyCtx2.fill();
              joyCtx2.beginPath();
              joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/3,Math.PI*2,0);
              joyCtx2.closePath();
              joyCtx2.clip();
              joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
              this.parent.flag = false;
            }
            joyCtx2.beginPath();
            joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2+1,1.5*Math.PI,1.5*Math.PI-((2*Math.PI)*(this.parent.timer.delay/this.parent.duration)),false);
            joyCtx2.lineTo(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2));
            joyCtx2.clip();
            joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
            joyCtx2.restore();             
          }
          else{
         /*   joyCtx.fillStyle = "#FF0000";
            joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);  */
          }
        }
      },
      activate:function(){
        this.active = true;
        this.flag = true;
        this.timer = null;
      //  this.timer = new Timeout(this.duration,function(){this.active=false;this.timer=null;},null,this);
        this.timer = {duration:this.duration,parent:this,delay:this.duration,
          callback:function(){
            this.active=false;
            this.timer=null;
          },args:null,caller:this
        };
        this.timer.tick = function(){
          this.delay--;
          this.parent.icon.drawDurationBar();
          if(this.delay<=0){  
            this.callback.call(this.caller,this.args);
          }
        }
      }      
    },
    cheese: {
      active:false,
      name:"cheese",
      flag:false,
      sound:audCheese,
      description:"Makes all mice chase you for 15 seconds",
      timer:null,
      duration:900,
      icon: {y:0,x:3,width:powerUpSpriteWidth,height:powerUpSpriteWidth,
        positionX:(0*iconWidth)+iconBlankSpace,positionY:(2*iconHeight)+iconBlankSpace,
        draw:function(){
          this.parent = powerUps.cheese;
          joyCtx.drawImage(powerUpIcons,this.x*this.width,this.y*this.height,
            this.width,this.height,this.positionX,this.positionY,iconWidth,iconHeight);
          this.drawDurationBar();
        }, 
        drawDurationBar:function(){
          if(this.parent.active){
            /*joyCtx.fillStyle = "#FF0000";
            joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);
            joyCtx.fillStyle = "#00FF00";
            joyCtx.fillRect(this.positionX,
            this.positionY+iconHeight-iconBlankSpace/2,iconWidth*(this.parent.timer.delay/this.parent.duration),iconBlankSpace);*/
            joyCtx2.save();
            if(this.parent.flag){
              joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
              //joyCtx2.globalAlpha = 0.3;
              joyCtx2.fillStyle = "#00FF00";
              joyCtx2.beginPath();
              joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2,Math.PI*2,0);
              joyCtx2.closePath();
              joyCtx2.fill();
              joyCtx2.beginPath();
              joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/3,Math.PI*2,0);
              joyCtx2.closePath();
              joyCtx2.clip();
              joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
              this.parent.flag = false;
            }
            joyCtx2.beginPath();
            joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2+1,1.5*Math.PI,1.5*Math.PI-((2*Math.PI)*(this.parent.timer.delay/this.parent.duration)),false);
            joyCtx2.lineTo(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2));
            joyCtx2.clip();
            joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
            joyCtx2.restore();             
          }
          else{
         /*   joyCtx.fillStyle = "#FF0000";
            joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);  */
          }
        }
      },
      activate:function(){
        this.active = true;
        this.timer = null;
        this.flag = true;
//          this.timer = new Timeout(this.duration,function(){this.active=false;this.timer=null;},null,this);
        this.timer = {duration:this.duration,parent:this,delay:this.duration,
          callback:function(){
            this.active=false;
            this.timer=null;
          },args:null,caller:this
        };
        this.timer.tick = function(){
          this.delay--;
          this.parent.icon.drawDurationBar();
          if(this.delay<=0){  
            this.callback.call(this.caller,this.args);
          }
        }
      } 
    },
    shield: {
      active:false,
      name:"shield",
      flag:false,
      sound:audShield,
      description:"Makes you immune to dogs for 15 seconds",
      timer:null,
      duration:450,
      icon: {y:0,x:1,width:powerUpSpriteWidth,height:powerUpSpriteWidth,
        positionX:(0*iconWidth)+iconBlankSpace,positionY:(3*iconHeight)+iconBlankSpace,
        draw:function(){
          this.parent = powerUps.shield;
          joyCtx.drawImage(powerUpIcons,this.x*this.width,this.y*this.height,
            this.width,this.height,this.positionX,this.positionY,iconWidth,iconHeight);
          this.drawDurationBar();
        }, 
        drawDurationBar:function(){
          if(this.parent.active){
            /*joyCtx.fillStyle = "#FF0000";
            joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);
            joyCtx.fillStyle = "#00FF00";
            joyCtx.fillRect(this.positionX,
            this.positionY+iconHeight-iconBlankSpace/2,iconWidth*(this.parent.timer.delay/this.parent.duration),iconBlankSpace);*/
            
            joyCtx2.save();
            if(this.parent.flag){
              joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
              //joyCtx2.globalAlpha = 0.3;
              joyCtx2.fillStyle = "#00FF00";
              joyCtx2.beginPath();
              joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2,Math.PI*2,0);
              joyCtx2.closePath();
              joyCtx2.fill();
              joyCtx2.beginPath();
              joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/3,Math.PI*2,0);
              joyCtx2.closePath();
              joyCtx2.clip();
              joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
              this.parent.flag = false;
            }
            joyCtx2.beginPath();
            joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2+1,1.5*Math.PI,1.5*Math.PI-((2*Math.PI)*(this.parent.timer.delay/this.parent.duration)),false);
            joyCtx2.lineTo(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2));
            joyCtx2.clip();
            joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
            joyCtx2.restore();             
          }
          else{
         /*   joyCtx.fillStyle = "#FF0000";
            joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);  */
          }
        }
      },
      activate:function(){
        this.active = true;
        hero.spriteY = 10;
        this.flag = true;
        this.timer = null;           
        this.timer = {duration:this.duration,parent:this,delay:this.duration,
          callback:function(){
            this.active=false;
            this.timer=null;
            if(powerUps.catnip.active){
              hero.spriteY = 15;
            }
            else if(powerUps.radioActive&&powerUps.radioActive.active){
              hero.spriteY = 7;
            }
            else{
              hero.spriteY=2;
            }
          },args:null,caller:this};
        this.timer.tick = function(){
          this.delay--;  
          this.parent.icon.drawDurationBar();      
          if(this.delay>this.duration/3){}
          else if(this.delay>this.duration/9){
            this.delay%30==0?(hero.spriteY==10?hero.spriteY=2:hero.spriteY=10):null;
          }                    
          else if(this.delay>0){
            this.delay%10==0?(hero.spriteY==10?hero.spriteY=2:hero.spriteY=10):null;
          }            
          else{
            this.callback.call(this.caller,this.args);
          }
        }
      }       
    },
    blindness: {
      active:false,
      name:"blindness",
      flag:false,
      sound:audBlind,
      description:"Makes all trees invisible for 7.5 seconds",
      timer:null,
      duration:450,
      icon: {y:1,x:3,width:powerUpSpriteWidth,height:powerUpSpriteWidth,
        positionX:(1*iconWidth)+iconBlankSpace*2,positionY:(0*iconHeight),
        draw:function(){
          this.parent = powerUps.blindness;
          joyCtx.drawImage(powerUpIcons,this.x*this.width,this.y*this.height,
            this.width,this.height,this.positionX,this.positionY,iconWidth,iconHeight);
          this.drawDurationBar();
        }, 
        drawDurationBar:function(){
          if(this.parent.active){
            /*joyCtx.fillStyle = "#FF0000";
            joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);
            joyCtx.fillStyle = "#00FF00";
            joyCtx.fillRect(this.positionX,
            this.positionY+iconHeight-iconBlankSpace/2,iconWidth*(this.parent.timer.delay/this.parent.duration),iconBlankSpace);*/
            joyCtx2.save();
            if(this.parent.flag){
              joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
              //joyCtx2.globalAlpha = 0.3;
              joyCtx2.fillStyle = "#00FF00";
              joyCtx2.beginPath();
              joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2,Math.PI*2,0);
              joyCtx2.closePath();
              joyCtx2.fill();
              joyCtx2.beginPath();
              joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/3,Math.PI*2,0);
              joyCtx2.closePath();
              joyCtx2.clip();
              joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
              this.parent.flag = false;
            }
            joyCtx2.beginPath();
            joyCtx2.arc(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2),iconWidth/2+1,1.5*Math.PI,1.5*Math.PI-((2*Math.PI)*(this.parent.timer.delay/this.parent.duration)),false);
            joyCtx2.lineTo(this.positionX+(iconWidth/2),this.positionY+(iconHeight/2));
            joyCtx2.clip();
            joyCtx2.clearRect(this.positionX,this.positionY,iconWidth,iconHeight);
            joyCtx2.restore();             
          }
          else{
         /*   joyCtx.fillStyle = "#FF0000";
            joyCtx.fillRect(this.positionX,this.positionY+iconHeight-iconBlankSpace/2,iconWidth,iconBlankSpace);  */
          }
        }
      },
      activate:function(){
        this.active = true;
        this.flag = true;
        this.timer = null;
      //  this.timer = new Timeout(this.duration,function(){this.active=false;this.timer=null;},null,this);
        this.timer = {duration:this.duration,parent:this,delay:this.duration,
          callback:function(){
            this.active=false;
            this.timer=null;
          },args:null,caller:this
        };
        this.timer.tick = function(){
          this.delay--;
          this.parent.icon.drawDurationBar();
          if(this.delay<=0){  
            this.callback.call(this.caller,this.args);
          }
        }
      }      
    }
  };
}
function handlePowerUp(powerUp){
  powerUps[powerUp].activate();
  powerUps[powerUp].sound.currentTime==0?powerUps[powerUp].sound.play():powerUps[powerUp].sound.currentTime=0,powerUps[powerUp].sound.play();
  effects.push(new FlashImage(30,powerUps[powerUp].icon.x,powerUps[powerUp].icon.y));
  achievements.increasePowerUps();
}

function drawIcons(){
  var keys = Object.keys(powerUps);
  var iconsPerRow = 5;
  var iconWidth = spriteWidth*3;
  var iconHeight = spriteHeight*3;
  var iconBlankSpace = 10*scaledWidth;
  keys.forEach(function(e,i){
    e = powerUps[e];         
 /*   joyCtx.drawImage(spriteSheet, e.icon.x*spriteScreenWidth, e.icon.y*spriteScreenHeight,
      spriteScreenWidth, spriteScreenHeight, i<iconsPerRow?iconBlankSpace:(iconWidth+iconBlankSpace)+(iconBlankSpace),
      i<iconsPerRow?i*(iconWidth+iconBlankSpace):(i-iconsPerRow)*(iconWidth+iconBlankSpace) ,iconWidth, iconHeight);
    joyCtx.fillStyle = "#FF0000";
    joyCtx.fillRect(i<iconsPerRow?iconBlankSpace:(iconWidth+iconBlankSpace)+(iconBlankSpace),
      (i<iconsPerRow?i*(iconWidth+iconBlankSpace):(i-iconsPerRow)*(iconWidth+iconBlankSpace))+iconHeight,
      iconWidth,10*scaledWidth);*/
    e.icon.draw();
  }); 
}

function FadeOut(opacity,dir,x,y,duration){
  this.opacity = opacity;
  this.dir = dir;
  this.x = x;
  this.y = y;
  this.duration = duration;
  this.tick = function(){
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(spriteSheet, this.dir*spriteScreenWidth, hero.spriteY*spriteScreenHeight, spriteScreenWidth, spriteScreenHeight, this.x, this.y, spriteWidth, spriteHeight);              
    ctx.restore();
    this.opacity-=0.02;
    this.duration--;
    if(this.duration<=0){
      effects.splice(effects.indexOf(this),1);   
    }  
  }
}

function FlashImage(duration,spriteX,spriteY){
  this.duration = duration;
  this.spriteX = spriteX;
  this.spriteY = spriteY;
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.width = spriteWidth;
  this.height = spriteHeight; 
  this.drawImage = function(){
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.drawImage(powerUpIcons, this.spriteX*powerUpSpriteWidth, this.spriteY*powerUpSpriteHeight, powerUpSpriteWidth, powerUpSpriteHeight, this.x, this.y, this.width, this.height);
    ctx.restore();
  }
  this.tick = function(){
    this.duration--;
    this.drawImage();
    this.x -= 8*scaledWidth;
    this.y -= 8*scaledWidth;
    this.width += 16*scaledWidth;
    this.height += 16*scaledWidth;
    if(this.duration<=0){
      effects.splice(effects.indexOf(this),1);
    }   
  }
}