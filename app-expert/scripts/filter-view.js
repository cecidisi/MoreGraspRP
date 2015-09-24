var FilterView = (function(){

    var _this, root, callbacks,
        $root = $('');

    var customScrollOptions = {
        axis: 'y',
        theme: 'light',
        scrollbarPosition: 'outside',
        autoHideScrollbar: true,
        scrollEasing: 'linear',
        scrollInertia: 0,
        mouseWheel: {
            enable: true,
            axis: 'y'
        },
        keyboard: {
            enable: true
        },
        advanced: {
            updateOnContentResize: true
        }
    };

    function init() {
        $root.mCustomScrollbar(customScrollOptions);
    }


    function FilterView(arguments){
        _this = this;
        var args = $.extend(true, {
            root: '',
            callbacks: {}
        }, arguments);
        root = args.root;
        callbacks = args.callbacks;
        $root = $(root);
        init();
    }


    FilterView.prototype = {

    };

    return FilterView;

})();
