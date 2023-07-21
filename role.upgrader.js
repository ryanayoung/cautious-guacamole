/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        var queueFlag = false;
       //working state
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        else if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
           creep.memory.working = true;
        }

        //drop off energy
        if (creep.memory.working == true) {
            var repairables = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            
            
            if (targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
               creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
         else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (queueFlag) {
                var queue = creep.room.lookForAtArea(LOOK_CREEPS,29,3,31,7,true);
                var queue1 = creep.room.lookForAt(LOOK_CREEPS, 4, 29);
                var queue2 = creep.room.lookForAt(LOOK_CREEPS, 5, 29);
                var queue3 = creep.room.lookForAt(LOOK_CREEPS, 6, 29);
                if (queue.length > 0 && (creep.harvest(source) == ERR_NOT_IN_RANGE || creep.harvest(source) == ERR_INVALID_TARGET)) {
                    if (queue1.length > 0) {
                        if (queue2.length > 0) {
                            if (queue3.length > 0) {
                                creep.moveTo(5,32, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                            else {
                                creep.moveTo(6,29, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                        else {
                            creep.moveTo(5,29, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    else {
                        creep.moveTo(4,29, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
         }
     }       
};
