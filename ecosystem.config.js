require("dotenv/config");

module.exports = {
	apps: [
		{
			name: "SiSo",
			script: "./dist/src/app.js",

			source_map_support: true,
			autorestart: true,
			watch: false,
			wait_ready: true,

			instances: 4,
			exec_mode: "cluster",
			max_memory_restart: "1024M",

			listen_timeout: 50000,
			kill_timeout: 5000,
		},
	],
	deploy: {
		production: {
			key: "./SiSo-server-ec2.pem",
			user: "ubuntu",
			host: "13.125.110.140",
			ref: "origin/master",
			repo: "git@github.com:chrisais9/SiSo-server.git",
			path: "/home/ubuntu/SiSo-server",
			"post-deploy": "npm run setup && npm start",
		},
	},
};
