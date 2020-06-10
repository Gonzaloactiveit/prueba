module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb+srv://gibarra:Glassgon1292@cluster0-agvp6.mongodb.net/shop?retryWrites=true&w=majority',
    SECRET_TOKEN: 'miclavetoken'
}