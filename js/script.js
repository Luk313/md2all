window.onload = function () {

  treatCode();

  // Fix {.pagebreakafter} not working inside ul, li, normal parapgraphs, etc.. 
  var pageBreakAfterList = document.querySelectorAll('.pagebreakafter');
  for (var i = 0; i < pageBreakAfterList.length; i++) {
      pageBreakAfterList[i].innerHTML += "<div style='page-break-after: always;'></div><div></div>";
  }

  // Fix {.pagebreakbefore} not working inside ul, li, normal parapgraphs, etc.. 
  var pageBreakBeforeList = document.querySelectorAll('.pagebreakbefore, .newpage');
  for (var i = 0; i < pageBreakBeforeList.length; i++) {
      if (pageBreakBeforeList[i].parentElement.previousElementSibling) {
          pageBreakBeforeList[i].parentElement.previousElementSibling.innerHTML += "<div style='page-break-after: always;'></div><div></div>";
          }
      }

  treatImages();

  function treatCode() {
    // CREATE an ordered list of all languages in blocks of the page
    var codeClasses = [];
    var codesList = document.querySelectorAll('code.sourceCode');
    for (var i = 0; i < codesList.length; i++) {
        codeClasses.push(codesList[i].classList[1]);
        codesList[i].classList.add("language-"+codeClasses[i]);
        codesList[i].style.borderRadius = "0.3em";
        // codesList[i].style.fontFamily = "Source Code Pro";
    }

    // (For Prism.js:) add language-XXX class to pre tags
    var preList = document.querySelectorAll('pre.sourceCode');
    for (var i = 0; i < preList.length; i++) {
        // codeClasses.push(codesList[i].classList[1]);
        preList[i].classList.add("language-"+codeClasses[i]);
    }
    
    // To try to force border-radius with pandoc background color set. Non concluant
    var codesListBorderRadius = document.querySelectorAll(':not(pre) > code[class*="language-"], pre[class*="language-"], code[class*="language-"]');
    for (var i = 0; i < codesListBorderRadius.length; i++) {
        codesListBorderRadius[i].style.borderRadius = "0.5em";
    }
    // console.log(codesListBorderRadius);

    // Get List of Parent Nodes for next spanList of Languages
    var positionList = document.querySelectorAll('div >pre > code.sourceCode');
    var parentList = [];
    for (var i = 0; i < positionList.length; i++) {
        parentList.push(positionList[i].parentNode);
    }

    // CREATE NEW LANGUAGE SPAN List, to be detected automatically by Pandoc, and ADD it to DOM, stylish blue upper right corner
    var newSpan = [];
    for (var i = 0; i < positionList.length; i++) {
        newSpan[i] = document.createElement("span");
        newSpan[i].setAttribute("class","language");
        newSpan[i].innerHTML += codeClasses[i];
        parentList[i].insertBefore(newSpan[i],positionList[i]);
        newSpan[i].style.position = "absolute";
        newSpan[i].style.cssFloat = "right";
        newSpan[i].style.padding = "0.6em";
        newSpan[i].style.fontSize = "0.85em";
        newSpan[i].style.margin = "-1.5em 1.5em 0 0";
        newSpan[i].style.right = "0";
        newSpan[i].style.color = "#fff";
        newSpan[i].style.backgroundColor = "#3593ff";
        newSpan[i].style.boxShadow = "3px 3px 3px #bbb";
        newSpan[i].style.borderRadius = "7px";
        newSpan[i].style.zIndex = "1000";
        newSpan[i].style.pageBreakBefore = "avoid";
        newSpan[i].style.pageBreakAfter = "avoid";
    }
  }

  function treatImages() {
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
            if (n==1 && tagAttributes[0][0] == "href") {
                this.console.log("raw image detected.");
                this.console.log("Natural width = ",img.naturalWidth);
                this.console.log("Natural height = ",img.naturalHeight);
                img.setAttribute("class","center");
                img.setAttribute("style","width:"+img.naturalWidth+" !important;"+" height:"+img.naturalHeight+" !important;");
            }
            
            var imgOld = aTag.removeChild(img);
            var altText = imgOld.getAttribute("alt");
            var figure = document.createElement("figure");

            // /* move all attributes, except 'href', from "A" to "img" */
            for (var i = 0; i < n; i++) {
                var attribName = tagAttributes[i][0];
                // this.console.log("Node Name= "+attribName);
                var attribValue = tagAttributes[i][1];
                // this.console.log("Node Value= "+attribValue);
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


  // Detect and configure media query print vs screen/others:
  function detectMedia(isPrint) { // DO NOT USE LET... assignment: problem in export of pdf! Always prefer VAR ...
      if (isPrint.matches) { // If media query matches
          // document.body.style.backgroundColor = "beige";
          // IMPORTANT: To prevent code highlight to BREAK in @media print

          var preCodeList = document.querySelectorAll('pre > code.sourceCode');
          for (var i = 0; i < preCodeList.length; i++) {
              preCodeList[i].style.whiteSpace = "pre";
          }

          // LANGUAGE in TOP RIGHT CORNER,
          // COMMENT the 4 following lines to get LANGUAGE position offset-X-Y as in Web version
          var positionSpanLanguageList = document.querySelectorAll('div > pre > span.language');
          for (var i = 0; i < positionSpanLanguageList.length; i++) {
              positionSpanLanguageList[i].style.margin = "-0.6em 0.7em 0 0";
          }

      } else {
          document.body.style.backgroundColor = "light blue";
          var preCodeList = document.querySelectorAll('pre > code.sourceCode');
          for (var i = 0; i < preCodeList.length; i++) {
              preCodeList[i].style.whiteSpace = "break-spaces";
          }
      }
    }

  //   DO NOT ERASE: LISTENER TO DETECT if MEDIA PRINT or NOT
    var isPrint = window.matchMedia("print")
    detectMedia(isPrint) // Call listener function at run time
    isPrint.addListener(detectMedia) // Attach listener function on state changes 

}
