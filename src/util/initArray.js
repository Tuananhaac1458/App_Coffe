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

export function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}