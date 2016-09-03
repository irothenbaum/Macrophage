/*
    This script contains the project the user shoots
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
                    ,radius : 5
                })
            };
            
            this._super('initialize',options);
        }
        ,draw : function(canvas,x,y,rotation,scale,options){
            var context = canvas.getContext('2d');
            context.beginPath();
            context.arc(x, y, 5, 0, 2 * Math.PI, false);
            context.fillStyle = 'red';
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = '#000033';
            context.stroke();
        }
    });
});