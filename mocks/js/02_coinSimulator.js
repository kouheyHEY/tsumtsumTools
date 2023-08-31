// 現在のコイン
var myCoinInput = 0;
// 目標コイン
var targetCoinInput = 0;
// 残りコイン
var adjustCoin = 0;
// 許容チェーン
var chainLimInput = 0;

/** 
 * 残りコイン枚数を計算する
 */
function calcAdjustCoin() {
    adjustCoin = targetCoinInput - myCoinInput;
    if (adjustCoin > 0) {
        $('#coin-output').text(adjustCoin.toLocaleString());
    }
}

/**
 * 現在コインを取得する
 */
function getMyCoinInput() {
    myCoinInput = Number($('#my-coin-input').val());

    calcAdjustCoin();
    calcChainComb();

}
$(document).on("keyup", '#my-coin-input', getMyCoinInput);

/**
 * 目標コインを取得する
 */
function getTargetCoinInput() {
    targetCoinInput = Number($('#target-coin-input').val());

    calcAdjustCoin();
    calcChainComb();

}
$(document).on("keyup", '#target-coin-input', getTargetCoinInput);

/**
 * 許容チェーンを取得する
 */
function getChainLimInput() {
    chainLimInput = Number($('#chain-lim-input').val());

    calcChainComb();

}
$(document).on("keyup", '#chain-lim-input', getChainLimInput);


/**
 * 残りコイン枚数と許容チェーンから、チェーンの組み合わせを計算する
 */
function calcChainComb() {
    if (adjustCoin <= 0 || adjustCoin > MAX_COIN_FOR_CALC_COMBI) {
        return [];
    }

    if (chainLimInput > CHAIN_LIM || chainLimInput < CHAIN_MIN) {
        return [];
    }

    let restCoin = adjustCoin;
    let coinList = COIN_LIST_CHAIN.slice(0, chainLimInput);

    let chainCombiList = findComb(coinList, restCoin, chainLimInput - 1);

    if (chainCombiList.length > MAX_CHAIN_COMBI) {
        console.log(chainCombiList.slice(-MAX_CHAIN_COMBI));
        printChainComb(chainCombiList.slice(-MAX_CHAIN_COMBI));
        return chainCombiList.slice(-MAX_CHAIN_COMBI);
    } else {
        console.log(chainCombiList);
        printChainComb(chainCombiList);
        return chainCombiList;
    }

}

function printChainComb(chainCombiList) {
    $("#chain-comb-output").text("");
    for (let c of chainCombiList) {
        let printTxt = "";
        for (let ch of c) {
            printTxt += ch[0] + "チェーン×" + ch[1] + "回";
            printTxt += ", ";
        }
        printTxt = printTxt.substring(0, printTxt.length - 2);
        $("#chain-comb-output").append(printTxt + "<br>");
    }
}

/**
 * 再帰的にチェーンの組み合わせを再帰的に検索する
 * @param {*} coinList 獲得コインリスト
 * @param {*} restCoin 目標コイン
 * @param {*} index 参照するチェーン数
 * @param {*} curCoin 現在のコイン
 * @param {*} curCombi 現在の組み合わせ一覧
 * @returns 組み合わせ
 */
function findComb(coinList, restCoin, index, curCoin = 0, curCombi = []) {
    if (curCoin === restCoin) {
        return [curCombi.slice()];
    }

    if (curCoin > restCoin || index < CHAIN_MIN - 1) {
        return [];
    }

    let allCombi = [];

    let quotient = Math.floor((restCoin - curCoin) / coinList[index]);
    for (let i = quotient; i >= 1; i--) {
        curCombi.push([coinList[index], i]);
        allCombi.push(...findComb(coinList, restCoin, index - 1, curCoin + (i * coinList[index]), curCombi));
        curCombi.pop();
    }

    allCombi.push(...findComb(coinList, restCoin, index - 1, curCoin, curCombi));

    return allCombi;
}