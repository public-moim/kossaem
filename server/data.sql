CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY ,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    username VARCHAR(30),
    profile_photo VARCHAR,
    role_id INT,
    date VARCHAR(50)
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    type VARCHAR(30)
);

CREATE TABLE quiz_register (
    id SERIAL, 
    question VARCHAR(300), 
    options VARCHAR[],
    answer VARCHAR, 
    category VARCHAR(20),
    type VARCHAR(20),
    filePath VARCHAR(300),
    instructions VARCHAR(50)
);

CREATE TABLE quiz_record (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR,
    quiz_id INT, 
    result VARCHAR(30),
    point_earned INT,
    youranswer VARCHAR(30),
    date DATE
);

CREATE TABLE login (
    
    user_id VARCHAR,
    login_time DATE
);

