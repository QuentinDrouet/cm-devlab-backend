module.exports = (sequelize, DataTypes) => {
    const Agents = sequelize.define("Agents",{
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        job_seniority: {
            type: DataTypes.DATE,
            allowNull: false
        },
        post_seniority: {
            type: DataTypes.DATE,
            allowNull: false
        },
        score_agent: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        weakening_score: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    })
    Agents.associate = (models) => {
        Agents.belongsTo(models.Jobs,{});

    }
    return Agents;
}