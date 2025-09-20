const Timeline = require('../models/Timeline');

const timelineController = {
  // Create new timeline entry
  create: async (req, res) => {
    try {
      const { year, title, company, description, skills, type } = req.body;
      
      if (!year || !title || !company || !description) {
        return res.status(400).json({ message: 'Year, title, company, and description are required' });
      }

      const timeline = new Timeline({
        year,
        title,
        company,
        description,
        skills: skills || [],
        type: type || 'work'
      });

      await timeline.save();
      res.status(201).json({ 
        message: 'Timeline entry created successfully', 
        timeline 
      });
    } catch (error) {
      console.error('Error creating timeline entry:', error);
      res.status(500).json({ message: 'Server error while creating timeline entry' });
    }
  },

  // Get all timeline entries
  getAll: async (req, res) => {
    try {
      const timeline = await Timeline.find().sort({ year: -1 });
      res.status(200).json(timeline);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      res.status(500).json({ message: 'Server error while fetching timeline' });
    }
  },

  // Get timeline entry by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const timeline = await Timeline.findById(id);
      
      if (!timeline) {
        return res.status(404).json({ message: 'Timeline entry not found' });
      }
      
      res.status(200).json(timeline);
    } catch (error) {
      console.error('Error fetching timeline entry:', error);
      res.status(500).json({ message: 'Server error while fetching timeline entry' });
    }
  },

  // Update timeline entry
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { year, title, company, description, skills, type } = req.body;
      
      const updatedTimeline = await Timeline.findByIdAndUpdate(
        id,
        { year, title, company, description, skills, type },
        { new: true, runValidators: true }
      );
      
      if (!updatedTimeline) {
        return res.status(404).json({ message: 'Timeline entry not found' });
      }
      
      res.status(200).json({ 
        message: 'Timeline entry updated successfully', 
        timeline: updatedTimeline 
      });
    } catch (error) {
      console.error('Error updating timeline entry:', error);
      res.status(500).json({ message: 'Server error while updating timeline entry' });
    }
  },

  // Delete timeline entry
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTimeline = await Timeline.findByIdAndDelete(id);
      
      if (!deletedTimeline) {
        return res.status(404).json({ message: 'Timeline entry not found' });
      }
      
      res.status(200).json({ message: 'Timeline entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting timeline entry:', error);
      res.status(500).json({ message: 'Server error while deleting timeline entry' });
    }
  }
};

module.exports = timelineController;