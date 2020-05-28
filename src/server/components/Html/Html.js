import React from 'react';
import devalue from 'devalue';

const HTML = ({
	content,
	noScriptContent,
	css = [],
	scripts = [],
	state = {},
	isNoscript,
}) => {
	return (
		<html lang="">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<noscript>
					<style>{`
					#root {
						display: none;
					}
					`}</style>
				</noscript>
				{css.filter(Boolean).map((href) => (
					<link key={href} rel="stylesheet" href={href} />
				))}
				<script
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{
						__html: `window.__INITIAL_STATE__ = ${devalue(state)}`,
					}}
				/>
			</head>
			<body>
				<noscript>
					<div dangerouslySetInnerHTML={{ __html: noScriptContent }} />
				</noscript>
				{/* eslint-disable-next-line react/no-danger */}
				{!isNoscript && (
					<div id="root" dangerouslySetInnerHTML={{ __html: content }} />
				)}
				{scripts.filter(Boolean).map((src) => (
					<script key={src} src={src} />
				))}
				<footer class="info">
					<p>{`Try without javascript :)`}</p>
					<p>
						Created by <a href="https://blog.klungo.no/">Daniel Skogly</a>
					</p>
					<p>
						<a href="https://blog.klungo.no/2020/05/28/using-react-and-redux-to-acommodate-users-without-javascript/">
							Read about this
						</a>
					</p>
				</footer>
			</body>
		</html>
	);
};

export default HTML;
