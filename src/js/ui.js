var t = new Timer();
var d = new Display();
t.build();
d.build();

if (screenfull.enabled) {
    screenfull.request();
}