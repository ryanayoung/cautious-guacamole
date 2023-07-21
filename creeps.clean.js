/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creeps.clean');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function() {
        for(var creep in Memory.creeps) {
            if(!Game.creeps[creep]) {
                delete Memory.creeps[creep];
            }
        }
    }
};