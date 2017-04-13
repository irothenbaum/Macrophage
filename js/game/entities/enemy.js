/*
    This script contains the user object
*/
define([
    'require',
    'underscore',
    'TwoCylinder',
    'sprites/enemy',
    'sprites/enemy2'
],

function(require,_, TwoCylinder, EnemySprite, EnemySprite2){
    return TwoCylinder.Engine.Entity.extend({
        initialize : function(options){
            var random = parseInt(Math.random()*2);
            options = _.extend({
                bounding : new TwoCylinder.Engine.BoundingCircle({
                    x : options.x || 0
                    ,y : options.y || 0
                    ,radius : 20
                })
                ,appearance :  random ? new EnemySprite(options) : new EnemySprite2(options)
            }
            ,options);
            this._super('initialize',options);
            
            this._maxSpeed = 3;
            
            this.setSpeed(0);
            
            this.__targetSpot = this.getPosition();
            
            this.onCollideGroup('PLAYER_BULLET', this.die);
            
            // this.onCollideGroup('ENEMY', this.bounce);
            
            this._collisionGroup = 'ENEMY';
        }
        ,preStep : function(){
            if(this.getSpeed() < this._maxSpeed){
                this.setSpeed(this.getSpeed() + ((this._maxSpeed - this.getSpeed())/20));
            }
            // Step 1 are we too close to the player
            var playerPosition = require('game/game').player.getPosition();
            var playerDistance = TwoCylinder.Engine.Geometry.distanceToPoint(this.getPosition(),playerPosition);
            if(playerDistance < 300){
                this.rotateTowards(TwoCylinder.Engine.Geometry.angleToPoint(playerPosition, this.getPosition()));
            }else{
                // Step 2, have we reached our point yet?
                if(TwoCylinder.Engine.Geometry.distanceToPoint(this.getPosition(),this.__targetSpot) < 10){
                    this.__targetSpot = null;
                }
                if(!this.__targetSpot){
                    var worldBox = require('game/game').getWorld().getBounding().getContainingRectangle();
                    this.__targetSpot = {
                        x : parseInt(Math.random() * worldBox.width)
                        ,y : parseInt(Math.random() * worldBox.height)
                    };
                }
                this.rotateTowards(TwoCylinder.Engine.Geometry.angleToPoint(this.getPosition(), this.__targetSpot));
            }
        }
        ,die : function(other){
            var world = require('game/game').getWorld();
            world.removeInstance(this);
            world.removeInstance(other);
            console.log("DEAD");
        }
        ,bounce : function(other){
            this.setDirection(
                TwoCylinder.Engine.Geometry.angleToPoint(
                    other.getBounding().getCenter(), 
                    this.getBounding().getCenter()
                )
            );
            this.setSpeed(this.getSpeed() / 2);
        }
    });
});