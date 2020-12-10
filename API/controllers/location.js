const Location = require('../models/location');
const User = require('../models/user');

module.exports = {
    getLocations: async(req, res) => {
        try{
            const locations = await Location.findAll({include:{model:User}});
            res.status(200).json({
                status: 'Success',
                locations,
            });
        } catch(err) {
            res.json({
                status: 'Failed',
                error: err.message,
            });
        }
    },
    createLocation: async(req, res) => {
        try{
            const body = req.body;
            const location = await Location.create({
                locationName: body.locationName,
                latitude: body.latitude,
                longitude: body.longitude,
            });
            
            res.status(200).json({
                status: 'Success',
                location,
            });
        } catch(err) {
            res.json({
                status: 'Failed',
                error: err.message,
            });
        }

    },
    getLocation: async(req, res) => {
        try{
            const location = await Location.findByPk(req.params.id);
            res.status(200).json({
                status: 'Success',
                location,
            })
        } catch(err) {
            res.json({
                status: 'Failed',
                error: err,
            });
        }
    },
    updateLocation: async(req, res) => {
        try{
            const location = await Location.findByPk(req.params.id);
            const updatedLocation = await location.update(req.body);
            res.status(200).json({
                status: 'Success',
                user: updatedLocation,
            });
        } catch(err) {
            res.json({
                status: 'Failed',
                error: err.message,
            });
        }
    },
    deleteLocation: async(req, res) => {
        const locationId = req.params.id;
        try{
            const deletedLocation = await Location.destroy({where: {locationId: locationId}} );
            res.status(200).json({
                status: 'Success',
                location: deletedLocation,
            });
        } catch(err) {
            res.json({
                status: 'Failed',
                error: err,
            });
        }
    },
}