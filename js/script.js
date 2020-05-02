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
    // OK for Code Blocks
    // Fix figcaption appeareance (in clickable images) and Positionning for all images
    var imgList = document.querySelectorAll('img');
    var nbImages = imgList.length;
    console.log("nbImages = "+nbImages);
    var img;
    for (var i = 0; i < nbImages; i++) { /* Pour chaque image */
      img = imgList[i];
      if (isClickable(img)) {
        console.log("Clickable Images");
        treatClickableImage(img);
      } else {
        treatNOTClickableImage(img);
      }
    }
    
    treatGroupImages();
    // imgList[6].style.borderRadius = "20px";
    // imgList[6].style.borderRadius = "20px";
  }

  function isAncestorOfElement(ancestor,son) {
    // OK for Code Blocks
    // renvoie le noeud 'ancêtre' de 'son', ou bien false si pas de lien de parenté
    if (son == null) {
      return false;
    }
    while ((son = son.parentNode) && (son != ancestor)) { 
    }
    return son || false;
}

  function isDescendantOfElement(son,ancestor) { // OK for Code Blocks
    return isAncestorOfElement(ancestor,son);
  }

  function isTagAncestorOfElement(tagName,son) {
    // OK for Code Blocks
    // renvoie 'false' si 'Tagname' n'est PAS un ancêtre de 'son',
    // ou bien, le Node ancêtre de 'son' dont le nom est 'tagName'
    tagName = tagName.toUpperCase();
    if (son == null) { // un élément nul n'est le fils d'AUCUN TAG
      return null;
    }
    while ((son = son.parentNode) && (son.nodeName != tagName)) {
    }
    return son || false;
  }

  function isTagDescendantOfElement(tagName,ancestor,withPath) {
    // OK for Code Blocks
    // renvoie le (premier) noeud descendant de 'ancestor', ou bien 'false', si pas de lien de parenté
    tagName = tagName.toUpperCase();
    if (ancestor == null) { // un élément nul n'a pas de descendants
      return null;
    }
    var tagNameList = document.getElementsByTagName(tagName);
    var n = tagNameList.length;
    for (var i = 0; i < n; i++) {
      // console.log("tagNameList ["+i+"] = "+tagNameList);
      if (isAncestorOfElement(ancestor,tagNameList[i])) {
        return tagNameList[i];
      }
    }
    return false;
  }

  function copyClassesFromTo(startElement,endElement,exceptClasses) { 
    // OK for Code Blocks
    /* moves all Classes from 'startElement' to 'endElement' */
    if (typeof exceptClasses == 'undefined') { // exceptClasses is facultative parameter
      exceptClasses = null;
    }
    var n = startElement.classList.length;
    var classes = startElement.classList;
    for (var i = 0; i < n; i++) {
      var currentClass = startElement.classList[i];
      if ((exceptClasses == null) || (!exceptClasses.includes(currentClass))) {
        endElement.classList.add(currentClass);
      }
    }
  }

  function copyAttribsFromTo(startElement,endElement,exceptAttribs,overwriteAttribs) { 
    /* moves all Attributes, from 'startElement' to 'endElement' */
    // exceptAttribs est un tableau d'attributs à  NE PAS COPIER. Ex: null, "", "id" ou ["id"], ["id","src", "href"]
    // Note the 'class' attribute is treated differently in the code => You can pass "class" or "className" in the 'exceptsAttribs' Array!!
    // overwriteAttribs est un tableau d'attributs EN DOUBLON dans endElement, à  SURCHARGER. Ex: null, "", "id" ou ["id"], ["id","src", "href"]
    // Par défaut, les attributs en doublon ne sont PAS surchargés.
    if ((exceptAttribs == 'undefined') || (exceptAttribs == "")) {
      exceptAttribs = null;
    }
  
    if ((overwriteAttribs == 'undefined') || (overwriteAttribs == "")) {
      overwriteAttribs = null;
    }
  
    // console.log("exceptAttributes = "+exceptAttribs);
    // console.log("overwriteAttribs = "+overwriteAttribs);

    var n = startElement.attributes.length;
    var startAttributes = startElement.attributes;
    var endAttributes = endElement.attributes;
  
    for (var i = 0; i < n; i++) {
      var currentAttrib = startAttributes[i].name;
      var startAttrib = startAttributes[i];
      if ((currentAttrib == "class") && (exceptAttribs != null) && ((exceptAttribs.includes("class") || exceptAttribs.includes("className")))) { // class attribute is different...
        // console.log("CLASS DETECTED AND JUMPED !");
        continue;
      }
      // Ajouter un ";" dans 'style' au cas où il n'est pas été ajouté à la fin
      if ((currentAttrib == "style" ) && (startAttributes[i].value.substring(startAttributes[i].value.length-1) !=";")) {
        startAttributes[i].value += ";"
      }

      if ((exceptAttribs == null) || ((exceptAttribs != null) && (!exceptAttribs.includes(currentAttrib)))) {
        // ou bien, tous les Attribs doivent être copiés, ou bien l'attribut currentAttrib n'est PAS dans la liste (non vide) des exceptions

        if ((!endElement.hasAttribute(currentAttrib)) || ((overwriteAttribs != null) && (overwriteAttribs.includes(currentAttrib)))) {
          // Si le problème ne se pose pas (currentAttrib PAS dans les attributs de endElement), ou bien si currentAttrib appartient à   la liste (non vide) des attributs surchargeables
            endElement.setAttribute(startAttrib.name,startAttrib.value);
        }
      }
      
    }

  }

  function removeNullWidth(el) {
    var styleString = el.getAttribute("style");
    var i0 = styleString.indexOf("width: null;");
    if (i0 <0) {
      return;
    }
    var n = styleString.length;
    var newStyleString = styleString.substring(0,i0)+style(i0,n);
    if (newStyleString == "") {
      el.removeAttribute("style");
    } else { // preserve style without the "width: null;" part
      el.setAttribute("style",newStyleString);
    }
  }

  function insertFigureAround(img,altTextNode) {
    // OK for Code Blocks
    var parentEl = img.parentNode;
    var altText = altTextNode.getAttribute("alt");
    var figure = document.createElement("figure");
    var figcaption = document.createElement("figcaption");
    figcaption.textContent = altText;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    // aTag.insertBefore(figure,aTag.firstChild);
    parentEl.insertBefore(figure,parentEl.firstChild); 
  }

  function insertElementAround(elOutside,elInside) {
    // OK for Code Blocks
    // elOutside is a String Tag : "div", "p", etc..
    // elInside is a Node
    var parentEl = elInside.parentNode;
    var tmp = elInside.nextSibling;
    var outsideElementVariable = document.createElement(elOutside);
    outsideElementVariable.appendChild(elInside);
    parentEl.insertBefore(outsideElementVariable,tmp); 
  }

  function isClickable(el) {
    // OK for Code Blocks
    // renvoie 'null' si 'el' n'est pas clickable ('a' n'est PAS un ancêtre de 'el'),
    // ou bien le Node 'a' qui est ancêtre de 'el'
    return isTagAncestorOfElement("a",el);
  }

  function isNOTClickable(el) { // OK for Code Blocks
    return !isClickable(el);
  }

  function treatClickableImage(img) {
    // OK for Code Blocks
    // Traite l'image 'img' Cliquable pour adapter export PANDOC à  md2all
    var a = img.parentNode;
    insertFigureAround(a,img);
    var figure = img.parentNode.parentNode;

    setClickableWidthIn(img,figure,a);
    // var widthStringTmp = getWidthIn(img);
    treatFloat(img);

    // Treatment for ALL Clickable Images
    // figure.style.color = "red";
  }

  function setClickableWidthIn(img,figure,a) {
    var p = figure.parentNode;
    var widthStringTmp = getWidthIn(a);
    if (widthStringTmp != null) { // NOT A DEFAULT IMAGE : it has a specific 'width' attribute in img
      p.style.width = "100%";
      figure.style.width = widthStringTmp;
      figure.style.margin = "auto"; // pour centrer l'image
      // figure.style.padding = "0 5em 0 0"; // pour un peu d'espace à droite de l'image floatée à gauche
      copyClassesFromTo(a,figure);
      if (figure.classList.contains("floatleft")) {
        figure.style.padding = "0 1.5em 0 0"; // pour espace à droite de l'image floatée-gauche
      }
      if (figure.classList.contains("floatright")) {
        figure.style.padding = "0 0 0 1.5em"; // pour espace à droite de l'image floatée-gauche
      }
      img.style.width = "100%";     // pour resizer correctement l'image
      a.removeAttribute("style");   // sinon: facteur multiplicatif de zoom
      a.removeAttribute("class");
  } else { // DEFAULT IMAGE : NO width included. 
      // Removes Clickable pointer outside the image with a natural size
      p.style.width = "100%";
      var imNaturalWidth = img.naturalWidth;
      figure.style.width = imNaturalWidth+"px";
      figure.style.margin = "auto";
      // img.style.width = "100%";
      a.removeAttribute("style"); // sinon: facteur multiplicatif de zoom
  }
  }

  function treatNOTClickableImage(img) {
    // OK for Code Blocks
    // Traite l'image 'img' NON cliquable pour adapter export PANDOC à  md2all
    var figure = img.parentNode;

    setDefaultWidthIn(img,figure);
    // var widthStringTmp = getWidthIn(img);
    treatFloat(img);
    img.removeAttribute("class");

    // Treatment for ALL Not Clickable Images, even groupable Ones
    // figure.style.color = "red";
  }

  function setDefaultWidthIn(img,figure) {
    var widthStringTmp = getWidthIn(img);
    copyClassesFromTo(img,figure);
    // group detectable
    if ((widthStringTmp != null) && !(isGroupable(img))) {
      console.log("GROUPABLE IMG DETECTED");
      widthNumberTmp = parseInt(widthStringTmp)*2;
      img.style.width = widthStringTmp;
      figure.style.width = "100%";
    } 

  }

  function treatFloat(img) {
    // console.log("-->treatFloat");
    var figure = img.parentNode;
    var widthStringTmp = getWidthIn(img);
    var currentFloat;
    if (img.classList.contains("floatleft")) {
      // console.log("floatleft detected !");
      currentFloat = "floatleft";
    }

    if (img.classList.contains("floatright")) {
      currentFloat = "floatright";
      // console.log("floatright detected !");
    }
    
    if ((currentFloat != null) && (img.classList.contains(currentFloat))) {
      img.classList.remove(currentFloat);
      figure.classList.add(currentFloat);
      figure.style.width = widthStringTmp;
      img.style.width = "100%";
    }

  }

  function setWidthIn(el,widthString) {
    // OK for Code Blocks
    // remplace l'ancienne width de l'attribut 'style' de 'el' par une width à  100%
    if (el.hasAttribute("width")) {
      el.removeAttribute("width");
    }

    var styleAttrib = el.getAttribute("style");
    if (styleAttrib == null) {
      var newStyle = "width:"+widthString+";";
      el.setAttribute("style",newStyle);
      return newStyle;
    } // else 'width' is already defined in 'style' attribute
    var i0 = styleAttrib.indexOf("width"); // début de width
    var n = styleAttrib.length;
    for (var i = i0; i < n; i++) {
      if (styleAttrib[i] == ";") {
        break;
      }
    }
    var i1 = i+1; // fin de width -> le ';'
    var newStyle;
    if (widthString != null) {
      newStyle = styleAttrib.substring(0,i0)+"width: "+widthString+";"+styleAttrib.substring(i1,n);
      el.removeAttribute("style");
      el.setAttribute("style",newStyle);
      return newStyle;
    } else {
      el.removeAttribute("style");
    }
  }

  function getWidthIn(el) {
    // OK for Code Blocks
    // remplace l'ancienne width de l'attribut 'style' de 'el' par une width à  100%
    if (el.hasAttribute("width")) {
      return el.getAttribute("width");
    } // else the 'width' is set into 'style' Attrib

    var styleAttrib = el.getAttribute("style");
    if (styleAttrib == null) {
      return null;
    }

    // get 'width' initial position
    var i0 = styleAttrib.indexOf("width"); // première occurence de (1ère lettre de) 'width'
    if (i0<0) { // le 'width' n'a pas été trouvé
      return null;
    } // sinon, le 'width' a bien été trouvé
    var i1 = styleAttrib.indexOf(":",i0+5); // première occurence des ":" après le 'h' (sinon erreur de syntaxe..)
    var i2 = styleAttrib.indexOf(";",i1); // première occurence de ";" après les ':'
    if (i2<0) { // then the following ';' which was due, is in fact lacking, then take last caracter
      i2 = styleAttrib.length;
    }
    //  la valeur de widht se trouve les indices i1 et i2, dont il faut trimmer les espaces
    var widthStringNOTStriped = styleAttrib.substring(i1+1,i2);
    var widthStringTrimmed = widthStringNOTStriped.trim();
    return widthStringTrimmed;
  }

  function treatGroupImages() {
    var groupFigureList = document.querySelectorAll('figure[class*="group"]');
    var imgGroups = getImageDistinctGroups(groupFigureList);
    var nbOfGroups = imgGroups.length;
    for (var i = 0; i < nbOfGroups; i++) {
      // var imgGroup = document.querySelectorAll("figure."+imgGroups[i]);
      var imgGroup = document.querySelectorAll('figure[class*=\"'+imgGroups[i]+'\"]');
      console.log("chaine = "+'figure[class*=\"'+imgGroups[i]+'\"]')
      treatAnImageGroup(imgGroup);
    }
  }

  function treatAnImageGroup(imgGroup) {
    var nbImagesInSameGroup = imgGroup.length;
    var n = nbImagesInSameGroup;
    var xString = "2%"; // pourcentage entre les images, par rapport à la largeur totale
    var x = parseInt(xString);
    // var widthOfColumn = (100 / nbImagesInSameGroup).toFixed(2)-5;
    var widthOfColumn = ((100 - (n+1)*x)/n).toFixed(2)-2;
    console.log("widthOfColumn = "+widthOfColumn);

    for (var i = 0; i < nbImagesInSameGroup; i++) {
      // imgGroup[i].style.cssFloat = "left";
      // imgGroup[i].style.width = widthOfColumn.toString()+"%";
      // imgGroup[i].style.display = "inline";
      imgGroup[i].classList.add("floatleft");
      imgGroup[i].style.width = widthOfColumn.toString()+"%";
      imgGroup[i].style.margin = "0 0 0 "+xString;
      imgGroup[i].firstElementChild.style.width = "100%";
    }
    // imgGroup[nbImagesInSameGroup-1].style.clear = "both";
  }

