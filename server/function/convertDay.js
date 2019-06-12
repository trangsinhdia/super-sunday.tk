module.exports = {
    PostFormat: function (element) {
        //2019-05-12T14:00Z
        return element.slice(0, 4) + element.slice(5, 7) + element.slice(8, 10)
    },
    ConvertTimeZone: function (element) {
        return new Date(element).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    }
}