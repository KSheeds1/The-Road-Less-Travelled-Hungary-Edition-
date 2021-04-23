/*Use 'each' to add and remove the active tag to and from the nav-items/links according to which page is active using jQuery*/
$(document).ready(function() {
    $(".nav-item a").each(function() {
        $("nav-item a").removeClass("active");
        if (this.href == window.location.href) {
            $(this).addClass("active");
        }
    });
});

