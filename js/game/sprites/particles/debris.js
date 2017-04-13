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
            ,speed : 10
            ,direction : 0
            ,friction : 10
            ,lifetime : 1000
        },options);
        
        // pull each property of the option variable to the instance
        _.each(options, function(value, key){
            that['__'+key] = value;
        });
        
        this.__position = {x: 0, y: 0};
        
        this.draw = function(canvas,x,y,rotation,scale){
            var context = canvas.getContext('2d');
            
            // first we move the particle if needed
            if (this.__speed) {
                this.__position = TwoCylinder.Engine.Geometry.pointFromAngle(
                        this.__position, 
                        this.__direction, 
                        this.__speed
                );
            }
            
            context.beginPath();
            
            context.arc(
                    x + this.__position.x,
                    y + this.__position.y,
                    that.__radius, 
                    0, 
                    Math.PI * (Math.random() + 1), 
                    false
                );
            
            if(that.__fill){
                context.fillStyle = that.__fill;
                context.fill();
            }
        };
        
        this.getLifetime = function(){
            return this.__lifetime;
        }
        
        // start to fade
        setTimeout(function(){
            
        },this.__lifetime/2);
    }
});