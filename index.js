const settings = require('./settings');

// dependencies
const sqlServer = require('mssql');
const connection = new sqlServer.Connection(settings.sqlServer);
const mongoose = require('mongoose');
const Async = require('async');
const moment = require('moment');

// models
const Charge = require('./models/Charge');
const Client = require('./models/Client');
const Loan = require('./models/Loan').Loan;
const Payment = require('./models/Loan').Payment;
const User = require('./models/User');

connection.connect((err) => {
	console.log('Connected to SQL Server.');

	mongoose.connect(settings.mongo.path, settings.mongo.options);
	mongoose.connection.on('connected', () => {
		console.log('Connected to MongoDB');
		var request = new sqlServer.Request(connection);
		Async.waterfall([
			// function migrateUsers(wfaCallback){
			// 	request.query('select * from Usuario', (err, users) => {
			// 		Async.each(users, (user, eaCallback) => {
			// 			var newUser = new User({
			// 				name: user.user_nombre,
			// 				username: user.usr_login,
			// 				password: user.usr_pwd,
			// 				role: 'user',
			// 			});
			// 			newUser.save(eaCallback);
			// 		}, wfaCallback);
			// 	});
			// },
			
			// function migreateClients(wfaCallback) {
			// 	request.query('select * from Cliente', (err, clients) => {
			// 		Async.each(clients, (client, eaCallback) => {
			// 			var newClient = new Client({
			// 				client_id: client.cli_id,
			// 			  name: client.nombre,
			// 			  surname: client.apellido,
			// 			  created: client.fecha_alta,
			// 			  address: client.direccion,
			// 			  phone: client.tel,
			// 			  user_id: '579d29bbd54df62c2a1d11e1', 
			// 			});
			// 			newClient.save(eaCallback);
			// 		}, wfaCallback)
			// 	});
			// },

			// function migrateCharges(wfaCallback) {
			// 	request.query('select * from Cargo', (err, charges) => {
			// 		Async.each(charges, (charge, eaCallback) => {
			// 			Client.findOne({client_id: charge.cli_id}, (err, client) => {
			// 				var newCharge = new Charge({
			// 					amount: charge.cantidad,
			// 					created: charge.fecha_inicio,
			// 					expiration_date: charge.fecha_vencimiento,
			// 					weeks: charge.semanas,
			// 					description: charge.descripcion,
			// 					paid: charge.liquidado,
			// 					client_id: client.id,
			// 					user_id: '579d29bbd54df62c2a1d11e1',
			// 				});	
			// 				newCharge.save(eaCallback);
			// 			})
			// 		}, wfaCallback);
			// 	});
			// },

			// function migreateLoans(wfaCallback) {
			// 	request.query('select * from Prestamo', (err, loans) => {
			// 		Async.each(loans, (loan, eaCallback) => {
			// 			Client.findOne({client_id: loan.cli_id}, (err, client) => {
			// 				var newLoan = new Loan({
			// 				  amount: loan.cantidad,
			// 				  weekly_payment: loan.pago_semanal,
			// 				  file: loan.pagare,
			// 				  description: loan.descripcion,
			// 				  created: loan.fecha_inicio,
			// 				  finished: loan.liquidado,
			// 				  weeks: loan.semanas,
			// 				  expired_date: loan.fecha_vencimiento,
			// 				  client_id: client.id,
			// 				  user_id: '579d29bbd54df62c2a1d11e1',
			// 				});
			// 				// get payments
			// 				request.query('select * from Pago where pres_id =' + loan.pres_id, (err, payments) => {
			// 					newLoan.payments = payments.map((payment) => {
			// 						return new Payment({
			// 							amount: payment.cantidad,
			// 							created: payment.fecha,
			// 						});
			// 					});
			// 					newLoan.save(eaCallback);
			// 				});
			// 			});
			// 		}, wfaCallback)
			// 	});
			// },
		], (err) => {
			console.log('Finished with error:', err);
		})
	});

	mongoose.connection.on('error', (err) =>{
		console.error('Error connecting to mongo', err);
	});
});