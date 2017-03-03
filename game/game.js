this.Game = {
    version: '0.1.0',
    SAVE_NAME: 'hex adventure',

    // load save game if it exists, otherwise create a new game
    getGame() {
        let game = Game.load() || Game.create(Date.now())
        if (game.version !== Game.version) {
            console.warn('Save game is out of date')
        }
        console.log('Seed:', game.seed)
        return game
    },

    create(seed) {
        const game = {
            version: Game.version,
            seed: seed,
            schedule: Schedule.create(),
            entities: Entities.create(),
        }

        game.player = {pos: 234}
        game.level = Level.create(seed, game.player)

        return game
    },

    save(game) {
        localStorage[Game.SAVE_NAME] = JSON.stringify(game)
    },

    load() {
        const saveFile = localStorage[Game.SAVE_NAME]
        return saveFile && JSON.parse(saveFile, Game.reviver)
    },
}