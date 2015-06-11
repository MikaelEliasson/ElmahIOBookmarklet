var Bokio;
(function (Bokio) {
    var ElmahHelper = (function () {
        ElmahHelper.prototype.index = -1;
        function ElmahHelper() {
            this.index = -1;
            var self = this;
            addcss();

            this.changeFocus = function (change) {
                self.index += change;
                var errors = document.querySelectorAll('.errorsummary');
                var oldActive = document.querySelectorAll('.Bokio_ElmahHelper_active');
                for (var i = 0; i < oldActive.length; i++) {
                    oldActive[i].classList.remove('Bokio_ElmahHelper_active');
                }
                var item = errors[self.index % errors.length];
                console.log([item, self.index % errors.length]);
                if (item) {
                    item.classList.add("Bokio_ElmahHelper_active");
                    var pos = item.getBoundingClientRect().top;
                    window.scrollBy(0, pos - 200);
                }

            };

            this.delete = function(){
                var errors = document.querySelectorAll('.errorsummary');
                var item = errors[self.index % errors.length];
                var next = item.nextElementSibling;

                var link = next.querySelector('[data-action="Copy Message"]');
                var logId = link.href.substr(link.href.indexOf('logId=') + 6, 36); 
                var errorId = link.id;
                item.classList.add('Bokio_ElmahHelper_deleting');
                var r = new XMLHttpRequest();
                r.open("POST", "https://elmah.io/api/v2/messages?id=" + errorId + "&logid=" + logId , true);
                r.onreadystatechange = function () {
                    item.classList.add('Bokio_ElmahHelper_deleted');
                };
                r.send("");
                self.changeFocus(+1);
            };

            this.handleKeypress = function (e) {
                if (e.keyCode == 40) { //down
                    self.changeFocus(+1);
                }

                if (e.keyCode == 38) { //up
                    self.changeFocus(-1);
                }

                if (e.keyCode == 72 && e.shiftKey) { //h
                    //hide
                }

                if (e.keyCode == 46) { //delete
                    self.delete();
                }
            };
        }

        ElmahHelper.prototype.activate = function () {
            document.addEventListener('keydown', this.handleKeypress);
            this.changeFocus(+1);
        };

        ElmahHelper.prototype.deactivate = function () {
            document.removeEventListener('keydown', this.handleKeypress);
        };

        function addcss() {
            var css = 'table.table-log tr.errorsummary.Bokio_ElmahHelper_active td{ background-color: #28cdaa !important; color: #fff !important; }'
            + 'table.table-log tr.errorsummary.Bokio_ElmahHelper_deleting td{ background-color: rgba(255, 0, 0, 0.5) !important; color: #fff !important; }'
            + 'table.table-log tr.errorsummary.Bokio_ElmahHelper_deleted td{ background-color: red !important; color: #fff !important; }';
            var head = document.getElementsByTagName('head')[0];
            var s = document.createElement('style');
            s.setAttribute('type', 'text/css');
            if (s.styleSheet) {   // IE
                s.styleSheet.cssText = css;
            } else {                // the world
                s.appendChild(document.createTextNode(css));
            }
            head.appendChild(s);
        }




        return ElmahHelper;
    })();
    Bokio.ElmahHelper = ElmahHelper;
})(Bokio || (Bokio = {}));
var elmahHelper = new Bokio.ElmahHelper();
elmahHelper.activate();
