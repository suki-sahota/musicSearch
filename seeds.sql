DROP DATABASE IF EXISTS top_songsDB;
CREATE DATABASE top_songsDB;
USE top_songsDB;

CREATE TABLE songs(
  id INT NOT NULL AUTO_INCREMENT,
  artist_name VARCHAR(100) NOT NULL,
  song_title VARCHAR(45) NOT NULL,
  release_year INT NULL,
  raw_pop_world DECIMAL(10,4) default 0,
  raw_pop_US DECIMAL(10, 4) default 0,
  raw_pop_UK DECIMAL(10, 4) default 0,
  raw_pop_EU DECIMAL(10, 4) default 0,
  raw_pop_other DECIMAL(10, 4) default 0,
  PRIMARY KEY (id)
);

CREATE TABLE topAlbums(
  id INT NOT NULL AUTO_INCREMENT,
  artist_name VARCHAR(100) NOT NULL,
  song_title VARCHAR(45) NOT NULL,
  release_year INT NULL,
  raw_pop_world DECIMAL(10,4) default 0,
  raw_pop_US DECIMAL(10, 4) default 0,
  raw_pop_UK DECIMAL(10, 4) default 0,
  raw_pop_EU DECIMAL(10, 4) default 0,
  raw_pop_other DECIMAL(10, 4) default 0,
  PRIMARY KEY (id)
);