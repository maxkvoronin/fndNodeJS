module.exports = (schema) => {
  schema.add({postsNumber:    { type: Number }});
  schema.add({likesNumber:    { type: Number }});
  schema.add({commentsNumber: { type: Number }});
  schema.add({commentsAVG:    { type: Number }});
};
