const express = require('express');
const router = express.Router();
const { Tenant, Property, Unit } = require('../models');

// Get all tenants with their property and unit information
router.get('/', async (req, res) => {
  try {
    const tenants = await Tenant.findAll({
      include: [
        {
          model: Property,
          as: 'property',
          attributes: ['name']
        },
        {
          model: Unit,
          as: 'unit',
          attributes: ['number']
        }
      ]
    });
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenants', error: error.message });
  }
});

// Create a new tenant
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      propertyId,
      unitId,
      moveInDate,
      status,
      rentStatus
    } = req.body;

    // Check if unit is available
    const unit = await Unit.findByPk(unitId);
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    if (unit.status === 'Occupied') {
      return res.status(400).json({ message: 'Unit is already occupied' });
    }

    // Create tenant and update unit status
    const tenant = await Tenant.create({
      name,
      email,
      contact,
      propertyId,
      unitId,
      moveInDate,
      status,
      rentStatus
    });

    await unit.update({ status: 'Occupied' });

    res.status(201).json(tenant);
  } catch (error) {
    res.status(400).json({ message: 'Error creating tenant', error: error.message });
  }
});

// Update a tenant
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const tenant = await Tenant.findByPk(id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    // If tenant is being marked as inactive, update unit status
    if (updateData.status === 'Inactive') {
      const unit = await Unit.findByPk(tenant.unitId);
      if (unit) {
        await unit.update({ status: 'Vacant' });
      }
    }

    await tenant.update(updateData);
    res.json(tenant);
  } catch (error) {
    res.status(400).json({ message: 'Error updating tenant', error: error.message });
  }
});

// Delete a tenant
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tenant = await Tenant.findByPk(id);
    
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    // Update unit status when tenant is deleted
    const unit = await Unit.findByPk(tenant.unitId);
    if (unit) {
      await unit.update({ status: 'Vacant' });
    }

    await tenant.destroy();
    res.json({ message: 'Tenant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tenant', error: error.message });
  }
});

module.exports = router;
