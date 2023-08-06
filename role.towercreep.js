/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.towercreep');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        var queueFlag = false;
       //working state
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        else if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
           creep.memory.working = true;
        }
        

        //drop off energy
        if (creep.room != Game.spawns.Spawn1.room) {
            creep.moveTo(Game.spawns.Spawn1.pos);
        }
        else if (creep.memory.working == true) {

            var towers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            

            if(towers.length){

                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say(`Moving to ${towers[0]}`);
                    creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                creep.moveTo(16,17, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }  
        }
    }       
};
