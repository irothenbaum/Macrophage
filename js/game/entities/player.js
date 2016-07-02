/*
    This script contains the user object
*/
define([
    'require',
    'underscore',
    'TwoCylinder',
    'sprites/player',
    'entities/bullet'
],

function(requrie,_,TwoCylinder, PlayerSprite, Bullet){
    return TwoCylinder.Engine.Entity.extend({
        initialize : function(options){
            options = _.extend({
                bounding : new TwoCylinder.Engine.BoundingCircle({
                    x : options.x || 0
                    ,y : options.y || 0
                    ,radius : 20
                })
                ,appearance :  new PlayerSprite(options)
            }
            ,options);
            this._super('initialize',options);
            
            this.__shooterDelay = 100;
            this.__canShoot = true;
            this.__isShooting = false;
            this.__shootingDirection = 0;
            this.__shooterTimeOut = null;
        }
        ,setShooting : function(status){
            this.__isShooting = status;
        }
        ,isShooting : function(){
            return this.__isShooting;
        }
        ,setShootingDirection : function(angle){
            this.__shootingDirection = angle;
        }
        ,step : function(clock){
            this._super('step',clock);
            if(this.__isShooting){
                this.shoot();
            }
        }
        ,shoot : function(){
            if(this.__canShoot){
                this.__canShoot = false;
                require('game/game').getWorld().addInstance(new Bullet({
                    x : this.getBounding().x
                    ,y : this.getBounding().y
                    ,direction : this.__shootingDirection
                }));
                
                var that = this;
                this.__shooterTimeOut = setTimeout(function(){
                    that.__canShoot = true;
                }, this.__shooterDelay);
            }
        }
    });
});