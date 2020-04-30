import app from './app';

<<<<<<< HEAD
const port = process.env.PORT || 3000;
app.listen(port, () => {
=======
import config from '../config/config';
import dbConnection from './db/connection';
import authenticationRoute from './authentication';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

 //Routes configurations
 
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the lost and found api' });
});

app.use('/LostAndFound', authenticationRoute);

const { port } = config.app;

dbConnection();

module.exports = app.listen(port, () => {
>>>>>>> e0cd87f... add email signup
  // eslint-disable-next-line no-console
  console.log(
    `Our app is running on http://localhost:${port}/api/v1/ ....🚀....`
  );
});
