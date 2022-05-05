import { Router } from "express";

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
    if (!author || !title || !topic || !article_text) {
      console.log("You need to pass in all required fields!");
      res.sendStatus(400);
      return;
    }
    try {
      await mongoDatabase.collection("articles").insertOne({
        author,
        title,
        topic,
        date: new Date(Date.now()),
        article_text,
      });
      res.sendStatus(204);
    } catch (error) {
      console.log(error.toString());
    }
  });

  // DENNE FUNKSJONEN HAR JEG FÅTT AV MAGNUS HODNE
  router.get("/topics", async (req, res) => {
    const topic = await mongoDatabase
      .collection("articles")
      .aggregate([{ $group: { _id: "$topic", total: { $sum: 1 } } }])
      .toArray();
  });

  return router;
}
