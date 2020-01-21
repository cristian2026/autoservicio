sap.ui.define([
  "jquery.sap.global",
    "AutoservicioPHR/App/BaseController",
    // "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast"
], function (jQuery, BaseController,  JSONModel, MessageToast ) {
   "use strict";

   var seleccion = "";
   // var dominio = "https://serviciossffqa.kaufmann.cl:4000";
   
   return BaseController.extend("AutoservicioPHR.App.CertUtilidadesPeru.App", {

      _onValidarPDF: function(oEvent){
          oEvent.preventDefault();
          MessageToast.show("ERROR PDF");
      },

      _onLeePeriodo: function(){

          var periodos = this.getView().byId("comboPeriodos")
          var SelectedKey = periodos.getSelectedKey();

          seleccion = SelectedKey;

          var periodoSel = seleccion.split('-');

          MessageToast.show(SelectedKey);

          var pabrp = periodoSel[0];
          var pabrj = periodoSel[1];

    
          var urlCertificado = this.dominio+'/api/hcm/certUtilidadesPeru/'+pabrj+'/'+pabrp;


        var oModel = new JSONModel({
        Source: urlCertificado,
        Title: "Certificado Utilidades Kaufmann",
        Height: "600px"
        
        });

        
        this.getView().setModel(oModel);

        var pdf = this.getView().byId("PDFViewer");

        pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);
        

         this.getView().setBusy(false);

          
      },

      onInit: function(){


        this.getView().setBusy(true);

        // jQuery.ajax({
        //     url: "../config.json",
        //     dataType: "json",
        //     success: function(data, textStatus, jqXHR) {    

        //     dominio = data.dominioLocal;    

        //        }
        //      });


        var urlPeriodos = this.dominio+'/api/hcm/periodosPE';

        var oModelPeriodos = new sap.ui.model.json.JSONModel();


      $.ajax({
          url: urlPeriodos,
            dataType: 'json',
            async: false,
            success: function(response){
            
            var data = response;  // binding to /value can also take place here
              oModelPeriodos.setData(data); 
              

            }
        })

      if(oModelPeriodos.oData.d["results"].length > 0)
      {
        var comboPeriodo = this.getView().byId("comboPeriodos");
        comboPeriodo.setModel(oModelPeriodos,"periodosModel");
        this.getView().byId("comboPeriodos").setModel(oModelPeriodos,"periodosModel");

        var ultimoPeriodo = oModelPeriodos.oData.d["results"][0];
        var urlCertificado = this.dominio+'/api/hcm/certUtilidadesPeru/'+oModelPeriodos.oData.d["results"][0].Vabrj+'/'+oModelPeriodos.oData.d["results"][0].Vabrp+'/';

        var oModel = new JSONModel({
        Source: urlCertificado,
        Title: "Certificado de Utilidades",
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