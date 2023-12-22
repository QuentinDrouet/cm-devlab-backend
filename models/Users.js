module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        admin:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
    })
    Users.associate = (models) => {

    }
    return Users;
}