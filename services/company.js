const { Op } = require("sequelize");
const {
  Company,
  Company_Jobs,
  Job,
  User,
  User_Companies,
  Sequelize,
} = require("../models");

exports.all = async () => {
  try {
    const result = await Company.findAll({
      attributes: ["id", "name", "address", "phone"],
      include: [
        {
          attributes: ["id", "name"],
          model: Job,
          as: "jobs",
          through: { attributes: [] },
        },
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
          as: "users",
          through: { attributes: [] },
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
    const result = await Company.findOne({
      attributes: ["id", "name", "address", "phone"],
      include: [
        {
          attributes: ["id", "name"],
          model: Job,
          as: "jobs",
          through: { attributes: [] },
        },
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
          as: "users",
          through: { attributes: [] },
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
    await Company.create(data);
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    await Company.update(data, { where: { id } });
  } catch (err) {
    throw err;
  }
};

exports.delete = async (company_id) => {
  try {
    await Company.destroy({ where: { id: company_id } });
    await Company_Jobs.destroy({ where: { company_id } });
    await User_Companies.destroy({ where: { company_id } });
  } catch (err) {
    throw err;
  }
};

exports.addRelated = async (id, data, bulk = []) => {
  try {
    const { jobs } = data;
    console.log("jobs", jobs);

    if (jobs) {
      jobs.map((job_id) => {
        bulk.push({ company_id: id, job_id: job_id });
      });

      if (!!bulk.length) await Company_Jobs.bulkCreate(bulk);
    }
  } catch (err) {
    throw err;
  }
};

exports.deleteRelated = async (company_id, job_id) => {
  try {
    await Company_Jobs.destroy({
      where: { [Op.and]: [{ company_id }, { job_id }] },
    });
  } catch (err) {
    throw err;
  }
};
