// custom static functions
class CodeBook {
    static sortObj(obj) {
        let result = [];

        Object.keys(obj).sort().forEach(key => {
            result.push({
                key: key,
                content: obj[key]
            });
        });

        return result;
    }
}

export default CodeBook;