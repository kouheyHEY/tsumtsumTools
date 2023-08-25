// 元スコア
var scoreInput = 0;
var finalScore = 0;
// レベル
var levelInput = 0;
var levelBonus = 0;
// スコア加算有無
var isPlusScore = 0;
var plusScoreBonus = 0;

/**
 * 入力スコアから予想スコアを計算する
 */
function calcScore() {
    finalScore =
        scoreInput +
        Math.floor(scoreInput * (levelBonus / 100)) +
        Math.floor(scoreInput * (plusScoreBonus / 100))
        ;
    $('#score-output').text(finalScore);
}

/**
 * 元スコアを取得する
 */
function getScoreInput() {
    scoreInput = Number($('#score-input').val());

    calcScore();

}
$(document).on("keyup", '#score-input', getScoreInput);

/**
 * レベルボーナスを計算する
 */
function getLevelInput() {
    levelInput = Number($('#level-input').val());
    levelBonus = calcLevelBonus();

    $('#level-bonus-output').text(levelBonus + '%');

    calcScore();

}
$(document).on("keyup", '#level-input', getLevelInput);


/**
 * スコア加算アイテムの有無を取得する
 */
function getPlusScore() {
    isPlusScore = $('#plus-score-input').prop("checked");
    plusScoreBonus = (isPlusScore) ? 10 : 0;

    $('#plus-score-output').text(plusScoreBonus + '%');

    calcScore();
}
$(function ($) {
    $('#plus-score-input').change(getPlusScore);
});

/**
 * レベルからレベルボーナスを計算する
 */
function calcLevelBonus() {
    // ボーナス率
    let bonusRate = 0;
    // ボーナス基準値
    let baseValue = 0;
    // ボーナス増加値
    let inc = 0;
    // 現在のレベル

    // レベル別のボーナス率計算
    if (levelInput <= 10) {
        baseValue = 0;
        inc = 0.5 * (levelInput - 0);
    } else if (levelInput <= 20) {
        baseValue = 5;
        inc = 0.4 * (levelInput - 10);
    } else if (levelInput <= 30) {
        baseValue = 9;
        inc = 0.3 * (levelInput - 20);
    } else if (levelInput <= 40) {
        baseValue = 12;
        inc = 0.2 * (levelInput - 30);
    } else if (levelInput <= 150) {
        baseValue = 14;
        inc = 0.1 * (levelInput - 40);
    } else if (levelInput <= 175) {
        baseValue = 25;
        inc = 0.1 * Math.ceil((levelInput - 150) / 5);
    } else if (levelInput <= 225) {
        baseValue = 25.5;
        inc = 0.1 * Math.ceil((levelInput - 175) / 10);
    } else {
        baseValue = 26;
        inc = 0.1 * Math.ceil((levelInput - 225) / 15);
    }

    bonusRate = baseValue + inc;
    return bonusRate;

}