const supabase = require('../config/supabase');

// @desc    Get all clients for a specific CA
// @route   GET /api/clients
// @access  Private (CA/Staff)
exports.getClients = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('ca_id', req.user.id);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new client
// @route   POST /api/clients
// @access  Private (CA/Staff)
exports.createClient = async (req, res) => {
  try {
    const { name, email, phone, businessType } = req.body;
    
    const { data, error } = await supabase
      .from('clients')
      .insert([{
        ca_id: req.user.id,
        name,
        email,
        phone,
        business_type: businessType
      }])
      .select()
      .single();

    if (error) return res.status(400).json({ message: error.message });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get escalated tickets
// @route   GET /api/clients/tickets
// @access  Private (CA/Staff)
exports.getTickets = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*, clients(name, email)')
      .eq('ca_id', req.user.id);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update ticket status
// @route   PUT /api/clients/tickets/:id
// @access  Private (CA/Staff)
exports.updateTicket = async (req, res) => {
  try {
    const { status } = req.body;
    
    const { data, error } = await supabase
      .from('tickets')
      .update({ 
        status, 
        resolved_at: status === 'Resolved' ? new Date().toISOString() : null 
      })
      .eq('id', req.params.id)
      .eq('ca_id', req.user.id)
      .select()
      .single();

    if (error) return res.status(400).json({ message: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
