
//Help class

function Help() {
    own = this;

    this.header = {text: "Project ARMAGEDDON"};
    this.footer = {text: "www.trap.hu"};
    this.apiPath = 'http://' + window.location.host + '/game-api';

    this.build = function(timerObject) {
        $('#sendMessage').click(function(){
            own.sendMessage();
        });

        $('input[name="message"]').keyup(function(event){
            if(event.keyCode == 13){
                own.sendMessage();
            }
        });
        own.timer = timerObject;
    };

    this.charReplace = function(text) {
        var chartable = ['Á', 'á', 'É', 'é', 'Í', 'í', 'Ó', 'ó', 'Ú', 'ú', 'Ö', 'ö', 'Ü', 'ü', 'Ő', 'ő', 'Ű', 'ű'];
        var noaccents = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'O', 'o', 'U', 'u', 'O', 'o', 'U', 'u'];

        
        for (var i = 0; i < chartable.length; ++i) {
            text = text.replace(new RegExp(chartable[i], 'g'), noaccents[i]);
        }

        return text;
    };

    this.sendMessage = function() {
        var body = own.charReplace($('input[name="message"]').val());

        var minutes = Math.floor(own.timer.remaining % 3600 / 60);
        var hours = Math.floor(own.timer.remaining / 3600); 

        own.header.text2 = 'Time until impact: ' + hours + ' hours, ' + minutes + ' minutes' ;
        $.ajax({
            url: own.apiPath + '/printer',
            type: 'POST',
            data: JSON.stringify({body: body, header: own.header, footer: own.footer}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(msg) {
                toastr.success('Az üzenet szövege: ' + body, 'Üzenet elküldve');
                $('input[name="message"]').val('');
            }
        });
    };
}