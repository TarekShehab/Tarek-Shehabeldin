class HelperLib {

    getRandomString(length) {
        var randomChars = 'joe-dave-harry-pete-mark-arn';

        var result = '';
        for (var i = 0; i < length; i++) {

            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    getRandomName() {
        var result = ''
        let thelist = ['joe', 'dave', 'harry', 'pete', 'mark', 'arn']
        let numbernames = thelist.length
        let chosen_number = Math.floor(Math.random() * numbernames) + 1
        result = thelist[chosen_number - 1]
        return result
    }

}

module.exports.HelperLib = HelperLib;