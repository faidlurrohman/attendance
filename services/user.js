const { Op } = require("sequelize");
const {
  Attendance,
  Company,
  Job,
  User,
  User_Companies,
  User_Jobs,
  Sequelize,
} = require("../models");

const currentDate = new Date();
const startDay = new Date(
  Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0,
    0
  )
);
const endDay = new Date(
  Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23,
    59,
    59,
    999
  )
);

exports.all = async () => {
  try {
    const result = await User.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        [
          Sequelize.fn(
            "CONCAT_WS",
            " ",
            Sequelize.col("first_name"),
            Sequelize.col("last_name")
          ),
          "full_name",
        ],
        "nik",
        "username",
        "email",
        "password",
        "address",
        "phone",
      ],
      include: [
        {
          attributes: ["id", "name", "address", "phone"],
          model: Company,
          as: "companies",
          through: { attributes: [] },
          include: [
            {
              attributes: ["id", "name"],
              model: Job,
              as: "jobs",
              through: { attributes: [] },
              where: {
                id: {
                  [Op.any]: Sequelize.literal(
                    `(
                      ARRAY(
                        SELECT "job_id" FROM "User_Jobs"
                        JOIN "Users" ON "Users"."id"="User_Jobs"."user_id"
                      )
                    )`
                  ),
                },
              },
            },
          ],
        },
        {
          attributes: ["id", "name"],
          model: Job,
          as: "jobs",
          through: { attributes: [] },
        },
        {
          attributes: [
            "id",
            "attendance_in",
            "attendance_out",
            "latitude",
            "longitude",
          ],
          model: Attendance,
          as: "attendances",
        },
        {
          attributes: [
            "id",
            "attendance_in",
            "attendance_out",
            "latitude",
            "longitude",
          ],
          model: Attendance,
          as: "current_attendance",
          required: false,
          where: {
            [Op.and]: [
              { attendance_in: { [Op.gt]: startDay } },
              { attendance_in: { [Op.lte]: endDay } },
              { attendance_out: { [Op.eq]: null } },
            ],
          },
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
    const result = await User.findOne({
      attributes: [
        "id",
        "first_name",
        "last_name",
        [
          Sequelize.fn(
            "CONCAT_WS",
            " ",
            Sequelize.col("first_name"),
            Sequelize.col("last_name")
          ),
          "full_name",
        ],
        "nik",
        "username",
        "email",
        "password",
        "address",
        "phone",
      ],
      include: [
        {
          attributes: ["id", "name", "address", "phone"],
          model: Company,
          as: "companies",
          through: { attributes: [] },
          include: [
            {
              attributes: ["id", "name"],
              model: Job,
              as: "jobs",
              through: { attributes: [] },
              where: {
                id: {
                  [Op.any]: Sequelize.literal(
                    `(
                      ARRAY(
                        SELECT "job_id" FROM "User_Jobs"
                        JOIN "Users" ON "Users"."id"="User_Jobs"."user_id"
                      )
                    )`
                  ),
                },
              },
            },
          ],
        },
        {
          attributes: ["id", "name"],
          model: Job,
          as: "jobs",
          through: { attributes: [] },
        },
        {
          attributes: [
            "id",
            "attendance_in",
            "attendance_out",
            "latitude",
            "longitude",
          ],
          model: Attendance,
          as: "attendances",
        },
        {
          attributes: [
            "id",
            "attendance_in",
            "attendance_out",
            "latitude",
            "longitude",
          ],
          model: Attendance,
          as: "current_attendance",
          required: false,
          where: {
            [Op.and]: [
              { attendance_in: { [Op.gt]: startDay } },
              { attendance_in: { [Op.lte]: endDay } },
              { attendance_out: { [Op.eq]: null } },
            ],
          },
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
    await User.create(data);
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    await User.update(data, { where: { id } });
  } catch (err) {
    throw err;
  }
};

exports.delete = async (user_id) => {
  try {
    await User.destroy({ where: { id: user_id } });
    await User_Companies.destroy({ where: { user_id } });
    await User_Jobs.destroy({ where: { user_id } });
  } catch (err) {
    throw err;
  }
};

exports.addRelated = async (related, id, data, bulk = []) => {
  try {
    if (related === "companies") {
      const { companies } = data;
      if (companies) {
        companies.map((company_id) => {
          bulk.push({ user_id: id, company_id: company_id });
        });
        if (!!bulk.length) await User_Companies.bulkCreate(bulk);
      }
    }
    if (related === "jobs") {
      const { jobs } = data;
      if (jobs) {
        jobs.map((job_id) => {
          bulk.push({ user_id: id, job_id: job_id });
        });
        if (!!bulk.length) await User_Jobs.bulkCreate(bulk);
      }
    }
  } catch (err) {
    throw err;
  }
};

exports.deleteRelated = async (related, user_id, unique_id) => {
  try {
    if (related === "companies") {
      await User_Companies.destroy({
        where: { [Op.and]: [{ user_id }, { company_id: unique_id }] },
      });
    }
    if (related === "jobs") {
      await User_Jobs.destroy({
        where: { [Op.and]: [{ user_id }, { job_id: unique_id }] },
      });
    }
  } catch (err) {
    throw err;
  }
};
