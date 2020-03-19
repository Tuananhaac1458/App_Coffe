import lodash from 'lodash';
 
///// so sanh 2 mang return 1 if === 0 if !== //////////////////
export function areEqual(a, b){
    let x = 0;
    for (n in a){
        for (l in b){
        	if(n === l ){
        		x = 1
        	}
            else {x = 0};
        }	
    }
    return x;
}

///////////////////////////////////////////////////

// export function MakeArrFalesTrueWithId(arr, id){
//     var arr2 = arr.arrTopping;
//     arr2.forEach(function(element) {
//         if(element.id === id && element.selected){
//           element.selected = false
//         }else if(element.id === id && !element.selected){
//           element.selected = true
//         }
//       })

//     return arr2
// }



///////////////////////////////////////////////////


export function FuilterLoop(arrProduts) {
    let arrReturn = [];
    arrProduts.forEach((element) => {
        let arrType = element.type;
        if(typeof(arrType) === 'object'){
            arrType = Object.values(element.type)
        }
        if(Array.isArray(arrType)){
            arrReturn = arrReturn.concat(arrType);
            return
        }
        arrReturn.push(arrType)
    })    
    let set = new Set(arrReturn);
    return Array.from(set);
}

export function MakeArrayProductToTpye(arrTypeTable, arrProduts) {
     let arrReturn = [];
     // var x = ['coffe','siro'];
     // var y = [{'type':['coffe','cacao'], 'id': 1},{'type':'coffe', 'id': 2},{'type':'siro', 'id': 3}]
    for(let i in arrTypeTable){
        let objTpye = {};
        let arrProdut = [];

        arrProduts.forEach((element) => {
            let arrType = element.type;
            if(!Array.isArray(arrType) && typeof(arrType) === "object"){
                arrType = Object.values(element.type)
            }
            if(!Array.isArray(arrType)){
                arrType = arrType.split();
            }

            arrType.forEach((k) => {
                if(k !== arrTypeTable[i]){
                    return
                }
                if(k === arrTypeTable[i]){
                    arrProdut.push(element)
                }
            })
        })
        objTpye = {
            'id': i,
            'tabLabel': arrTypeTable[i],
            'dataProduct': arrProdut
        }
        arrReturn.push(objTpye)
    }
    return arrReturn
}


///////////////////
export function RemoveObjectonArrayWithObjectKey(arr, objKey, type){
    let arrReturn
    if (type === 'idOder') {
        arrReturn = lodash.reject(arr, function(el) { return el.idOder === objKey; });
    }
    if(type === 'id'){
        arrReturn = lodash.reject(arr, function(el) { return el.id === objKey; });
    }
    return arrReturn;
}