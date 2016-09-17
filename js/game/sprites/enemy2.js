/*
    This script contains the enemy entity sprite
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
            this.layers = [
               new CellNodule({fill : 'rgba(255,150,100,0.35)', radius:20, wiggle: 10, resistence: 20}),
               new CellNodule({fill : 'rgba(225,225,100,0.35)', radius:20, wiggle: 10, resistence: 20}),
               new CellNodule({fill : 'rgba(150,255,100,0.35)', radius:20, wiggle: 10, resistence: 20}),
           ];
            
            this.nodules = [
                new CellNodule({fill : '#c33', radius:5, wiggle: 25, resistence: 30}),
                new CellNodule({fill : '#c33', radius:4, wiggle: 25, resistence: 30}),
                new CellNodule({fill : '#c33', radius:3, wiggle: 25, resistence: 30}),
                new CellNodule({fill : '#c33', radius:3, wiggle: 25, resistence: 30})
            ];

            this.wiggleSize = 10;
            this.wiggleSpeed = 20;
            this._super('initialize',options);
        }
        ,draw : function(canvas,x,y,rotation,scale,entity){
            var context = canvas.getContext('2d');
            
            _.each(this.layers,function(elem){
                elem.draw(canvas,x,y,rotation,scale);
            });
            
            _.each(this.nodules,function(elem){
                elem.draw(canvas,x,y,rotation,scale);
            });
            
            context.beginPath();
            context.arc(x, y, 20, 0, 2 * Math.PI, false);
            context.fillStyle = 'rgba(220,220,80,0.35)';
            context.fill();
        }
    });
});