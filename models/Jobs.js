module.exports = (sequelize, DataTypes) => {
    const Jobs = sequelize.define("Jobs",{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        job_field:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        physical:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        night_shift:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        job_score:{
            type:DataTypes.FLOAT,
            allowNull:true,
        },
    })
    Jobs.associate = (models) => {

    }
    return Jobs;
}