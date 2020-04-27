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
    nbImages = imgList.length;
    var img;
    for (var i = 0; i < nbImages; i++) { /* Pour chaque image */
      img = imgList[i];
      if (isClickable(img)) {
        treatClickableImage(img);
      } else {
        treatNOTClickableImage(img);
      }
      // if (!isClickable(img)) {
      //   treatNOTClickableImage(img);
      // }
    }
  }

  function isAncestorOfElement(ancestor,son) {
    if (son == null) {
      return false;
    }
    while (son = son.parentNode) { 
      if (son == ancestor) {
          return true;
      } 
    return false;
    }
}

  function isDescendantOfElement(son,ancestor) {
    return isAncestorOfElement(ancestor,son);
  }

  function isTagAncestorOfElement(tagName,son) {
    // renvoie null si Tagname n'est PAS un ancêtre de 'son',
    // ou bien, le Node ancêtre de 'son' dont le nom est 'tagName'
    tagName = tagName.toUpperCase();
    if (son == null) { // un élément nul n'est le fils d'AUCUN TAG
      return null;
    }
    while ((son = son.parentNode) && (son.nodeName != tagName)) {
    }
    return son;
  }

  var tagFoundFlag = false;
  var pathNodeArray = Array();
  function isTagDescendantOfElement(tagName,ancestor,withPath=false) {
    tagName = tagName.toUpperCase();
    if (tagFoundFlag == true) {
      if (withPath) {
        return pathNodeArray;
      } else {
        return true;
      }
    }
    
    if (ancestor == null) {
      tagFoundFlag = false;
      return false;
    }

    childrenNodesList = ancestor.childNodes;
    if (tagName == ancestor.parentNode.nodeName) { /* tagname is Descendant of itself */
      // Début de la Remontée de la Récurrence
      tagFoundFlag = true;
      if (withPath == true) {
        return pathNodeArray;
      } else {
        return true;
      }
    } else {
      Array.from(childrenNodesList).forEach(child => {
        return tagFoundFlag || isTagDescendantOfElement(tagName,child,withPath);
        });
      }

    // DURANT LA REMONTÉE DE LA RÉCURRENCE
    if ((withPath == true) && (tagFoundFlag == true) && (ancestor.nodeType == 1)) { /* node is an Element Type */
        // console.log("ADDING ...",ancestor.nodeName);
        pathNodeArray[pathNodeArray.length] = ancestor.nodeName;
        if (tagName != pathNodeArray[0]) {
          firstElement = pathNodeArray.shift()
        }
        return pathNodeArray;
    } else {
      return tagFoundFlag;
    }
  }

  function copyClassesFromTo(startElement,endElement,exceptClasses=null) { 
    /* moves all Classes from 'startElement' to 'endElement' */
    var n = startElement.classList.length;
    var classes = startElement.classList;
    for (var i = 0; i < n; i++) {
      var currentClass = startElement.classList[i];
      if (!exceptClasses.includes(currentClass)) {
        endElement.classList.add(currentClass);
      }
    }
  }

  function copyAttribsFromTo(startElement,endElement,exceptAttribs=null,overwriteAttribs=null) { 
  /* moves all Attributes, from 'startElement' to 'endElement' */
  // exceptAttribs est un tableau d'attributs à NE PAS COPIER. Ex: null, "", "id" ou ["id"], ["id","src", "href"]
  // Note the 'class' attribute is treated differently in the code => You can pass "class" or "className" in the 'exceptsAttribs' Array!!
  // overwriteAttribs est un tableau d'attributs EN DOUBLON dans endElement, à SURCHARGER. Ex: null, "", "id" ou ["id"], ["id","src", "href"]
  // Par défaut, les attributs en doublon ne sont PAS surchargés.
  var n = startElement.attributes.length;
  var startAttributes = startElement.attributes;
  var endAttributes = endElement.attributes;
  if (exceptAttribs == "") {
    exceptAttribs = null;
  }
  if (overwriteAttribs == "") {
    overwriteAttribs = null;
  }

  Array.from(startAttributes).forEach(startAttrib => {
    var currentAttrib = startAttrib.name;
    if ((currentAttrib == "class") && ((exceptAttribs.includes("class") || exceptAttribs.includes("className")))) { // class attribute is different...
      // console.log("CLASS DETECTED AND JUMPED !");
      return;
    }
    if ((exceptAttribs == null) || ((exceptAttribs != null) && (!exceptAttribs.includes(currentAttrib)))) {
      // ou bien, tous les Attribs doivent ÃƒÂªtre copiÃƒÂ©s, ou bien l'attribut currentAttrib n'est PAS dans la liste (non vide) des exceptions
      if ((!endElement.hasAttribute(currentAttrib)) || ((overwriteAttribs != null) && (overwriteAttribs.includes(currentAttrib)))) {
        // Si le problÃƒÂ¨me ne se pose pas (currentAttrib PAS dans les attributs de endElement), ou bien si currentAttrib appartient Ãƒ  la liste (non vide) des attributs surchargeables
        endElement.setAttribute(startAttrib.name,startAttrib.value)
      }
    }
  });
}

  function insertFigureAround(img,altTextNode) {
    var parentEl = img.parentNode;
    
    // var imgOld = aTag.removeChild(img);
    var altText = altTextNode.getAttribute("alt");
    var figure = document.createElement("figure");
    var figcaption = document.createElement("figcaption");
    figcaption.textContent = altText;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    // aTag.insertBefore(figure,aTag.firstChild);
    parentEl.insertBefore(figure,parentEl.firstChild); 
  } 


  function isClickable(el) {
    // renvoie 'null' si 'el' n'est pas clickable ('a' n'est PAS un ancêtre de 'el'),
    // ou bien le Node 'a' qui est ancêtre de 'el'
    return isTagAncestorOfElement("a",el);
  }

  function isNOTClickable(el) {
    return !isClickable(el);
  }

  function treatClickableImage(img) {
    // Traite l'image 'img' NON cliquable pour adapter export PANDOC à md2all
    insertFigureAround(img,img);
    copyAttribsFromTo(isClickable(img),img.parentNode,exceptAttribs=["href","class"]);
    copyClassesFromTo(isClickable(img),img.parentNode);
    isClickable(img).removeAttribute("style");
    isClickable(img).classList.remove("floatleft");
    isClickable(img).classList.remove("floatright");

    // copyAttribsFromTo(img,img.parentNode,exceptAttribs=["id","alt","src"]);
    img.classList.remove("floatleft");
    img.classList.remove("floatright");
    img.style.textAlign = "center";
    // revenir à 100% dans img2:
    var newStyle = setWidth100in(img);
  }

  function treatNOTClickableImage(img) {
    // Traite l'image 'img' NON cliquable pour adapter export PANDOC à md2all
    copyAttribsFromTo(img,img.parentNode,exceptAttribs=["id","alt","src"]);
    img.classList.remove("floatleft");
    img.classList.remove("floatright");
    // img.style.textAlign = "center";
    // revenir à 100% dans img2:
    var newStyle = setWidth100in(img);
  }

  function setWidth100in(el) {
    // remplace l'ancienne width de l'attribut 'style' de 'el' par une width à 100%
    if (el.getAttribute("width" != null)) {
      el.removeAttribute("width");
    }

    var styleAttrib = el.getAttribute("style");
    if (styleAttrib == null) {
      return null;
    }
    var i0 = styleAttrib.indexOf("width"); // début de width
    var n = styleAttrib.length;
    for (var i = i0; i < n; i++) {
      if (styleAttrib[i] == ";") {
        break;
      }
    }
    var i1 = i+1; // fin de width -> le ';'
    var newStyle = styleAttrib.substring(0,i0)+"width: 100%;"+styleAttrib.substring(i1,n);
    el.removeAttribute("style");
    el.setAttribute("style",newStyle);
    return newStyle;
  }




  // function treatImages() {
  //     // Fix figcaption appeareance (in clickable images) and Positionning for all images
  //     var imgList = document.querySelectorAll('img');
  //     for (var i = 0; i < imgList.length; i++) { /* Pour chaque image */
  //         var img = imgList[i];
  //         var tmpSibling = img.nextElementSibling;
  //         var tmpParent = img.parentElement;
  //         var figure = document.createElement("figure");
  //         if (img.parentElement.tagName == "A") { /* Clickable image : a Tag is the parent and contains attributes*/
  //           this.console.log("CLICKABLE, imgAttributes = ",img.attributes);
  //           this.console.log("parent Element TagName = "+img.parentElement.tagName);
  //           var aTag = img.parentNode;
  //           var imgOld = aTag.removeChild(img);
  //           var altText = imgOld.getAttribute("alt");
  //           var tagAttributes = toArrayNodeNamedMap(aTag.attributes);
  //           var n = aTag.attributes.length;
  //           /* move all attributes, except 'href', from "A" to "img" */
  //           for (var i = 0; i < n; i++) { /* Pour chaque attribut de 'a' */
  //               var attribName = tagAttributes[i][0];
  //               var attribValue = tagAttributes[i][1];
  //               // this.console.log("Node Value= "+attribValue);
  //               if ((attribName != "href") && (attribName !== "width") && (attribName !== "height")) {
  //                   figure.setAttribute(attribName,attribValue);
  //                   aTag.removeAttribute(attribName);
  //               } else if ((attribName == "width") || (attribName == "height")) {
  //                   var styleText = figure.getAttribute('style');
  //                   var monTexte = " "+attribName+":"+attribValue+";";
  //                   if (styleText == null) {
  //                       figure.setAttribute('style',monTexte);
  //                     //   this.console.log("monTexte = ",monTexte);
  //                   } else { 
  //                       var newStyle = styleText+monTexte;
  //                       figure.setAttribute('style',newStyle);
  //                       if (attribName == "width") {
  //                           aTag.setAttribute("style","width:"+attribValue+";");
  //                       }
  //                   }
  //               }
  //           }
  //           var figcaption = document.createElement("figcaption");
  //           figcaption.textContent = altText;
  //           imgOld.setAttribute("style","width:100%;");
  //           figure.appendChild(imgOld);
  //           figure.appendChild(figcaption);
  //           // img.removeAttribute('style');
  //           aTag.insertBefore(figure,aTag.firstChild);
  //           continue;
  //         } else { /* NOT  clickable image: figure tag is the parent, and img contains attributes */
  //             var styleText = img.getAttribute("style");
  //             var classes = img.classList;
  //             this.console.log("NOT CLICKABLE, imgAttributes = ",img.attributes);
  //             this.console.log("parent Element TagName = "+img.parentElement.tagName);
  //             this.console.log("classes = ",classes);
  //             var imgAttributes = toArrayNodeNamedMap(img.attributes);
  //               var n = img.attributes.length;
  //             // var n = imgAttributes.length;
  //             this.console.log("n=",n);
  //             if (n==2 && (imgAttributes[0][0]=="src") && (imgAttributes[1][0]=="alt")) {
  //                 //   img has no additional styles or classes
  //                 this.console.log("raw image detected.");

  //                 // img.removeAttribute("style");
  //                 img.setAttribute("style","width:100%;height:auto;");
  //                 // var figure = document.createElement("figure");
  //                 var figure = img.parentNode;
  
  //                 if (styleText !== null) {
  //                     figure.setAttribute('style',styleText);
  //                 }
  
  //                 img.removeAttribute("class");
          
  //             } else { /* several attributes in the img tag */
  //               var someTag = img.parentNode;
  //               var imgOld = someTag.removeChild(img);
  //               var altText = imgOld.getAttribute("alt");
  //               var imgAttributes = toArrayNodeNamedMap(someTag.attributes);
  //               var n = someTag.attributes.length;
  //               /* move all attributes, except 'src' and 'alt', from "img" to "figure" */
  //               /* move all attributes, except 'src' and 'alt', from "A" to "img" */
  //               for (var j = 0; j < n; j++) { /* Pour chaque attribut de 'a' */
  //                 var attribName = imgAttributes[j][0];
  //                 var attribValue = imgAttributes[j][1];
  //                 // this.console.log("Node Value= "+attribValue);
  //                 if ((attribName != "src") && (attribName != "alt")) {
  //                     figure.setAttribute(attribName,attribValue);
  //                     img.removeAttribute(attribName);
  //                 } else if ((attribName == "width") || (attribName == "height")) {
  //                     var styleText = figure.getAttribute('style');
  //                     var monTexte = " "+attribName+":"+attribValue+";";
  //                     if (styleText == null) {
  //                         figure.setAttribute('style',monTexte);
  //                       //   this.console.log("monTexte = ",monTexte);
  //                     } else { 
  //                         var newStyle = styleText+monTexte;
  //                         figure.setAttribute('style',newStyle);
  //                         if (attribName == "width") {
  //                           someTag.setAttribute("style","width:"+attribValue+";");
  //                         }
  //                     }
  //                 }
  //               }
  //               var figcaption = document.createElement("figcaption");
  //               figcaption.textContent = altText;
  //               imgOld.setAttribute("style","width:100%;");
  //               figure.appendChild(imgOld);
  //               figure.appendChild(figcaption);
  //               // img.removeAttribute('style');
  //               tmpParent.insertBefore(figure,tmpSibling);
  //               continue;
  //               }
  //           }
  //     }
  // }

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
