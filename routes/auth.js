module.exports = function(app, config, db, passport, LocalStrategy) {
    if (config.domain.port) {
        config.domain.port = ":" + config.domain.port;
    }

	passport.use(new LocalStrategy(
		function(username, password, done) {
			db.User.findOne({ username: username }, function (err, user) {
				if (err) { return done(err); }
				if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
				if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
				return done(null, user);
			});
		}
	));

	passport.serializeUser(function(user, done) {
		done(null, user.uid);
	});

	passport.deserializeUser(function(uid, done) {
		db.User.findOne({uid: uid}, function (err, user) {
			done(err, user);
		});
	});


	// -------- Account ----------
	app.get('/account', ensureAuthenticated, function(req, res){
		console.log(req.user);

		res.render('account', {
			title: 'Login',
			env: config.env,
			session: req.user
		});
	});

	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) { return next(); }
			res.redirect('/login');
	}

	// --------- Show login page -------------
	app.get(config.public.url.login, function(req, res) {
		console.log(req.user);

		res.render('client/index', {
			title: 'Login',
			env: config.env,
			session: req.user
		});
	});

	// ---------- Login Submit ------------
	app.post(
		config.public.url.login, 
		passport.authenticate('local', { failureRedirect: '/login' }),
		function (req, res) {
			// Login success 
			res.redirect(config.domain.host + config.domain.port + config.public.url.home);
	});

	// ---------- Logout -----------
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect(config.domain.host + config.domain.port + config.public.url.home);
	});
};
