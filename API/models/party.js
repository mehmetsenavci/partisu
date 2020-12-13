module.exports = (sequelize, DataTypes) => {
    const Party = sequelize.define('Party', {
        partyId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    
    });

    return Party;
}
