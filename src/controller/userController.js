const { Users } = require("../models");
// const Users = require("../models");
// console.log(Users);
const bcrypt = require("bcrypt");

class userController{
    async store(req, res) {
        try {
            // destructuring assigment
            const { nama, email, password } = req.body;

            // dapatin data dari middleware
            console.log(req.user);

            const user = await Users.create({
                nama: nama,
                email: email,
                password: bcrypt.hashSync(password, 10),
            });

            return res.json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async index(req, res) {
        try {
            // let { page, pageSize } = req.query;

            // if (!req.query.page) {
            //     page = 1;
            // }
            // if (!req.query.pageSize) {
            //     pageSize = 3;
            // }

            // pagination
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.pageSize) || 10;
            const offset = Number((page - 1) * limit) || 0;

            const users = await Users.findAndCountAll({
                offset: offset,
                limit: limit,
            });
            // const totalUsers = await Users.count();
            return res.json({
                data : users.rows,
                total : users.count,
                page: Number(page) || 1,
                pageSize: Number(limit),
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await Users.findOne({ where: { id: id } });
            
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nama, email, password } = req.body;

            const user = await Users.update({
                nama: nama,
                email: email,
                password: bcrypt.hashSync(password,10), 
            }, { where: { id: id } }
            );
            return res.json({message: "UPDATE SUCCESSFUL"});
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    
    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await Users.destroy({ where: { id: id } });
            return res.json({ message: "DELETE SUCCESSFUL" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new userController();