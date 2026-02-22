import { Migration } from '@mikro-orm/migrations';

export class Migration20260113114933 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "question" ("id" varchar(255) not null, "content" varchar(255) not null, "creator_id" varchar(255) null, constraint "question_pkey" primary key ("id"));');

    this.addSql('create table "playlist" ("id" varchar(255) not null, "name" varchar(255) not null, "creator_id" varchar(255) null, constraint "playlist_pkey" primary key ("id"));');

    this.addSql('create table "room" ("id" varchar(255) not null, "playlist_id" varchar(255) null, "votes_counter" int not null, "question_index" int not null, constraint "room_pkey" primary key ("id", "playlist_id"));');

    this.addSql('create table "room_player" ("player_id_id" varchar(255) null, "room_id_id" varchar(255) null, "room_id_playlist_id" varchar(255) null, "voted" boolean not null, "vote" boolean not null, "vote_kick" int not null, "have_counter" int not null, "have_not_counter" int not null, constraint "room_player_pkey" primary key ("player_id_id", "room_id_id", "room_id_playlist_id"));');

    this.addSql('create table "playlist_question" ("playlist_id" varchar(255) null, "question_id" varchar(255) null, constraint "playlist_question_pkey" primary key ("playlist_id", "question_id"));');

    this.addSql('create table "user_playlist" ("player_id" varchar(255) null, "playlist_id" varchar(255) null, constraint "user_playlist_pkey" primary key ("player_id", "playlist_id"));');

    this.addSql('alter table "question" add constraint "question_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "playlist" add constraint "playlist_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "room" add constraint "room_playlist_id_foreign" foreign key ("playlist_id") references "playlist" ("id") on update cascade on delete set null;');

    this.addSql('alter table "room_player" add constraint "room_player_player_id_id_foreign" foreign key ("player_id_id") references "user" ("id") on update cascade on delete set null;');
    this.addSql('alter table "room_player" add constraint "room_player_room_id_id_room_id_playlist_id_foreign" foreign key ("room_id_id", "room_id_playlist_id") references "room" ("id", "playlist_id") on update cascade on delete set null;');

    this.addSql('alter table "playlist_question" add constraint "playlist_question_playlist_id_foreign" foreign key ("playlist_id") references "playlist" ("id") on update cascade on delete set null;');
    this.addSql('alter table "playlist_question" add constraint "playlist_question_question_id_foreign" foreign key ("question_id") references "question" ("id") on update cascade on delete set null;');

    this.addSql('alter table "user_playlist" add constraint "user_playlist_player_id_foreign" foreign key ("player_id") references "user" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user_playlist" add constraint "user_playlist_playlist_id_foreign" foreign key ("playlist_id") references "playlist" ("id") on update cascade on delete set null;');
  }

}
