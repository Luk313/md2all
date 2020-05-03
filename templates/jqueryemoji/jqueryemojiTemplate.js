$(function(){
    $('p > span[data-emoji]').Emoji({
        path:  '/home/luke/.config/md2all/libraries/jqueryemoji/img/apple40/',
        class: 'emoji',
        ext:   'png'
    }).find("img.emoji").each(function() {
        var width = $(this).width();
        var height = $(this).height();
        var zoom = 1.4;
        $(this).css("width",width*zoom);
        $(this).css("height",height*zoom);
        $(this).addClass("noimgbox");
        $(this).attr("zoom",zoom);
    });
});