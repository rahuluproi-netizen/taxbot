const supabase = require('../config/supabase');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, businessType } = req.body;

    // 1. Sign up user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role } // Store in metadata too
      }
    });

    if (authError) return res.status(400).json({ message: authError.message });

    // 2. Insert into profiles table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          name,
          role: role || 'Client',
          phone,
          business_type: businessType
        }]);

      if (profileError) return res.status(400).json({ message: profileError.message });

      res.status(201).json({
        _id: authData.user.id,
        name,
        email,
        role: role || 'Client',
        token: authData.session?.access_token, // Supabase provides the token
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) return res.status(401).json({ message: 'Invalid email or password' });

    // Fetch profile for role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, name')
      .eq('id', data.user.id)
      .single();

    res.json({
      _id: data.user.id,
      name: profile?.name || data.user.email,
      email: data.user.email,
      role: profile?.role || 'Client',
      token: data.session.access_token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
