const express = require('express');
const router = express.Router();
const { getClients, createClient, getTickets, updateTicket } = require('../controllers/clientController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here require protection and CA/Staff roles
router.use(protect);
router.use(authorize('CA', 'Staff', 'Admin'));

router.get('/', getClients);
router.post('/', createClient);
router.get('/tickets', getTickets);
router.put('/tickets/:id', updateTicket);

module.exports = router;
