sap.ui.define([
    "jquery.sap.global",
    "AutoservicioPHR/App/BaseController",
    // "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(jQuery, BaseController, JSONModel, MessageToast) {
    "use strict";

    var seleccion = "";
    var molga = "";
    var nombreEmpleado = "";
    var dominio = "";
    var tienePrestamo = "";
    // var dominio = "https://serviciossffqa.kaufmann.cl:4000";

    return BaseController.extend("AutoservicioPHR.App.CertPrestamosPeru.App", {

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

            var urlCertificado = this.dominio + '/api/hcm/certPrestamosPeru/' + pabrj + '/' + pabrp;

            var oModel = new JSONModel({
                Source: urlCertificado,
                Title: "Certificado Prestamo",
                Height: "600px"

            });

            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);

            this.getView().setBusy(false);
        },

        onInit: function() {

            this.getView().setBusy(true);
            // jQuery.ajax({
            //     url: "../config.json",
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

            if (tienePrestamo == 'X') {

                var urlPeriodos = this.dominio + '/api/hcm/periodos';
                var oModelPeriodos = new sap.ui.model.json.JSONModel();
                //this.getView().setModel(oModelUser);

                $.ajax({
                    url: urlPeriodos,
                    dataType: 'json',
                    async: false,
                    success: function(response) {
                        var data = response; // binding to /value can also take place here
                        oModelPeriodos.setData(data);
                    }
                })

                if (oModelPeriodos.oData.d["results"].length > 0) {
                    var comboPeriodo = this.getView().byId("comboPeriodos");
                    comboPeriodo.setModel(oModelPeriodos, "periodosModel");
                    this.getView().byId("comboPeriodos").setModel(oModelPeriodos, "periodosModel");

                    var urlCertificado = this.dominio + '/api/hcm/certPrestamos/' + oModelPeriodos.oData.d["results"][0].Vabrj + '/' + oModelPeriodos.oData.d["results"][0].Vabrp + '/';

                    // var oModel = new JSONModel({
                    //     Source: urlCertificado,
                    //     Title: "Certificado de Préstamos",
                    //     Height: "600px"

                    // });

                    // this.getView().setModel(oModel);

                    // var pdf = this.getView().byId("PDFViewer");

                    // pdf.attachSourceValidationFailed("", this._onValidarPDF);
                }

            } else {
                MessageToast.show("El empleado no tiene préstamos vigentes a la fecha");
            }

            this.getView().setBusy(false);

        }
    });
});