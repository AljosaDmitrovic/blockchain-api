const jwt = require('jsonwebtoken');
let ACCESS_TOKEN = "mili";

module.exports = {
	check : (req, res, next) => {
		if(req.headers.authorization === undefined) res.status(503).json({error : "unauthorized"})
		else{
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, ACCESS_TOKEN, (err, decoded)=> {
				if(err || decoded === undefined){
					res.status(503).json({error : "unauthorized"})
				}else{
					res.decoded = decoded;
					req.decoded = decoded;
					next();
				}
			});
            
            }
	},
	// checkAPI: async (req, res, next) => {
	// 	try {
	// 		let api_token = req.header('X-API-KEY');
	// 		if (api_token) {
	// 			let user_data = await users_mod.getUserDataForApiToken(api_token).then(user => user).catch(reason => { throw reason });
	// 			if (user_data) {
	// 				req.user = user_data;
	// 				next();
	// 			} else {
	// 				res.status(401).json({ status: 2, data: {}, developerMessage: "API token not valid or user deleted", errorMessage: "API token not valid or user deleted", errors: [] });
	// 			}
	// 		} else {
	// 			res.status(400).json({ status: 2, data: {}, developerMessage: "Please enter API token", errorMessage: "Please enter API token", errors: [] });
	// 		}
	// 	} catch(err) {
	// 		res.status(503).json({error : "Service Unavailable"})
	// 	}
	// }
}