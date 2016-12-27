"use strict";
const strike_util_1 = require("strike-util");
const Rules_1 = require("./Rules");
function createRuleDefForField(def, rule, validator) {
    let parts = rule.split(':');
    let name = parts.shift();
    let fn = validator.getValidationRule(name);
    if (!fn) {
        throw new Error(strike_util_1.printf('%s is not a rule.', name));
    }
    return fn.apply(null, ...parts);
}
class Validator {
    constructor(localizer) {
        this.localizer = localizer;
        this._validationRules = {};
    }
    addRule(key, rule) {
        this._validationRules[key] = rule;
        return this;
    }
    parseFields(fields) {
        this.rules = fields.map((em) => {
            let rr = [{
                    validate: this.getValidationRule(em.type),
                    ruleName: em.type,
                    params: []
                }];
            let ev = em.rule.split('|').forEach((ez) => {
                let parts = ez.split(':');
                let name = parts.shift();
                let fn = this.getValidationRule(name);
                if (!fn) {
                    throw new Error(strike_util_1.printf('%s is not a rule.', name));
                }
                rr.push({
                    validate: fn.apply(null, parts),
                    ruleName: name,
                    params: parts
                });
            });
            return (val, errors) => {
                let rrTemp = null;
                for (let i = 0, l = rr.length; i < l; i++) {
                    rrTemp = rr[i];
                    if (!rrTemp.validate(val[em.key])) {
                        errors.push(strike_util_1.printf(this.localizer.get(rrTemp.ruleName), this.localizer.getLabelForField(em.key), ...rrTemp.params, val[em.key]));
                    }
                }
            };
        });
    }
    validate(obj) {
        let errors = [];
        this.rules.forEach((em) => {
            em(obj, errors);
        });
        return errors;
    }
    getLabelForField(key) {
        return this.localizer.getLabelForField(key);
    }
    getValidationRule(key) {
        return this._validationRules[key] || Rules_1.RULES[key];
    }
}
exports.Validator = Validator;
