module.exports = (sequelize, DataTypes) => {
    const Agents = sequelize.define("Agents",{
        firstname:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthdate:{
            type: DataTypes.DATE,
            allowNull:false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        contract_type:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        contract_start:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        contract_end:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        job_seniority: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        agent_score: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        wear_score: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    })
    Agents.associate = (models) => {
        Agents.belongsTo(models.Jobs,{});

    }
    return Agents;
}