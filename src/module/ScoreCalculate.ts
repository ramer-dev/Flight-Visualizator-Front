function getScoreFromString(data?: string): number {
    if (!data) return 5; // 값이 주어지지 않은 경우 기본값 5를 반환
    const [x, y] = data.split('/');
    return Math.min((parseInt(x), parseInt(y)));
}

export function FindMinimumScore(txm?: string, rxm?: string, txs?: string, rxs?: string) {

    const mainTx = getScoreFromString(txm);
    const mainRx = getScoreFromString(rxm);
    const backupTx = getScoreFromString(txs);
    const backupRx = getScoreFromString(rxs);

    // 주장비의 송수신만 있는 경우
    const minScoreWithMain = Math.min(mainTx, mainRx);

    // 예비장비의 송수신만 있는 경우
    const minScoreWithBackup = Math.min(backupTx, backupRx);

    // 주장비와 예비장비 모두 있는 경우
    const minScoreBoth = Math.min(mainTx, mainRx, backupTx, backupRx);

    // 최소값을 찾습니다.
    const minScore = Math.min(minScoreWithMain, minScoreWithBackup, minScoreBoth);

    // 해당 점수에 따른 색깔을 가져옵니다.
    return minScore;
}

