const Project = require('../models/Project');

const projectController = {
  // Create new project
  create: async (req, res) => {
    try {
      const { title, description, githubLink, imageUrl, deployment, techStack } = req.body;
      
      if (!title || !description || !githubLink || !imageUrl || !deployment) {
        return res.status(400).json({ message: 'All required fields must be provided' });
      }

      const project = new Project({
        title,
        description,
        githubLink,
        imageUrl,
        deployment,
        techStack: techStack || []
      });

      await project.save();
      res.status(201).json({ 
        message: 'Project created successfully', 
        project 
      });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ message: 'Server error while creating project' });
    }
  },

  // Get all projects
  getAll: async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: 'Server error while fetching projects' });
    }
  },

  // Get project by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ message: 'Server error while fetching project' });
    }
  },

  // Update project
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, githubLink, imageUrl, deployment, techStack } = req.body;
      
      const updatedProject = await Project.findByIdAndUpdate(
        id,
        { title, description, githubLink, imageUrl, deployment, techStack },
        { new: true, runValidators: true }
      );
      
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.status(200).json({ 
        message: 'Project updated successfully', 
        project: updatedProject 
      });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ message: 'Server error while updating project' });
    }
  },

  // Delete project
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProject = await Project.findByIdAndDelete(id);
      
      if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ message: 'Server error while deleting project' });
    }
  }
};

module.exports = projectController;