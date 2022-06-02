const axios = require('axios')

// Test data: 11653 (Deboreka Necklace), 11103 (Urugon's Shoes)

/**
 * Copied from https://gist.github.com/guy0090/0a8b7a1e69b03702bb45fb66a05dced5#file-bdowebmarket-js
 * 
 * To get your TradeAuth_Session and __RequestVerificationToken cookies,
 * you need to login to your region's web trade market.
 *
 * Below is a list of all regions and their respective web market URLs, choose
 * your region and login to the web market. Once logged in, open your DevTools
 * (in Chrome: Ctrl + Shift + I or F12) and click the Network tab.
 *
 * On the Web Market, click on a category and then subcategory from the
 * left side menu of the page and check your Network tab.
 *
 * You should see a 'GetWorldMarketList' request, click on it
 * and check the 'Cookies' tab.
 *
 * Copy the TradeAuth_Session (COOKIE_TRADE_AUTH) and
 * __RequestVerificationToken (COOKIE_REQUEST_VERIFICATION_TOKEN) cookie
 * and set their respective values in the constants below.
 *
 * The TradeAuth_Session cookie doesn't actually need to be filled in, however
 * it must not be undefined.
 *
 * Now, from the 'Payload' tab, copy the __RequestVerificationToken value and set
 * QUERY_REQUEST_VERFICATION_TOKEN to it's value.
 */

const TRADE_AUTH_SESSION = 'TradeAuth_Session'
const REQUEST_VERIFICATION = '__RequestVerificationToken'

// Cookie: TradeAuth_Session
const COOKIE_TRADE_AUTH  = 'yzpemzagfaqjc4ehcarazqb0'

// Cookie: __RequestVerificationToken
const COOKIE_REQUEST_VERIFICATION_TOKEN = 'd1mdV2HUsK68nbfW6x8E2zjLfo5OtvJou4RRIeESFvLagcpIkTVmAwa7Oih58CF35t3U3XNIP82GBVqe9Df7bUlGkdjtI9e_PkE59E_ZhWw1'

// URL Encoded Param: __RequestVerificationToken
const QUERY_REQUEST_VERFICATION_TOKEN = '5qB0QXbZpU25KGJEezLzymgN-XxcLk7UXST3vF9-M_FE1qB16W60TyeGEmGu_G6hR0KuM_au5ugD_xXI-z_Lpnkqa7GjY7VN9_H2PL3sWyU1'

// All regions and their respective websites
const REGIONS = {
    na: "na-trade.naeu.playblackdesert.com",
    eu: "eu-trade.naeu.playblackdesert.com",
    sea: "trade.sea.playblackdesert.com",
    mena: "trade.tr.playblackdesert.com",
    kr: "trade.kr.playblackdesert.com",
    ru: "trade.ru.playblackdesert.com",
    jp: "trade.jp.playblackdesert.com",
    th: "trade.th.playblackdesert.com",
    tw: "trade.tw.playblackdesert.com",
    sa: "blackdesert-tradeweb.playredfox.com",
    console_eu: "eu-trade.console.playblackdesert.com",
    console_na: "na-trade.console.playblackdesert.com",
    console_asia: "asia-trade.console.playblackdesert.com"
  }

module.exports = {

    getItemInfo,
    getItemPriceHistory,
    getRegistrationQueue,
    searchMarketById,
    getItemsFromCategory,
    getItemSellBuyInfo,
    getMarketTax,
    taxItem,
    calcProfit,
    calcAccessoryChance,
    calcTotalChance,
    simulateEnhancement,
    getProfitableTetYellowEnhancements
}


/** The following commands interact with the BDO marketplace and return data using POST requests. */

/**
 * 
 * @param {String} region The game region 
 * @param {Number} itemId The ID of the item
 * @param {Number} enhancementId The enhancement level of the item
 * @returns array(s) within array with item data in the following order: ID, Min enhancement, Max enhancement, Base price, Current stock, Total trades, Highest price, Lowest price, Last sale price, Last sale time 
 */
async function getItemInfo(region = 'eu', itemId, enhancementId = -1) {

        const res = await axios({
            url: `https://${REGIONS[region]}/Trademarket/GetWorldMarketSubList`,
            method: "POST",
            data: {
                keyType: 0,
                mainKey: itemId
            }
        })
        
        const data = res.data.resultMsg
        let result = data.split(/[|]/gm)
        result.pop()
        
        if (enhancementId >= result.length || enhancementId < -1 || !Number.isInteger(enhancementId)) {
            enhancementId = -1
        }

        const returnedData = []
        if (enhancementId === -1) {
            result.forEach(e => {
                let enhancementData = e.split('-');
                returnedData.push(enhancementData);
            });
        } else {
            returnedData.push(result[enhancementId].split('-'))
        }

        return returnedData
    
} 

/**
 * 
 * @param {String} region The game region 
 * @param {Number} itemId The ID of the item
 * @param {Number} enhancementId The enhancement level of the item
 * @returns prices of last 90 days in an array, sorted by descending date order. The first value is today's price, while the last value is the price of 90 days ago.
 */
