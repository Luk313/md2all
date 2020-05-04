$(function(){
    // you MAY NEED to refresh your Browser once the very first time, per project 
    // this param is need in 'script.js' for wkhtmltopdf export in the detectmedia() function
    var zoomAttrib = "zoom";
    var verticalAlignList = ["valign","vertical-align"];
    var vAlign;
    sessionStorage.setItem('zoomAttrib', zoomAttrib);

    var userPathStart = getUserPartOfPathToEmoji();
    $('p > span[data-emoji]').Emoji({
        path:  userPathStart+'.config/md2all/libraries/jqueryemoji/img/apple72/',
        class: 'emoji',
        ext:   'png'
    }).find("img.emoji").each(function() {
        var width = $(this).width();
        var height = $(this).height();
        var zoom = 1.4;  // default zoom for ALL Emoticons
        console.log("this = "+this);
        var img = this;  // the img node
        var followingTextElement = img.parentNode.nextSibling;
        var customParamsString = followingTextElement.nodeValue;
        $(this).css("width", function() {
            if ((customParamsString != "") && (customParamsString.indexOf(zoomAttrib) >=0)) {
                zoom = getZoom(customParamsString); // number
                // console.log("Custom zoom = "+customZoom);
            }
            return (width*zoom).toString()+"px";
        });
        
        $(this).css("height", function() { // zoom has already been set/detected in width !
            return (height*zoom).toString()+"px";
        });
        $(this).attr(zoomAttrib,zoom);
        
        if (hasValign(customParamsString)) {
            $(this).css("vertical-align","middle");
            var oneEm = Math.round(parseFloat(window.getComputedStyle(img.parentNode).fontSize));
            $(this).css("position", "relative");
            $(this).css("top", (-oneEm/3).toString()+"px");
            vAlign = getValign(customParamsString);
            $(this).addClass(vAlign);
        } else {
            $(this).css("position", "inherit");
        }


        $(this).attr(zoomAttrib,zoom);
        $(this).addClass("noimgbox");

        // FAUX, A CORRIGER (supprime la fin du texte après les emojis..)
        followingTextElement.nodeValue = ""; // wkhtmltopdf n'aime pas le .remove() ...

    });

    function getZoom(aString) {
        // returns the Number corresponding to the custom zoom Factor, included in aSrting
        var i0 = aString.indexOf(zoomAttrib);
        if (i0 >= 0) { // should be...
            var lengthOfZoomAttrib = zoomAttrib.length;
            var i1 = aString.indexOf("=",i0+lengthOfZoomAttrib);  // first position of '=' after 'zoom' (more generally, after zoomAttrib)
            var i2 = aString.indexOf(" ",i1); // first position of a space ' ', after the "=" sign
            if (i2 <0) { // no spaces after '=' sign, because it only has a {zoom=XX} attribute 
                i2 = aString.indexOf("}",i1); // first position of '}', after the "=" sign
            }
            var zoomFactor = parseInt(aString.substring(i1+1,i2-1).trim());
            return zoomFactor;
        }
    }

    function hasValign(aString) {
        // returns true, if vAlign is detected, or false otherwise
        var n = verticalAlignList.length;
        for (var i = 0; i < n; i++) {
            if (aString.indexOf(verticalAlignList[i]) >= 0) {
                return true;
            }
        }
        return false;
    }

    function getValign(aString) {
        // returns vAlign if detected, or false otherwise
        var n = verticalAlignList.length;
        for (var i = 0; i < n; i++) {
            if (aString.indexOf(verticalAlignList[i]) >= 0) {
                return verticalAlignList[i];
            }
        }
        return null;
    }


    function getUserPartOfPathToEmoji() {
        console.log("path = "+window.location.pathname);
        var globalPath = window.location.pathname;
        var i2 = globalPath.indexOf("/",1); // gets the 2nd '/' index
        var i3 = globalPath.indexOf("/",i2+1); // gets the 3rd '/' index
        var userPartOfPath = globalPath.substring(0,i3+1)
        console.log("userPart = "+userPartOfPath);
        return userPartOfPath;
    }

    // function getEmSize(el) {
    //     return parseFloat(getComputedStyle(el).fontSize);
    // }


});