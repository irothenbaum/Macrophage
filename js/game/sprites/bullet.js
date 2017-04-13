/*
    This script contains the project the user shoots
*/
define([
    'TwoCylinder'
],

function(TwoCylinder){
    return TwoCylinder.Engine.Appearance.extend({
        initialize : function(){
            this.width = 8;
            options = {
                bounding : new TwoCylinder.Engine.BoundingCircle({
                    x : 0
                    ,y : 0
                    ,radius : this.width
                })
            };
            this.rotation = false;
            this._super('initialize',options);
        }
        ,draw : function(canvas,x,y,rotation,scale,player){
            var context = canvas.getContext('2d');
            var offset = 0.1*Math.PI;
            
            if(this.rotation === false) {
                this.rotation = player.getDirection() - Math.PI / 2;
            }
            
            context.beginPath();
            
            context.save();
            context.translate(x, y);
            context.rotate(this.rotation);
            context.translate(-x, -y);
            
            context.arc(x, y, this.width, 0 - offset, Math.PI + (2*offset), false);
            
            var tailPoint = {
                x : x, 
                y : y - (this.width*6)
            };
            context.lineTo(tailPoint.x, tailPoint.y);
            var endCurvePoint = TwoCylinder.Engine.Geometry.pointFromAngle(
                {x:x,y:y},
                -offset, 
                this.width
            );
            context.lineTo(endCurvePoint.x, endCurvePoint.y);
            context.fillStyle = 'rgba(255,200,0,0.5)';
            context.fill();
            
            context.restore();
            
            var orb = context.createRadialGradient(x,y,0,x,y,this.width*1.5);
            orb.addColorStop(0,'rgba(255,255,255,1');
            orb.addColorStop(1,'rgba(255,200,0,0');
            context.arc(x, y, this.width * 1.5, 0, Math.PI * 2, false);
            context.fillStyle = orb;
            context.fill();
        }
    });
});