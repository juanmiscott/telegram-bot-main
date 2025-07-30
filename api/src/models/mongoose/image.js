module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    filename: {
      type: String,
      required: true
    },
    deletedAt: {
      type: Date
    }
  }, {
    timestamps: true // Esto agrega automáticamente createdAt y updatedAt
  })

  return mongoose.model('Image', schema, 'images')
}
