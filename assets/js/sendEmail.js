window.onload = function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        emailjs.sendForm("gmail", "template_ssx9fuh", this)
            .then(function () {
                console.log('SUCCESS!');
                $("#activateAlert").click(function () {
                    $("#customalert").dialog("open");
                });
            }, function (error) {
                console.log('FAILED...', error);
            });
    });
}

$(document).ready(function () {
    $("#customalert").dialog({
        autoOpen: false,
        show: {
            delay: 400,
            fadeIn: 200
        },
        hide: {
            fadeOut: 300
        },
        width: 500,
        draggable: false,
        modal: true
    });
})



$("#activateAlert").click(function () {
    $("#customalert").dialog("open");

});
$("#closeAlert").click(function () {
    $("#customalert").dialog("close");
    location.reload();
});



