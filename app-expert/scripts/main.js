(function(){

    'use strict';

    console.log('entra');


    $('.slider-double').slider({
        range:true,
        animate: true,
        min: 1940,
        max: 2000,
        step: 2,
        values: [1950, 1980]
    });

    /* checkboxes */
    $('.cbx-toggle').bootstrapToggle(
        { on: 'Yes', off: 'No' }
    );




})();
