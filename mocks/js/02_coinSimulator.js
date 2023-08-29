// 現在のコイン
var myCoinInput = 0;
// 目標コイン
var targetCoinInput = 0;
// 残りコイン
var adjustCoin = 0;
// 許容チェーン
var chainLimInput = 0;

/**
 * 入力スコアから予想スコアを計算する
 */
function calcChain() {
    $('#coin-output').text(adjustCoin.toLocaleString());
}


/** 
 * 残りコイン枚数を計算する
 */
function calcAdjustCoin() {
    adjustCoin = targetCoinInput - myCoinInput;
}

/**
 * 現在コインを取得する
 */
function getMyCoinInput() {
    myCoinInput = Number($('#my-coin-input').val());

    calcAdjustCoin();
    calcChain();

}
$(document).on("keyup", '#my-coin-input', getMyCoinInput);

/**
 * 目標コインを取得する
 */
function getTargetCoinInput() {
    targetCoinInput = Number($('#target-coin-input').val());

    calcAdjustCoin();
    calcChain();

}
$(document).on("keyup", '#target-coin-input', getTargetCoinInput);

/**
 * 許容チェーンを取得する
 */
function getChainLimInput() {
    chainLimInput = Number($('#chain-lim-input').val());

    calcChain();

}
$(document).on("keyup", '#chain-lim-input', getChainLimInput);



/**
 * 残りコイン枚数と許容チェーンから、チェーンの組み合わせを計算する
 */
function calcChainComb() {
    let chainCombList = [];


    return chainCombList;

}