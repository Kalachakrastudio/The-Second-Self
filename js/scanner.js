const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwLxdU3EA4r_gyZL_m9ywaOBjH90wB6eeIDk_FWnKlqRwG12-hgjhJGl5qfdKFeJBDf/exec";
const html5QrCode =
new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(cameras=>{

if(cameras.length){

html5QrCode.start(

cameras[0].id,

{
fps:10,
qrbox:250
},

onScanSuccess

);

}

});

function onScanSuccess(decodedText){

html5QrCode.stop();

searchTicket(decodedText);

}
