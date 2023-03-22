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

    static sortArrBy(arr, key) {
        function compare(a, b) {
            if (a[key] < b[key]){
                return -1;
            }
            if (a[key] > b[key]){
                return 1;
            }
            return 0;
        }

        return arr.sort(compare);
    }
}

export default CodeBook;