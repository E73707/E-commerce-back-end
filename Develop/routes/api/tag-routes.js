const router = require("express").Router();

const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({ include: [{ model: Product, through: ProductTag }] }).then(
    (data) => {
      res.json(data);
    }
  );
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [{ model: Product, through: ProductTag }],
  })
    .then((data) => {
      if (!data) {
        res.status(404).json("sorry no tag found with that id");
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      if (!result[0]) {
        res.status(404).json("sorry no tag found with that ID");
        return;
      }
      res.json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Tag.destroy({ where: { id: req.params.id } });

    if (!data) {
      res.status(404).json("sorry no tag found with that ID");
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // delete on tag by its `id` value
});

module.exports = router;
