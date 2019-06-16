module.exports = {
    Calculator: (datetime) => {
        console.log(new Date() - new Date('6/14/2019, 6:05:50 PM'))
    },
    ConvertTimeZone: function (element) {
        return new Date(element).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    },
    ConvertToDay: function (element){
        switch(new Date(element).getDay()){
            case 0:
                return 'CN'
                break
            case 1:
                return 'T2'
                break
            case 2:
                return 'T3'
                break
            case 3:
                return 'T4'
                break
            case 4:
                return 'T5'
                break
            case 5:
                return 'T6'
                break
            case 6:
                return 'T7'
                break
        }
    }
}