var b = false;
var bodyInnerhtml = { body: "" };

document.getElementById("applycss").addEventListener("click", () => {
  console.log("Popup DOM fully loaded and parsed");
  function modifyDOM() {
    // Test
    // if (mod) {
    //   document.getElementsByClassName("authoring-shell-root")[0].style.color = "orange";
    // } else {
    //   document.getElementsByClassName("authoring-shell-root")[0].style.color = "blue";
    // }
    for (var i = 0; i < document.getElementsByClassName("root")[0].childElementCount; i++) {
      var element = document.getElementsByClassName("root")[0].children[i];
      if (element.ariaLabel) {
        console.log("_");
        var s = element.ariaLabel + "";
        // Arialabel begins with en-tête. But there is a problem with ê, so just check for en-t
        if (s.toLowerCase().indexOf("en-t") != -1) {
          console.log(element);

          element.style.display = "none";
        } else if (s.toLowerCase().indexOf("ruban") != -1) {
          console.log(element);
          element.style.top = "0px";
        } else if (s.toLowerCase().indexOf("barre de navigation lat") != -1) {
          console.log(element);
          element.style.top = "120px";
          // Arborescence
          element.children[0].children[0].children[1].style.width = "320px";
        }
      }
    }
    // Barre de formule complete
    document.getElementsByTagName("formula-bar")[0].parentElement.parentElement.style.top = "78px";
    // Barre de champ texte de formule
    document.getElementsByClassName(
      "formula-bar-rule-container-element"
    )[0].parentElement.style.width = "1050px";

    // Right side panel
    document.getElementsByClassName("sidebar-container")[0].style.width = "400px";
    document.getElementsByClassName("sidebar-container")[0].style.top = "-48px";
    document.getElementsByClassName("react-ko-host-container")[0].parentElement.parentElement.style.width = "100%"

    console.log("Css applied");
    // Display body in page's console
    // console.log('Tab script:');
    // console.log(document.body);
    return document.body.innerHTML;
  }

  function setBody() {
    if (document.bodyBackup == null) {
      console.log(document.body);
      document.bodyBackup = Object.assign({}, document.body);
      console.log(document.bodyBackup);
      //   return { body: document.body };
    }
    // return null;
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript(
    {
      code: "var mod = " + b + ";" + "(" + setBody + ")();(" + modifyDOM + ")();", //argument here is a string but function.toString() returns function's code
    },
    (results) => {
      //Here we have just the innerHTML and not DOM structure
      console.log("Popup script:");
      console.log(results);
      //   if (results[0] != null) {
      //     bodyInnerhtml = results[0];
      //   }
    }
  );
  b = !b;
});

document.getElementById("reset").addEventListener("click", () => {
  function resetBody() {
    if (document.bodyBackup != null) {
      document.body = document.bodyBackup;
      console.log("Reseted body html");
      console.log(document.bodyBackup);
    }
  }
  chrome.tabs.executeScript(
    {
      code: "(" + resetBody + ")()", //argument here is a string but function.toString() returns function's code
    },
    (results) => {
      //Here we have just the innerHTML and not DOM structure
      console.log("Popup script:");
      console.log(results);
    }
  );
});
