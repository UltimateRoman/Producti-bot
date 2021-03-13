const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const task_queue = sequelize.define('task_queue', {
	taskname: {
			type: Sequelize.STRING,
			primaryKey: true,
	},
	user: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	start_hour: {
			type: Sequelize.INTEGER,
			allowNull: false,
	},
	start_min: {
			type: Sequelize.INTEGER,
			allowNull: false,
	},
	completed: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,	
	},
}, {
	timestamps: false
});


module.exports = task_queue;