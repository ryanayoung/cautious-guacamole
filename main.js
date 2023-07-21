var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var creepsClean = require('creeps.clean');

var spawnHome = Game.spawns.Spawn1;
var roomHome = _.values(Game.rooms)[0];

var maxCreeps = 16;
var maxHarvester = 2;
var maxUpgrader = 2;
var maxBuilder = 1;

var logCounter = 0;

module.exports.loop = function () {
    
    var harvesters  = _(Game.creeps).filter( { memory: { role: 'harvester'}}).size();
    var upgraders   = _(Game.creeps).filter( { memory: { role: 'upgrader'}}).size();
    var builders    = _(Game.creeps).filter( { memory: { role: 'builder'}}).size();
    var explorers   = _(Game.creeps).filter( { memory: { role: 'explorers'}}).size();
    
    if (logCounter >= 20) {
        console.log(harvesters + " harvesters\n" + upgraders + " upgraders\n" + builders + " builders\n");   
        var maxCreeps_s = `Max: H ${maxHarvester} U ${maxUpgrader} B ${maxBuilder}`;
        console.log(maxCreeps_s);
        logCounter = 0;
    }
    else {
        logCounter = logCounter + 1;
    }
    
    
    
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        var construction = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (construction.length > 0) {
            maxBuilder = 6;
            maxUpgrader = 4;
        }
        else {
            maxBuilder = 1;
            maxUpgrader = 6;
        }
    
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            if (construction.length > 0 && upgraders >= maxUpgrader && Object.values(Game.structures)[0].ticksToDowngrade > 5000) {
                creep.memory.role = 'builder';
            }
            roleUpgrader.run(creep); 
        }
        else if (creep.memory.role == 'builder') {
            if (!(construction.length > 0) && builders > maxBuilder) {
                creep.memory.role = 'upgrader';
            }
            roleBuilder.run(creep);
        } 
    }
    
    if(Object.keys(Game.creeps).length < maxCreeps) {
        if ( harvesters < maxHarvester ) {
            Game.spawns.Spawn1.spawnCreep([WORK, CARRY, CARRY, MOVE], `creep-${ Math.ceil(Math.random() * 999999) }-har`, {   memory: {     role: 'harvester',working: true   }});
        }
        else if ( upgraders < maxUpgrader) {
        //else if ( upgraders < maxUpgrader && !construction.length) {
            Game.spawns.Spawn1.spawnCreep([WORK, CARRY, CARRY, MOVE], `creep-${ Math.ceil(Math.random() * 999999) }-upg`, {   memory: {     role: 'upgrader',working: true   }});
        }
        else if ( builders < maxBuilder ) {
            Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, CARRY, MOVE], `creep-${ Math.ceil(Math.random() * 999999) }-blder`,{ memory: { role: 'builder',working: true   } } );
/*
        }
        else if ( defenders < 1 ) {
            Game.spawns.Spawn1.spawnCreep([ATTACK, RANGED_ATTACK, MOVE], `creep-${ Math.ceil(Math.random() * 999999) }-exp`, {   memory: {     role: 'explorers',working: true   }});
*/
        }
    }
    
    
    creepsClean.run();
}



