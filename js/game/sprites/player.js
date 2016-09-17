/*
    This script contains the player sprite
*/
define([
    'TwoCylinder',
    'sprites/assets/cell_nodule'
],

function(TwoCylinder, CellNodule){
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
            this.meshScale = 30;
            
            this.nucleus = new CellNodule({
                fill : '#aaf',
                stroke : '#66d',
                thickness : 4,
                radius : 8,
                wiggle : 20,
                resistence : 20
            });
        }
        ,draw : function(canvas,x,y,rotation,scale,player){
            var context = canvas.getContext('2d');
            
            this.nucleus.draw(canvas,x,y,rotation,scale);
            
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
            
            context.fillStyle = "rgba(255,255,255,0.5)";
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = 'white';
            context.stroke();
            
            for(var i=0; i<4; i++){
                this._randomizPoints(this.meshPoints[i]);
            }
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