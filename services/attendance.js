const { Attendance, Company, Job, User, Sequelize } = require("../models");

exports.all = async () => {
  try {
    const result = await Attendance.findAll({
      attributes: [
        "id",
        "attendance_in",
        "attendance_out",
        "latitude",
        "longitude",
      ],
      include: [
        {
          attributes: [
            "id",
            [
              Sequelize.fn(
                "CONCAT_WS",
                " ",
                Sequelize.col("first_name"),
                Sequelize.col("last_name")
              ),
              "full_name",
            ],
            "username",
            "email",
            "nik",
          ],
          model: User,
          as: "user",
        },
        {
          attributes: ["id", "name"],
          model: Company,
          as: "company",
        },
        {
          attributes: ["id", "name"],
          model: Job,
          as: "job",
        },
      ],
    });
    return JSON.parse(JSON.stringify(result));
  } catch (err) {
    throw err;
  }
};

exports.single = async (query) => {
  try {
    const result = await Attendance.findOne({
      attributes: [
        "id",
        "attendance_in",
        "attendance_out",
        "latitude",
        "longitude",
      ],
      include: [
        {
          attributes: [
            "id",
            [
              Sequelize.fn(
                "CONCAT_WS",
                " ",
                Sequelize.col("first_name"),
                Sequelize.col("last_name")
              ),
              "full_name",
            ],
            "username",
            "email",
            "nik",
          ],
          model: User,
          as: "user",
        },
        {
          attributes: ["id", "name"],
          model: Company,
          as: "company",
        },
        {
          attributes: ["id", "name"],
          model: Job,
          as: "job",
        },
      ],
      where: query,
    });
    return JSON.parse(JSON.stringify(result));
  } catch (err) {
    throw err;
  }
};

exports.add = async (data) => {
  try {
    await Attendance.create(data);
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    await Attendance.update(data, { where: { id } });
  } catch (err) {
    throw err;
  }
};

exports.delete = async (id) => {
  try {
    await Attendance.destroy({ where: { id } });
  } catch (err) {
    throw err;
  }
};
