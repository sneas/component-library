//"use strict";
(function(document){
    Array.prototype.forEach.call(document.getElementsByTagName('textarea'), function(element) {
        element.onclick = function() {
            alert('Element is clicked!');
        }
    });
})(document);