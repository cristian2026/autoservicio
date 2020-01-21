sap.ui.define([
    "AutoservicioPHR/App/BaseController",
    "sap/m/MessageToast"
], function(BaseController, MessageToast) {

    "use strict";

    var seleccion = "";
    var molga = "";
    var nombreEmpleado = "";
    // var dominio = "https://serviciossffqa.kaufmann.cl:4000";
    var tienePrestamo = "";

    return BaseController.extend("AutoservicioPHR.App.App", {

        onPressBoletaPago: function() {

            // MessageToast.show("Boleta de Pago");
            this.routeTo("BoletaPago");
            // sap.m.URLHelper.redirect(dominio + '/UI5/BoletaPago');
        },

        onPressLiquidacionSueldo: function() {

            // MessageToast.show("Boleta de Pago");
            this.routeTo("LiquidacionSueldo");
            // sap.m.URLHelper.redirect(dominio + '/UI5/BoletaPago');
        },


        onPressCertSII: function() {

            // MessageToast.show("Certificado de Renta Chile");
            
            this.routeTo("CertSII");
            // sap.m.URLHelper.redirect(dominio + '/UI5/CertSII');
        },

        onPressCertAntiguedad: function() {

            // MessageToast.show("Certificado de Antiguedad");

            this.routeTo("CertAntiguedad");
            // sap.m.URLHelper.redirect(dominio + '/UI5/CertAntiguedad');
        },

        onPressCertPrestamos: function() {
            // MessageToast.show("Certificado de Préstamos");

            this.routeTo("CertPrestamos");
            // sap.m.URLHelper.redirect(dominio + '/UI5/CertPrestamos');
        },

        onPressCertPrestamosPerú: function() {
            // MessageToast.show("Certificado de Préstamos Perú");

            this.routeTo("CertPrestamosPeru");
            // sap.m.URLHelper.redirect(dominio + '/UI5/CertPrestamosPeru');
        },

        onPressCertUtilidadesPerú: function() {
            // MessageToast.show("Certificado de Utilidades Perú");

            this.routeTo("CertUtilidadesPeru");
            // sap.m.URLHelper.redirect(dominio + '/UI5/CertUtilidadesPeru');
        },

        onPressCertCTS: function() {
            // MessageToast.show("Certificado CTS");

            this.routeTo("CertCTS");
            // sap.m.URLHelper.redirect(dominio + '/UI5/CertCTS');
        },
        
        onPressCertQuintaPeru: function() {
            // MessageToast.show("Certificado CTS");

            this.routeTo("CertQuinta");
            // sap.m.URLHelper.redirect(dominio + '/UI5/CertCTS');
        },

        onInit: function() {

            this.getView().setBusy(true);

            // jQuery.ajax({
            //     url: "./config.json",
            //     dataType: "json",
            //     success: function(data, textStatus, jqXHR) {

            //         dominio = data.dominioLocal;

            //     }
            // });

            var urlEmpleado = this.dominio + '/api/hcm/empleado';
            var oModelEmpleado = new sap.ui.model.json.JSONModel();

            $.ajax({
                url: urlEmpleado,
                dataType: 'json',
                async: false,
                success: function(response) {

                    var data = response; // binding to /value can also take place here
                    oModelEmpleado.setData(data);

                }
            })

            molga = oModelEmpleado.oData.d["results"][0].Molga;
            nombreEmpleado = oModelEmpleado.oData.d["results"][0].Name;
            tienePrestamo = oModelEmpleado.oData.d["results"][0].TienePrestamo;

            switch (molga) {
                case 'PE':
                    this.getView().byId("liquidacionSueldo").setVisible(false);
                    this.getView().byId("certPrestamosPeru").setVisible(true);
                    this.getView().byId("certUtilidadesPeru").setVisible(true);
                    this.getView().byId("certPrestamos").setVisible(false);
                    this.getView().byId("certificadoRentaChile").setVisible(false);
                    this.getView().byId("certificadoCTS").setVisible(true);
                    this.getView().byId("certificadoAntiguedad").setVisible(false);
                    this.getView().byId("certQuintaPeru").setVisible(true);

                    break;
                case '39':
                    this.getView().byId("boletaPago").setVisible(false);
                    this.getView().byId("certPrestamosPeru").setVisible(false);
                    this.getView().byId("certUtilidadesPeru").setVisible(false);
                    this.getView().byId("certPrestamos").setVisible(true);
                    this.getView().byId("certificadoRentaChile").setVisible(true);
                    this.getView().byId("certificadoCTS").setVisible(false);
                    this.getView().byId("certificadoAntiguedad").setVisible(true);
                    this.getView().byId("certQuintaPeru").setVisible(false);

                    break;
                default:

            }
            this.getView().setBusy(false);

        }
    });
});