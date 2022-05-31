//inputs
const itemType = 'Armor';
const itemValue = 3099000;
const oreValue = 6000;
const specialOreValue = 3500000;
const bsbValue = 12500000;
const refineOfEquip = 0
const lvOfWantedRefine = 9;

const costOfEachEquipRefine = {
    'WeaponLv1': 50,
    'WeaponLv2': 200,
    'WeaponLv3': 5000,
    'WeaponLv4': 20000,
    'Armor': 2000
};

const ratesOfEachEquipRefine = {
    'WeaponLv1': {
        'normal': [1, 1, 1, 1, 1, 1, 1, 0.6, 0.4, 0.19],
        'smith': [1, 1, 1, 1, 1, 1, 1, 0.7, 0.5, 0.29],
        'enriched': [1, 1, 1, 1, 1, 1, 1, 0.9, 0.7, 0.30]
    },
    'WeaponLv2': {
        'normal': [1, 1, 1, 1, 1, 1, 0.6, 0.4, 0.2, 0.19],
        'smith': [1, 1, 1, 1, 1, 1, 0.7, 0.5, 0.3, 0.29],
        'enriched': [1, 1, 1, 1, 1, 1, 0.9, 0.7, 0.4, 0.30]
    },
    'WeaponLv3': {
        'normal': [1, 1, 1, 1, 1, 0.6, 0.5, 0.2, 0.2, 0.19],
        'smith': [1, 1, 1, 1, 1, 0.7, 0.6, 0.3, 0.3, 0.29],
        'enriched': [1, 1, 1, 1, 1, 0.9, 0.8, 0.4, 0.4, 0.30]
    },
    'WeaponLv4': {
        'normal': [1, 1, 1, 1, 0.6, 0.4, 0.4, 0.2, 0.2, 0.09],
        'smith': [1, 1, 1, 1, 0.7, 0.5, 0.5, 0.3, 0.3, 0.19],
        'enriched': [1, 1, 1, 1, 0.9, 0.7, 0.7, 0.4, 0.4, 0.20]
    },
    'Armor': {
        'normal': [1, 1, 1, 1, 0.6, 0.4, 0.4, 0.2, 0.2, 0.09],
        'enriched': [1, 1, 1, 1, 0.9, 0.7, 0.7, 0.4, 0.4, 0.20]
    }
}

let refinementCost = costOfEachEquipRefine[itemType];
let costOfItem = itemValue;
let orderOfRefine = [];

function handleCostOfItem(){
    for(let i = refineOfEquip; i < lvOfWantedRefine; i++){
        orderOfRefine.push(checkBetterCost(i));
    };
}

function checkBetterCost(lvOfCurrentRefine) {
    const a = (costOfItem + oreValue + refinementCost) / ratesOfEachEquipRefine[itemType]['normal'][lvOfCurrentRefine];
    const b = itemType === 'Armor' ?
            a:
            (costOfItem + oreValue) / ratesOfEachEquipRefine[itemType]['smith'][lvOfCurrentRefine];
    const c = (costOfItem + specialOreValue + refinementCost) / ratesOfEachEquipRefine[itemType]['enriched'][lvOfCurrentRefine];
    const d = costOfItem + ((checkHowManyBsbIsNeeded(lvOfCurrentRefine)*bsbValue + specialOreValue + refinementCost) / ratesOfEachEquipRefine[itemType]['enriched'][lvOfCurrentRefine]);
    costOfItem = Math.min(a, b, c, d);
    return checkBetterRefineOrder(a, b, c, d, lvOfCurrentRefine);
}

function checkBetterRefineOrder(a, b, c, d, lvOfCurrentRefine) {
    switch(Math.min(a, b, c, d)) {
        case a: 
            return '+' + (1 + lvOfCurrentRefine) + ' Normal ' + Math.round(costOfItem);
        case b:
            return '+' + (1 + lvOfCurrentRefine) + ' Mechanic '+ Math.round(costOfItem);
        case c:
            return '+' + (1 + lvOfCurrentRefine) + ' Enriched '+ Math.round(costOfItem);
        case d:
            return '+' + (1 + lvOfCurrentRefine) + ' Bsb '+ Math.round(costOfItem);
    }
}

function checkHowManyBsbIsNeeded(lvOfCurrentRefine) {
    switch(lvOfCurrentRefine) {
        case 9: 
            return 2
        case 10:
            return 4
        default:
            return 1
    }
}

handleCostOfItem()
console.log(orderOfRefine)
console.log(Math.round(costOfItem))
