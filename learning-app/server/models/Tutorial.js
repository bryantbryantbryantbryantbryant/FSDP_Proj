module.exports = (sequelize, DataTypes) => {
    const Tutorial = sequelize.define("Tutorial", {
        area: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        stationid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Tutorial;
}
