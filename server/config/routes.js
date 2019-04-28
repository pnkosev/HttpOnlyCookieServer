const authRoutes = require('../routes/auth');
const postRoutes = require('../routes/post');
const commentRoutes = require('../routes/comment');

module.exports = (app) => {
  app.use('/user', authRoutes);
  app.use('/post', postRoutes);
  app.use('/comment', commentRoutes);
}
