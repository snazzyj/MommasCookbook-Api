module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://alex:1@localhost/cookbook-api',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://alex:1@localhost/cookbook-api',
    JWT_SECRET: process.env.JWT_SECRET || 'cookbook-special-secret'
  }