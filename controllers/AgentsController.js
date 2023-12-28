const { Agents } = require('../models');
const { Jobs } = require('../models');

const calculateScoreAgent = (age, jobSeniorityDate, postSeniorityDate) => {
    const currentYear = new Date().getFullYear();
    const jobSeniorityYears = currentYear - jobSeniorityDate.getFullYear();
    const postSeniorityYears = currentYear - postSeniorityDate.getFullYear();

    if (age <= 18) {
        return (1 + 0.02 * jobSeniorityYears) * (1 + 0.02 * postSeniorityYears)
    }
    else return (1 + 0.04 * (age - 18)) * (1 + 0.02 * jobSeniorityYears) * (1 + 0.02 * postSeniorityYears);
};


exports.getAgents = async (req, res) => {
    try {
        const agents = await Agents.findAll({
            include:[
                {model:Jobs},
            ],
        }
        );
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAgentById = async (req, res) => {
    try {
        const agent = await Agents.findByPk(req.params.id);
        if (agent) {
            res.status(200).json(agent);
        } else {
            res.status(404).json({ error: "Agent not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAgent = async (req, res) => {
    try {
        const { firstname, lastname, birthdate, email, phone, contract_type, contract_start, contract_end, job_seniority, JobId } = req.body;

        const age = new Date().getFullYear() - new Date(birthdate).getFullYear();
        const job_seniority_date = new Date().setFullYear(new Date().getFullYear() - job_seniority)
        const agent_score = calculateScoreAgent(age, new Date(job_seniority_date), new Date(contract_start));
        const job = await Jobs.findByPk(JobId);
        const wear_score = job.job_score * agent_score;

        const newAgent = await Agents.create({
            firstname, lastname, birthdate, email, phone, contract_type, contract_start, contract_end, job_seniority, agent_score, wear_score, JobId
        });
        res.status(201).json(newAgent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.modifyAgent = async (req, res) => {
    try {
        const { firstname, lastname, birthdate, email, phone, contract_type, contract_start, contract_end, job_seniority, JobId } = req.body;
        
        const age = new Date().getFullYear() - new Date(birthdate).getFullYear();
        const job_seniority_date = new Date().setFullYear(new Date().getFullYear() - job_seniority)
        const agent_score = calculateScoreAgent(age, new Date(job_seniority_date), new Date(contract_start));
        const job = await Jobs.findByPk(JobId);
        const wear_score = job.job_score * agent_score;

        const agentToUpdate = await Agents.findByPk(req.params.id);
        if (agentToUpdate) {
            await agentToUpdate.update({
                firstname, lastname, birthdate, email, phone, contract_type, contract_start, contract_end, job_seniority, agent_score, wear_score, JobId
            });
            res.status(200).json({ message: "Agent updated successfully" });
        } else {
            res.status(404).json({ error: "Agent not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAgent = async (req, res) => {
    try {
        const agentToDelete = await Agents.findByPk(req.params.id);
        if (agentToDelete) {
            await agentToDelete.destroy();
            res.status(200).json({ message: "Agent deleted successfully" });
        } else {
            res.status(404).json({ error: "Agent not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
