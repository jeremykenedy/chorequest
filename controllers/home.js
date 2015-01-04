'use strict';

module.exports.index = function (req, res) {
    res.render('home', {
        title: 'Chore Quest'
    });
};
