var DetailView = (function(){

    var _this, root;
    var $userPhoto = $('#user-photo'),
        $userName = $('#user-name'),
        $userPhone = $('#user-phone');


    function DetailView(arguments){
        _this = this;
        var args = $.extend({
            root: ''
        }, arguments);

        root = args.root;
    }

    var _showUser = function(user) {
        $userPhoto.attr('src', 'media/user_' + user.personal.gender + '.png');
        $userName.html(user.personal.firstName + ' ' + user.personal.lastName);
        $userPhone.html('Phone: ' + user.personal.phone);
    };


    var _clear = function(){
        $userPhoto.attr('src', '');
        $userName.html('');
        $userPhone.html('Phone');
    };


    DetailView.prototype = {
        showUser: _showUser,
        clear: _clear
    };

    return DetailView;
})();
