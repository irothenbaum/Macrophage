require.config({
    baseUrl : 'js',
    paths: {
        sprites : 'game/sprites',
        entities : 'game/entities',
        
        underscore : 'underscore-min'
    },
    shim: {
        TwoCylinder : {
            deps : ['underscore']
        }
        ,underscore : {
            exports: '_'
        }
    }
});
