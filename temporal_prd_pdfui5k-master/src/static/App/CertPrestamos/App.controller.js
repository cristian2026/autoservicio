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
   
   return BaseController.extend("AutoservicioPHR.App.CertPrestamos.App", {

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

          var urlCertificado = this.dominio+'/api/hcm/certPrestamos/'+pabrj+'/'+pabrp;



        var oModel = new JSONModel({
        Source: urlCertificado,
        Title: "Cartola de Endeudamiento",
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

        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;

        var urlCertificado = this.dominio+'/api/hcm/certPrestamos/'+year+'/'+month;
    //     var urlPeriodos = dominio+'/api/hcm/periodos';



    // var oModelPeriodos = new sap.ui.model.json.JSONModel();


    //   $.ajax({
    //       url: urlPeriodos,
    //         dataType: 'json',
    //         async: false,
    //         success: function(response){
            
    //         var data = response;  // binding to /value can also take place here
    //           oModelPeriodos.setData(data); 
              

    //         }
    //     })


    //     var comboPeriodo = this.getView().byId("comboPeriodos");
    //     comboPeriodo.setModel(oModelPeriodos,"periodosModel");
    //     this.getView().byId("comboPeriodos").setModel(oModelPeriodos,"periodosModel");




        var oModel = new JSONModel({
        Source: urlCertificado,
        Title: "Cartola de Endeudamiento",
        Height: "600px"
        
        });

        
        this.getView().setModel(oModel);

        var pdf = this.getView().byId("PDFViewer");

        pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);


         this.getView().setBusy(false);

      }
   });
});