const Plant = require("../models/plants");
const router = require("express").Router();
const Client = require("../models/clientSchema");
const { verifyStaff } = require("../middlewares/verify");
const Staff = require("../models/staff");

router.post("/added", async (req, res) => {
  try {
    const { plants_id, short_id, address, latitude, longitude, zone, project } =
      req.body;
    const newPlant = await new Plant({
      ...req.body,
    });
    await newPlant.save();
    res.status(200).send({ success: true, data: newPlant });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

router.get("/all/:Id", async (req, res) => {
  try {
    const UserId = req.params.Id;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }
    const user = await Client.findById(UserId);
    const plantId = user.waterPlant;
    const total = plantId.length;
    let allPlant = await Plant.find({ _id: plantId })
      .select("short_id address")
      .skip(skip)
      .limit(limit)
      .sort(sortBY);
    if (allPlant == "null") {
      const allPlant = [];
      const totalPages = Math.ceil(total / limit);
      return res.status(200).send({
        success: true,
        data: allPlant,
        page,
        totalPages,
        limit,
        total,
      });
    }
    const totalPages = Math.ceil(total / limit);
    res.status(200).send({
      success: true,
      data: allPlant,
      page,
      totalPages,
      limit,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const total = await Plant.countDocuments();

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const allPlant = await Plant.find()
      .select("short_id address")
      .skip(skip)
      .limit(limit)
      .sort(sortBY);

    const totalPages = Math.ceil(total / limit);
    res.status(200).send({
      success: true,
      data: allPlant,
      page,
      totalPages,
      limit,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

router.get("/one/:id", async (req, res) => {
  try {
    const address = req.params.id;
    const plant = await Plant.findById(address);
    if (plant == null) {
      return res
        .status(400)
        .send({ success: false, message: "No Plant found on that location" });
    }
    res.status(200).send({ success: true, data: plant });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

router.get("/search/:address", async (req, res) => {
  try {
    const searchfield = req.params.address;
    let sortBY = { createdAt: -1 };

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const total = await Plant.countDocuments({
      $or: [
        { plants_id: { $regex: searchfield, $options: "i" } },
        { short_id: { $regex: searchfield, $options: "i" } },
      ],
    });

    const plant = await Plant.find({
      $or: [
        { plants_id: { $regex: searchfield, $options: "i" } },
        { short_id: { $regex: searchfield, $options: "i" } },
      ],
    })
      .sort(sortBY)
      .skip(skip)
      .limit(limit)
      .select("short_id plants_id address");

    const totalPages = Math.ceil(total / limit);

    res
      .status(200)
      .send({ success: true, data: plant, limit, total, totalPages });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/staff/:id", async (req, res) => {
  try {
    const staffId = req.params.id;

    const staff = await Staff.findById(staffId).populate({
      path: "plant",
      select: "plants_id short_id address",
    });
    res.status(200).send({ success: true, data: staff });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.delete("/delete/Plant/:Id", async (req, res) => {
  try {
    const userId = req.params.Id;
    const user = await Plant.findByIdAndDelete(userId);
    if (!user) {
      return res
        .status(400)
        .send({ seccess: false, message: "No Plant Found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Plant deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

module.exports = router;
