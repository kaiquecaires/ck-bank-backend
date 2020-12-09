import express, { Request, Response } from 'express';

const app = express();

app.get('/', function(req: Request, res: Response) {
  res.json({
    message: 'Hello world'
  });
});

app.listen('3333', () => {
  console.log('server is running! 🚀');
});
