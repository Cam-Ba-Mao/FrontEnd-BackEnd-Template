(function ($) {
    var isProcess = false;

    function handleLogin() {
        $('#iedg-form-login').on('submit', function (event) {
            event.preventDefault();

            if( isProcess ) return;

            var form = $(this);
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var message = '';
            var email = form.find('input[name="email"]');
            var password = form.find('input[name="password"]');
            form.find('.invalid-message').remove();
           
        
            if (email.val() == "") {
                message = email.closest(".signup-form__group").attr('data-message-error');
                email.closest(".signup-form__group").append('<div class="invalid-message">' + message + '</div>');
                return false;
            } else if (!regex.test(email.val())) {
                message = email.closest(".signup-form__group").attr('data-message-validate');
                email.closest(".signup-form__group").append('<div class="invalid-message">' + message + '</div>');
                return false;
            }
      
            if (password.val() == "") {
                message = password.closest(".signup-form__group").attr('data-message-error');
                password.closest(".signup-form__group").append('<div class="invalid-message">' + message + '</div>');
                return false;
            }
          
            var data = form.serialize();
            $.ajax({
                url: wp_vars['rest_url'] + 'api/v1/auth/login',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: data,
                beforeSend: function beforeSend(xhr) {
                    isProcess = true;
                }
            }).done(function (response) {
                isProcess = false;
                var formdata = {};
                form.serializeArray().map(function (x) {
                    formdata[x.name] = x.value;
                });
               
                location.reload();
                
            }).fail(function (res) {
                isProcess = false;

                var message = typeof res.responseJSON.message != 'undefined' ? res.responseJSON.message : '';
                $('.iedg-login__message').html(message)
            });
            
        });
    }

    $(function () {
        handleLogin();
    });
})(jQuery);