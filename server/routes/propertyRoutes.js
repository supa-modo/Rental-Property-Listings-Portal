const express = require('express');
const router = express.Router();
const { Property, Unit, Tenant } = require('../models');

// Get all properties with their units and occupancy stats
router.get('/', async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{
        model: Unit,
        as: 'units',
        include: [{
          model: Tenant,
          as: 'tenant'
        }]
      }]
    });

    // Calculate occupancy rates and monthly revenue
    const propertiesWithStats = properties.map(property => {
      const totalUnits = property.units.length;
      const occupiedUnits = property.units.filter(unit => unit.status === 'Occupied').length;
      const occupancyRate = totalUnits ? Math.round((occupiedUnits / totalUnits) * 100) + '%' : '0%';
      const monthlyRevenue = property.units.reduce((sum, unit) => sum + Number(unit.rent), 0);

      return {
        ...property.toJSON(),
        occupancyRate,
        monthlyRevenue
      };
    });

    res.json(propertiesWithStats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
});

// Create a new property
router.post('/', async (req, res) => {
  try {
    const { name, address, totalUnits, units } = req.body;
    
    const property = await Property.create({
      name,
      address,
      totalUnits
    });

    if (units && units.length > 0) {
      await Unit.bulkCreate(units.map(unit => ({
        ...unit,
        propertyId: property.id
      })));
    }

    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: 'Error creating property', error: error.message });
  }
});

// Update a property
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, totalUnits } = req.body;

    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await property.update({
      name,
      address,
      totalUnits
    });

    res.json(property);
  } catch (error) {
    res.status(400).json({ message: 'Error updating property', error: error.message });
  }
});

// Delete a property
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await property.destroy();
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
});

module.exports = router;
