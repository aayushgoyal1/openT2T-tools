'use strict';

var deviceList = require('../DeviceList.json')

function searchDevices(keyword)
{
    keyword = keyword.toLowerCase();
    var foundList = [];
    
    for(var i = 0; i < deviceList.length; i++) {
         var device = deviceList[i];
    if (device.Keywords.indexOf(keyword) > -1) {
        foundList.push(deviceList[i]);
    }   
    else {

    }
}

if(foundList.length == 0){

var notFound = {
    DeviceName: "none",
    Message:"not found"
}
    foundList.push(notFound);
}

return foundList;
}

module.exports = function(app) {
 
    app.get('/search/:keyword', function(req, res) {
     res.header("Content-Type",'application/json'); 
    res.send(searchDevices(req.params.keyword));    
    });

}
