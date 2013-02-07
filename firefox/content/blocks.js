window.addEventListener("load", function load() {
  window.removeEventListener("load", load, false);
  gBrowser.addEventListener("DOMContentLoaded", function(e) {
    var document = e.originalTarget;
    if (document.location.hostname !== "gist.github.com") return;

    redraw();
    document.addEventListener("DOMSubtreeModified", redraw);

    function redraw() {
      var root = document.querySelector(".root-pane");
      if (!root) return;

      var ul = document.querySelector(".export-references");
      if (!ul) {
        ul = document.createElement("ul");
        ul.className = "export-references";
        root.appendChild(ul);
      }

      var a = document.querySelector("#bl-ocks-org");
      if (!a) {
        var li = document.createElement("li");
        li.innerHTML = '<a class="minibutton" id="bl-ocks-org"><span class="mini-icon mini-icon-external-link"></span>bl.ocks.org</a>';
        a = li.firstChild;
        ul.insertBefore(li, ul.firstChild);
      }

      var parts = document.location.pathname.substring(1).split("/"), id = parts[1], sha = parts[2];
      if (!/^([-\w]+|[0-9]+|[0-9a-f]{40})$/.test(id)) return;
      if (!/^[0-9a-f]{40}$/.test(sha)) sha = null;
      a.href = "http://bl.ocks.org/" + id + (sha ? "/" + sha : "");
    }
  }, false);
}, false);
