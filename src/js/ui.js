var t = new Timer();
var d = new Display();
var h = new Help();
t.build();
d.build();
h.build(t);

toastr.options.preventDuplicates = true;
toastr.options.timeOut = 3500;
toastr.options.extendedTimeOut = 5000;
toastr.options.newestOnTop = false;
toastr.options.closeButton = true;