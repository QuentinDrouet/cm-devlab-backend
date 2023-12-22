const { Agents } = require('../models');

const calculateScoreAgent = (age, jobSeniorityDate, postSeniorityDate) => {
    const currentYear = new Date().getFullYear();
    const jobSeniorityYears = currentYear - jobSeniorityDate.getFullYear();
    const postSeniorityYears = currentYear - postSeniorityDate.getFullYear();

    if (age <= 18) {
        return (1 + 0.02 * jobSeniorityYears) * (1 + 0.02 * postSeniorityYears)
    }
    else return (1 + 0.02 * (age - 18)) * (1 + 0.02 * jobSeniorityYears) * (1 + 0.02 * postSeniorityYears);
};


exports.getAgents = async (req, res) => {
    try {
        const agents = await Agents.findAll();
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
        const { firstName, lastName, age, email, job_seniority, post_seniority } = req.body;
        const score_agent = calculateScoreAgent(age, new Date(job_seniority), new Date(post_seniority));

        const newAgent = await Agents.create({
            firstName, lastName, age, email, job_seniority, post_seniority, score_agent
        });
        res.status(201).json(newAgent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.modifyAgent = async (req, res) => {
    try {
        const { firstName, lastName, age, email, job_seniority, post_seniority } = req.body;
        const score_agent = calculateScoreAgent(age, new Date(job_seniority), new Date(post_seniority));

        const agentToUpdate = await Agents.findByPk(req.params.id);
        if (agentToUpdate) {
            await agentToUpdate.update({
                firstName, lastName, age, email, job_seniority, post_seniority, score_agent
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
