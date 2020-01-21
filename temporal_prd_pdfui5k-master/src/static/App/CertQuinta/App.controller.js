sap.ui.define([
    "AutoservicioPHR/App/BaseController",
    // "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(BaseController, JSONModel, MessageToast) {
    "use strict";

    var seleccion = "";
    // var dominio = "https://serviciossffqa.kaufmann.cl:4000";

    return BaseController.extend("AutoservicioPHR.App.CertQuinta.App", {

        _onValidarPDF: function(oEvent) {
            oEvent.preventDefault();
            MessageToast.show("ERROR PDF");
        },

        _onLeePeriodo: function() {

            var periodos = this.getView().byId("comboPeriodos")
            var SelectedKey = periodos.getSelectedKey();

            seleccion = SelectedKey;

            var urlBoleta = this.dominio + '/api/hcm/certQuinta/' + seleccion;


            var oModel = new JSONModel({
                Source: urlBoleta,
                Title: "Certificado Quinta",
                Height: "600px"

            });

            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);

            this.getView().setBusy(false);


        },

        onInit: function() {
            
            this.getView().setBusy(true);
            
            var urlPeriodos = this.dominio + '/api/hcm/periodos';
            
            var oModelPeriodos = new sap.ui.model.json.JSONModel();
            
            var anhos = [];
            var oModelAnhos = new sap.ui.model.json.JSONModel();
            var a;
            
            $.ajax({
                url: urlPeriodos,
                dataType: 'json',
                async: false,
                success: function(response) {

                    // Acumular año
                    var data = response;  // binding to /value can also take place here
                    for(var i in response.d.results)
                    {
                        if(a != response.d.results[i].Vabrj){
                          anhos.push({'Anho': response.d.results[i].Vabrj});
                          a = response.d.results[i].Vabrj;
                        }
                    }

                    oModelAnhos.setData({
                      array: anhos
                    })
                }
            })
            
            var anhosArray = oModelAnhos.oData.array;
            
            if (anhosArray.length > 0) {
                // último periodo
                var urlBoleta = this.dominio + '/api/hcm/certQuinta/' + anhosArray[0].Anho;
                var comboPeriodo = this.getView().byId("comboPeriodos");
                
                comboPeriodo.setModel(oModelAnhos,"periodosModel");
                
                this.getView().byId("comboPeriodos").setModel(oModelAnhos, "periodosModel");
                
                var oModel = new JSONModel({
                    Source: urlBoleta,
                    Title: "Certificado Quinta",
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