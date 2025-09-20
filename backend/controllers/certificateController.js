const Certificate = require('../models/Certificate');

const certificateController = {
  // Create new certificate
  create: async (req, res) => {
    try {
      const { title, description, imageUrl } = req.body;
      
      if (!title || !description || !imageUrl) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const certificate = new Certificate({
        title,
        description,
        imageUrl
      });

      await certificate.save();
      res.status(201).json({ 
        message: 'Certificate created successfully', 
        certificate 
      });
    } catch (error) {
      console.error('Error creating certificate:', error);
      res.status(500).json({ message: 'Server error while creating certificate' });
    }
  },

  // Get all certificates
  getAll: async (req, res) => {
    try {
      const certificates = await Certificate.find().sort({ createdAt: -1 });
      res.status(200).json(certificates);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      res.status(500).json({ message: 'Server error while fetching certificates' });
    }
  },

  // Get certificate by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const certificate = await Certificate.findById(id);
      
      if (!certificate) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
      
      res.status(200).json(certificate);
    } catch (error) {
      console.error('Error fetching certificate:', error);
      res.status(500).json({ message: 'Server error while fetching certificate' });
    }
  },

  // Update certificate
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, imageUrl } = req.body;
      
      const updatedCertificate = await Certificate.findByIdAndUpdate(
        id,
        { title, description, imageUrl },
        { new: true, runValidators: true }
      );
      
      if (!updatedCertificate) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
      
      res.status(200).json({ 
        message: 'Certificate updated successfully', 
        certificate: updatedCertificate 
      });
    } catch (error) {
      console.error('Error updating certificate:', error);
      res.status(500).json({ message: 'Server error while updating certificate' });
    }
  },

  // Delete certificate
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCertificate = await Certificate.findByIdAndDelete(id);
      
      if (!deletedCertificate) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
      
      res.status(200).json({ message: 'Certificate deleted successfully' });
    } catch (error) {
      console.error('Error deleting certificate:', error);
      res.status(500).json({ message: 'Server error while deleting certificate' });
    }
  }
};

module.exports = certificateController;