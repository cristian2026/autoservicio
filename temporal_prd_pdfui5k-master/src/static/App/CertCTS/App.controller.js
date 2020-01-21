sap.ui.define([
    "jquery.sap.global",
    "AutoservicioPHR/App/BaseController",
    // "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(jQuery, BaseController, JSONModel, MessageToast) {
    "use strict";

    var seleccion = "";
    var begda = "";
    var endda = "";
    // var dominio = "https://serviciossffqa.kaufmann.cl:4000";

    return BaseController.extend("AutoservicioPHR.App.CertCTS.App", {

        _onLeePeriodo: function() {

            var periodos = this.getView().byId("comboPeriodos")
            var SelectedKey = periodos.getSelectedKey();

            seleccion = SelectedKey;

            var periodoSel = seleccion.split('-');

            MessageToast.show(SelectedKey);

            var pabrp = periodoSel[0];
            var pabrj = periodoSel[1];

            var urlCertCTS = this.dominio + '/api/hcm/certCTS/' + pabrj + '/' + pabrp;


            var oModel = new JSONModel({
                Source: urlCertCTS,
                Title: "Certificado CTS",
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


        onAsignaBegda: function(oEvent) {
            //var oText = this.byId("BEGDA");
            var oDP = oEvent.oSource;
            var sValue = oEvent.getParameter("value");
            var bValid = oEvent.getParameter("valid");
            this._iEvent++;
            //oText.setText("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);

            MessageToast.show("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);

            //egda = sValue.replace(/-/g,"");
            begda = sValue;

            if (bValid) {
                oDP.setValueState(sap.ui.core.ValueState.None);
            } else {
                oDP.setValueState(sap.ui.core.ValueState.Error);
            }
        },
        onAsignaEndda: function(oEvent) {
            //var oText = this.byId("BEGDA");
            var oDP = oEvent.oSource;
            var sValue = oEvent.getParameter("value");
            var bValid = oEvent.getParameter("valid");
            this._iEvent++;
            //oText.setText("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);

            //endda = sValue.replace(/-/g,"");
            endda = sValue;

            MessageToast.show("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);

            if (bValid) {
                oDP.setValueState(sap.ui.core.ValueState.None);
            } else {
                oDP.setValueState(sap.ui.core.ValueState.Error);
            }
        },
        onEnviar: function(evt) {


            var urlCertCTS = this.dominio + '/api/hcm/certCTS/' + begda + '/' + endda;

            MessageToast.show(urlCertCTS);


            var oModel = new JSONModel({
                Source: urlCertCTS,
                Title: "Certificado CTS",
                Height: "600px"

            });

            this.getView().setBusy(true);


            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);


            this.getView().setBusy(false);
        },


        onInit: function() {

            this.getView().setBusy(true);

            this.getView().setBusy(true);
            // jQuery.ajax({
            //     url: "../config.json",
            //     dataType: "json",
            //     success: function(data, textStatus, jqXHR) {

            //         dominio = data.dominioLocal;

            //     }
            // });

            var urlPeriodos = this.dominio + '/api/hcm/periodosCTS';



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

            this.getView().setModel(oModel);

            var urlCertCTS = this.dominio + '/api/hcm/certCTS/' + oModelPeriodos.oData.d["results"][0].Vabrj + '/' + oModelPeriodos.oData.d["results"][0].Vabrp + '/';



            var comboPeriodo = this.getView().byId("comboPeriodos");
            comboPeriodo.setModel(oModelPeriodos, "periodosModel");
            this.getView().byId("comboPeriodos").setModel(oModelPeriodos, "periodosModel");




            var oModel = new JSONModel({
                Source: urlCertCTS,
                Title: "Certificado CTS",
                Height: "600px"

            });


            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);


            this.getView().setBusy(false);

        }
    });
});