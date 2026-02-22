// mikro-orm.config.ts
import { Options } from '@mikro-orm/core';
import { Playlist, PlaylistQuestion, Question, Room, RoomPlayer, User, UserPlaylist } from "./entities";

const options: Options = {
    type: 'postgresql',
    entities: [Playlist, Question, Room, User, RoomPlayer, PlaylistQuestion, UserPlaylist],

    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    debug: process.env.NODE_ENV !== 'production',

    migrations: {
        tableName: 'mikro_orm_migrations',
        path: './dist/migrations',
        pathTs: './migrations',
        glob: '!(*.d).{js,ts}',

        transactional: true,
        allOrNothing: true,
        dropTables: false,
        safe: true,
        snapshot: true,
    },
    schemaGenerator: {
        disableForeignKeys: false,
        createForeignKeyConstraints: true,
    },
};

export default options;
