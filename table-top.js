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
    var mktt = function mktabs() {
        var tt = blessed.box({
            width: '100%',
            height: '100%',
            style: {bg:'#aaffaa'}
        });
        return tt;
    };
    var wins = {
        'log': mklog(),
        'tt': mktt()
    }
    var winarr = ['log','tt'];
    this.screen.key('left',function(ch,key) {
        if (key.sequence === "\u001b\u001bOD") {
            if (--fwin < 0)
                fwin = winarr.length - 1;
            wins[winarr[fwin]].focus();
            wins[winarr[fwin]].setFront();
            this.screen.render();
        };
    });
    this.screen.key('right',function(ch,key) {
        if (key.sequence === "\u001b\u001bOC") {
            if (++fwin >= winarr.length)
                fwin = 0;
            wins[winarr[fwin]].focus();
            wins[winarr[fwin]].setFront();
            this.screen.render();
        };
    });
    this.screen.key('C-c',function(c,k){process.kill(process.pid);});
    Object.keys(wins).forEach(function(key) {
        screen.append(wins[key]);
    });
    var fwin = 0;
    wins[winarr[fwin]].focus();
    wins[winarr[fwin]].setFront();
    this.log = function(text) {
        return wins["log"].log(text);
    };
    this.screen.render();
};
