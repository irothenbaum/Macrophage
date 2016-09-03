/*
    This script contains the player sprite
*/
define([
    'TwoCylinder'
],

function(TwoCylinder){
    return TwoCylinder.Engine.Appearance.extend({
        draw : function(canvas,x,y,rotation,scale,entity){
            color = entity._collision ? '#0f0' : '#f00';
            var context = canvas.getContext('2d');
            context.beginPath();
            context.fillStyle = color;
            var container = entity.getBounding();
            context.fillRect(x-(container.width/2),y-(container.height/2),container.width,container.height);
            context.fill();
            context.stroke();
        }
    });
});