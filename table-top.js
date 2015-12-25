#!/usr/bin/env node

// it's a dynamic view of arrays, lists, objects, dbs, etc.

const blessed = require('blessed');

exports.start = function() {
    this.screen = blessed.screen({
        smartCSR: true
    });
    this.screen.log = blessed.log({
        width: '100%',
        height: '100%'
    });
    this.screen.key('C-c',function(c,k){process.kill(process.pid);});
    this.screen.append(this.screen.log);
    this.screen.log.focus();
    this.screen.render();
};

exports.log = function(text) {
    this.screen.log.log(text);
};
