(function(){

    'use strict';

    var numberPanels = $('.input-panel').length,
        currentPanel = 1;

    var $btnStart = $('#btn-start'),
        $btnPrevious =  $('#btn-previous'),
        $btnContinue = $('#btn-continue'),
        $btnSubmit = $('#btn-submit'),
        $progress = $('.progress');



    /* navbar */
    $('.nav.menu li').click(function(event){
        $('.nav.menu li').removeClass('active');
        $(this).addClass('active');


        $('.nav-panel:not('+$(this).find('a').attr('href')+')').addClass('fade');
        $($(this).find('a').attr('href')).removeClass('fade');
    });




    function enableButtons() {
        var progressValue = ((currentPanel-1) * 100/(numberPanels-1));
        $progress.find('.progress-bar')
            .attr('aria-valuenow', progressValue)
            .css('width', progressValue + '%');
        if(currentPanel > 1 && currentPanel < numberPanels) {
            $btnStart.hide();
            $btnPrevious.show();
            $btnContinue.show();
            $btnSubmit.hide();
            $progress.css('visibility', 'visible');
        }
        else if(currentPanel == 1) {
            $btnStart.show();
            $btnPrevious.hide();
            $btnContinue.hide();
            $btnSubmit.hide();
            $progress.css('visibility', 'hidden');
        }
        else {
            $btnStart.hide();
            $btnPrevious.show();
            $btnContinue.hide();
            $btnSubmit.show();
            $progress.css('visibility', 'visible');
        }
    }



    $('#btn-start, #btn-previous, #btn-continue').click(function(event){
        $('#panel-' + currentPanel).hide();//slideUp('slow');
        currentPanel = $(this).attr('move') == 'forward' ? currentPanel + 1 : currentPanel - 1;
        $('#panel-' + currentPanel).slideDown('slow');
//        $('#panel-' + currentPanel).fadeIn('slow');
        enableButtons();
    });


    /* checkboxes */

    $('.cbx-toggle').bootstrapToggle(
        { on: 'Yes', off: 'No' }
    );


    /* file uploader */
    var uploadSettings = {
        url: 'http://localhost/MoreGraspRP/server-test/upload.php',
        dragDrop: true,
        dragdropWidth: '100%',
        statusBarWidth: '100%',
        fileName: "myfile",
        uploadStr: 'Select',
        acceptFiles: 'video/*',
        maxFileSize: 1000000000,
        showFileCounter: true,
        showDone: false,
        showDelete: true,
        returnType: "json",
        extraHTML: function(){
            return "<div class='loading'></div>";
        },
        onSuccess: function(files,data,xhr, pd){
            var video = "<video width='120' height='80' src='http://localhost/MoreGraspRP/server-test/uploads/" + files[0] + "'></video>";
            $(pd.statusbar[0]).find('.extrahtml').empty().html(video);
        },
        onError: function(files, status, message){},
        deleteCallback: function(filesToDelete){},
        afterUploadAll: function(){}
    };


    $("#mulitplefileuploader").uploadFile(uploadSettings);

    /*$('#fileupload').fileupload({
        filesContainer: $('table.files')
    });
*/







})();
