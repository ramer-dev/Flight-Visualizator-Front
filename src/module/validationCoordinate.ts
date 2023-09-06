export function validateCoordinates(input?: string) {

    if (input) {

        if (input.includes('.')) {
            const parts = input.split(".");

            if (parts.length <= 2 && parts[0].length <= 3) {
                const degrees = parseInt(parts[0]);
                let minutes;
                let seconds;
                if (parts[1].length >= 2) {
                    minutes = parseInt(parts[1].substring(0, 2))
                    seconds = parseInt(parts[1].substring(2));
                    if (degrees >= 0 && degrees < 180 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
                        return true; // 유효한 좌표
                    }
                }
                return true;
            }
        } else {
            return true;
        }
    }

    return false; // 유효하지 않은 좌표
}