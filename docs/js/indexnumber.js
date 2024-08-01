document.addEventListener("DOMContentLoaded", function() {
    var containers = document.querySelectorAll('.number-container');
    containers.forEach(function(container) {
        container.addEventListener('click', function() {
            var numberDisplay = container.querySelector('.number-display');
            if (!numberDisplay) return;
            var start = 1;
            var end = parseInt(numberDisplay.getAttribute('data-end'), 10);
            numberDisplay.textContent = '';
            addNumber(start, end, numberDisplay);
        });
    });
});

function addNumber(start, end, element) {
    var i = start;
    var interval;
    if (i < end) {
        interval = setInterval(function() {
            i += 2;
        if (i > end) {
            clearInterval(interval);
            element.textContent = end.toLocaleString();
        } else {
            element.textContent = i.toLocaleString();
        }
        }, 10); 
    }
}
