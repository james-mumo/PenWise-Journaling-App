setup the db 

CREATE DATABASE penwise;
CREATE USER penwise_user WITH ENCRYPTED PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE penwise TO penwise_user;



DATABASE_URL=postgresql://penwise_user:@localhost:5432/penwise


//////
DATABASE_URL=postgresql://username:password@localhost:5432/penwise