function getImageDistinctGroups(groupFigureList) {
  var nbImagesAyantUneClasseGroup = groupFigureList.length;
  // console.log(groupFigureList[0].classList);
  
  var figureGroups = Array();
  var nb = 0;
  var figureClassValues = Array();

  for (var i = 0; i < nbImagesAyantUneClasseGroup; i++) {
    figureClassValues[i] = groupFigureList[i].classList.toString().split(' ');
    if (includesSubstringIn("group",figureClassValues[i])) { // figureClassValues[i] is a good Candidate Array to be retained
      var j = indexOfSubstringIn("group",figureClassValues[i]);
      if (!(includesSubstringIn(figureClassValues[i][j],figureGroups))) { // figureClassValues[i][j] is NOT already in figureGroups, so add it at index 'nb' in Array to return
        figureGroups[nb] = figureClassValues[i][j];
        console.log("group["+nb+"] = "+figureGroups[nb]);
        nb++;
      }
    }
  }
  console.log("Nb de Groupes distincts = "+figureGroups.length);
  return figureGroups;
}

function indexOfSubstringIn(aSubstring,anArray){
  // returns the (first) indexOf the element containing the substring 'aSubstring', or -1 if not includes as a substring
  var n = anArray.length;
  for (var i = 0; i < n; i++) {
    var indexOfSubstring = anArray[i].indexOf(aSubstring);
    if (indexOfSubstring >= 0) { // 'aSubString' is a substring of 'anArray[i]'
      return i;
    }
  }
  return -1;
}

function includesSubstringIn(aSubString,anArray) {
  if (indexOfSubstringIn(aSubString,anArray) >= 0) {
    return true;
  } else {
    return false;
  }
}

function isGroupable(img) {
  var figure;
  if (isClickable(img)) {
    figure = img.parentNode.parentNode;
  } else {
    figure = img.parentNode;
  }
  var classesArray = figure.classList.toString().split(' ');
  if (includesSubstringIn("group",classesArray)) {
    // console.log("DETECTED. GROUP");
    return true;
  } else {
    return false;
  }
}

function getSizeGroupable(img) {


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
