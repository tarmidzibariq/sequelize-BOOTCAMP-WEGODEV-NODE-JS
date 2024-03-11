const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config().parsed;

class authController {

    // async generateToken(payload) {
    generateToken = async (payload) => {
        const accessToken = jwt.sign(
            { userId: payload.id },
            env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN },
        ); 
        const refreshToken = jwt.sign(
            { userId: payload.id },
            env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN },
        ); 
        return { accessToken, refreshToken };
    }

    // async login(req, res){
    login = async (req, res) => {
        try {

            // check if email is valid
            const user = await Users.findOne({ where: { email: req.body.email } });

            if (!user) {
                return res.status(400).json({ message: "USER_NOT_FOUND" });
            }

            // check if password is valid
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: "INVALID_PASSWORD" });
            }

            // generate token
            const { accessToken, refreshToken } = await this.generateToken(user);

            return res.status(200).json({
                message: "LOGIN_SUCCESS",
                accessToken: accessToken,
                refreshToken: refreshToken,
                user,
                // role:"user"
            });

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
// async register(req, res) {
    register = async (req, res) =>{
        try {
            const { nama, email, password} = req.body;

            // check if email is already registered
            const userExists = await Users.findOne({
                where: {
                    email: email
                }
            });
            if (userExists) {
                return res.status(400).json({
                    message: "Email already registered"
                });
            }

            // created user
            const user = await Users.create({
                nama: nama,
                email: email,
                password: bcrypt.hashSync(password, 10),
            });

            // check if register failed
            if (!user) {
                return res.status(400).json({
                    message: "Register failed"
                });
            }

            const { accessToken, refreshToken } = await this.generateToken(user);

            return res.status(200).json({
                message: "USER_CREATED successfully",
                accessToken: accessToken,
                refreshToken: refreshToken,
                user,
            });

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    // refresh token
    refresh = async (req, res) => {
        try {
            const { refreshToken } = req.body;

            // Verifikasi refreshToken
            const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN_SECRET);

            // Dapatkan userId dari refreshToken yang didekodekan
            const userId = decoded.userId;

            // Generate token baru dengan userId
            const { accessToken, refreshToken: newRefreshToken } = await this.generateToken({ id: userId });

            // Kirim token baru ke client
            return res.status(200).json({
                accessToken: accessToken,
                refreshToken: newRefreshToken
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}


module.exports = new authController();