function ConvertHandler() {
  this.getNum = function(input) {
    let result;
    const numRegex = /^((\d+(\.\d*)?)|(\.\d+)|((\d+(\.\d*)?)|(\.\d+))\/(\d+(\.\d*)?|\.\d+))(?=[a-zA-Z])/;
    const match = input.match(numRegex);
    if (match) {
      try {
        result = eval(match[0]);
        if (!isFinite(result)) throw new Error();
      } catch (e) {
        return 'invalid number';
      }
    } else {
      const unitIndex = input.search(/[a-zA-Z]/);
      result = unitIndex === 0 ? 1 : 'invalid number';
    }
    return result;
  };

  this.getUnit = function(input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    if (match) {
      const unit = match[0].toLowerCase();
      if (['gal', 'l', 'mi', 'km', 'lbs', 'kg'].includes(unit)) {
        return unit === 'l' ? 'L' : unit;
      }
    }
    return 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    const units = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return units[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const units = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return units[unit] || 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return 'invalid unit';
    }
    
    return Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;