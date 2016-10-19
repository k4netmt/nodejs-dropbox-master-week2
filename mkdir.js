#!/usr/bin/env node
require('./help')

var fs = require('fs')
var path = require('path')
var util = require('util')
var statMode = require('stat-mode');
var dateFormat = require('dateformat');

function createFolder(rootPath){
    var flag=fs.existsSync(rootPath)
    if (flag==true)
        return
    else{
        fs.mkdirSync(rootPath)
    }
}
module.export=function mkdir(filePath) {
    if (filePath=='undefined')
        return
    if (filePath=='./')
        return
    if (filePath.indexOf('./')===0){
        var linkSub=filePath.substr(2,filePath.length)
        var subs=linkSub.split('/')
        //linkSub=path.dirname(process.argv[1])
        for(var i=0;i<subs.length;i++){
            linkSub=linkSub+'\\'+subs[i]
            mkdir(linkSub)
        }
    }
}