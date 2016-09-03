/*
    This script contains the player sprite
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
            this._super('initialize',options);
            
            this.previousInfo = null;
            
            // mesh points are internal verticies that will serve as the framework for drawing
            // these points represent different coordinates and fluctuate between 0 and 1 (absolute)
            // while maintaining sign
            this.meshPoints = [
                {x : 0, y: -1, target: -1},
                {x : 1, y: 0, target: 1},
                {x : 0, y: 1, target: 1},
                {x : -1, y: 0, target: -1}
            ];
            this.ballThing = {x : 0, y : 0, target : {x : 0, y : 0}};
            this.meshScale = 30;
        }
    
        ,draw : function(canvas,x,y,rotation,scale,player){
            var drawingOptions = this.getDrawingOptions(x,y,player);
            if(!this.previousInfo){
                this.previousInfo = drawingOptions;
            }
            
            var context = canvas.getContext('2d');
            
            
            context.beginPath();
            // move to the first mesh point
            context.moveTo(
                x + (this.meshPoints[0].x * this.meshScale),
                y + (this.meshPoints[0].y * this.meshScale)
            );
            
            var center = {x : x, y : y};
            for(var i=0; i<4; i++){
                this._drawCurveToVertex(context, center, this.meshPoints[i], this.meshPoints[(i+1)%4]);
            }
            
            // throw "TEST";
            
            context.fillStyle = 'white';
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = '#ddddaa';
            context.stroke();
            
            for(var i=0; i<4; i++){
                this._randomizPoints(this.meshPoints[i]);
            }
            
            this._moveBallThing();
            context.beginPath();
            context.arc(x + this.ballThing.x, y+ this.ballThing.y, 8, 0, 2 * Math.PI, false);
            context.fillStyle = '#aaf';
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = '#99d';
            context.stroke();
            
            this.previousInfo = drawingOptions;
        }
        ,getDrawingOptions : function(x,y,player){
            return {
                stretchDirection : player.getDirection()
                ,stretchDistance : player.getSpeed() / 5
            }
        }
        ,_moveBallThing : function(){
            if(TwoCylinder.Engine.Geometry.distanceToPoint(this.ballThing, this.ballThing.target) < 1) {
                this.ballThing.target.x = 10 - (Math.random() * 20);
                this.ballThing.target.y = 10 - (Math.random() * 20);
            }
            this.ballThing.x += (this.ballThing.target.x - this.ballThing.x) / 20;
            this.ballThing.y += (this.ballThing.target.y - this.ballThing.y) / 20;
        }
        ,_randomizPoints : function(meshPoint){
            var isX = !!meshPoint.x;
            var value = isX ? meshPoint.x : meshPoint.y;
            
            if( Math.abs(value - meshPoint.target) < 0.01) {
                meshPoint.target = (value < 0 ? -1 : 1)*(0.7 + (Math.random() * 0.3));
            }
            
            value += (meshPoint.target - value)/20;
            
            if(isX) {
                meshPoint.x = value;
            } else {
                meshPoint.y = value;
            }
        }
        ,_drawCurveToVertex : function(context, center, from, to){
            var divConstant = 0.55;
            var anchor1 = {
                    x : from.x - ( from.y ? ( divConstant / from.y ) : 0 )
                    ,y : from.y + ( from.x ? ( divConstant / from.x ) : 0 )
            }
            
            var anchor2 = {
                    x : to.x + ( to.y ? ( divConstant / to.y ) : 0 )
                    ,y : to.y - ( to.x ? ( divConstant / to.x ) : 0 )
            }
            
            context.bezierCurveTo(
                // anchor point 1
                center.x + ( anchor1.x * this.meshScale),
                center.y + ( anchor1.y * this.meshScale),
                // anchor point 2
                center.x + ( anchor2.x * this.meshScale),
                center.y + ( anchor2.y * this.meshScale),
                // to point
                center.x + ( to.x * this.meshScale ),
                center.y + ( to.y * this.meshScale )
            );
        }
    });
});