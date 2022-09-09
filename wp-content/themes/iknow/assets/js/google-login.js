/*
* Get Info User When Login Success
*/
var googleUser = {};
var startApp = function() {
    gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '295668094232-bp532kr8aimrr1fmcqib0ovldl2dnhqc.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('iedg-btn-google-login'));
    });
};

jQuery.iedg_noti = function (html, time = 2500) {
    if (jQuery('.iedg-noti').length) return;
    jQuery('body').append('<div class="iedg-noti">' + html + '</div>');
    setTimeout(function () {
        jQuery('.iedg-noti').addClass('opening');
    }, 10);
    setTimeout(function () {
        jQuery('.iedg-noti').removeClass('opening');
    }, time);
    setTimeout(function () {
        jQuery('.iedg-noti').remove();
    }, time + 400);
};
function attachSignin(element) {

    auth2.attachClickHandler(element, {},
        function(googleUser) {
            var profile = googleUser.getBasicProfile();

            /*Call api register */
            var provide_id = profile.getId();
            var first_name = profile.getGivenName();
            var last_name = profile.getFamilyName();
            var name = profile.getName();
            var email = profile.getEmail();
            var picture = profile.getImageUrl();
           

            if (provide_id == "") {
                jQuery.iedg_noti(message, 3000);("Can not get provide id");
                return false;
            }

            if (email == "") {
                jQuery.iedg_noti(message, 3000);("Can not get email ");
                return false;
            }

            var message = '';

            var emailTmp = email.split("@");
            var isExit = false;

            var emailApproveList = [
                'indochinagroup.edu.vn',
                'wass.edu.vn',
                'pennschool.edu.vn',
                'amcollege.edu.vn',
                'dongduong.edu.vn',
                'tils.edu.vn',
                'icsa.edu.vn',
                'iabm.edu.vn',
                'indochinagroup.de',
                'aedg.us'
            ];

            emailApproveList.forEach(function(item, index) {
                if( item == emailTmp[1] ) {
                    isExit = true;
                }
            });

            if( isExit == false ) {
                message = jQuery('.message-google-login').html();
                var message = jQuery('.message-google-login').html();
                jQuery.iedg_noti(message, 5000);
                return false;
            }

            jQuery.ajax({
                url: wp_vars['rest_url'] + 'api/v1/auth/register',
                type: 'POST',
                cache: false,
                data: {
                    "type": "google",
                    "id": provide_id,
                    "first_name": first_name,
                    "last_name": last_name,
                    "display_name": name,
                    "email": email,
                    "picture": picture
                }
            }).done(function (response) {
                location.reload();
            }).fail(function (res) {
                isLogin = false;
                var message = typeof res.responseJSON.message != 'undefined' ? res.responseJSON.message : '';
            
                if (message !== "") {
                    jQuery.iedg_noti(message, 3000);
                }
            });


        }, function(error) {
            console.log(JSON.stringify(error, undefined, 2));
        });
}

startApp();