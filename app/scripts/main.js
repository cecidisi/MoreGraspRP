var app = $.sammy(function(){

    'use strict';

    var numberPanels = $('.input-panel').length,
        currentPanel = 0;

    var $btnStart = $('#btn-start'),
        $btnPrevious =  $('#btn-previous'),
        $btnContinue = $('#btn-continue'),
        $btnSubmit = $('#btn-submit'),
        $progress = $('.progress'),
        $progressSteps = $('.progress-steps-container');

    /***  Create dynamic elements  ***/
    /* checkboxes */
    $('.cbx-toggle').bootstrapToggle({ on: 'Yes', off: 'No' }).change(function(){
        var field = $(this).attr('id'),
            value = $(this).prop('checked') ? 'Yes' : 'No';
        $('p[field="' + field + '"]').text(value);
    }).change();

    /* progress steps */
    var stepWidth = parseFloat(100 / (numberPanels-1));
    for(var i=1; i<=numberPanels-1; ++i) {
        var stepName = $('#panel-' + i).attr('name');
        var $step = $('<div/>', { class: 'progress-step', id: 'progress-step-'+i, style: 'width:'+stepWidth+'%;'}).appendTo($('.progress-steps-container'));
        $('<a/>', { href: '#/register/'+i, class: 'step-label', text: stepName }).appendTo($step);
    }

    /*  Datetimepicker date of injury */
    $('#dtpDateInjury').datetimepicker({
        widgetPositioning: { vertical: 'bottom', horizontal: 'right' },
        viewMode: 'years',
        format: 'MM/YYYY',
        maxDate: '11/01/2015',
        keepOpen: true
    }).on('dp.change', function(e){
        var field = $(this).attr('id'),
            value = e.date.format('MM/YYYY');
        $('p[field="' + field + '"]').text(value);
    });

    /***  Event handlers  ***/

    $('#cbxTermsAccepted').change(function(){
        $('#btn-start').prop('disabled', !$(this).prop('checked'));
    });

    $('#lblTermsAccepted').click(function(){
        $('#cbxTermsAccepted').prop('checked', !$('#cbxTermsAccepted').prop('checked')).change();
    });

    $('#btn-go-to-registration, #btn-start, #btn-previous, #btn-continue').click(function(event){
        if($(this).attr('move')){
            currentPanel = $(this).attr('move') === 'forward' ? currentPanel + 1 : currentPanel - 1;
        }
        window.location.href = '#/register/' + currentPanel;
    });

    /*  input fields*/
    $('input.form-control, select.form-control').change(function(){
        var field = $(this).attr('id'),
            value = $(this).val();
        $('p[field="' + field + '"]').text(value);
    }).change();

    $('#btn-submit').click(function(){
        window.location.href = '#/submission/complete';
    });


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
            var video = "<video width='100%' height='100%' src='http://localhost/MoreGraspRP/server-test/uploads/" + files[0] + "' controls></video>";
            $('.extrahtml').empty().html(video);
        },
        onError: function(files, status, message){
            $('.extrahtml').empty();
        },
        deleteCallback: function(filesToDelete){},
        afterUploadAll: function(){}
    };

    $('#mulitplefileuploader').uploadFile(uploadSettings);



    /************************************************
     * Navigation
     ************************************************/

    var moveToNavPanel = function(navPanelId){
        $('.nav.menu li').removeClass('active');
        $(".nav.menu li[navigateTo='" + navPanelId + "']").addClass('active');
        $('.nav-panel:not('+ navPanelId +')').addClass('fade');
        $(navPanelId).removeClass('fade');
    };

    var moveToFormPanel = function(shift){
        var panelId = '#panel-'+shift;
        // show current panel and hide others
        $('.input-panel:not(' + panelId+ ')').hide();
        $(panelId).slideDown('slow');
        // update progress bar
        var progressValue = ((shift) * 100/(numberPanels-1));
        $('#form-progress-bar').attr('aria-valuenow', progressValue).css('width', progressValue + '%');
        // Update steps' style
        for(var i=1; i<=numberPanels; ++i) {
            if(i <= currentPanel)
                $('#progress-step-'+i).addClass('complete');
            else
                $('#progress-step-'+i).removeClass('complete');
        }
        // enable/disable buttons
        if(shift > 0 && shift < numberPanels-1) {
            $btnStart.hide();
            $btnPrevious.show();
            $btnContinue.show();
            $btnSubmit.hide();
            $progress.css('visibility', 'visible');
            $progressSteps.css('visibility', 'visible');
        }
        else if(shift == 0) {
            $btnStart.show();
            $btnPrevious.hide();
            $btnContinue.hide();
            $btnSubmit.hide();
            $progress.css('visibility', 'hidden');
            $progressSteps.css('visibility', 'hidden');
        }
        else {
            $btnStart.hide();
            $btnPrevious.hide();
            $btnContinue.hide();
            $btnSubmit.show();
            $progress.css('visibility', 'visible');
            $progressSteps.css('visibility', 'visible');
        }
    };

    /************************************************
     * Data submit
     ************************************************/

    var submitData = function(){
        // TODO submit data to server

    };

    /************************************************
     * Routing
     ************************************************/

    this.get('#/', function(context){
        context.redirect('/home');
    });


    this.get('#/:nav', function(context){
        moveToNavPanel('#'+context.params.nav);
    });


    this.get('#/register/:step', function(context){
        moveToNavPanel('#register');
        currentPanel = parseInt(context.params.step);
        moveToFormPanel(currentPanel);
    });


    this.get('#/faq/:question', function(context){
        moveToNavPanel('#faq');
        if(context.params.question != 'back')
            $('.content').scrollTo('#'+context.params.question);
        else
            $('.content').scrollTo('#question-container');

//        if(context.params.question !== 'back')
//            context.app.setLocation('#'+context.params.question);
//        else
//            context.app.setLocation('#question-container');
    });

    console.log(window.langConfig);


    this.get('#/submission/complete', function(context){
        var $bgProcessing = $('<div/>', { class: 'bg-processing' }).appendTo($('body'));
        $('<div/>', { class: 'loading' }).appendTo($bgProcessing);

        var onDataSubmitted = function(){
            $bgProcessing.remove();
            $('.input-panel').hide();
            $('.controls-section').hide();
            $('.input-panel-submitted').show();
        };

        // Replace timeout with actual server call
        setTimeout(onDataSubmitted, 3000);
    });

}).run('#/home');
