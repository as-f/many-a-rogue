(() => {
    const tilemap = {
        wall: {
            x: 0,
            y: 0,
            color: '#EEE',
        },
        floor: {
            x: 1,
            y: 0,
            color: '#FFF',
        },
    };


    function cacheTiles(tileset, xu, yu) {
        for (const type in tilemap) {
            const tile = tilemap[type];

            const canvas = document.createElement('canvas');
            canvas.width = xu;
            canvas.height = yu;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(tileset, tile.x * xu, tile.y * yu, yu, 0, 0, xu, yu);
            ctx.globalCompositeOperation = 'source-in';
            ctx.fillRect(0, 0, xu, yu);

            tile.canvas = canvas;
        }
    }


    function Tiles(source, tilemap, xu, yu, callback) {
        const tileset = document.createElement('img');

        tileset.addEventListener('load', () => {
            cacheTiles(tileset, xu, yu);
            callback();
        }, false);

        tileset.src = source;
        return tilemap;
    }


    this.Tiles = Tiles;
})();