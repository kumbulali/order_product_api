import request from "supertest";
import app from "../app";
import { dataSource } from "../config/dataSource";

let adminToken: string;

beforeAll(async () => {
  await dataSource.initialize();
});
afterAll(async () => {
  await dataSource.destroy();
});

describe("TESTING /api/auth ENDPOINTS", () => {
  //// LOGIN ENDPOINT TESTING
  describe("/login", () => {
    test(`should return 200 status code, Bearer token and success must be 1.`, async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@test.test",
        password: "testpass",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(1);
      adminToken = res.body.message;
    });
    test(`should return 400 status code, "Invalid email address." error as a message and success must be 0."`, async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@test",
        password: "testpass",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(0);
      expect(res.body.message).toBe("Invalid email address.");
    });
    test(`should return 400 status code, "There are some missing fields." error as a message and success must be 0."`, async () => {
      const res = await request(app).post("/api/auth/login").send({
        password: "testpass",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(0);
      expect(res.body.message).toBe("There are some missing fields.");
    });
    test(`should return 400 status code, "Email and password does not match." error as a message and success must be 0."`, async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "wrong_email@password.combination",
        password: "testpass",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(0);
      expect(res.body.message).toBe("Email and password does not match.");
    });
  });
  //// REGISTER ENDPOINT TESTING
  describe("/register", () => {
    afterAll(async () => {
      await request(app)
        .delete("/api/users/email/test@tes1t.test")
        .set("Authorization", `Bearer ${adminToken}`);
    });
    test(`should return 400 status code, "There are some missing fields." error as a message and success must be 0.`, async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "admin@admin.com",
        name: "Admin",
        passwordAgain: "admin",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(0);
      expect(res.body.message).toBe("There are some missing fields.");
    });
    test(`should return 400 status code, "Passwords do not match." error as a message and success must be 0.`, async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "admin@admin.com",
        name: "Admin",
        password: "admin",
        passwordAgain: "asdasdasd",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(0);
      expect(res.body.message).toBe("Passwords do not match.");
    });
    test(`should return 400 status code, "Invalid email address." error as a message and success must be 0.`, async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "admin@admin",
        name: "Admin",
        password: "admin",
        passwordAgain: "asdasdasd",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(0);
      expect(res.body.message).toBe("Invalid email address.");
    });
    test(`should return 200 status code with succes: 1 and bearer token`, async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "test@tes1t.test",
        name: "Test",
        password: "testpass",
        passwordAgain: "testpass",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(1);
    });
  });
  //// CHANGE-PASSWORD ENDPOINT TESTING
  describe("/change-password", () => {
    afterEach(async () => {
      await request(app)
        .post("/api/auth/change-password")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          oldPassword: "testpasschanged",
          newPassword: "testpass",
        });
    });
    test(`should return 202 status code, "Password successfully updated." as a message and success must be 1.`, async () => {
      const res = await request(app)
        .post("/api/auth/change-password")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          oldPassword: "testpass",
          newPassword: "testpasschanged",
        });
      expect(res.statusCode).toEqual(202);
      expect(res.body.success).toBe(1);
      expect(res.body.message).toBe("Password successfully updated.");
    });
    test(`should return 400 status code, "Old password is invalid." error as a message and success must be 0."`, async () => {
      const res = await request(app)
        .post("/api/auth/change-password")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          oldPassword: "wrongOldPassword",
          newPassword: "testpass",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(0);
      expect(res.body.message).toBe("Old password is invalid.");
    });
    test(`should return 400 status code, "There are some missing fields." error as a message and success must be 0."`, async () => {
      const res = await request(app)
        .post("/api/auth/change-password")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          oldPassword: "testpass",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(0);
      expect(res.body.message).toBe("There are some missing fields.");
    });
    test(`should return 401 status code, "Unauthorized user." error as a message and success must be 0."`, async () => {
      const res = await request(app).post("/api/auth/change-password").send({
        newPassword: "randompass",
        oldPassword: "testpass",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(0);
      expect(res.body.message).toBe("Unauthorized user.");
    });
  });
});
