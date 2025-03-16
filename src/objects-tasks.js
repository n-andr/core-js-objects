/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  //   const copyObj = { ...obj };
  //   return copyObj;
  //   return Object.create(
  //     Object.getPrototypeOf(obj),
  //     Object.getOwnPropertyDescriptors(obj)
  //   );
  // return Object.fromEntries(Object.entries(obj));
  //   const copy = {};
  //   Object.keys(obj).forEach((key) => {
  //     copy[key] = obj[key];
  //   });
  // return copy;
  //   return Object.assign({}, obj);
  return obj.constructor.assign({}, obj);
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  const mergedObj = {};
  objects.forEach((element) => {
    Object.entries(element).forEach(([key, value]) => {
      if (mergedObj[key]) mergedObj[key] += value;
      else mergedObj[key] = value;
    });
  });
  return mergedObj;
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {Array} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, ['age']) => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const objEdited = obj;
  keys.forEach((key) => delete objEdited[key]);
  return objEdited;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  // return _.isEqual(obj1, obj2);
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  Object.freeze(obj);

  return obj;
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const sortedLetters = Object.entries(lettersObject)
    .flatMap(([letter, positions]) => positions.map((pos) => [pos, letter]))
    .sort(([a], [b]) => a - b);
  let finalStr = '';
  for (let i = 0; i < sortedLetters.length; i += 1) {
    finalStr += sortedLetters[i][1];
  }
  return finalStr;
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  const bills = { 25: 0, 50: 0 };

  return queue.reduce((canSell, bill) => {
    if (!canSell) return false; // If already failed, exit early

    if (bill === 25) {
      bills[25] += 1; // ✅ Accept $25, no change needed
    } else if (bill === 50) {
      if (bills[25] > 0) {
        bills[25] -= 1; // ✅ Give change with one $25 bill
        bills[50] += 1;
      } else {
        return false; // ❌ Not enough change
      }
    } else if (bill === 100) {
      if (bills[50] > 0 && bills[25] > 0) {
        bills[50] -= 1; // ✅ Prefer using one $50
        bills[25] -= 1;
      } else if (bills[25] >= 3) {
        bills[25] -= 3; // ✅ Use three $25 bills
      } else {
        return false; // ❌ Not enough change
      }
    }

    return true;
  }, true);
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;

  this.getArea = function getArea() {
    return this.width * this.height;
  };
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { height: 10, width: 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  return Object.setPrototypeOf(obj, proto);
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @param {array} arr
 * @return {array}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  return arr.sort((a, b) => {
    if (a.country === b.country) {
      return a.city.localeCompare(b.city); // ✅ Sort by city if countries are equal
    }
    return a.country.localeCompare(b.country); // ✅ Sort by country first
  });
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @param {array} array
 * @param {Function} keySelector
 * @param {Function} valueSelector
 * @return {Map}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const result = new Map();
  array.forEach((el) => {
    const key = keySelector(el);
    const value = valueSelector(el);
    if (!result.has(key)) {
      result.set(key, []);
    }
    result.get(key).push(value);
  });
  return result;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class CssSelector {
  constructor() {
    this.parts = {
      element: '',
      id: '',
      classes: [],
      attributes: [],
      pseudoClasses: [],
      pseudoElement: '',
    };
    this.order = 0;
  }

  clone() {
    const clone = new CssSelector();
    clone.parts = {
      element: this.parts.element,
      id: this.parts.id,
      classes: [...this.parts.classes],
      attributes: [...this.parts.attributes],
      pseudoClasses: [...this.parts.pseudoClasses],
      pseudoElement: this.parts.pseudoElement,
    };
    clone.order = this.order;
    return clone;
  }

  checkOrder(currentOrder) {
    if (currentOrder < this.order) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    this.order = currentOrder;
  }

  element(value) {
    this.checkOrder(1);
    if (this.parts.element) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    const newSelector = this.clone();
    newSelector.parts.element = value;
    return newSelector;
  }

  id(value) {
    this.checkOrder(2);
    if (this.parts.id) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    const newSelector = this.clone();
    newSelector.parts.id = `#${value}`;
    return newSelector;
  }

  class(value) {
    this.checkOrder(3);
    const newSelector = this.clone();
    newSelector.parts.classes.push(`.${value}`);
    return newSelector;
  }

  attr(value) {
    this.checkOrder(4);
    const newSelector = this.clone();
    newSelector.parts.attributes.push(`[${value}]`);
    return newSelector;
  }

  pseudoClass(value) {
    this.checkOrder(5);
    const newSelector = this.clone();
    newSelector.parts.pseudoClasses.push(`:${value}`);
    return newSelector;
  }

  pseudoElement(value) {
    this.checkOrder(6);
    if (this.parts.pseudoElement) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    const newSelector = this.clone();
    newSelector.parts.pseudoElement = `::${value}`;
    return newSelector;
  }

  stringify() {
    return (
      this.parts.element +
      this.parts.id +
      this.parts.classes.join('') +
      this.parts.attributes.join('') +
      this.parts.pseudoClasses.join('') +
      this.parts.pseudoElement
    );
  }
}

function combineSelectors(selector1, combinator, selector2) {
  return {
    stringify() {
      return `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    },
  };
}

const cssSelectorBuilder = {
  element(value) {
    return new CssSelector().element(value);
  },
  id(value) {
    return new CssSelector().id(value);
  },
  class(value) {
    return new CssSelector().class(value);
  },
  attr(value) {
    return new CssSelector().attr(value);
  },
  pseudoClass(value) {
    return new CssSelector().pseudoClass(value);
  },
  pseudoElement(value) {
    return new CssSelector().pseudoElement(value);
  },
  combine(selector1, combinator, selector2) {
    return combineSelectors(selector1, combinator, selector2);
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
