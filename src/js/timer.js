
//Timer Class
//Responsible for local timing and syncing with server

function Timer(){
    self = this;

    this.running = false;
    this.defaultTime = 3600;
    this.remaining = this.defaultTime;
    this.timeArray = {};
    this.stopped = false;

    this.apiPath = 'http://' + window.location.host + '/game-api';

    this.build = function() {
        self.stopped = false;
        self.tick();

        $('#start').click(function(){
            self.start();
        });

        $('#pause').click(function(){
            self.stop();
        });

        $('#setTime').click(function(){
            self.set();
        });
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

    this.getTime = function(){
        var hours = document.querySelector('input[name="hours"]').value;
        var minutes = document.querySelector('input[name="minutes"]').value;
        var seconds = document.querySelector('input[name="seconds"]').value;
        if (hours === ''|| hours === null || hours === undefined)
        {
            hours = 0;
        }
        if (minutes === ''|| minutes === null || minutes === undefined)
        {
            minutes = 0;
        }
        if (seconds === ''|| seconds === null || seconds === undefined)
        {
            seconds = 0;
        }

        var time = parseInt(seconds);
        time += parseInt(minutes)*60;
        time += parseInt(hours)*3600;
        return time;
    };

    this.start = function() {
        $.ajax({
            url: self.apiPath + '/timer',
            type: 'POST',
            data: JSON.stringify({action: "start"}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(msg) {
                console.log(msg);
            }
        });
    };

    this.stop = function() {
        $.ajax({
            url: self.apiPath + '/timer',
            type: 'POST',
            data: JSON.stringify({action: "stop"}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(msg) {
                console.log(msg);
            }
        });
    };

    this.set = function() {
        $.ajax({
            url: self.apiPath + '/timer',
            type: 'POST',
            data: JSON.stringify({action: "set", remaining: self.getTime()}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(msg) {
                console.log(msg);
            }
        });
    };


}