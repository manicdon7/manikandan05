const Testimonial = require('../models/Testimonial');

const testimonialController = {
  // Create new testimonial
  create: async (req, res) => {
    try {
      const { title, description, imageUrl, rating } = req.body;
      
      if (!title || !description || !imageUrl) {
        return res.status(400).json({ message: 'Title, description, and image URL are required' });
      }

      const testimonial = new Testimonial({
        title,
        description,
        imageUrl,
        rating: rating || 5
      });

      await testimonial.save();
      res.status(201).json({ 
        message: 'Testimonial created successfully', 
        testimonial 
      });
    } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(500).json({ message: 'Server error while creating testimonial' });
    }
  },

  // Get all testimonials
  getAll: async (req, res) => {
    try {
      const testimonials = await Testimonial.find().sort({ createdAt: -1 });
      res.status(200).json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      res.status(500).json({ message: 'Server error while fetching testimonials' });
    }
  },

  // Get testimonial by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const testimonial = await Testimonial.findById(id);
      
      if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      
      res.status(200).json(testimonial);
    } catch (error) {
      console.error('Error fetching testimonial:', error);
      res.status(500).json({ message: 'Server error while fetching testimonial' });
    }
  },

  // Update testimonial
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, imageUrl, rating } = req.body;
      
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(
        id,
        { title, description, imageUrl, rating },
        { new: true, runValidators: true }
      );
      
      if (!updatedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      
      res.status(200).json({ 
        message: 'Testimonial updated successfully', 
        testimonial: updatedTestimonial 
      });
    } catch (error) {
      console.error('Error updating testimonial:', error);
      res.status(500).json({ message: 'Server error while updating testimonial' });
    }
  },

  // Delete testimonial
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
      
      if (!deletedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      
      res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      res.status(500).json({ message: 'Server error while deleting testimonial' });
    }
  }
};

module.exports = testimonialController;