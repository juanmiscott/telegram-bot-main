module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
      isActive: {
        type: Boolean,
        default: true
      },
      deletedAt: Date
    },
    { timestamps: true }
  )

  const User = mongoose.model('User', schema, 'users')
  return User
}
