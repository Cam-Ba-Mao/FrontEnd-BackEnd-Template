var $ = jQuery.noConflict();
var idBase = 'node_';
let currentId = null;
let currentEl = null;
let nextId = null;
let nextEl = null;

(function($){

    function initCountdown() {
        var cdown_div = '.countdown';
        var cdown_sec = '#countdown_section';

        if( $(cdown_div).length < 1 ) return;

        var endTime = $(cdown_div).attr('data-time');

        // Set the date we're counting down to
        var countDownDate = new Date(endTime).getTime();

        //console.log(countDownDate);

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            console.log('Distance: ' + distance);
            if (distance <= 0) {
                clearInterval(x);
                //remove countdown
                //active button
                $(cdown_div).remove();
                $(cdown_sec).addClass('nobg');
                $('button.login').prop('disabled', false);
                return false;
            }

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $('.countdown-group.day label').html(days);
            $('.countdown-group.hour label').html(hours);
            $('.countdown-group.minute label').html(minutes);
            $('.countdown-group.second label').html(seconds);

            // If the count down is over, write some text 

        }, 1000);
    }

    function setCookie(key, value, expiry) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
    }

    function getCookie(key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }

    function clearCookie(key) {
        var keyValue = getCookie(key);
        setCookie(key, keyValue, '-1');
    }

    function routeGameMap(el) {
        //Setup the first time game page loads
        currentId = parseInt(getCookie('currentId'));//get current ID from cookie
        nextId = parseInt(getCookie('nextId'));//get next ID from cookie
        if(currentId == null || typeof(currentId) == 'undefined' || currentId == '' || isNaN(currentId)) {
            currentId = parseInt(el.get(0).id.replace(idBase, ''));//set currentId to node_01
        }

        console.log("nextId: " + nextId);

        if(currentId > 1) {
            for(var i = 0; i < currentId; i++) {
                el.eq(i).addClass('active');
            }
        }

        console.log('before index: ' + currentId);
        if(nextId > 10)
            nextId = 10;
        currentId = (currentId < 10 ? '0' + currentId : currentId);
        currentEl = document.getElementById(idBase + currentId);
        nextId = (nextId < 10 ? '0' + nextId : nextId);
        nextEl = document.getElementById(idBase + nextId);

        console.log("nextId: " + nextId);

        //console.log('after index: ' + currentId);
        if(!$(currentEl).hasClass('active'))//add class active to current element
            $(currentEl).addClass('active');
        if(!$(nextEl).hasClass('active'))//add class active to next element
            $(nextEl).addClass('active');

        handleNodeClick(el);    //handle Node click
    }

    function handleNodeClick(el) {

        el.click(function() {

            if(checkActiveNode(this)) {//node is active

                currentId = this.id;    //id template: node_x with x from 01 to 10
                let index = parseInt(currentId.replace(idBase, ''));

                setCookie('currentId', index, 1);
                setCookie('nextId', index + 1, 1);
                //console.log("NextID: " + getCookie('nextId'));
                currentEl = document.getElementById(idBase + index);
                //console.log(currentEl);

                if(!$(currentEl).hasClass('active'))//add class active to current element
                    $(currentEl).addClass('active');
                //console.log("before index: " + index);
                index++;//increase index by 1
                //console.log("after index: " + index);
                nextId = (index < 10 ? '0' + index: index);//if current node is 10, then just clear next node id
                //console.log("nextId: " + nextId);
                let nextEl = document.getElementById(idBase + nextId);
                //console.log(nextEl);
                if(!$(nextEl).hasClass('active'))//add class active to next element
                    $(nextEl).addClass('active');

                //setup redirection for corresponding game in lang Vi/En
                //console.log("currentId: " + currentId);
                setupGameURL(currentId);
            }
            else {
                return false;
            }

        });

    }

    function checkActiveNode(el) {
        return $(el).hasClass('active');
    }

    function setupGameURL(id) {//currently full id node_xx

        var linkArr = null;
        var viLink = null;
        var enLink = null;
        var currentLink = null;
        var gameList = {
            'node_01': '/hoi-cho-xuan-cau-do-dan-gian#/en/spring-festival-folk-traditional-riddles',
            'node_02': '/hoi-cho-xuan-do-vui-dan-gian#/en/spring-festival-folk-funny-riddles',
            'node_03': '/hoi-cho-xuan-trac-nghiem-cau-doi#/en/spring-festival-couplets-quiz',
            'node_04': '/hoi-cho-xuan-o-an-quan#/en/spring-festival-mandarin-square-capturing',
            'node_05': '/hoi-cho-xuan-mam-ngu-qua-ngay-tet#/en/spring-festival-fruit-tray',
            'node_06': '/hoi-cho-xuan-duoi-hinh-bat-chu#/en/spring-festival-chase-pictures-catch-letters',
            'node_07': '/hoi-cho-xuan-ve-hinh-con-thieu#/en/spring-festival-drawing-missing-figure',
            'node_08': '/hoi-cho-xuan-choi-co-caro#/en/spring-festival-tic-tac-toe',
            'node_09': '/hoi-cho-xuan-chem-hoa-qua#/en/spring-festival-fruit-slash',
            'node_10': '/hoi-cho-xuan-trien-lam-tranh-tet#/en/spring-festival-tet-art-exhibition',
        };

        if(gameList[id] !== null && typeof(gameList[id]) !== 'undefined') {
            linkArr = gameList[id].split('#');//Gamepage VI and EN URL
            viLink = linkArr[0];
            enLink = linkArr[1];
            currentLink = document.location.origin;

            if(wp_vars.language !== null && typeof(wp_vars.language) !== 'undefined') {
                if(wp_vars.language == 'vi') {
                    currentLink += viLink;
                }
                else {
                    currentLink += enLink;
                }
            }
            console.log("currentLink: " + currentLink);
            document.location.href = currentLink;
            return true;
        }
        return false;
    }

    $(function() {

        var elem = $('g.node-circle');
        var cdown = $('#countdown_section');

        if(elem.length > 0) {
            routeGameMap(elem);//initialize SVG Games map active or inactive
        }

        if(cdown.length > 0) {
            initCountdown();
        }

    });

})(jQuery);
