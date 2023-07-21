Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1',
    { memory: { role: 'builder' } } );


//needs extensions
Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
    'HarvesterBig',
    { memory: { role: 'harvester' } } );