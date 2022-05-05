import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import { ArticlesApi } from "../articlesApi.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("test_articles_database");
  await database.collection("articles").deleteMany({});
  app.use("/api/articles", ArticlesApi(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("article api", () => {
  it("adds a new article", async () => {
    const author = "Simen";
    const title = "My Test Article";
    const topic = "Innenriks";
    const article_text = "This is the article";
    await request(app)
      .post("/api/articles/new")
      .send({ author, title, topic, article_text })
      .expect(204);
    expect(
      (
        await request(app).get("/api/articles/").query({ author }).expect(200)
      ).body.map(({ title }) => title)
    ).toContain(title);
  });
});
