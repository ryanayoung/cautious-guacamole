//Test comment
var roleHarvester = require('role.harvester');
var roleTowerCreep = require('role.towercreep');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var creepsClean = require('creeps.clean');

var spawnHome = Game.spawns.Spawn1;
var roomHome = _.values(Game.rooms)[0];

var maxCreeps = 20;
var maxHarvester = 3;
var maxUpgrader = 3;
var maxBuilder = 1;
var maxTowerCreep = 2;


var repairCounter = 0;
var logCounter = 0;

function defendRoom(roomName) {
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
}

module.exports.loop = function () {
    
    var towercreeps  = _(Game.creeps).filter( { memory: { role: 'towercreep'}}).size();
    var harvesters  = _(Game.creeps).filter( { memory: { role: 'harvester'}}).size();
    var upgraders   = _(Game.creeps).filter( { memory: { role: 'upgrader'}}).size();
    var builders    = _(Game.creeps).filter( { memory: { role: 'builder'}}).size();
    var explorers   = _(Game.creeps).filter( { memory: { role: 'explorers'}}).size();
    var towers = Game.rooms[roomHome.name].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    
    
    defendRoom(roomHome.name);
    
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
        var repairables = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

        
        if(repairCounter >= repairables.length) {
                        repairCounter = 0;
            }
        if(repairables.length) {
            var repairableStructure = repairables[repairCounter]._structureType;
            if((repairableStructure == 'constructedWall') || (repairableStructure == 'rampart')) {
                if(repairables[repairCounter]._hits <= 50000) {
                    var repairStatus_s = `Repairing ${repairables[repairCounter]._structureType}, repairCounter= ${repairCounter}`;
                //console.log(repairStatus_s);
                    towers.forEach(tower => tower.repair(repairables[repairCounter]));
                }
                else {
                   repairCounter = repairCounter + 1;
                }
            }
            else if(repairableStructure) { //verify repairables is defined
                var repairStatus_s = `Repairing ${repairables[repairCounter]._structureType}, repairCounter= ${repairCounter}`;
                //console.log(`Repairing ${repairables[repairCounter]._structureType}`);
                towers.forEach(tower => tower.repair(repairables[repairCounter]));
            }
        }
        
        
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'towercreep') {
            roleTowerCreep.run(creep); 
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep); 
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } 
    }
    
    if(Object.keys(Game.creeps).length < maxCreeps) {
        if ( harvesters < maxHarvester ) {
            Game.spawns.Spawn1.spawnCreep([WORK,WORK,CARRY,MOVE], `creep-${ Math.ceil(Math.random() * 999999) }-har`, {   memory: {     role: 'harvester',working: true   }});
        }
        else if ( towercreeps < maxTowerCreep) {
            Game.spawns.Spawn1.spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], `creep-${ Math.ceil(Math.random() * 999999) }-twer`, {   memory: {     role: 'towercreep',working: true   }});
        }
        else if ( upgraders < maxUpgrader) {
            Game.spawns.Spawn1.spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], `creep-${ Math.ceil(Math.random() * 999999) }-upg`, {   memory: {     role: 'upgrader',working: true   }});
        }
        else if ( builders < maxBuilder ) {
            Game.spawns['Spawn1'].spawnCreep( [WORK,CARRY,CARRY,MOVE,MOVE], `creep-${ Math.ceil(Math.random() * 999999) }-blder`,{ memory: { role: 'builder',working: true   } } );
/*
        }
        else if ( defenders < 1 ) {
            Game.spawns.Spawn1.spawnCreep([ATTACK, RANGED_ATTACK, MOVE], `creep-${ Math.ceil(Math.random() * 999999) }-exp`, {   memory: {     role: 'explorers',working: true   }});
*/
        }
    }
    
    
    creepsClean.run();
}

