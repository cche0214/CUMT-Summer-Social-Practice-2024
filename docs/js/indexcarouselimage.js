window.onload = function () {
    var imgList = document.querySelector('.imgList');
    var circle = document.querySelector('.circle');
    var thisIndex = 0;
    var imgListLi = imgList.children;
    var circleA = circle.children;
    var flag = true;

    for (var i = 0; i < imgList.children.length; i++) {
        var aNode = document.createElement('a');
        aNode.setAttribute('index', i);
        if (i == 0) {
            aNode.className = 'hover';
        }
        circle.appendChild(aNode);
    }

    circle.addEventListener('click', function (e) {
        if (flag) {
            flag = false;
            if (e.target.nodeName != 'A') {
                return false;
            }
            thisIndex = e.target.getAttribute('index');
            slow(imgList, -thisIndex * 1120, function () {
                flag = true;
            });
            circleChange();
        }
    });

    function antoChange() {
        setInterval(function () {
            if (flag) {
                flag = false;
                if (thisIndex >= circleA.length) {
                    thisIndex = 0;
                }
                slow(imgList, -thisIndex * 1120, function () {
                    flag = true;
                });
                circleChange();
                thisIndex++;
            }
        }, 3000);
    }

    function circleChange() {
        for (var i = 0; i < circleA.length; i++) {
            circleA[i].className = '';
        }
        circleA[thisIndex].className = 'hover';
    }

    function slow(obj, target, callback) {
        obj.myInter = setInterval(function () {
            var offsetLeft = obj.offsetLeft;
            var num = (target - offsetLeft) / 10;
            num > 0 ? num = Math.ceil(num) : num = Math.floor(num);
            if (offsetLeft == target) {
                clearInterval(obj.myInter);
                callback && callback();
            } else {
                obj.style.left = offsetLeft + num + 'px';
            }
        }, 10);
    }

    antoChange();

    var prev = document.querySelector('.nav.prev');
    var next = document.querySelector('.nav.next');

    prev.addEventListener('click', function() {
        if (flag) {
            flag = false;
            thisIndex--;
            if (thisIndex < 0) {
                thisIndex = imgListLi.length - 1;
            }
            slow(imgList, -thisIndex * 1120, function () {
                flag = true;
            });
            circleChange();
        }
    });

    next.addEventListener('click', function() {
        if (flag) {
            flag = false;
            thisIndex++;
            if (thisIndex >= imgListLi.length) {
                thisIndex = 0;
            }
            slow(imgList, -thisIndex * 1120, function () {
                flag = true;
            });
            circleChange();
        }
    });
}

function showIntroduction(element, text) {
    document.getElementById('introductionBar').innerText = text;
    const spans = document.querySelectorAll('.box span');
    spans.forEach(span => {
        if (span !== element.querySelector('span')) {
            span.style.opacity = '0';
        } else {
            span.style.opacity = '1';
        }
    });
}

function resetText(element) {
    document.getElementById('introductionBar').innerText = '示例文本';
    const spans = document.querySelectorAll('.box span');
    spans.forEach(span => {
        span.style.opacity = '1';
    });
}

function navigateTo(url) {
    window.location.href = url;
}