sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat"
], function (Controller, JSONModel, DateFormat) {
    "use strict";
       
    return Controller.extend("forecastcashflow.controller.View1", {
        onInit: function () {
                var oModel = new JSONModel();
                var sPath = jQuery.sap.getModulePath("forecastcashflow", "/model/data.json");
                oModel.loadData(sPath);
                oModel.attachRequestCompleted(this.onDataLoaded.bind(this));
               
                this.getView().setModel(oModel);
            },
            onDataLoaded: function () {
                var aData = this.getView().getModel().getProperty("/data");
                this.getView().getModel().setProperty("/filteredData", aData);
            },
            onFilter: function (oEvent) {
                var sForecastDays = this.getView().byId("forecastdays").getSelectedItem().getText();
                // var sForecastDays = 7;
     
                var aData = this.getView().getModel().getProperty("/data");
                var iForecastDays = parseInt(sForecastDays, 10);
     
                var aFilteredData = this._getForecastData(aData, iForecastDays);
     
                this.getView().getModel().setProperty("/filteredData", aFilteredData);
            },
     
            _getForecastData: function (aData, iForecastDays) {
                var aFilteredData = [];
                var oDateFormat = DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
                var oToday = new Date();
     
                for (var i = 0; i < iForecastDays; i++) {
                    var oFutureDate = new Date();
                    oFutureDate.setDate(oToday.getDate() + i); // Future date calculation
     
                    var oForecast = aData[i % aData.length];
                    aFilteredData.push({
                        date: oDateFormat.format(oFutureDate),
                        CM_Account1: oForecast.CM1,
                        CM_Account2: oForecast.CM2,
                        CM_Account3: oForecast.CM3,
                        CM_Account4: oForecast.CM4,
                        CM_Account5: oForecast.CM5
                    });
                }
     
                return aFilteredData;
            }
        })
    });
