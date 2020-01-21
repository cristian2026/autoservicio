sap.ui.define([
    "AutoservicioPHR/App/BaseController",
    // "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(BaseController, JSONModel, MessageToast) {
    "use strict";

    var seleccion = "";
    // var dominio = "https://serviciossffqa.kaufmann.cl:4000";

    return BaseController.extend("AutoservicioPHR.App.BoletaPago.App", {

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

            //var urlBoleta = 'http://localhost:4000/api/hcm/liqsueldo/'+pabrj+'/'+pabrp;
            var urlBoleta = this.dominio + '/api/hcm/liqsueldo/' + pabrj + '/' + pabrp + '/';


            var oModel = new JSONModel({
                Source: urlBoleta,
                Title: "Boleta de Pago",
                Height: "600px"

            });


            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);

            this.getView().setBusy(false);


        },

        onInit: function() {

            this.getView().setBusy(true);

            var urlBoleta = this.dominio + '/api/hcm/liqsueldo/2018/05';

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
                // último periodo
                var urlBoleta = this.dominio + '/api/hcm/liqsueldo/' + oModelPeriodos.oData.d["results"][0].Vabrj + '/' + oModelPeriodos.oData.d["results"][0].Vabrp + '/';
                var comboPeriodo = this.getView().byId("comboPeriodos");
                
                comboPeriodo.setModel(oModelPeriodos, "periodosModel");
                
                this.getView().byId("comboPeriodos").setModel(oModelPeriodos, "periodosModel");

                var oModel = new JSONModel({
                    Source: urlBoleta,
                    Title: "Boleta de Pago",
                    Height: "600px"
                });

                this.getView().setModel(oModel);

                var pdf = this.getView().byId("PDFViewer");

                pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);
            }

            this.getView().setBusy(false);

        }
    });
});