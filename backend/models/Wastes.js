
module.exports = (sequelize, DataTypes) => {
    const Wastes = sequelize.define("Wastes", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        m: {
            type: DataTypes.INTEGER,
        },
        g: {
            type: DataTypes.INTEGER,
        },
        p: {
            type: DataTypes.INTEGER,
        }
    });
    return Wastes;
};