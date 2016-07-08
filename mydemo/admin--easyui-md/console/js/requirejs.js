
function requireJs(elemId, host, jslist) {

    if (!jslist) {

        //donothing
        return;

    }



    for (var i = 0; i < jslist.length; i++) {

        if (host) {

            jslist[i] = host + jslist[i];
        }

        var scriptElm = document.createElement("script");
        scriptElm.setAttribute("src", jslist[i]);
        debugger;
        document.getElementById(elemId).appendChild(scriptElm);

    }



}


function requireCss(elemId, host, csslist) {

    if (!csslist) {

        //donothing
        return;

    }

    for (var i = 0; i < csslist.length; i++) {

        if (host) {

            csslist[i] = host + csslist[i];
        }

        var scriptElm = document.createElement("link");
        scriptElm.setAttribute("rel", "stylesheet");
        scriptElm.setAttribute("type", "text/css");
        scriptElm.setAttribute("href", csslist[i]);



        document.getElementById(elemId).appendChild(scriptElm);
    }


}
