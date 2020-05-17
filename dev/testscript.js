window.onload = function () {

  function isTagDescendantOfElement(tagName,ancestor,withPath) {
    // OK for Code Blocks
    // renvoie le (premier) noeud descendant de 'ancestor', ou bien 'false', si pas de lien de parenté
    tagName = tagName.toUpperCase();
    if (ancestor == null) { // un ÃƒÂ©lÃƒÂ©ment nul n'a pas de descendants
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

  function isAncestorOfElement(ancestor,son) {
    // OK for Code Blocks
    if (son == null) {
      return false;
    }
    while ((son = son.parentNode) && (son != ancestor)) { 
    }
    return son || false;
}

function isTagAncestorOfElement(tagName,son) {
  // OK for Code Blocks
  // renvoie 'false' si 'Tagname' n'est PAS un ancêtre de 'son',
  // ou bien, le Node ancêtre de 'son' dont le nom est 'tagName'
  tagName = tagName.toUpperCase();
  if (son == null) { // un ÃƒÂ©lÃƒÂ©ment nul n'est le fils d'AUCUN TAG
    return null;
  }
  while ((son = son.parentNode) && (son.nodeName != tagName)) {
  }
  return son || false;
}

  // var img = document.getElementById("5");
  var p = document.getElementById("p1");
  var img = document.getElementById("img1");
  var fig = document.getElementById("fig1");

  // var monTest = isAncestorOfElement(p,img);
  var monTest = isTagAncestorOfElement("br",img);
  // var monTest = isTagDescendantOfElement("br",p);
  console.log("monTest = "+monTest);


}
