export var RULES = {
    "required": function () {
        return function (val) {
            return typeof val !== "undefined" && val !== null && val !== "";
        };
    },
    "max": function (max) {
        return function (val) {
            return val < +max;
        };
    },
    "maxe": function (max) {
        return function (val) {
            return val <= +max;
        };
    },
    "min": function (min) {
        return function (val) {
            return val > +min;
        };
    },
    "mine": function (min) {
        return function (val) {
            return val >= +min;
        };
    },
    "date": function () {
        return function (val) {
            return typeof val === "object" && val instanceof Date;
        };
    },
    "number": function () {
        return function (val) {
            return typeof val === "number" && !isNaN(parseFloat(val));
        };
    },
    "between": function (min, max) {
        return function (val) {
            return val > +min && val < +max;
        };
    },
    "string": function () {
        return function () {
            return true;
        };
    },
    "betweene": function (min, max) {
        return function (val) {
            return val >= +min && val <= +max;
        };
    },
    "in": function () {
        let args = Array.prototype.slice.call(arguments, 0);
        return function (val) {
            return args.indexOf(val) !== -1;
        };
    }
};
