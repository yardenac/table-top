#!/usr/bin/env node

// it's a dynamic view of arrays, lists, objects, dbs, etc.

const blessed = require('blessed');

exports.start = function() {
    var screen = this.screen = blessed.screen({
        smartCSR: true
    });
    var mklog = function mklog() {
        var log = blessed.log({
            width: '100%',
            height: '100%',
            scrollbar: true,
            style: {
                scrollbar: {
                    bg: '#555555'
                }
            }
        });
        log.key('pageup',function(ch,key) {
            this.scroll(-this.getScrollHeight());
            screen.render();
        });
        log.key('pagedown',function(ch,key) {
            this.scroll(this.getScrollHeight());
            screen.render();
        });
        log.key('up',function(ch,key) {
            this.scroll(-1);
            screen.render();
        });
        log.key('down',function(ch,key) {
            this.scroll(1);
            screen.render();
        });
        return log;
    };
    this.screen.wins = {
        'log': mklog()
    }
    this.screen.key('left',function(ch,key) {
        if (key.sequence === "\u001b\u001bOD") {
            exports.log('left');
        };
        this.screen.render();
    });
    this.screen.key('right',function(ch,key) {
        if (key.sequence === "\u001b\u001bOC") {
            exports.log('right');
        };
        this.screen.render();
    });
    this.screen.key('C-c',function(c,k){process.kill(process.pid);});
    Object.keys(this.screen.wins).forEach(function(key) {
        screen.append(screen.wins[key]);
    });
    this.screen.wins[0].focus();
    this.screen.render();
};

exports.log = function(text) {
    this.screen.wins["log"].log(text);
};
