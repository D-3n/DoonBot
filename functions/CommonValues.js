// Compares two arrays and returns true if a common value is found.
module.exports = function CommonValues(array1, array2) {

    const commonTerms = array1.filter( x => array2.includes(x))
    return Boolean(commonTerms.length)

}

