var express = require('express');
var router = express.Router();
const PiCamera = require('pi-camera');
const moment = require('moment')
var child = require('child_process');
var events = require('events');
var spawn = child.spawn;
const publicIp = require('public-ip');


var options = {
    myCamera: {
        mode: 'photo',
        output: '/home/nopex-client/public/images/test.jpg',
        width: 640,
        height: 480,
        nopreview: true,
    },
//var snapit  = await myCamera.snap();
    myVideo: {
        mode: 'video',
        output: '/home/nopex-client/public/video/videos.h264',
        width: 1280,
        height: 720,
        timeout: 5000, // Record for 5 seconds
        nopreview: true
    }
}

var now = function () {
    return moment(new Date()).format("YYYY_MM_DD_HH_mm_ss");
}

var dir = '/home/nopex-client/public/';
var filephoto = dir + 'photo/' + now() + '.jpg';
var filevideo = dir + 'video/' + now() + '.h264'

/* GET home page. */
router.get('/', async function (req, res, next) {

    var ip = await publicIp.v4();

    // const myCamera = new PiCamera(options.myCamera);
    //var snapit  = await myCamera.snap();
    // const myVideo = new PiCamera(options.myVideo);


    res.render('index', {title: ip});
});

router.post('/photo', async function (req, res) {

    var myOptions = options.myCamera;
    myOptions.output = filephoto;

    var ip = await publicIp.v4();

    const myCamera = new PiCamera(myOptions);
    var json = {
        filename: filephoto,
        uid: UID,
        ip: ip
    }
    res.json(json)
})


router.post('/video', async function (req, res) {

    var query = req.body;
    var timeout = query.timeout || 5000;
    var ip = await publicIp.v4();

    var myOptions = options.myVideo;
    myOptions.timeout = timeout;
    myOptions.output = filevideo;

    const myCamera = new PiCamera(myOptions);
    var json = {
        filename: filevideo,
        uid: UID,
        ip: ip
    }
    res.json(json)
})


router.post('/stream', async function (req, res) {

    var ip = await publicIp.v4();

    spawn('raspi-live', ['start']);

    var url = ip + ':8080/camera/livestream.m3u8';
    var json = {

        ip: ip,
        url: url
    }

    res.json(json)
})
module.exports = router;
