module.exports = function(ua) {
	var useragent = require('useragent');
	var agent = useragent.is(ua);

	$ = {
		Mobile: false,
		iOS: false,
		iPhone: false,
		iPad: false,
		Android: false,
		webOS: false,
		Mac: false,
		Windows: false,
		Other: true,

		Browser: {
			name: null,
			version: 0
		}
	};

	if (/mobile/i.test(ua)) {
		$.Mobile = true;
	}

	if (/like Mac OS X/.test(ua)) {
		$.iOS 		= /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
		$.iPhone 	= /iPhone/.test(ua);
		$.iPad 		= /iPad/.test(ua);
	}

	if (/Android/.test(ua)) 				$.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
	if (/webOS\//.test(ua)) 				$.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];
	if (/(Intel|PPC) Mac OS X/.test(ua)) 	$.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;
	if (/Windows NT/.test(ua)) 				$.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

	for(var key in $) {
		if(key !== 'Other' && key !== 'Mobile' && $[key] !== false) {
			$.Other = false;
		}
	}

	for(var browser in agent) {
		if(browser !== 'version' && agent[browser] === true) $.Browser.name = browser;
		if(browser === 'version') $.Browser.version = agent[browser];
	}

	return $;
}