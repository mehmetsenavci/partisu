const User = require('../models/user');
const Location = require('../models/location');

module.exports = {
    getUsers: async(req, res) => {
        try{
            const users = await User.findAll();
            res.status(200).json({
                status: 'Success',
                users,
            });
        } catch(err) {
            res.json({
                status: 'Failed',
                error: err.message,
            });
        }
    },
    createUser: async(req, res, next) => {
        try{
            const body = req.body;
            if(body.password !== body.passwordConfirm)
                return next(new Error('Password confirmation must be same with password!'));
            const user = await User.create({
                firstName: body.firstName,
                lastName: body.lastName,
                dob: body.dob,
                email: body.email,
                username: body.username,
                role: body.role,
                password: body.password,
                passwordConfirm: body.passwordConfirm,
            });

            user.setFavorites(body.favorites);
            
            res.status(200).json({
                status: 'Success',
                user,
            });
        } catch(err) {
            res.json({
                status: 'Failed',
                error: err.message,
            });
        }

    },
    getUser: async(req, res) => {
        try{
            const user = await User.findByPk(req.params.id, {include:{model:Location, as: 'favorites'}});
            res.status(200).json({
                status: 'Success',
                user,
            })
        } catch(err) {
            res.json({
                status: 'Failed',
                error: err,
            });
        }
    },
    updateUser: async(req, res) => {
        try{
            const user = await User.findByPk(req.params.id);
            const updatedUser = await user.update(req.body);
            res.status(200).json({
                status: 'Success',
                user: updatedUser,
            });
        } catch(err) {
            res.json({
                status: 'Failed',
                error: err.message,
            });
        }
    },
    deleteUser: async(req, res) => {
        const userId = req.params.id;
        try{
            const deletedUser = await User.destroy({where: {userId: userId}} );
            res.status(200).json({
                status: 'Success',
                user: deletedUser,
            });
        } catch(err) {
            res.json({
                status: 'Failed',
                error: err,
            });
        }
    },
}