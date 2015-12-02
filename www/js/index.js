var app = {

  	initialize: function() {
  		this.bindEvents();
  	},
  
  	bindEvents: function() {
    	document.addEventListener('deviceready', this.onDeviceReady, false);
  	},
  
  	onDeviceReady: function() {
	  // alert(device.platform+","+device.cordova);
		var errata = new Errata();
    	app.receivedEvent('deviceready');
	},

	receivedEvent: function(id) {
  		console.log('Received Event: ' + id);
	}
};

app.initialize();
