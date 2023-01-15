module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TARGET,
    host: process.env.DB_HOST,
    url: process.env.DB_URL,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TARGET,
    host: process.env.DB_HOST,
    url: process.env.DB_URL,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TARGET,
    host: process.env.DB_HOST,
    url: process.env.DB_URL,
    dialect: "postgres",
  },
};
