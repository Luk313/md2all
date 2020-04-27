window.onload = function () {

  function isAncestorOf(ancestor,son) {
      // 'son' is the element we are checking
      if (son == null) {
        // console.log("null detected");
        return false;
      }
      while (son = son.parentNode) { 
        if (son == ancestor) {
            // console.log("FOUND");
            return true;
        } 
      return false;
      }
  }

  function isDescendantOf(son,ancestor) {
      return isAncestorOf(ancestor,son);
  }

  function isTagAncestorOfElement(tagName,son) {
    tagName = tagName.toUpperCase();
    if (son == null) {
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

function copyClassesFromTo(startElement,endElement,exceptClasses=null) { /* move all Classes from 'startElement' to 'endElement' */
  var n = startElement.classList.length;
  var classes = startElement.classList;
  for (var i = 0; i < n; i++) {
    var currentClass = startElement.classList[i];
    if ((exceptClasses == null) || ((exceptClasses != null) && (!exceptClasses.includes(currentClass)))) {
    // if (!exceptClasses.includes(currentClass)) {
      endElement.classList.add(currentClass);
    }
  }
}

function copyAttribsFromTo(startElement,endElement,exceptAttribs=null,overwriteAttribs=null) { /* move all Attributes, BUT NO CLASSES, from 'img' to 'fig' */
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
  return isTagAncestorOfElement("a",el);
}

var div=this.document.getElementById("div1");
var ul=this.document.getElementById("ul1");
var img2=this.document.getElementById("2");
var img3=this.document.getElementById("3");
var img5 = this.document.getElementById("5");

fig = this.document.getElementById("fig2");

// Si l'image est cliquable:
insertFigureAround(img5,img5);
copyAttribsFromTo(isClickable(img5),img5.parentNode,exceptAttribs=["href","class"]);
copyClassesFromTo(isClickable(img5),img5.parentNode);
isClickable(img5).removeAttribute("style");
isClickable(img5).classList.remove("floatleft");
isClickable(img5).classList.remove("floatright");



// si l'image n'est pas cliquable:
// copyAttribsFromTo(img2,img2.parentNode,exceptAttribs=["id","alt","src"]);
// img2.classList.remove("floatleft");
// img2.classList.remove("floatright");
// // revenir à 100% dans img2:
// var newStyle = setWidth100in(img2);
treatNOTClickableImage(img2);
treatNOTClickableImage(img3);

function treatNOTClickableImage(img) {
  // Traite l'image 'img' NON cliquable pour adapter export PANDOC à md2all
  copyAttribsFromTo(img,img.parentNode,exceptAttribs=["id","alt","src"]);
  img.classList.remove("floatleft");
  img.classList.remove("floatright");
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



}
