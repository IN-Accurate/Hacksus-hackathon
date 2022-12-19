
module.exports = (sequelize, DataTypes) => {
    const Coord = sequelize.define("Coord", {
        lat: {
            type: DataTypes.FLOAT,
        },
        lng: {
            type: DataTypes.FLOAT,
        }
    });
    return Coord;
};