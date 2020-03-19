import { SET_ODERDETAIL, GET_OERDETAIL, SET_LOVEPRODUCT } from '../constants';
import { RemoveObjectonArrayWithObjectKey } from '../../util/initArray'

import { ApiClient } from '../../helpers/ApiClient'

import {  TABLE_PRODUCT } from '../../util/ValueString'

import realm from '../../helpers/realm'



export function RenderData(RealObject){
	let a = [];
	for (let cat of RealObject) { 
	  	let obj = JSON.parse(JSON.stringify(cat));
	  	if(typeof(obj.type) === 'object'){
	  		obj.type = Object.values(obj.type)
	  	}
	  	if(typeof(obj.arrSize) === 'object'){
	  		obj.arrSize = Object.values(obj.arrSize)
	  	}
	  	if(typeof(obj.arrTopping) === 'object'){
	  		obj.arrTopping = Object.values(obj.arrTopping)
	  	}
	  	console.log('aaaaaaaaaaaa',a)
	  	a.push(obj);
	}
	return a
}


export function GetAllProduct(type){
	let data = [];
	if(type === 'love'){
		const tanDogs = realm.objects(TABLE_PRODUCT).filtered("love = true")
		data = RenderData(tanDogs)
		return data
	}
		realm.write(() =>{
			const allProduct = realm.objects('Product2');
		    data = RenderData(allProduct)
		})
	return data
}


export function AddProductLoveToLocal(obj,loved){
	if(obj === undefined){
		return
	}
	try{
		realm.write(() =>{
				console.log("Routput0==>",loved);
			if(loved){
				console.log("Routput1==>",obj);
				const Routput = realm.objectForPrimaryKey(TABLE_PRODUCT, obj.id);
				console.log("Routput2==>",Routput);
	    	if(Routput !== undefined){
	    		Routput.love = loved
	    		return
	    	}
    		realm.create(TABLE_PRODUCT,obj);
    		return
			}else{
				const Routput = realm.objectForPrimaryKey(TABLE_PRODUCT, obj.id);
	    	if(Routput !== undefined){
	    		Routput.love = loved
	    		return
	    	}
	    	return
			}
		})
	}
	catch(e){
  	console.log("Error on creation");
	}
}	

export function AddProductOderNowToLocal(obj){
	if(obj === undefined){
		return
	}
	try{
		realm.write(() =>{
			
		})
	}
	catch(e){
  	console.log("Error on creation");
	}
}

let dataOder = [];
let idOder = 115;


export function setOderDetail(obj, invoice) {
	// dataOder.push(obj)
	if(invoice === undefined){
		idOder += 1;
		obj.idOder = idOder;
		dataOder.push(obj)
	}else{
		console.log('RemoveObjectonArrayWithObjectKey01',obj)
		dataOder.forEach((elment) =>{
			if(obj.amount === 0){
				dataOder = RemoveObjectonArrayWithObjectKey(dataOder,obj.idOder,'idOder')
				console.log('RemoveObjectonArrayWithObjectKey0as1',dataOder)
				return
			}
			if(obj.amount > 0 && obj.idOder === elment.idOder){
				elment.amount = obj.amount
				return
			}
		})
	}
	return {
		type: GET_OERDETAIL,
		payload: dataOder,
	};
}





export function setLoveProduct(obj,love) {
	console.log('obj,love',obj,love)
	AddProductLoveToLocal(obj,love)
	const data = GetAllProduct('love')
	return {
		type: SET_LOVEPRODUCT,
		payload: data,
	};
}


