const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");

const { User } = require("../../models/user");

const { DB_HOST_TEST, PORT } = process.env;

describe("test /user/register", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  // beforeEach(() => {});

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test register route with correct data", async () => {
    const registerData = {
      name: "Alex",
      email: "12345@gmail.com",
      password: "1234567",
    };

    const subscription = "starter";

    const res = await request(app).post("/users/register").send(registerData);

    // const testData = {
    //   user: {
    //     email: "12345@gmail.com",
    //     subscription: "starter",
    //   },
    // };

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(registerData.email);
    expect(res.body.user.subscription).toBe(subscription);
    // expect(res.body.user).toBe(testData.user);

    const user = await User.findOne({ email: registerData.email });

    expect(user.email).toBe(registerData.email);
  });
});
