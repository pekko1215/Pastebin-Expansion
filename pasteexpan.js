setInterval(function () {
    var links = $('a[class="url-ext"]');
    links.each(function (index, elem) {
        if (elem.innerText.indexOf("pastebin.com") != 0) {
            return;
        }
        if (elem.name == "seted") {
            return;
        }
        var $elem = $(elem);
        $.get("https://"+elem.innerText, function (resp) {
            var $code = $(resp).find("ol");
            $elem.after($code);
            console.log($code)
            var links = $(resp).find('[rel="stylesheet"]');
            var $resp = $(resp)
            for (var i = 0; i < $resp.length; i++) {
                var elem = $resp[i];
                if (elem.nodeName != "LINK") {
                    continue
                }
                var $elem2 = $(elem.outerHTML);
                console.log($elem2.attr("href"))
                if ($elem2[0].href.indexOf("/cache/css_lang/") == -1) {
                    continue;
                }
                var url = "https://pastebin.com" + $elem2.attr("href");
                console.log($("link[href='" + url + "']"))
                var newelem = document.createElement('link');
                newelem.href = url;
                newelem.type = 'text/css';
                newelem.rel = 'stylesheet';
                document.getElementsByTagName("head")[0].appendChild(newelem);
            }
        })
        elem.name = "seted"
    })
}, 500)