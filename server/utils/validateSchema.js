import Boom  from '@hapi/boom'

const validateSchema = (schema, target = 'body') => {
  return async (req, res, next) => {
    try {
      const validatedData = await schema.validateAsync(req[target])
      // eslint-disable-next-line require-atomic-updates
      req[target] = validatedData
      next()
    } catch (error) {
      res.json(Boom.badData(error.message))
    }
  }
}

export default validateSchema
