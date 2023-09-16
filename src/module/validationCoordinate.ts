export function validateCoordinates(input?: string) {

    const regex = /^([0-2]?[0-9]?[0-9](\.\d+)?)$/
    if (input) {
        if (!regex.test(input)) {
            return false
        }

        const degree = parseFloat(input);
        const minutes = Math.round((degree - Math.floor(degree)) * 100);
        const seconds = Math.round((degree - Math.floor(degree)) * 10000 - minutes * 100);
        if (degree < 0 || degree > 359) return false;

        if (minutes < 0 || minutes > 59) return false;

        if (seconds < 0 || seconds > 59) return false;

        return true;
        // if (input) {
        //     const stringfrequency = input.toString()

        //     if (stringfrequency.includes('.')) {
        //         const parts = stringfrequency.split('.')
        //         if (parts.length === 2) {
        //             const degrees = +parts[0]
        //             const minutes = parts[1].substring(0, 2).length === 1 ? +(parts[1].substring(0, 2) + '0') : +parts[1].substring(0, 2)
        //             const seconds = parts[1].substring(2).length === 1 ? +(parts[1].substring(2) + '0') : +parts[1].substring(2)
        //             console.log(minutes, seconds)
        //             if ((degrees >= 0 && degrees < 360) && ((minutes >= 0 && minutes <= 60) || !minutes) && ((seconds >= 0 && seconds <= 60) || !seconds)) {
        //                 return false; // 유효한 좌표
        //             }
        //         }
        //     }
        // }

    }
    return false; // 유효하지 않은 좌표

}