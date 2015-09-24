(function(){

    var _this = this;
    this.data = [];

    //  Datetime Pickers
    $('#datetimepickerFrom').datetimepicker({
        widgetPositioning: { vertical: 'bottom', horizontal: 'right' },
        viewMode: 'years',
        format: 'MM/YYYY',
        keepOpen: true
    }).on('dp.change', function(e){
        $('#datetimepickerUntil').data('DateTimePicker').minDate(e.date);
    });

    $('#datetimepickerUntil').datetimepicker({
        widgetPositioning: { vertical: 'bottom', horizontal: 'right' },
        viewMode: 'years',
        format: 'MM/YYYY',
        keepOpen: true,
        useCurrent: false
    }).on('dp.change', function(e){
        $('#datetimepickerFrom').data('DateTimePicker').maxDate(e.date);
    });

    //  Clickable Panel header for accordion effect
    $('.panel-heading span.clickable').on('click', function () {
        if ($(this).hasClass('panel-collapsed')) {
            // expand the panel
            $(this).parents('.panel').find('.panel-body').slideDown();
            $(this).removeClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
        else {
            // collapse the panel
            $(this).parents('.panel').find('.panel-body').slideUp();
            $(this).addClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        }
    });

    //  Sliders
    $('.slider-double').slider({
        range:true,
        animate: true,
        min: 1940,
        max: 2000,
        step: 2,
        values: [1950, 1980]
    });

    /**********************************************************************************************/
    var overview, filterView, detailView;
    var callbacks = {
        filters: {},
        overview: {
            onUserGlyphClick: function(user, index){
                detailView.showUser(user);
            }
        },
        details: {}
    };

    overview = new Overview({ root: '#panel-overview .panel-body', callbacks: callbacks.overview });
    detailView = new DetailView({ callbacks: callbacks.details });
    filterView = new FilterView({ root: '#filters-container' , callbacks: callbacks.filters });


    setTimeout(function(){

        $.getJSON('data/test.json', function(data){
            _this.data = data;
            overview.load(_this.data);
        });
    }, 1);


})();
