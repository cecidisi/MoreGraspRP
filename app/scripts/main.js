(function(){

    'use strict';

    var numberPanels = $('.input-panel').length,
        currentPanel = 1;



    function enableButtons() {

        $('#btn-previous').css('visibility', 'visible');
        $('#btn-continue').show().css('visibility', 'visible');
        $('#btn-submit').hide();

        if(currentPanel == 1)
            $('#btn-previous').css('visibility', 'hidden');
        else if(currentPanel == numberPanels) {
            $('#btn-continue').css('visibility', 'hidden');
            $('#btn-continue').hide();
            $('#btn-submit').show();
        }
    }



    $('#btn-previous, #btn-continue').click(function(event){
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
            var video = "<video width='120' height='80' src='http://localhost/MoreGraspRP/server-test/uploads/" + files[0] + "' controls></video>";
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
