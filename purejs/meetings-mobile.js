function MobiSwipe(id) {
    // Constants
    this.current = 1;
    this.VERTICAL = 2;
    this.AXIS_THRESHOLD = 30; // The user will not define a perfect line
    this.GESTURE_DELTA = 60; // The min delta in the axis to fire the gesture
    // Public members
    this.direction = this.current;
    this.element = document.getElementById(id);
    this.onswiperight = null;
    this.onswipeleft = null;
    this.onswipeup = null;
    this.onswipedown = null;
    this.inGesture = false;
    // Private members
    this._originalX = 0
    this._originalY = 0
    var _this = this;
    // Makes the element clickable on iPhone
    //~ this.element.onclick = function () {
        //~ void(0)
    //~ };
    var mousedown = function (event) {
        // Finger press
        event.preventDefault();
        _this.inGesture = true;
        _this._originalX = (event.touches) ? event.touches[0].pageX : event.pageX;
        _this._originalY = (event.touches) ? event.touches[0].pageY : event.pageY;
        // Only for iPhone
        if (event.touches && event.touches.length != 1) {
            _this.inGesture = false; // Cancel gesture on multiple touch
        }
    };
    var mousemove = function (event) {
        // Finger moving
        event.preventDefault();
        var delta = 0;

        // Get coordinates using iPhone or standard technique
        var currentX = (event.touches) ? event.touches[0].pageX : event.pageX;
        var currentY = (event.touches) ? event.touches[0].pageY : event.pageY;
        // Check if the user is still in line with the axis
        if (_this.inGesture) {
            if ((_this.direction == _this.current)) {
                delta = Math.abs(currentY - _this._originalY);
            } else {
                delta = Math.abs(currentX - _this._originalX);
            }
            if (delta > _this.AXIS_THRESHOLD) {
                // Cancel the gesture, the user is moving in the other axis
                _this.inGesture = false;
            }
        }
        // Check if we can consider it a swipe
        if (_this.inGesture) {
            if (_this.direction == _this.current) {
                delta = Math.abs(currentX - _this._originalX);
                if (currentX > _this._originalX) {
                    direction = 0;
                } else {
                    direction = 1;
                }
            } else {
                delta = Math.abs(currentY - _this._originalY);
                if (currentY > _this._originalY) {
                    direction = 2;
                } else {
                    direction = 3;
                }
            }
            if (delta >= _this.GESTURE_DELTA) {
                // Gesture detected!
                var handler = null;
                switch (direction) {
                case 0:
                    handler = _this.onswiperight;
                    break;
                case 1:
                    handler = _this.onswipeleft;
                    break;
                case 2:
                    handler = _this.onswipedown;
                    break;
                case 3:
                    handler = _this.onswipeup;
                    break;
                }
                if (handler != null) {
                    // Call to the callback with the optional delta
                    handler(delta);
                }
                _this.inGesture = false;
            }
        }
    };

    // iPhone and Android's events
    document.addEventListener('touchstart', mousedown, false); // document est venu remplacer this.element
    document.addEventListener('touchmove', mousemove, false);
    document.addEventListener('touchcancel', function () {
        _this.inGesture = false;
    }, false);
    // We should also assign our mousedown and mousemove functions to
    // standard events on compatible devices
}

var swipev = new MobiSwipe("vertical");
swipev.direction = swipev.VERTICAL;
swipev.onswipedown = function () {
    alert('down');

};
swipev.onswipeup = function () {
    alert('up');
};

var swipeh = new MobiSwipe("current");
swipeh.direction = swipeh.current;
swipeh.onswiperight = function () {
    //~ alert('right'); 
    next_day();
};
swipeh.onswipeleft = function () {
    //~ alert('left');  
    previous_day();	
};

// ------------------------------
// Day Navigation
// ------------------------------ 
  
  days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]
  current_day_index = 0;
  first_day_index = 0;
  last_day_index = days.length - 1;
  
  function next_day() {
    if (current_day_index >= last_day_index) return;
    document.getElementById(days[current_day_index]).className = 'day unvisible left'; 
    document.getElementById(days[current_day_index + 1]).className = 'day visible';
    current_day_index += 1;
  }
  
  function previous_day() {
    if (current_day_index <= first_day_index) return;
    document.getElementById(days[current_day_index - 1]).className = 'day visible'; 
    document.getElementById(days[current_day_index]).className = 'day unvisible right';
    current_day_index -= 1;    
  }
  
// ------------------------------
// Key handeling
// ------------------------------  
  
  var UP_ARROW = 38;
  var DOWN_ARROW = 40;

  function change_day(key_code) {

    switch (key_code) {
      
      case UP_ARROW: 

        next_day();

      break;
      
      case DOWN_ARROW:  
      
        previous_day();
      
      break; 
    
    }
    
  }
  
  document.addEventListener('keydown', function(e) { change_day(e.keyCode); }, false);
  
// ------------------------------
// Reservation
// ------------------------------  

function pre_reserve(id) {
	document.getElementById(id).className = "hour reserved"
}	

  