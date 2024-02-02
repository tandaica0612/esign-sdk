
var digitalSignPopup = null;
var siteUrl = `https://testkyso.dkkd.gov.vn`;
var digitalSignCallback = undefined;
var digitalCertCallback = undefined;

window.onmessage = (event) => {
	if (event.source === digitalSignPopup && event.data.name == "receiveCertificateCallback") {
		digitalCertCallback(event.data);
	}
	if (event.source === digitalSignPopup && event.data.name == "receiveDigitalSignedCallback") {
		digitalSignCallback(event.data);
	}
};
  
function openPopup(url) {
    // Close the current popup if it exists
    if (digitalSignPopup && !digitalSignPopup.closed) {
        digitalSignPopup.close();
    }
    var width = 800;
    var height = 600;
    digitalSignPopup = window.open(url, '_blank', 'width=' + width + ',height=' + height);
}
// window.digitalSign = function(obj, callback){
//     window.receiveDigitalSignedCallback = callback;
//     var xhr = new XMLHttpRequest();
//     var url = '/api/Home/InitSign';
//     var jsonData = JSON.stringify(obj);
//     xhr.open('POST', url, false);
//     xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4) {
//             if (xhr.status != 200) {
//                 callback({
//                     type: "error",
//                     message: xhr.statusText
//                 });
//                 return;
//             }
//             var response = JSON.parse(xhr.responseText);
//             if (response.status !== 'ok') {
//                 callback({
//                     type: "error",
//                     message: response.message
//                 });
//                 return;
//             } 
//             openPopup('/Sign?TransactionId=' + response.TransactionId);
//         }
//     };
//     xhr.send(jsonData);
// }
window.digitalCert = function(obj, callback){
	digitalCertCallback = callback;
    openPopup(`${siteUrl}/Cert?UserId=${obj.UserId}`);
}

window.digitalSign = function(obj, callback){
	digitalSignCallback = callback;
    function jsonToQueryString(json) {
        return Object.keys(json)
          .map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
          })
          .join('&');
    }
    openPopup(`${siteUrl}/InitSign?` + jsonToQueryString(obj));
}
