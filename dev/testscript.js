window.onload = function () {

  function copyAttribsFromTo(startElement,endElement,exceptAttribs,overwriteAttribs) { 
    /* moves all Attributes, from 'startElement' to 'endElement' */
    // exceptAttribs est un tableau d'attributs Ãƒ  NE PAS COPIER. Ex: null, "", "id" ou ["id"], ["id","src", "href"]
    // Note the 'class' attribute is treated differently in the code => You can pass "class" or "className" in the 'exceptsAttribs' Array!!
    // overwriteAttribs est un tableau d'attributs EN DOUBLON dans endElement, Ãƒ  SURCHARGER. Ex: null, "", "id" ou ["id"], ["id","src", "href"]
    // Par dÃƒÂ©faut, les attributs en doublon ne sont PAS surchargÃƒÂ©s.
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
      if ((exceptAttribs == null) || ((exceptAttribs != null) && (!exceptAttribs.includes(currentAttrib)))) {
        // ou bien, tous les Attribs doivent ÃƒÂªtre copiÃƒÂ©s, ou bien l'attribut currentAttrib n'est PAS dans la liste (non vide) des exceptions
        if ((!endElement.hasAttribute(currentAttrib)) || ((overwriteAttribs != null) && (overwriteAttribs.includes(currentAttrib)))) {
          // Si le problÃƒÂ¨me ne se pose pas (currentAttrib PAS dans les attributs de endElement), ou bien si currentAttrib appartient Ãƒ   la liste (non vide) des attributs surchargeables
          endElement.setAttribute(startAttrib.name,startAttrib.value);
        }
      }

    }

    // this is correct, BUT breaks the Code Blocks in wkhtmltopdf
    // Array.from(startAttributes).forEach(startAttrib => {
    //   var currentAttrib = startAttrib.name;
    //   if ((currentAttrib == "class") && (exceptAttribs != null) && ((exceptAttribs.includes("class") || exceptAttribs.includes("className")))) { // class attribute is different...
    //     // console.log("CLASS DETECTED AND JUMPED !");
    //     return;
    //   }
    //   if ((exceptAttribs == null) || ((exceptAttribs != null) && (!exceptAttribs.includes(currentAttrib)))) {
    //     // ou bien, tous les Attribs doivent ÃƒÂªtre copiÃƒÂ©s, ou bien l'attribut currentAttrib n'est PAS dans la liste (non vide) des exceptions
    //     if ((!endElement.hasAttribute(currentAttrib)) || ((overwriteAttribs != null) && (overwriteAttribs.includes(currentAttrib)))) {
    //       // Si le problÃƒÂ¨me ne se pose pas (currentAttrib PAS dans les attributs de endElement), ou bien si currentAttrib appartient Ãƒ   la liste (non vide) des attributs surchargeables
    //       endElement.setAttribute(startAttrib.name,startAttrib.value);
    //     }
    //   }
    // });

  }

  // var img = document.getElementById("5");
  var a = document.getElementById("a1");
  var p = document.getElementById("p1");

  copyAttribsFromTo(a,p,"class");


}
