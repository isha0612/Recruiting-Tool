import "./config";
import 'reflect-metadata';
import app from './config/express';
import register from './controllers/register';
import connectDB from "./config/prisma";
import login from './controllers/login';
import authenticate from './middleware/authenticate';
import { getCandidates, postCandidates, editCandidates } from './controllers/candidates';

app.post('/register', register);
app.post('/login', login);
app.get('/candidates', authenticate, getCandidates);
app.post('/candidates', authenticate, postCandidates);
app.put('/candidates', authenticate, editCandidates);

app.listen(config.port, () => {
  console.log('Server is running on port', config.port);
  const configDependency = async (): Promise<void> => {
    try {
      await connectDB();
    } catch (err) {
      console.log(err);
    }
  }
  void Promise.resolve(configDependency())
});