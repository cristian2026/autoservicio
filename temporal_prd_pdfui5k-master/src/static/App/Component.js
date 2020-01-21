sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device"
], function(UIComponent, Device, models, LinearIcons) {
	"use strict";

	return UIComponent.extend("AutoservicioPHR.App.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// sap.ui.getCore().getConfiguration().setLanguage("es-ES");

			// set the device model
			// this.setModel(models.createDeviceModel(), "device");
			
			// create the views based on the url/hash
			this.getRouter().initialize();
			
			//icons
			// LinearIcons.initIconLibrary();
		}
	});

});
