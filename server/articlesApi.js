import { Router } from "express";

const articles = [
  {
    title: "Sportsnyheter",
    date: "10-10-2021",
    name: "Test Author",
    topic: "sport",
    article_text: "Dette er en tekst som sportsnyheter i Norge.",
  },
];

export function ArticlesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const articles = await mongoDatabase
      .collection("articles")
      .find()
      .map(({ title }) => ({
        title,
      }))
      .toArray();
    res.json(articles);
  });

  router.get("/verifiedUser", async (req, res) => {
    const articles = await mongoDatabase
      .collection("articles")
      .find()
      .map(({ title, date, author, topic, article_text }) => ({
        title,
        date,
        author,
        topic,
        article_text,
      }))
      .toArray();
    res.json(articles);
  });

  router.post("/new", async (req, res) => {
    const { author, title, topic, article_text } = req.body;
    await mongoDatabase.collection("articles").insertOne({
      author,
      title,
      topic,
      date: new Date(Date.now()),
      article_text,
    });
    res.sendStatus(204);
  });

  return router;
}
