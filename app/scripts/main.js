(function(){

var $inputPanels = $('.input-panel');









    $inputPanels.each(function(i, panel){

        $(panel).find('.continue').click(function(){
            $(panel).slideUp('slow');
            var nextPanel = $(this).attr('to');
            console.log(nextPanel);
            $('#'+nextPanel).slideDown('slow');
        });


    });


})();
