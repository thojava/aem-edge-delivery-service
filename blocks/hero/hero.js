(function () {
    function init() {
        alert("Join us on AEM Journey");
    }
    

    if (document.readyState !== "loading") {
        init();
    } else {
        document.addEventListener("DOMContentLoaded", init);
    }
}());

