function treatImagesForHTML() {
    // Fix figcaption appeareance (in clickable images) and Positionning for all images
    var imgList = document.querySelectorAll('img');
    for (var i = 0; i < imgList.length; i++) {
        var img = imgList[i];
        // if (img.attributes == null) {}
        if (img.parentElement.tagName == "A") { /* Clickable image : a Tag is the parent and contains attributes*/
            // this.console.log("img.attributes",img.getAttribute('style'));
            var aTag = img.parentNode;
            var tagAttributes = toArrayNodeNamedMap(aTag.attributes);
            var n = aTag.attributes.length;
            this.console.log("n=",n);
            this.console.log("tagAttributes[0][0]=",tagAttributes[0][0]);
            if (n==1 && tagAttributes[0][0] == "href") {
                this.console.log("raw image detected.")
                this.console.log("Natural width = ",img.naturalWidth);
                this.console.log("Natural height = ",img.naturalHeight);
                img.setAttribute("class","center");
                img.setAttribute("style","width:"+img.naturalWidth+" !important;"+" height:"+img.naturalHeight+" !important;");

                // img.width = img.naturalWidth;
                // img.height = img.naturalHeight;
            }
            
            var imgOld = aTag.removeChild(img);
            var altText = imgOld.getAttribute("alt");
            var figure = document.createElement("figure");

            /* move all attributes, except 'href', from "A" to "img" */
            // this.console.log("array = ",tagAttributes);
            for (let i = 0; i < n; i++) {
                var attribName = tagAttributes[i][0];
                // this.console.log("Node Name= "+attribName);
                var attribValue = tagAttributes[i][1];
                this.console.log("Node Value= "+attribValue);
                if ((attribName != "href") && (attribName !== "width") && (attribName !== "height")) {
                    figure.setAttribute(attribName,attribValue);
                    aTag.removeAttribute(attribName);
                } else if ((attribName == "width") || (attribName == "height")) {
                    var styleText = figure.getAttribute('style');
                    var monTexte = " "+attribName+":"+attribValue+";"
                    if (styleText == null) {
                        figure.setAttribute('style',monTexte);
                        this.console.log("monTexte = ",monTexte);
                    } else { 
                        var newStyle = styleText+monTexte;
                        figure.setAttribute('style',newStyle);
                    }
                }
            }

            // var styleText = aTag.getAttribute("style");
            // aTag.classList.add("isClickable");
            // var classes = aTag.classList;
            // if (styleText !== null) {
            //     img.setAttribute('style',styleText);
            // }
            // aTag.removeAttribute('style');
            // var imgOld = aTag.removeChild(img);
            // var altText = imgOld.getAttribute("alt");
            // var figure = document.createElement("figure");
            // if (styleText !== null) {
            //     figure.setAttribute('style',styleText);
            // }
            // if (classes.toString() !== ""){
            //     figure.setAttribute('class',classes.toString());
            // }
            // aTag.removeAttribute('class');
            var figcaption = document.createElement("figcaption");
            figcaption.textContent = altText;
            figure.appendChild(imgOld);
            figure.appendChild(figcaption);
            // img.removeAttribute('style');
            aTag.insertBefore(figure,aTag.firstChild);
        } else { /* NOT  clickable image: figure tag is the parent, and img contains attributes */
            var styleText = img.getAttribute("style");
            var classes = img.classList;
            this.console.log("imgAttributes = ",img.attributes);
            var tagAttributes = toArrayNodeNamedMap(img.attributes);
            var n = img.attributes.length;
            this.console.log("n=",n);
            if (n==2 && (tagAttributes[0][0]=="src") && (tagAttributes[1][0]=="alt")) {
                this.console.log("raw image detected.")
            }

            img.removeAttribute("style");
            var figure = img.parentNode;
            if (styleText !== null) {
                figure.setAttribute('style',styleText);
            }

            if (classes.toString() !== ""){
                figure.setAttribute('class',classes.toString());
            }
            img.removeAttribute("class");
        }
    }
}

function toArrayNodeNamedMap(aNodeNamedMap) {
    var array = [];
    for (var i = aNodeNamedMap.length >>> 0; i--;) { 
        array[i] = [aNodeNamedMap[i].nodeName,aNodeNamedMap[i].nodeValue];
    }
    return array;
}

