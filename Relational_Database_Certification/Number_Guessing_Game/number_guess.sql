
create if not exists table users(
  username varchar(22) primary key not null unique,
  games_played int not null,
  best_game int
);

insert into users (username, games_played, best_game) values ('bruh',23,5)