async function getItemPriceHistory(region = 'eu', itemId, enhancementId = 0) {

    if (!Number.isInteger(Number(enhancementId)) || Number.isNaN(Number(enhancementId))) {enhancementId = 0}

    const res = await axios({
        url: `https://${REGIONS[region]}/Trademarket/GetMarketPriceInfo`,
        method: "POST",
        data: {
            keyType: 0,
            mainKey: itemId,
            subKey: Number(enhancementId)
        }
    })
    
    const data = res.data.resultMsg

    const returnedData = data.split('-').reverse()

    return returnedData

} 

/**
 * 
 * @param {String} region The game region
 * @returns array(s) within array with item data in the following order: ID, Min enhancement, Max enhancement, Base price, Current stock, Total trades, Highest price, Lowest price, Last sale price, Last sale time 
 */
async function getRegistrationQueue(region = 'eu') {

    const res = await axios({
        url: `https://${REGIONS[region]}/Trademarket/GetWorldMarketWaitList`,
        method: "POST"
    })
    
    const data = res.data.resultMsg
    let result = data.split(/[|]/gm)
    result.pop()
    
    const returnedData = []

    result.forEach(e => {
        let enhancementData = e.split('-')
        returnedData.push(enhancementData)
    })
    
   return returnedData

} 

/**
 * 
 * @param {String} region The game region
 * @returns array(s) within array with item data in the following order: ID, Current stock, Base price, Total trades. The order of search is not correlated to the returned value. You can reorder using the item IDs as needed.
 */
async function searchMarketById(region = 'eu', ) {

    if (arguments.length === 0) {console.log(`No argument was passed in function searchMarketById()`)}

    const args = Array.prototype.slice.call(arguments);
    const res = await axios({
        url: `https://${REGIONS[region]}/Trademarket/GetWorldMarketSearchList`,
        method: "POST",
        data: {
            searchResult: args.join(',') 
        }
    })

    const data = res.data.resultMsg
    let result = data.split(/[|]/gm)
    // result.pop() Not sure if response ends in |
    
    const returnedData = []

    result.forEach(e => {
        let itemData = e.split('-')
        returnedData.push(itemData)
    })
    
   return returnedData


}


/**
 * 
 * @param {String} region The game region
 * @param {Number} mainCategoryNo The main category to search
 * @param {Number} subCategoryNo The sub-category to search
 * @returns An array containing objects for each item. 
 */
