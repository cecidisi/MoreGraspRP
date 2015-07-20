(function(){

    'use strict';


    /* input panels */
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

    /* file uploades */

    var uploadSettings = {
        url: "",
        dragDrop: true,
        fileName: "myfile",
        allowedTypes: ['avi', 'mkv', 'asf', 'mp4', 'm4p', 'mpg', 'mpeg'],
        returnType: "json",
        showDone: false,
        showDelete: true,
        showFileCounter: false,
        onSuccess: function(files,data,xhr){},
        onError: function(files, status, message){},
        deleteCallback: function(filesToDelete){},
        afterUploadAll: function(){}
    };

    $('#fileupload').fileupload({
        url: 'http://localhost:8888'
    });

    /* checkboxes */

    $('.cbx-toggle').bootstrapToggle(
        { on: 'Yes', off: 'No' }
    );


})();
