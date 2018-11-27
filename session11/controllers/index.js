const hbs = require('hbs');

const layoutPageTitle = 'Home';

// Helper for indication active css class in navigation bar
module.exports.render = (req, res) => {
// `  hbs.registerHelper({
//     activeHomeLayoutHelper: layout => layout.data.root.title === layoutPageTitle ? new hbs.SafeString('active') : ''
//   });
//
//   res.render('layouts/index', { title: layoutPageTitle });
  res.render('index', { title: layoutPageTitle });
};
