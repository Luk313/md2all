window.onload = function () {
    // CREATE an ordered list of all languages in blocks of the page
    var codeClasses = [];
    var codesList = document.querySelectorAll('code.sourceCode');
    for (var i = 0; i < codesList.length; i++) {
        codeClasses.push(codesList[i].classList[1]);
        codesList[i].classList.add("language-"+codeClasses[i]);
    }
    console.log("codeClasses:");
    console.log(codeClasses);
    console.log("codesList:");
    console.log(codesList);
    
    // For Prism.js: add language-XXX class to pre tags
    var preList = document.querySelectorAll('pre.sourceCode');
    for (var i = 0; i < preList.length; i++) {
        // codeClasses.push(codesList[i].classList[1]);
        preList[i].classList.add("language-"+codeClasses[i]);
    }
    console.log("Prelist:");
    console.log(preList);

    // Get List of Parent Nodes for next spanList of Languages
    var positionList = document.querySelectorAll('div >pre > code.sourceCode');
    var parentList = [];
    for (var i = 0; i < positionList.length; i++) {
        parentList.push(positionList[i].parentNode);
    }
    console.log("PositionList:");
    console.log(positionList);

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
      
    //   DO NOTE ERASE: LISTENER TO DETECT if MEDIA PRINT or NOT
      var isPrint = window.matchMedia("print")
      detectMedia(isPrint) // Call listener function at run time
      isPrint.addListener(detectMedia) // Attach listener function on state changes 

}