
class BaseClass {
    delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }

    delayfixed(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }

}

module.exports.BaseClass = BaseClass;