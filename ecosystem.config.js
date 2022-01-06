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
};
