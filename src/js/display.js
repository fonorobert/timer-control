
//Display class
//Formats and displays the time received from the Timer class

function Display() {
    that = this;

    this.build = function() {
        window.addEventListener('tick', function(e){
            var time = e.detail;
            that.writeTime(time);
        });
    };


    this.writeTime = function(time) {
        var counter = document.querySelector('#counter');
        time = that.formatTime(time);
        if (time.hours !== '00')
        {
            counter.innerHTML = time.hours + ':' + time.minutes + ':' + time.seconds;
        } else {
            counter.innerHTML = time.minutes + ':' + time.seconds;
        }
    };

    this.formatTime = function(remaining) {
        var seconds = remaining % 60;
        var minutes = Math.floor(remaining % 3600 / 60);
        var hours = Math.floor(remaining / 3600);     
        var result = {'hours': hours, 'minutes': minutes, 'seconds': seconds};

        for(var k in result)
        {
            result[k] = parseInt(result[k]);
        }
        for(var key in result)
        {
            if(result[key] < 10 || result[key].length < 2)
            {
                result[key] = '0' + result[key];
            }
        }
        return result;
    };
}