
//Timer Class
//Responsible for local timing and syncing with server

function Timer(){
    self = this;

    this.running = false;
    this.defaultTime = 1800;
    this.remaining = this.defaultTime;
    this.timeArray = {};
    this.stopped = false;

    this.apiPath = 'http://' + window.location.host + '/game-api';

    this.build = function() {
        self.stopped = false;
        self.tick();
    };

    this.halt = function() {
        self.stopped = true;
    };

    this.sync = function() {
        jQuery.ajax({
            url:    self.apiPath + '/timer',
            success: function(result) {
                self.running = result.running;
                self.remaining = result.remaining;
            },
            async:   false
        });
    };

    this.tickEvent = function() {
        var tick = new CustomEvent('tick', {'detail': this.remaining});
        window.dispatchEvent(tick);
        window.dispatchEvent(tick);
    };

    this.tick = function() {
        console.log('tick');
        if (self.stopped !== true) {
            if (self.running === false){
                self.sync();
            }

            if (self.running === true && self.remaining > 0) {
                console.log(self.remaining);
                self.sync();

                self.remaining -= 1;
                self.tickEvent();
                window.setTimeout(self.tick, 1000);
            } else {
                window.setTimeout(self.tick, 1000);
            }
        }
    };

}