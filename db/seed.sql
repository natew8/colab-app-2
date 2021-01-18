--  DROP TABLE IF EXISTS comments
--  DROP TABLE IF EXISTS conversations
--  DROP TABLE IF EXISTS song_versions
--  DROP TABLE IF EXISTS songs
--  DROP TABLE IF EXISTS projects_users
--  DROP TABLE IF EXISTS projects
--  DROP TABLE IF EXISTS colab_user

--  CREATE TABLE colab_user(
--  id SERIAL PRIMARY KEY,
--  username VARCHAR(150),
--  email VARCHAR(250) NOT NULL UNIQUE, 
--  password VARCHAR,
--  role VARCHAR,
--  profile_pic TEXT 
-- )

-- CREATE TABLE projects(
-- id SERIAL PRIMARY KEY,
-- project_title VARCHAR,
-- deadline VARCHAR,
-- project_creator_id INT REFERENCES colab_user(id) ON DELETE CASCADE,
-- created TIMESTAMPTZ DEFAULT NOW()
-- )


-- CREATE TABLE projects_users(
-- id SERIAL PRIMARY KEY,
-- users_id INT REFERENCES colab_user(id) ON DELETE CASCADE,
-- project_id INT REFERENCES projects(id) ON DELETE CASCADE,
-- )


-- CREATE TABLE songs(
-- id SERIAL PRIMARY KEY,
-- project_id INT REFERENCES projects(id) ON DELETE CASCADE,
-- song_creator_id INT REFERENCES colab_user(id) ON DELETE CASCADE,
-- song_title VARCHAR(100),
-- artist_name VARCHAR(50),
-- song_key VARCHAR(10),
-- song_bpm VARCHAR(10),
-- song_time VARCHAR(10),
-- status VARCHAR,
-- song_notes VARCHAR,
-- created TIMESTAMPTZ DEFAULT NOW()
-- )

-- CREATE TABLE song_versions(
-- id SERIAL PRIMARY KEY,
-- song_id INT REFERENCES songs(id) ON DELETE CASCADE,
-- uploader_id INT REFERENCES colab_user(id) ON DELETE CASCADE,
-- version_title VARCHAR(200),
-- audio_file TEXT
-- upload_date TIMESTAMPTZ DEFAULT NOW()
-- )

-- CREATE TABLE conversations (
-- id SERIAL PRIMARY KEY,
-- song_id INT REFERENCES song_versions(id) ON DELETE CASCADE,
-- author_id INT REFERENCES colab_user(id) ON DELETE CASCADE,
-- subject_line VARCHAR(150),
-- song_time VARCHAR(20),
-- body VARCHAR,
-- song_version VARCHAR(100),
-- convo_created TIMESTAMPTZ DEFAULT NOW()
-- )

-- CREATE TABLE comments (
-- id SERIAL PRIMARY KEY,
-- convo_id INT REFERENCES conversations(id) ON DELETE CASCADE,
-- author_id INT REFERENCES colab_user(id) ON DELETE CASCADE,
-- comment VARCHAR,
-- date_created TIMESTAMPTZ DEFAULT NOW()
-- )

-- DELETE FROM projects_users;
-- DELETE FROM comments;
-- DELETE FROM conversations;
-- DELETE FROM songs;
-- DELETE FROM projects;
-- DELETE FROM colab_user;



--Testing Cascade Delete

-- CREATE TABLE test_table (
-- id SERIAL PRIMARY key,
-- name VARCHAR(30),
-- favorite_color VARCHAR(20)
-- );
-- INSERT INTO test_table (name, favorite_color)
-- VALUES('Nate','Blue'),('Kaylie','Purple'),('Bash','Dinosaur'),('Lucas','Sleep')