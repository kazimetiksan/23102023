var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://react:QcRQXcqy4eqrdITn@cluster0.lotfigd.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    socketTimeoutMS: 5000,
    useUnifiedTopology: true,
})
.catch((err) => {
    console.log({err})
})

module.exports = {mongoose};