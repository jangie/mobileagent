module.exports = function(ua) {
	var useragent = require('useragent');
	var agent = useragent.is(ua);
	var v = '';

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
		v = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua);

		if(v.length >= 3) $.iOS = [2].replace(/_/g, '.');
		else $.iOS = true;

		$.iPhone 	= /iPhone/.test(ua);
		$.iPad 		= /iPad/.test(ua);
	}

	if (/Android/.test(ua)) {
		v = /Android ([0-9\.]+)[\);]/.exec(ua);
		
		if(v.length >= 2) $.Android = v[1];
		else $.Android = true;
	}

	if (/webOS\//.test(ua)) {
		v = /webOS\/([0-9\.]+)[\);]/.exec(ua);
		
		if(v.length >= 2) $.webOS = v[1];
		else $.webOS = true;
	}

	if (/(Intel|PPC) Mac OS X/.test(ua)) {
		v = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua);
		
		if(v.length >= 3) $.Mac = v[2].replace(/_/g, '.');
		else $.Mac = true;
	}

	if (/Windows NT/.test(ua)) {
		v = /Windows NT ([0-9\._]+)[\);]/.exec(ua);
		
		if(v.length >= 2) $.Windows = v[1];
		else $.Windows = true;
	}

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