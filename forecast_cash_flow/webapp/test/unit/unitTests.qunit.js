/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"forecast_cash_flow/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
