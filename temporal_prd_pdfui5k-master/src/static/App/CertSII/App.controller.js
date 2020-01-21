sap.ui.define([
    "AutoservicioPHR/App/BaseController",
    // "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(BaseController, JSONModel, MessageToast) {
    "use strict";

    // var dominio = "https://serviciossffqa.kaufmann.cl:4000";
    
    var begda;
    var endda;

    return BaseController.extend("AutoservicioPHR.App.CertSII.App", {

        _onValidarPDF: function(oEvent) {
            oEvent.preventDefault();
            MessageToast.show("ERROR PDF");
        },

        _onLeeAnho: function() {

            var seleccion = "";
            begda = "-01-01";
            endda = "-12-31";
            var anho = this.getView().byId("comboAnho")
            var SelectedKey = anho.getSelectedKey();

            seleccion = SelectedKey;

            begda = seleccion + begda;
            endda = seleccion + endda;

        },

        onEnviar: function(evt) {

            // MessageToast.show(evt.getSource().getId() + " Pressed");
            this.getView().setBusy(true);

            var urlCertSII = this.dominio + '/api/hcm/certSII/' + begda + '/' + endda;

            var oModel = new JSONModel({
              Source: urlCertSII,
              Title: "Certificado SII",
              Height: "600px"
            });

            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);

            this.getView().setBusy(false);
        },

        onInit: function() {

            this.getView().setBusy(true);

            var anhos = [];
            var urlPeriodos = this.dominio+'/api/hcm/periodos';

            var oModelAnhos = new sap.ui.model.json.JSONModel();
            var a;

            $.ajax({
              url: urlPeriodos,
                dataType: 'json',
                async: false,
                success: function(response){
                
                  var data = response;  // binding to /value can also take place here
                  for(var i in response.d.results)
                  {
                    // console.log(response.d.results[i].Vabrj)
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

            var comboAnho = this.getView().byId("comboAnho");
            comboAnho.setModel(oModelAnhos,"anhoModel");

            this.getView().setBusy(false);

        }
    });
});