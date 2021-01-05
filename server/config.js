const IS_PROD = process.env.NODE_ENV === 'production'

const PORT = 3000

module.exports = {
    IS_PROD,
    PORT
}