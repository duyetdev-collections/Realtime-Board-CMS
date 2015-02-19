var config = {
    domain: {
        host: 'http://localhost',
        port: '3005'
    },
    env: 'dev', // dev or prod
    mongodb: {
        credentials: '', // username:password@
        host: 'localhost',
        port: ':27017', // :port
        dbName: 'blogio'
    },
    twitter: {
        consumerKey: 'xxx',
        consumerSecret: 'xxx'
    },
    public: {
        blogName: 'Food Ordering System',
        blogDescription: 'Realtime booking',
        api: {
            articles: '/articles',
            articlesPublished: '/articlespublished',
            users: '/users'
        },
        url: {
		authTwitter: '/auth/twitter',
		authTwitterCallback: '/auth/twitter/callback',
		
		// Public page
        home: '/home',
		login: '/login',
        account: '/account',


		admin: '/admin',
		blog: '/blog', 

        // Special page
		staff: '/staff', // phuc vu 
		chef: '/chef', // dau bep 
		manager: '/manager', // quan ly nha hang
	
        }
    }
};

module.exports = config;
