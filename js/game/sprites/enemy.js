/*
    This script contains the enemy entity sprite
*/
define([
    'TwoCylinder'
],

function(TwoCylinder){
    return TwoCylinder.Engine.Appearance.extend({
        initialize : function(){
            options = {
                bounding : new TwoCylinder.Engine.BoundingCircle({
                    x : 0
                    ,y : 0
                    ,radius : 20
                })
            };
            this.length = 20;
            
            this._super('initialize',options);
        }
    
        ,draw : function(canvas,x,y,rotation,scale,entity){
            var context = canvas.getContext('2d');
            context.beginPath();
            context.arc(x, y + this.length, this.length, 0, Math.PI, false);
            context.lineTo(x - this.length, y - this.length);
            context.arc(x, y - this.length, this.length, 0, Math.PI, false);
            context.lineTo(x + this.length, y + this.length);
            context.fillStyle = 'orange';
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = '#000033';
            context.stroke();
            
            
        }
    });
});