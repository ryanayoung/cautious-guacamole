/*
 My notes

 script pulled from youtube tutorial
 youtube.com/playlist?list=PL0EZQ169YGlor5rzeJEYYPE3tGYT2zGT2
 ****** tutorial out of date. verify all code for old commands
*/
Game.creeps.<creep name>.memmory.working = false
Game.creeps.Madison.memory.role = "upgrader"


//spawn creeps as needed
if (_(Game.creeps).filter( { memory: { role: 'harvester'}}).size() == 0 ) {
    Game.spawns["Spawn1"].spawnCreep([WORK,CARRY,MOVE,MOVE],null,{ memory: {role: 'harvester', working: false}})
}
if (_(Game.creeps).filter( { memory: { role: 'upgrader'}}).size() == 0 ) {
    Game.spawns["Spawn1"].spawnCreep([WORK,CARRY,MOVE,MOVE],null,{ memory: {role: 'upgrader', working: false}})
    Game.spawns.Spawn1.createCreep([MOVE], null, {role: "harvester", set: "extractor"})
}

if ( harvesters < 2 ) {
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], `creep-${ Math.ceil(Math.random() * 999999) }`, {   memory: {     role: 'harvester',working: true   }});
}
if ( upgraders < 2 ) {
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], `creep-${ Math.ceil(Math.random() * 999999) }`, {   memory: {     role: 'upgrader',working: true   }});
}



//finding/targeting structures
const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
//=======================================

//getting controller ticks till downgrade(and accessing other structures)
Object.values(Game.structures)[0].ticksToDowngrade

