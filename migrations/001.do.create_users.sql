CREATE TABLE users (
    id INTEGER UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    PRIMARY KEY (id)
)