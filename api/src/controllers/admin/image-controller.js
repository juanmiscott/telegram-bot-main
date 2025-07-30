const moment = require('moment')
const mongooseDb = require('../../models/mongoose')
const Image = mongooseDb.Image

// Crear imagen
exports.create = async (req, res, next) => {
  try {
    if (!req.body.filename) {
      return res.status(400).send({ message: 'El campo "filename" es obligatorio.' })
    }

    let data = await Image.create(req.body)
    data = data.toObject()
    data.id = data._id
    delete data._id

    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
}

// Obtener todas las imágenes (con paginación y búsqueda)
exports.findAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.size) || 10
    const offset = (page - 1) * limit

    const whereStatement = { deletedAt: { $exists: false } }

    for (const key in req.query) {
      if (req.query[key] !== '' && req.query[key] !== 'null' && key !== 'page' && key !== 'size') {
        whereStatement[key] = { $regex: req.query[key], $options: 'i' }
      }
    }

    const result = await Image.find(whereStatement)
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean()
      .exec()

    const count = await Image.countDocuments(whereStatement)

    const response = {
      rows: result.map(doc => ({
        ...doc,
        id: doc._id,
        _id: undefined,
        createdAt: doc.createdAt ? moment(doc.createdAt).format('YYYY-MM-DD HH:mm') : null,
        updatedAt: doc.updatedAt ? moment(doc.updatedAt).format('YYYY-MM-DD HH:mm') : null
      })),
      meta: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: page
      }
    }

    res.status(200).send(response)
  } catch (err) {
    next(err)
  }
}

// Obtener una imagen por ID
exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = await Image.findById(id).lean().exec()

    if (!data) {
      const err = new Error(`No se puede encontrar el elemento con la id=${id}.`)
      err.statusCode = 404
      throw err
    }

    data.id = data._id
    delete data._id

    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
}

// Actualizar una imagen
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = await Image.findByIdAndUpdate(id, req.body, { new: true }).lean().exec()

    if (!data) {
      const err = new Error(`No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado.`)
      err.statusCode = 404
      throw err
    }

    res.status(200).send({
      message: 'El elemento ha sido actualizado correctamente.'
    })
  } catch (err) {
    next(err)
  }
}

// Borrado lógico (soft delete)
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = await Image.findByIdAndUpdate(id, { deletedAt: new Date() })

    if (!data) {
      const err = new Error(`No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado.`)
      err.statusCode = 404
      throw err
    }

    res.status(200).send({
      message: 'El elemento ha sido borrado correctamente.'
    })
  } catch (err) {
    next(err)
  }
}
