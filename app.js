 const express = require('express')
 const dotenv = require('dotenv')
 const morgan = require('morgan')
 const exphbs = require('express-handlebars')
 const connectDB = require('./config/db')
 const path = require('path')

 
 

 // Load config
 dotenv.config({ path: './config/config.env'})

 connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes/index'))

app.use('/static', express.static(__dirname+'/static'))


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))


