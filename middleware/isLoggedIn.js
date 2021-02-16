module.exports = (req, res, next) => {
    if (!req.user) {
      //req.flash('error', 'You must be logged in to access that page');
      res.redirect('/auth/google');
    } else {
      next();
    }
  };