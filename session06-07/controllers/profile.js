const hbs = require('hbs');

const layoutPageTitle = 'Profile';

// Helper for indication active css class in navigation bar
module.exports.render = (req, res) => {
  hbs.registerHelper({
    activeProfileLayoutHelper: layout => layout.data.root.title === layoutPageTitle ? new hbs.SafeString('active') : ''
  });

  res.render('layouts/profile', { title: layoutPageTitle });
};