async function getItemsFromCategory(region = 'eu', mainCategoryNo, subCategoryNo = 1) {

    const parameters = new URLSearchParams()
    parameters.append(REQUEST_VERIFICATION, QUERY_REQUEST_VERFICATION_TOKEN)
    parameters.append('mainCategory', mainCategoryNo)
    parameters.append('subCategory', subCategoryNo)

    const res = await axios({
        url: `https://${REGIONS[region]}/Home/GetWorldMarketList`,
        method: "POST",
        headers: {
            'Cookie': `${TRADE_AUTH_SESSION}=${COOKIE_TRADE_AUTH}; ${REQUEST_VERIFICATION}=${COOKIE_REQUEST_VERIFICATION_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
        },
        data: parameters
    })

    const data = res.data.marketList

    return data

} 


/** The following commands do not communicate with the marketplace. */

// Gets item details
/**
 * 
 * @param {String} region The game region 
 * @param {Number} itemId The ID of the item
 * @param {Number} enhancementId The enhancement level of the item
 * @returns Large amount of data related to the item
 */
async function getItemSellBuyInfo(region = 'eu', itemId, enhancementId) {

    const parameters = new URLSearchParams()
    parameters.append(REQUEST_VERIFICATION, QUERY_REQUEST_VERFICATION_TOKEN)
    parameters.append('keyType', 0)
    parameters.append('mainKey', itemId)
    parameters.append('subKey', enhancementId)
    parameters.append('isUp', true)
  
    const res = await axios({
        url: `https://${REGIONS[region]}/Home/GetItemSellBuyInfo`,
        method: 'POST',
        headers: {
            'Cookie': `${TRADE_AUTH_SESSION}=${COOKIE_TRADE_AUTH}; ${REQUEST_VERIFICATION}=${COOKIE_REQUEST_VERIFICATION_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
        },
        data: parameters
    })
        

    return(res.data)
}


/**
 * 
 * @param {String} familyFame The user's family fame
 * @param {boolean} valuePack Whether the user has a value pack on
 * @param {boolean} merchantRing Whether the user has merchant ring
 * @returns The percentage (as a decimal) of silver earned after tax
 */
function getMarketTax(familyFame = 1500, valuePack = true, merchantRing = false) {
    const SILVEREARNED = 0.65
    let bonus = 0

    if (valuePack) {bonus += 0.3}
    if (merchantRing) {bonus += 0.05}

    if (familyFame >= 1000) {bonus += 0.005}
        else if (familyFame >= 4000) {bonus += 0.01}
        else if (familyFame >= 7000) {bonus += 1.5}

    return (SILVEREARNED + (SILVEREARNED * bonus)) // Total silver earned

}

/**
 * 
 * @param {Number} itemCost The cost of the item
 * @param {Number} silverEarned The percentage (as a decimal) of silver earned after tax
 * @returns The value of the taxed item
 */
function taxItem(itemCost, silverEarned = getMarketTax()) {
    return itemCost * silverEarned
}

/**
 * 
 * @param {Number} costToMake 
 * @param {Number} itemValue 
 * @param {Number} silverEarned 
 * @returns profit untaxed, then taxed profit in respective pos 0,1
 */
function calcProfit(costToMake, itemValue, silverEarned = getMarketTax()) {
    return [itemValue - costToMake, taxItem(itemValue, silverEarned) - costToMake]
}

/**
 * 
 * @param {Number} enhancementLevel 
 * @param {Number} failstack 
 * @returns the chance of success as a decimal for enhancements
 */
function calcAccessoryChance(enhancementLevel = 1, failstack = 0) {

    let chance

    switch(enhancementLevel) {
        case 1:
            chance = failstack > 18 ? 0.25 + (18 * 0.025) + ((failstack - 18) * 0.005) : 0.25 + (failstack * 0.025)
            break;
        case 2:
            chance = failstack > 40 ? 0.1 + (40 * 0.01) + ((failstack - 40) * 0.002) : 0.1 + (failstack * 0.01)
            break;
        case 3:
            chance = failstack > 44 ? 0.075 + (44 * 0.0075) + ((failstack - 44) * 0.0015) : 0.075 + (failstack * 0.0075)
            break;
        case 4:
            chance = failstack > 110 ? 0.025 + (110 * 0.0025) + ((failstack - 110) * 0.0005) : 0.025 + (failstack * 0.0025)
            break;
        case 5:
            chance = failstack > 390 ? 0.005 + (390 * 0.0005) + ((failstack - 390) * 0.0001) : 0.005 + (failstack * 0.0005)
            break;
        default:
            return 0
    }

    chance = chance > 0.9 ? 0.9 : chance

    return chance


}

/**
 * 
 * @param {Number} chance Decimal chance of success
 * @param {Number} attemptAmount Amount of tries
 * @returns The combined chance
 */
function calcTotalChance(chance = 1, attemptAmount = 1) {
    const totalchance = 1 - ((1 - chance)**attemptAmount)
    return totalchance
}

/**
 * 
 * @param {Number} chance Decimal chnace of success
 * @returns Whether there was a success or fail
 */
function simulateEnhancement(chance = 0.5) {
    const result = Math.random() < chance ? true : false
    return result
}

function accessoriesRequired(endEnhancement = 5, stacks = [20,40,44,110,230]) {
    calcAccessoryChance(1,1)
    let i = 1; let amount = 1
    for (const fs of stacks) {
        amount = (1 / calcAccessoryChance(1, fs)) * (amount + 1)
        if (i >= endEnhancement) {break}
        i++
    }
    return amount
}

function filterAccessories(accessories, gradeFilter = 3, minPrice = 10000000, maxPrice = Infinity) {

    const filteredAccs = accessories.filter(acc => acc.grade === Number(gradeFilter) && acc.minPrice >= Number(minPrice) && acc.minPrice <= Number(maxPrice))

    return filteredAccs

}
/**
 * Assumes you buy at lowest listed, sell at base
 * @param {String} region The game region
 * @param {Number} minBasePrice The minimum price of the accessory
 * @param {Number} minProfit The minimum profit to be made
 * @returns profitable accessories to enhance
 */
async function getProfitableTetYellowEnhancements(region = 'eu', minBasePrice = 10000000, maxBasePrice = null, minProfit = 100000000, filterGrade = 3, silverEarned = getMarketTax(1000, true, false)) {

    const rings = await getItemsFromCategory(region, 20, 1)
    const necklaces = await getItemsFromCategory(region, 20, 2)
    const earrings = await getItemsFromCategory(region, 20, 3)
    const belts = await getItemsFromCategory(region, 20, 4)
    const accessories = rings.concat(necklaces, earrings, belts)

    const filteredAccs = filterAccessories(accessories, filterGrade, minBasePrice, maxBasePrice)


    const worthwhileAccs = []
    for (const acc of filteredAccs) {
        const baseInfo = await getItemSellBuyInfo(region, acc.mainKey, 0)
        const tetInfo = await getItemSellBuyInfo(region, acc.mainKey, 4)
        const soldPrice = baseInfo.marketConditionList.find(e => e.sellCount > 1) || baseInfo.basePrice

        if (soldPrice * 73.03 < tetInfo.basePrice && (tetInfo.basePrice - (soldPrice * 73.03)) >= minProfit && !acc.name.includes('Manos')) {
            worthwhileAccs.push({name: acc.name, tetPrice: tetInfo.basePrice, basePrice: soldPrice, avgTapCost: soldPrice * 73.03, profit: calcProfit(soldPrice * 73.03, tetInfo.basePrice, silverEarned)})
        }
    }

    return worthwhileAccs

}