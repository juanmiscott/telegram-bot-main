module.exports = (mongoose) => {
  // define que tipo de datos quieres
  const schema = mongoose.Schema(
    {
      title: String, // No se define el tipo de texto al contrario de MySQL
      description: String,
      isActive: {
        type: Boolean,
        default: true
      },
      deletedAt: Date
    },
    { timestamps: true }
  )

  const Faq = mongoose.model('Faq', schema, 'faqs')
  return Faq
}
