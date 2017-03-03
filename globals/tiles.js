// Constants for map tiles

const keys = ['name'         , 'canWalk', 'transparent', 'canFly']
const vals = [//             ,          ,              ,         ],
             ['WALL'         , false    , false        , false   ],
             ['FLOOR'        , true     , true         , true    ],
             ['DEEP_WATER'   , false    , true         , true    ],
             ['SHALLOW_WATER', true     , true         , true    ],
             ['PIT'          , false    , true         , true    ],
]


const Tiles = {}
for (let i = 0; i < vals.length; i++) {
    const properties = vals[i]
    const name = properties[0]
    const tile = {}
    for (let j = 0; j < keys.length; j++) {
        tile[keys[j]] = properties[j]
    }
    this[name] = name
    Tiles[name] = tile
}