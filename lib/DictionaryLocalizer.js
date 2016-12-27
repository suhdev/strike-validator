"use strict";
const strike_util_1 = require("strike-util");
class DictionaryLocalizer {
    constructor(dict) {
        this._dict = dict;
    }
    get(key) {
        return strike_util_1.getDataAt(this._dict, key, '.');
    }
    setLocale(locale) {
        this._locale = locale;
        return this;
    }
    getLabelForField(key) {
        return strike_util_1.getDataAt(this._dict, key, '.');
    }
}
exports.DictionaryLocalizer = DictionaryLocalizer;
