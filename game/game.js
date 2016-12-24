// Creates a game

function Game(send) {
    let level;
    const schedule = Schedule();
    let player;

    const actors = new Map();
    let nextActorId = 1;
    function createActor(proto) {
        const actor = Object.create(proto);
        actor.id = nextActorId;
        actors.set(nextActorId, actor);
        nextActorId += 1;
    }

    function init(seed) {
        player = createActor(Player);
        level = Level(xy2pos(24, 15), seed);
        for (const pos of level.actors) {
            const id = level.actors[pos];
            schedule.push(id, 0);
        }
        
        for (const pos of level.positions) {
            const tile = level.types.get(pos);
            send(SET_TILE, pos, tile);
        }
return;
        while (true) {
            const id = schedule.pop();
            const actor = actors.get(id);
            const delay = actor.act({
                fov: console.log,
            });
            if (isNaN(delay)) {
                break;
            } else {
                 schedule.push(id, delay);
            }
        }
    }

    function move() {

    }

    function rest() {

    }

    const commands = {
        [INIT]: init,
        [MOVE]: move,
        [REST]: rest,
    };

    function receive(commandName, ...args) {
        const command = commands[commandName];
        if (!command) {
            throw `${commandName.toString()} is not a valid command`;
        }
        command(...args);
        send(OVER);
    }

    return receive;
}
