/*
    The generic nodule class, used by cell sprites to render little objects inside their cells
*/
define([
    'underscore',
    'TwoCylinder'
],

function(_, TwoCylinder){
    return function(options) {
        var that = this;
        
        options = _.extend({
            fill : 'rgba(255,255,100,0.5)'
            ,radius : 8
            ,stroke : false
            ,thickness : 0
            ,resistence : 10
            ,wiggle : 10
        },options);
        
        // pull each property of the option varaible to the instance
        _.each(options, function(value, key){
            that['__'+key] = value;
        });
        
        this.__position = {x: 0, y: 0};
        this.__target = {x: 0, y: 0}; 
        
        this.draw = function(canvas,x,y,rotation,scale){
            var context = canvas.getContext('2d');
            
            that.move();
            context.beginPath();
            context.arc(
                x + that.__position.x, 
                y + that.__position.y,
                that.__radius, 
                0, 
                2 * Math.PI, 
                false
            );
            if(that.__fill){
                context.fillStyle = that.__fill;
                context.fill();
            }
            if(that.__stroke){
                context.lineWidth = that.__thickness;
                context.strokeStyle = that.__stroke;
                context.stroke();
            }
        };
        
        this.move = function(){
            if(TwoCylinder.Engine.Geometry.distanceToPoint(that.__position, that.__target) < 1) {
                that.__target.x = (that.__wiggle/2) - (Math.random() * that.__wiggle);
                that.__target.y = (that.__wiggle/2) - (Math.random() * that.__wiggle);
            }
            that.__position.x += (that.__target.x - that.__position.x) / that.__resistence;
            that.__position.y += (that.__target.y - that.__position.y) / that.__resistence;
        };
    }
});