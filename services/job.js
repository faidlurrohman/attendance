const { Op } = require("sequelize");
const {
  Company,
  Company_Jobs,
  Job,
  User,
  User_Jobs,
  Sequelize,
} = require("../models");

exports.all = async () => {
  try {
    const result = await Job.findAll({
      attributes: ["id", "name"],
      include: [
        {
          attributes: ["id", "name"],
          model: Company,
          as: "companies",
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
    const result = await Job.findOne({
      attributes: ["id", "name"],
      include: [
        {
          attributes: ["id", "name"],
          model: Company,
          as: "companies",
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
    await Job.create(data);
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    await Job.update(data, { where: { id } });
  } catch (err) {
    throw err;
  }
};

exports.delete = async (job_id) => {
  try {
    await Job.destroy({ where: { id: job_id } });
    await Company_Jobs.destroy({ where: { job_id } });
    await User_Jobs.destroy({ where: { job_id } });
  } catch (err) {
    throw err;
  }
};

exports.addRelated = async (id, data, bulk = []) => {
  try {
    const { companies } = data;
    if (companies) {
      companies.map((company_id) => {
        bulk.push({ company_id: company_id, job_id: id });
      });

      if (!!bulk.length) await Company_Jobs.bulkCreate(bulk);
    }
  } catch (err) {
    throw err;
  }
};

exports.deleteRelated = async (job_id, company_id) => {
  try {
    await Company_Jobs.destroy({
      where: { [Op.and]: [{ job_id }, { company_id }] },
    });
  } catch (err) {
    throw err;
  }
};
