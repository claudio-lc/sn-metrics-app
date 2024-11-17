"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricType = exports.SnowQuality = void 0;
var SnowQuality;
(function (SnowQuality) {
    SnowQuality["powder"] = "Powder";
    SnowQuality["crust"] = "Crust";
    SnowQuality["slush"] = "Slush";
    SnowQuality["ice"] = "Ice";
})(SnowQuality || (exports.SnowQuality = SnowQuality = {}));
var MetricType;
(function (MetricType) {
    MetricType["occupation"] = "Occupation";
    MetricType["windSpeed"] = "Wind speed";
    MetricType["snowQuality"] = "Snow quality";
})(MetricType || (exports.MetricType = MetricType = {}));
