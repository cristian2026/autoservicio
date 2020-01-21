sap.ui.define([
    "jquery.sap.global",
    "AutoservicioPHR/App/BaseController",
    // "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(jQuery, BaseController, JSONModel, MessageToast) {
    "use strict";

    var seleccion = "";
    var tipoCert = "";
    // var dominio = "https://serviciossffqa.kaufmann.cl:4000";

    return BaseController.extend("AutoservicioPHR.App.CertAntiguedad.App", {


        onCert1: function(oEvent) {

            this.getView().setBusy(true);

            var urlCertificadoAnt = this.dominio + '/api/hcm/certAntiguedad/1';

            var oModel = new JSONModel({
                Source: urlCertificadoAnt,
                Title: "Certificado de Antiguedad",
                Height: "600px"

            });

            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);

            this.getView().setBusy(false);
        },


        onCert2: function(oEvent) {

            this.getView().setBusy(true);

            var urlCertificadoAnt = this.dominio + '/api/hcm/certAntiguedad/2';

            var oModel = new JSONModel({
                Source: urlCertificadoAnt,
                Title: "Certificado de Antiguedad",
                Height: "600px"

            });

            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);

            this.getView().setBusy(false);
        },

        onCert3: function(oEvent) {

            this.getView().setBusy(true);

            var urlCertificadoAnt = this.dominio + '/api/hcm/certAntiguedad/3';

            var oModel = new JSONModel({
                Source: urlCertificadoAnt,
                Title: "Certificado de Antiguedad",
                Height: "600px"

            });

            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);


            this.getView().setBusy(false);

        },

        _onValidarPDF: function(oEvent) {
            oEvent.preventDefault();
            MessageToast.show("ERROR PDF");
        },

        _onLeePeriodo: function() {

            var periodos = this.getView().byId("comboPeriodos")
            var SelectedKey = periodos.getSelectedKey();

            seleccion = SelectedKey;

            var periodoSel = seleccion.split('-');

            MessageToast.show(SelectedKey);

            var pabrp = periodoSel[0];
            var pabrj = periodoSel[1];

            var urlBoleta = this.dominio + '/api/hcm/liqsueldo/' + pabrj + '/' + pabrp;

            var oModel = new JSONModel({
                Source: urlBoleta,
                Title: "Boleta de Pago Kaufmann",
                Height: "600px"

            });

            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);

            this.getView().setBusy(false);
        },

        onInit: function() {
            this.getView().setBusy(true);
            var urlCertificadoAnt = this.dominio + '/api/hcm/certAntiguedad/1';

            var oModel = new JSONModel({
                Source: urlCertificadoAnt,
                Title: "Certificado de Antiguedad",
                Height: "600px"

            });

            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);

            this.getView().setBusy(false);

        }
    });
});