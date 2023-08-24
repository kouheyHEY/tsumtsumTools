// 元スコア
var scoreInput;
var validScore = false;
// レベル
var levelInput;
var validLevel = false;
// スコア加算有無
var isPlusScore = 0;

/**
 * 入力スコアから予想スコアを計算する
 */
function calcScore() {

}

/**
 * 元スコアを取得する
 */
function getScoreInput() {

}

/**
 * レベルを取得する
 */
function getLevelInput() {

}


/**
 * レベルからレベルボーナスを計算する
 */
function calcLevelBonus() {
    // ボーナス率（パーセント）
    let bonusRate = 0;
    // ボーナス基準値
    let baseValue = 0;
    // ボーナス増加値
    let inc = 0;
    // 現在のレベル
    let levelInput

    // レベル別のボーナス率計算
    if (level <= 10) {
        baseValue = 0;
        inc = 0.5 * (level - 0);
    } else if (level <= 20) {
        baseValue = 5;
        inc = 0.4 * (level - 10);
    } else if (level <= 30) {
        baseValue = 9;
        inc = 0.3 * (level - 20);
    } else if (level <= 40) {
        baseValue = 12;
        inc = 0.2 * (level - 30);
    } else if (level <= 150) {
        baseValue = 14;
        inc = 0.1 * (level - 40);
    } else if (level <= 175) {
        baseValue = 25;
        inc = 0.1 * Math.floor((level - 150) / 5);
    } else if (level <= 225) {
        baseValue = 25.5;
        inc = 0.1 * Math.floor((level - 175) / 10);
    } else {
        baseValue = 26;
        inc = 0.1 * Math.floor((level - 225) / 15);
    }

    bonusRate = baseValue + inc;
    return bonusRate;

}