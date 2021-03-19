const fs = require('fs-extra');

exports.test = async () => {
    try {
        const data = fs.readFileSnyc('./test.txt', 'utf8');
        console.log('From test');
        return data;
    } catch (error) {
        console.log(error);        
    }
}
