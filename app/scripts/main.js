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

    console.log($('#fileupload'));
    $('#fileupload').fileupload({
        filesContainer: $('table.files')
    });



/*    $('#fileupload').fileupload({
        url: '../server/php/',
        filesContainer: $('table.files'),
        uploadTemplateId: null,
        uploadTemplate: function (o) {
            var rows = $();
            $.each(o.files, function (index, file) {
                var row = $('<tr class="template-upload fade">' +
                            '<td><span class="preview"></span></td>' +
                            '<td><p class="name"></p>' +
                            '<div class="error"></div>' +
                            '</td>' +
                            '<td><p class="size"></p>' +
                            '<div class="progress"></div>' +
                            '</td>' +
                            '<td>' +
                            (!index && !o.options.autoUpload ?
                             '<button class="start" disabled>Start</button>' : '') +
                            (!index ? '<button class="cancel">Cancel</button>' : '') +
                            '</td>' +
                            '</tr>');
                row.find('.name').text(file.name);
                row.find('.size').text(o.formatFileSize(file.size));
                if (file.error) {
                    row.find('.error').text(file.error);
                }
                rows = rows.add(row);
            });
            return rows;
        }
    });*/

    // Enable iframe cross-domain access via redirect option:
/*    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );*/

    /* checkboxes */

    $('.cbx-toggle').bootstrapToggle(
        { on: 'Yes', off: 'No' }
    );


})();
