import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import routes from './routes.js';
import { authMiddleware } from './middlewares/authMiddlewares.js';


const app = express();

try {
    await mongoose.connect('mongodb://localhost:27017', {
        dbName: 'Myth-And-Legends',
    });

    console.log('Database connected successfully!');
} catch (err) {
    console.log('Cannot connect to database: ', err.message);
}


app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        setTitle(title) {
            this.pageTitle = title;
        },
        getTitle() {
            return this.pageTitle || 'Myth and Legends';
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');


app.use(express.static('src/public'));

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

// Add json parser.
// app.use(express.json());

app.use(authMiddleware);

app.use(routes);


app.listen(process.env.PORT, () => console.log(`Server is listening on http://localhost:${process.env.PORT}.....`));
