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
        manual_handling:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        awkward_postures:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        mechanical_vibrations:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        hazardous_chemicals:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        hyperbaric_environment:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        extreme_temperatures:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        noise:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        night_shift:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        alternating_shifts:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        repetitive_work:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        job_score:{
            type:DataTypes.FLOAT,
            allowNull:true,
        },
    })
    Jobs.associate = (models) => {
        Jobs.hasMany(models.Agents,{});
    }
    return Jobs;
}