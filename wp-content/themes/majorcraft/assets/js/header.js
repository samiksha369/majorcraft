jQuery(document).ready(function($){

    function setupHeaderSettings() {

        var uploadedSrc = '';
        if ($(".mobile-show").css("display") == "block" ){
            uploadedSrc = jQuery(".tc-header .site-logo img").data('src');
            if (typeof uploadedSrc == 'undefined')
            {
                uploadedSrc = jQuery(".tc-header .site-logo img").attr('src');
            }
            jQuery(".tc-header .site-logo img").data('src', uploadedSrc);
            jQuery(".tc-header .site-logo img").attr('src', '/wp-content/themes/majorcraft/assets/images/footer-logo.png');
        } else {
            uploadedSrc = jQuery(".tc-header .site-logo img").data('src');
            jQuery(".tc-header .site-logo img").attr('src', uploadedSrc);
            jQuery('#main-wrapper .span2.left.tc-sidebar').show();
        }
    }

    setupHeaderSettings();
    // run on resize of the window
    $(window).resize(setupHeaderSettings);

});