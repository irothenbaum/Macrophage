/*
    This script contains the user object
*/
define([
    'require',
    'underscore',
    'TwoCylinder',
    'sprites/collision_test'
],

function(require, _, TwoCylinder, CollisionTestSprite){
    return TwoCylinder.Engine.Entity.extend({
        initialize : function(){
            var options = {
                bounding : new TwoCylinder.Engine.BoundingBox({
                    origin_x : 500
                    ,origin_y : 500
                    ,width : 200
                    ,height : 200
                })
            };
            options.appearance = new CollisionTestSprite(options);
            this._super('initialize',options);
            
            this.onCollideGroup('PLAYER', this.setCollidesPlayer);
        }
        ,preStep : function(){
            this._collision = false;
        }
        ,setCollidesPlayer : function(){
            this._collision = true;
        }
    });
});