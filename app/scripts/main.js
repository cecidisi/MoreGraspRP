(function(){

var $inputPanels = $('.input-panel');









    $inputPanels.each(function(i, panel){

        var goTo = function(){
            $(panel).slideUp('slow');
            var nextPanel = $(this).attr('to');
            $('#'+nextPanel).slideDown('slow');

//            $(panel).toggle('slide', {direction: 'left'});
//            var nextPanel = $(this).attr('to');
//            $('#'+nextPanel).toggle('slide', {direction: 'right'});

        };
        $(panel).find('.continue').click(goTo);
        $(panel).find('.previous').click(goTo);
    });


    $('.cbx-toggle').bootstrapToggle(
        { on: 'Yes', off: 'No' }
    );


})();
