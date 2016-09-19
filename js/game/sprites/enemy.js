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
                    ,radius : 30
                })
            };
            this.length = 14;
            this.width = 20;
            
            this.rotation = 0;
            this.rotateSpeed = 0.0175;
            this.targetRotation = this.rotation;
            
            this._super('initialize',options);
        }
    
        ,draw : function(canvas,x,y,rotation,scale,entity){
            var context = canvas.getContext('2d');
            context.beginPath();
            context.save();

            // step rotation
            this.stepRotation();
            context.translate(x, y);
            context.rotate(this.rotation);
            context.translate(-x, -y);
            
            context.arc(x, y + this.length, this.width, 0, Math.PI, false);
            context.lineTo(x - this.width, y - this.length);
            context.arc(x, y - this.length, this.width, Math.PI, 2*Math.PI, false);
            context.lineTo(x + this.width, y + this.length);
            context.fillStyle = 'rgba(100,100,150, 0.8)';
            context.fill();
            context.lineWidth = 3;
            context.strokeStyle = '#006';
            context.stroke();
            context.restore();
        }
        ,stepRotation : function(){
            var TAU = 2*Math.PI;
            var dif = (this.rotation + TAU - this.targetRotation) % TAU;
            // if we're within 1 degree, we select a new target
            if(Math.abs(dif) < 0.0175 || Math.abs(dif-TAU) < 0.0175){
                this.targetRotation = TAU * Math.random();
            }
            
            dif = (this.rotation + TAU - this.targetRotation) % TAU;
            if(dif < Math.PI){
                this.rotation -= Math.min(dif/30, this.rotateSpeed);
            }else{
                this.rotation += Math.min((TAU - dif) / 30, this.rotateSpeed);
            }
        }
    });
});