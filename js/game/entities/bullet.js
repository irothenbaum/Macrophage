/*
    This script contains the user object
*/
define([
    'require',
    'underscore',
    'TwoCylinder',
    'sprites/bullet'
],
function(require,_, TwoCylinder, BulletSprite){
    return TwoCylinder.Engine.Entity.extend({
        initialize : function(options){
            options = _.extend({
                bounding : new TwoCylinder.Engine.BoundingCircle({
                    x : options.x || 0
                    ,y : options.y || 0
                    ,radius : 5
                })
                ,appearance :  new BulletSprite(options)
                ,speed : 30
            }, options);
            this._super('initialize',options);
            
            this._collisionGroup = 'PLAYER_BULLET';
        }
        ,postStep:function(){
            if(!this.getBounding().collides(require('game/game').getWorld().getBounding())){
                require('game/game').getWorld().removeInstance(this);
            }
        }
    });
});
    