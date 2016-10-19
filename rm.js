#!/usr/bin/env node
require('./help')

var fs = require('fs')
var path = require('path')

function removeFolder(pathCurrent) {
    var list = fs.readdirSync(pathCurrent);
    for (var i = 0; i < list.length; i++) {
        var filename = path.join(pathCurrent, list[i]);
        var stat = fs.statSync(filename);
        if (filename == "." || filename == "..") {
            // pass these files
        } else if (stat.isDirectory()) {
            // rmdir recursively
            removeFolder(filename);
        } else {
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(pathCurrent);
}

function remove(pathCurrent) {
    //console.log(pathCurrent)
    if (fs.existsSync(pathCurrent)) {
        fs.stat(pathCurrent, function (err, stats) {
            if (err) return
            if (stats.isDirectory()) {
                removeFolder(pathCurrent)
            } else {
                fs.unlinkSync(pathCurrent);
            }
        })
    }
}

function rm(pathFile) {
    //var firstArgv = process.argv[1]
    //var secondArgv = process.argv[2]
    //if (secondArgv === './' || secondArgv === 'undefined')
    //    return
    if (pathFile == 'undefined') return
    //if (secondArgv.indexOf('./') === 0) {
    //    var subPath = secondArgv.substr(2, secondArgv.length)
    //    subPath = subPath.replace('/', '\\')
    //    var fullPath = path.join(path.dirname(firstArgv), subPath)
    remove(pathFile)
    //}
}

