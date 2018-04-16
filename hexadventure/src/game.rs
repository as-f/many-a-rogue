use level::basic;
use level::tile::{Tile, TileMemory};
use player::Player;
use util::fov::fov;
use util::grid::{Direction, Grid, Pos};

pub struct Game {
    pub turn: u32,
    pub level: Grid<Tile>,
    pub player: Player,
    pub level_memory: Grid<TileMemory>,
}

impl Game {
    pub fn new(width: usize, height: usize) -> Self {
        let level = basic::generate(width, height, [1, 2, 3, 4]);
        let player_pos = place_player(&level);
        let level_memory = Grid::new(width, height, |_pos| TileMemory::new(Tile::Wall, 0));
        let mut game = Game {
            turn: 0,
            level,
            player: Player::new(player_pos),
            level_memory,
        };
        game.next_turn();
        game
    }

    pub fn move_player(&mut self, direction: Direction) {
        let target_pos = self.player.pos + direction;
        if self.level[target_pos].passable() {
            self.player.pos = target_pos;
            self.player.facing = direction;
            self.next_turn();
        }
    }

    fn next_turn(&mut self) {
        self.turn += 1;
        let level = &self.level;
        let memory = &mut self.level_memory;
        let turn = self.turn;
        fov(
            self.player.pos,
            |pos| level[pos].transparent(),
            |pos| memory[pos] = TileMemory::new(level[pos], turn),
        );
    }
}

fn place_player(level: &Grid<Tile>) -> Pos {
    let center = level.center();
    *level
        .positions()
        .iter()
        .filter(|&&pos| level[pos].passable())
        .min_by_key(|&pos| pos.distance(center))
        .unwrap()
}