function moveLine() {
    var line = document.querySelector('.line');
    var position = 0;
    var id = setInterval(frame, 200);
    
    function frame() {
      if (position == 100) {
        clearInterval(id);
      } else {
        /*position++;*/
        position = easeInOutQuad(position, 0, 100, 100);
        line.style.top = position + '%';
      }
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}


  
moveLine();