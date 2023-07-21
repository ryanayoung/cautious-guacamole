/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.explorer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
       //working state
        if (creep.memory.working == true && creep.carry.energy == 0) {
           creep.memory.working = false;
        }
        else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
           creep.memory.working = true;
        }

        //drop off energy
        if (creep.memory.working == true) {
            if (Game.spawns.Spawn1.energyCapacity == Game.spawns.Spawn1.energy) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(Game.spawns.Spawn1);
                }
            }
        }
         else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
               creep.moveTo(source);
            }
         }
     }       
};
