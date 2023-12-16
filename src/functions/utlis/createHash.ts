import crypto from 'crypto';
/**
 * Creates a unique hash for table entry to prevent duplication.
 * 
 * Used by writeDatabase function;
 * 
 * @param {Object} inputData
 * @returns {String} Hash
 */
function createHash(inputData:any) {
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(inputData));
    return hash.digest('hex');
}

export default createHash;