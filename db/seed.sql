source db/schema.sql;

USE messages_db;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS conversation;
DROP TABLE IF EXISTS message;

CREATE TABLE user (
    user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE conversation (
    conversation_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    conversation_name VARCHAR(50) DEFAULT 'conversation',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE message (
    message_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    message_text VARCHAR(250),
    sender_id INTEGER,
    conversation_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user (username, email, password)
VALUES
    ('mickey', 'mm@dsny.com', '1234'),
    ('donald', 'dd@dsny.com', '1234'),
    ('goofy', 'gfy@dsny.com', '1234'),
    ('pluto', 'pl@dsny.com', '1234');

INSERT INTO conversation (conversation_name)
VALUES
    ('Play House'),
    ('Dog'),
    ('Swimming'),
    ('Aeroplane'),
    ('Pancakes'),
    ('Disneyland!');

CREATE TABLE participants (
    participants_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    conversation_id INTEGER not NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (conversation_id) REFERENCES conversation(id)
);

INSERT INTO participants (user_id, conversation_id)
VALUES
    (3, 1),
    (1, 1),
    (2, 1),
    (1, 2),
    (4, 2),
    (3, 3),
    (2, 3),
    (3, 4),
    (1, 4),
    (2, 5),
    (1, 5),
    (3, 5),
    (4, 5),
    (1, 6),
    (3, 6),
    (2, 6);

INSERT INTO message (message_text, sender_id, conversation_id)
VALUES
    -- PLAYHOUSE
    ('I finished cleaning the playhouse!', 3, 1),
    ('Thanks Goofy!', 1, 1),
    ('Stupid, bucket.', 2, 1),
    -- DOG
    ("Pluto it's time for a bath", 1, 2),
    ('woof..', 4, 2),
    -- SWIMMING
    ("Get yer shorts on boys its time to head to the water hole!", 3, 3),
    ("I don't wear shorts Goofy, I'm a duck", 2, 3),
    -- AEROPLANE
    ('Take the wheel mickey! I gotta get on the wing and fix the flap!', 3, 4),
    ('WOOOAAAHH, Goofy! Hold on to your britches', 1, 4),
    -- PANCAKES
    ("Who's hungry boys, I'm making pancakes!", 2, 5),
    ('Me!', 1, 5),
    ('Garsh! Me too! Thanks Donald', 3, 5),
    ('WOOF!', 4, 5),
    -- DISNEYLAND
    ('Disneyland 2022!!', 1, 6),
    ('Lets go!! uh~hyuck!', 3, 6),
    ('I hate disneyland..!@%?!', 2, 6);


-- -- GET all messages details
-- SELECT
--     message.message_text, user.username, conversation.conversation_name
-- FROM message
-- LEFT JOIN user ON message.sender_id = user.id
-- LEFT JOIN conversation ON message.conversation_id = conversation.id;

-- -- GET all conversation of a single user
-- SELECT
--     msg.message_text,
--     user.username
-- FROM message AS msg
-- LEFT JOIN user ON message.sender_id = user.id
-- WHERE msg.conversation_id
-- ;

-- get a single user
-- get all the conversations for that user
-- get table for each conversation id

SELECT
    conversation_id
FROM participants
WHERE user_id = 4;

-- using conversation id's
-- get all messages matching convo id
SELECT
    msg.message_text,
    user.username
FROM message AS msg
LEFT JOIN user ON msg.sender_id = user.id
WHERE conversation_id = 2;
