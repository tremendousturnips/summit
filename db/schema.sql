DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  bio TEXT
);
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  text TEXT,
  user_id REFERENCES users (id),
  room_id REFERENCES rooms (id),
  channel_id REFERENCES channels (id),
  created_at TIMESTAMP NOT NULL
);
CREATE TABLE friends (
  id SERIAL PRIMARY KEY,

);
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,

);
CREATE TABLE channels (
  id SERIAL PRIMARY KEY,

);
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,

);
CREATE TABLE directs (
  id SERIAL PRIMARY KEY,

);
