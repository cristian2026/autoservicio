sap.ui.define([
    "jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageBox'
], function(jQuery, Controller, History, JSONModel, MessageBox) {
	"use strict";

	jQuery.sap.require("jquery.sap.storage");

	return Controller.extend("AutoservicioPHR.App.BaseController", {
		
		/* =========================================================== */
		/* routers                                                     */
		/* =========================================================== */

    	dominio: "https://serviciossff.kaufmann.cl:4002",
		
		/**
		 * Acceso router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} ruta en donde fue solicitado.
		 */
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNavBack: function() {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.routeTo("home", {}, true /*no history*/);
			}
		},

		routeTo: function(sName, oParams, bHistory) {
			this.getRouter().navTo(sName, (oParams !== undefined) ? oParams : {}, bHistory?true:bHistory);
		},

		navTo: function(sName) {
			var oRouter = this.getRouter();
			oRouter.getTargets().display(sName);
		},
	
	});
});
