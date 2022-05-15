// import libraries and other helpers files
const server = require("./server");

// import connection database
const { connectDatabase } = require("./db/connection");

// import routes
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");

// route middlewares
server.use("/api/v1", authRoutes);
server.use("/api/v1/users", usersRoutes);

// turn on server for connect clients
(async () => {
  try {
    await connectDatabase();
    server.listen(3030, () => {
      console.log(`Server connected to the port 3030`);
    });
  } catch (error) {
    console.error(error);
  }
})();
