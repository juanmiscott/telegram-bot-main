module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    alias: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    default: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    }
  }, {
    timestamps: true // Esto crea createdAt y updatedAt automáticamente
  })

  return mongoose.model('Language', schema, 'languages')
}
