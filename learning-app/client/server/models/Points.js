module.exports = (sequelize, DataTypes) => {
    const Points = sequelize.define("Points", {
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    });
    return Points;
}