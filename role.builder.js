//generating a builder screep to construct things
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var queueFlag = false;

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        var repairables = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
            else if(repairables.length) {
                if(creep.repair(repairables[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairables[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                creep.moveTo(16,17);
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

module.exports = roleBuilder;
//=======================================