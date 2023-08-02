module.exports = (sequelize, DataTypes) => {
    const Tutorial = sequelize.define("Tutorial", {
        couponCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discounts: {
            type: DataTypes.ENUM,
            values: ['10%', '20%', '30%', '40%', '100%'],
            allowNull: false
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        timeCreated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        isRedeemed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    });
    return Tutorial;
}
