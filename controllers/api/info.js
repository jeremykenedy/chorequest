'use strict';

var self = this;

self.getAppDetails = function (req, res) {
    res.send({
        app: 'Chore Quest',
        version: '0.0.1'
    });
};
