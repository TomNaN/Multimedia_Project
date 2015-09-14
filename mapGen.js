function drawMap(map){
  var map = map.replace(/\r/g,"").split('\n'); // FOR SOME REASON text HAD AN ODD \r
  map.forEach(function(e,y){
    e.split('').forEach(function(el,x){
      switch(el){
        case "0": maze[x].push(new Rail(x*spriteWidth,y*spriteHeight));break;
        case "1": maze[x].push(new Wall(x*spriteWidth,y*spriteHeight,1));break;
        case "2": maze[x].push(new Wall(x*spriteWidth,y*spriteHeight,0));break;
        case "3": break;
        case "4":
          entities.push(new Hero(x*spriteWidth,y*spriteHeight));
          hero=entities[entities.length-1];
          maze[x].push(new Rail(x*spriteWidth,y*spriteHeight));
          break;
        case "5":
          entities.push(new Mouse(x*spriteWidth,y*spriteHeight));
          maze[x].push(new Rail(x*spriteWidth,y*spriteHeight));
          break;
        case "6":
          entities.push(new Dog(x*spriteWidth,y*spriteHeight));
          maze[x].push(new Rail(x*spriteWidth,y*spriteHeight));
          break;
        case "7": maze[x].push(new Corner(x*spriteWidth,y*spriteHeight,0));break;
        case "8": maze[x].push(new Corner(x*spriteWidth,y*spriteHeight,1));break;
        case "9": maze[x].push(new Corner(x*spriteWidth,y*spriteHeight,2));break;
        case "a": maze[x].push(new Corner(x*spriteWidth,y*spriteHeight,3));break;
      }
    })
  });
  maze.forEach(function(e){
    e.forEach(function(el){
      el.constructor.name=="Rail"?el.initCollision():null;
    })
  });
}
function generateMap(){
  spawnable = [];
  entities = entities.splice(0,1);
  var mapPointers = [];
  mapArray = Array.apply(null,Array(32)).map(e=>Array.apply(null,Array(24)).map(e=>null));
  //mapArray[0] = Array.apply(null,Array(mapArray[1].length)).map(e=>2);   
  mapArray[0] = maze[maze.length-1].map(function(e,i){
    if(e.constructor.name=="Rail"){
      mapPointers.push({x:1,y:i});
      return 1;
    }
    else{
      return 2;
    }
  });
  maze = Array.apply(null,Array(32)).map(e=>[]);
  mapArray[mapArray.length-1] = Array.apply(null,Array(mapArray[1].length)).map(e=>2);
  for(var i=0;i<mapArray[0].length-1;i++){
    mapArray[i][0] = 2;
    mapArray[i][mapArray[0].length-1] = 2;
  }                                                                                 
  for(var i=0,r=~~(Math.random()*3)+2;i<r;i++){
    var rand = ~~(Math.random()*mapArray[0].length-3)+1;
    mapArray[mapArray.length-1][rand] = 1;
    mapPointers.push({x:mapArray.length-2,y:rand});
  }
  var savedArr = [].concat(mapArray[mapArray.length-1]);  
  mapPointers.push({x:1,y:1});
  while(typeof mapPointers[0]=="object"){
    mapPointers.forEach(function(e){
      mapArray[e.x][e.y] = 1;
      if(e.y==0||e.y==mapArray[e.x].length-1){
        if(e.y==0){
          mapArray[e.x][mapArray[e.x].length-1] = 1;
          mapArray[e.x][mapArray[e.x].length-2] = 1;
          mapPointers.push({x:e.x,y:mapArray[e.x].length-2});
          if(e.x>0){
            mapArray[e.x-1][0] = 2;
            mapArray[e.x-1][mapArray[e.x].length-1] = 2;
          }
          if(e.x<mapArray.length-1){
            mapArray[e.x+1][0] = 2;
            mapArray[e.x+1][mapArray[e.x].length-1] = 2;
          }
        }
        if(e.y==mapArray[e.x].length-1){
          mapArray[e.x][0] = 1;
          mapArray[e.x][1] = 1;
          mapPointers.push({x:e.x,y:1});
          if(e.x>0){
            mapArray[e.x-1][0] = 2;
            mapArray[e.x-1][mapArray[e.x].length-1] = 2;
          }
          if(e.x<mapArray.length-1){
            mapArray[e.x+1][0] = 2;
            mapArray[e.x+1][mapArray[e.x].length-1] = 2;
          }
        }
        mapPointers.splice(mapPointers.indexOf(e),1);
        return;
      }
      var adjacent = [e.x>0?mapArray[e.x-1][e.y]:null,
                      e.x<mapArray.length-1?mapArray[e.x+1][e.y]:null,
                      e.y>0?mapArray[e.x][e.y-1]:null,
                      e.y<mapArray[e.x].length-1?mapArray[e.x][e.y+1]:null];
      var declared = adjacent.reduce(function(a,b){return a+b?1:0});
      var walls = adjacent.reduce(function(a,b){return a+(b==2?1:0);},0); 
      if(declared==4){mapPointers.splice(mapPointers.indexOf(e),1);return;}                
      if(walls>=3){
        if(e.y>1&&mapArray[e.x][e.y-1]==2){
          mapArray[e.x][e.y-1] = 1;
          mapPointers.push({x:e.x,y:e.y-1});
        }
        else if(e.y<mapArray[e.x].length-2&&mapArray[e.x][e.y+1]==2){
          mapArray[e.x][e.y+1] = 1;
          mapPointers.push({x:e.x,y:e.y+1});
        }
        else if(e.x<mapArray.length-2&&mapArray[e.x+1][e.y]==2){
          mapArray[e.x+1][e.y] = 1;
          mapPointers.push({x:e.x+1,y:e.y});
        }
        else if(e.x>1&&mapArray[e.x-1][e.y]==2){
          mapArray[e.x-1][e.y] = 1;
          mapPointers.push({x:e.x-1,y:e.y});
        }
        mapPointers.splice(mapPointers.indexOf(e),1);
      }
      else{
        adjacent = [e.x>0?mapArray[e.x-1][e.y]:null,
                    e.x<mapArray.length-1?mapArray[e.x+1][e.y]:null,
                    e.y>0?mapArray[e.x][e.y-1]:null,
                    e.y<mapArray[e.x].length-1?mapArray[e.x][e.y+1]:null];
        var openings = adjacent.reduce(function(a,b){return a+(b!=null?(b==1?1:0):0)},0);
        var j = 0;
        while(openings<2){
          var random = ~~(Math.random()*4);
          j++;
          switch(random){
            case 0:
              if(e.x>1&&mapArray[e.x-1][e.y]==null){
                mapArray[e.x-1][e.y] = 1;
                openings++;
                mapPointers.push({x:e.x-1,y:e.y});
              }
              break;
            case 1:
              if(e.x<mapArray.length-2&&mapArray[e.x+1][e.y]==null){
                mapArray[e.x+1][e.y] = 1;
                openings++;
                mapPointers.push({x:e.x+1,y:e.y});
              }
              break;
            case 2:
              if(e.y>0&&mapArray[e.x][e.y-1]==null){
                mapArray[e.x][e.y-1] = 1;
                openings++;
                mapPointers.push({x:e.x,y:e.y-1});
              }
              break;
            case 3:
              if(e.y<mapArray[e.x].length-1&&mapArray[e.x][e.y+1]==null){
                mapArray[e.x][e.y+1] = 1;
                openings++;
                mapPointers.push({x:e.x,y:e.y+1});
              }  
              break;
          }
          if(j>15){
            break;          
          }
        }
        if(e.x>1&&mapArray[e.x-1][e.y]==null){
          mapArray[e.x-1][e.y] = !~~(Math.random()*5)?1:2;
          mapArray[e.x-1][e.y]==1?mapPointers.push({x:e.x-1,y:e.y}):null;
        }
        if(e.x<mapArray.length-2&&mapArray[e.x+1][e.y]==null){
          mapArray[e.x+1][e.y] = !~~(Math.random()*5)?1:2;
          mapArray[e.x+1][e.y]==1?mapPointers.push({x:e.x+1,y:e.y}):null;
        }
        if(e.y>0&&mapArray[e.x][e.y-1]==null){
          mapArray[e.x][e.y-1] = !~~(Math.random()*5)?1:2;
          mapArray[e.x][e.y-1]==1?mapPointers.push({x:e.x,y:e.y-1}):null;
        }
        if(e.y<mapArray[e.x].length-1&&mapArray[e.x][e.y+1]==null){
          mapArray[e.x][e.y+1] = !~~(Math.random()*5)?1:2;
          mapArray[e.x][e.y+1]==1?mapPointers.push({x:e.x,y:e.y+1}):null;
        }
        adjacent = [e.x>0?mapArray[e.x-1][e.y]:null,
                    e.x<mapArray.length-1?mapArray[e.x+1][e.y]:null,
                    e.y>0?mapArray[e.x][e.y-1]:null,
                    e.y<mapArray[e.x].length-1?mapArray[e.x][e.y+1]:null];
        openings = adjacent.reduce(function(a,b){return a+(b!=null?(b==1?1:0):0)},0);
        if(openings<3){
          if(e.x>1&&e.y>0&&mapArray[e.x-1][e.y]==1&&mapArray[e.x][e.y-1]==1){
            //mapArray[e.x-1][e.y-1] = 2;
            if(e.x<mapArray.length-1){
              mapArray[e.x+1][e.y] = 1
              mapPointers.push({x:e.x+1,y:e.y});              
            }
            if(mapArray[e.x-1][e.y-1]==null){
              mapArray[e.x-1][e.y-1] = 2;
            }
          }
          if(e.x>1&&e.y<mapArray[e.x].length-1&&mapArray[e.x-1][e.y]==1&&mapArray[e.x][e.y+1]==1){
            //mapArray[e.x-1][e.y+1] = 2;
            if(e.x<mapArray.length-1){
              mapArray[e.x+1][e.y] = 1
              mapPointers.push({x:e.x+1,y:e.y});              
            }
            if(mapArray[e.x-1][e.y+1]==null){
              mapArray[e.x-1][e.y+1] = 2;
            }
          }
          if(e.x>1&&e.y<mapArray[e.x].length-2&&mapArray[e.x-1][e.y]==1&&mapArray[e.x][e.y-1]==1){
            if(e.y>1&&mapArray[e.x-1][e.y-1]==null){
              mapArray[e.x-1][e.y-1] = 2;
            }
            else if(mapArray[e.x-1][e.y+1]==null){
             // mapArray[e.x-1][e.y+1] = 2;
            }
          }
          if(e.x<mapArray.length-2&&e.y<mapArray[e.x].length-2&&mapArray[e.x+1][e.y]==1&&mapArray[e.x][e.y+1]==1){
            if(mapArray[e.x+1][e.y+1]==null){
              mapArray[e.x+1][e.y+1] = 2;
            }
            else if(e.y>1&&mapArray[e.x+1][e.y-1]==null){
              //mapArray[e.x+1][e.y-1] = 2;
            }
          }    
        } 
        mapPointers.splice(mapPointers.indexOf(e),1);
      }
    }); 
   /* for(var x=0;x<mapArray.length;x++){
      for(var y=0;y<mapArray[x].length;y++){
        adjacent = [x>0?mapArray[x-1][y]:null,
                    x<mapArray.length-1?mapArray[x+1][y]:null,
                    y>0?mapArray[x][y-1]:mapArray[x][mapArray[x].length-1],
                    y<mapArray[x].length-1?mapArray[x][y+1]:mapArray[x][0]];
        walls = adjacent.reduce(function(a,b){return a+b==2?1:0;},0);
        if(walls=>3){
          if(y<mapArray[x].length-1&&mapArray[x][y+1]==2){
            mapArray[x][y+1] = 1;
            mapPointers.push({x:x,y:y+1});
          }
          else if(x>0&&mapArray[x-1][y]==2){
            mapArray[x-1][y] = 1;
            mapPointers.push({x:x-1,y:y});
          }
          else if(x<mapArray.length-1&&mapArray[x+1][y]==2){
            mapArray[x+1][y] = 1;
            mapPointers.push({x:x+1,y:y});
          }
        }
      }
    } */
  }
  mapArray[mapArray.length-1] = savedArr;
  mapArray[1][1] = 1;
  mapArray.forEach(function(e,x){
    e.forEach(function(e,y){
      if(e==1){
        maze[x].push(new Rail(x*spriteWidth,y*spriteHeight));
      }
      else{
        maze[x].push(new Wall(x*spriteWidth,y*spriteHeight,1));
      }
    });
  });
  maze.forEach(function(e){
    e.forEach(function(el){
      el.constructor.name=="Rail"?el.initCollision():null;
    });
  });  
  spawner(Mouse);
  spawner(Mouse);
  spawner(Mouse);
}