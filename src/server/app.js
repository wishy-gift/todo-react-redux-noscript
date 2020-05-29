import path from 'path';
import * as express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
const RedisStore = connectRedis(session);

import serverRenderer from './middleware/serverRenderer';

const start = () => {
	const app = express.default();

	app.use('/static/', express.static(path.join(__dirname, '..', 'public')));

	const redisClient = process.env.REDIS_URL
		? redis.createClient({
				url: process.env.REDIS_URL,
		  })
		: null;

	const sessionConfig = {
		secret:
			'4#ecwNjsNdcM$7yH@QGS%w4i##^W!eFZwT4xcpPYX@2aFPg7%A3bZhXja74Kvfc39zv8WwC6',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: process.env.NODE_ENV === 'production' ? 600 * 1000 : null,
		},
	};

	if (redisClient) {
		sessionConfig.store = new RedisStore({ client: redisClient });
	}

	app.set('trustproxy', true);
	app.use(session(sessionConfig));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// const addStore = (req, res, next) => {
	// 	console.log('req.session.store', req.session.store);
	// 	req.session.store = req.session.store || {};
	// 	res.locals.store = configureStore({ initialState: req.session.store });
	// 	if (typeof next !== 'function') {
	// 		throw new Error('Next handler is missing');
	// 	}
	// 	next();
	// };

	// app.use(addStore);

	app.get('/', serverRenderer());

	// TODO: Add api route for actions, and a redux middleware that calls the api with the action so that data is always in sync regardless of noscript or not

	app.post('/', serverRenderer(true));

	app.listen(process.env.PORT || 8500, () => {
		console.log(
			`[${new Date().toISOString()}]`,
			`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`
		);
	});
};

export default start;
