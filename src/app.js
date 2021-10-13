const express = require("express");

const app = express();
const port = 3000;

const userRouter = require("./routers/user_router");
const adminRouter=require("./routers/admin_route");
app.use(express.json());

app.use(userRouter);
app.use(adminRouter);

app.listen(port, () => {
  console.log("port is active on " + port);
});
