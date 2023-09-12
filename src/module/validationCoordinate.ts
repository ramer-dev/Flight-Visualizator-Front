export function validateCoordinates(input?: string) {

    if (input) {
        const stringfrequency = input.toString()

        if (stringfrequency.includes('.')) {
            const parts = stringfrequency.split('.')
            if (parts.length === 2) {
                const degrees = +parts[0]
                const minutes = parts[1].substring(0, 2).length === 1 ? +(parts[1].substring(0, 2) + '0') : +parts[1].substring(0, 2)
                const seconds = parts[1].substring(2).length === 1 ? +(parts[1].substring(2) + '0') : +parts[1].substring(2)
                if (degrees >= 0 && degrees <= 180 && minutes >= 0 && minutes <= 60 && seconds >= 0 && seconds <= 60) {
                    return false; // 유효한 좌표
                }
            }
        }
    }

    return true; // 유효하지 않은 좌표
}