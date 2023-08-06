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
	        var construction = creep.room.find(FIND_CONSTRUCTION_SITES);
	        
	        var targets = []
            var extensions = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            var towers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            
            if(Game.spawns.Spawn1.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                targets = targets.concat(Game.spawns.Spawn1);
            }
            if(extensions.length){
                for(let i in extensions){
                    targets = targets.concat(extensions[i]);
                }
                
            }
            if(towers.length){
                for(let i in towers){
                    targets = targets.concat(towers[i]);
                }
            }
            
            
            if(construction.length) {
                if(creep.build(construction[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(construction[0], {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
            else if(targets.length) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                creep.moveTo(16,17, {visualizePathStyle: {stroke: '#ffffff'}});
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
