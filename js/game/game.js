/*
    This script handles the base configuration of the game
*/
define([
    'underscore',
    'TwoCylinder',
    'entities/enemy',
    'entities/player'
],

function(_, TwoCylinder, Enemy, Player){
    // we return an instance of the game, rather than a function to create them
    var Macrophage = TwoCylinder.Engine.Game.extend({
        initialize : function(){
            _.bindAll(this,'createControls');
            var world = new TwoCylinder.Engine.World({fps:30, width:2000,height:2000});
            var canvas = document.getElementById('world');
            this.viewport = new TwoCylinder.Engine.View({
                canvas : canvas
                ,bounding : new TwoCylinder.Engine.BoundingBox({
                    width : parseInt(window.getComputedStyle(canvas).width)
                    ,height : parseInt(window.getComputedStyle(canvas).height)
                    ,origin_x : 0
                    ,origin_y : 0
                })
            });
            world.addView(this.viewport);
            world.setBackground(new TwoCylinder.Engine.Background({color:'#691E3E'}));
            
            this.setWorld(world);
            
            this.createPlayer();
            this.createControls();
            
            for(var i=0; i<200; i++){
                world.addInstance(
                    new Enemy({
                        x:parseInt(world.getBounding().width*Math.random())
                        ,y:parseInt(world.getBounding().height*Math.random())
                    })
                );
            }
            
            this.viewport.followInstance(this.player);
        }
        ,createPlayer : function(){
            this.player = new Player({x:200,y:100});
            this.getWorld().addInstance(this.player);
        }
        ,createControls : function(){
            var that = this;
            
            // create the Move Stick
            this.joystickMove = new TwoCylinder.IO.Joystick({
                x: 150
                ,y: this.viewport.getBounding().height - 150
                ,view : this.viewport
            });
            
            this.joystickMove.onOperate(function(event){
                that.player.setDirection(event.angle);
                that.player.setSpeed(event.speed/3);
            });
            
            // create the Shoot stick
            this.joystickShoot = new TwoCylinder.IO.Joystick({
                x: this.viewport.getBounding().width - 150
                ,y: this.viewport.getBounding().height - 150
                ,view : this.viewport
            });
            
            this.joystickShoot.onOperate(function(event){
                if(event.speed < 10) {
                    that.player.setShooting(false);
                    return;
                }else if(!that.player.isShooting()){
                    that.player.setShooting(true);
                }
                
                switch(event.getType()){
                    case TwoCylinder.IO.EVENT_TYPES.DOWN:
                        that.player.setShooting(true);
                        break;
                    case TwoCylinder.IO.EVENT_TYPES.UP:
                        that.player.setShooting(false);
                        break;
                    default:
                        that.player.setShootingDirection(event.angle)
                        break;
                }
            });
            
            
            this.viewport.addIO(this.joystickMove);
            this.viewport.addIO(this.joystickShoot);
        }
    });
    
    return new Macrophage();
});
