import dotenv from 'dotenv';
import throng from 'throng';

dotenv.config();

import app from './app';

const WORKERS = process.env.WEB_CONCURRENCY || 1;

throng({
	workers: WORKERS,
	lifetime: Infinity,
	start: app,
});
