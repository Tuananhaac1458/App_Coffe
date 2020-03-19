import Realm from 'realm';

//////////////////////////////
const Product = 'Product';
const ProductOdered = 'ProductOdered';

const shemaOption = {
    name: 'Options',
    properties:{
		id:'int',
		name:'string',
		price:'int',
		selection:'bool'
    	}
	}

const shemaProduct  = {
	name: Product,
	primaryKey: 'id',
	properties:{
		id:'int',
		type: "string[]",
		name:'string',
		price:'int',
		love:{ type: 'bool', indexed: true },
		odered:{ type: 'bool', indexed: true },
		discription:'string?',
		arrSize: 'Options[]',
		arrToppng:'Options[]',
	}
}

const shemaProductOderNow  = {
	name: ProductOdered,
	primaryKey: 'id',
	properties:{
		id:'int',
		type: "string[]",
		name:'string',
		price:'int',
		love:{ type: 'bool', indexed: true },
		odered:{ type: 'bool', indexed: true },
		discription:'string?',
		arrSize: 'Options[]',
		arrToppng:'Options[]',
	}
}


let realm = new Realm({schema: [shemaOption,shemaProduct,shemaProductOderNow],schemaVersion:2});;

export default class ApiClient {
	constructor() {
  		console.log('realm===>',realm)
	}
 
	RenderData(RealObject){
		let a = [];
		for (let cat of RealObject) { 
		  	a.push(JSON.parse(JSON.stringify(cat))); 
		}
		return a
	}

	GetAllProduct(){
		let data = [];
		realm.write(() =>{
			const allProduct = realm.objects(Product);
		    data = this.RenderData(allProduct)
		})
  		return data
	}

  	AddProductLoveToLocal(obj){
  		if(obj === undefined){
  			return
  		}
  		try{
	  		realm.write(() =>{
		    	const Routput = realm.objectForPrimaryKey(Product, obj.id);
		    	if(Routput === null){
		    		realm.create(Product,obj);
		    		return
		    	}
		    	Routput = obj
  			})
  		}
  		catch(e){
		  	console.log("Error on creation");
  		}
	}	

	RemoveProductLoveToLocal(obj,type){
  		if(obj === undefined){
  			return
  		}
  		try{
	  		realm.write(() =>{
			    if(type === 'all'){
			    	const allProduct = realm.objects(ProductLove);
			    	realm.delete(allProduct)
			    	return
			    }
			    const Routput = realm.objectForPrimaryKey(ProductLove, obj.id);
			    realm.delete(Routput)
	  			return
	  		})
  		}
  		catch(e){
  			console.log("Error on creation");
  		}
	}

	GetAllProductOderNow(){
		let data = [];
		realm.write(() =>{
	    	const allProduct = realm.objects(ProductOderNow);
		    data = this.RenderData(allProduct)
		})
		return data
	}
  	AddProductOderNowToLocal(obj){
  		if(obj === undefined){
  			return
  		}
  		try{
	  		realm.write(() =>{
		    	const Routput = realm.objectForPrimaryKey(ProductOderNow, obj.id);
		    	if(Routput === null){
		    		return 
		    	}
		    	realm.create(ProductOderNow,obj);
  			})
  		}
  		catch(e){
		  	console.log("Error on creation");
  		}
	}	

	RemoveProductOderNowToLocal(obj,type){
		if(obj === undefined){
  			return
  		}
  		try{
	  		realm.write(() =>{
			    if(type === 'all'){
			    	const allProduct = realm.objects(ProductOderNow);
			    	realm.delete(allProduct)
			    	return
			    }
			    const Routput = realm.objectForPrimaryKey(ProductOderNow, obj.id);
			    realm.delete(Routput)
	  			return
	  		})
  		}
  		catch(e){
  			console.log("Error on creation");
  		}
	}

	GetAllProductOdered(){
		let data = [];
		realm.write(() =>{
	    	const allProduct = realm.objects(ProductOdered);
		    data = this.RenderData(allProduct)
		})
		return data
	}
  	AddProductOderedToLocal(obj){
  		if(obj === undefined){
  			return
  		}
  		try{
	  		realm.write(() =>{
		    	const Routput = realm.objectForPrimaryKey(ProductOdered, obj.id);
		    	if(Routput === null){
		    		return
		    	}
		    	realm.create(ProductOdered,obj);
  			})
  		}
  		catch(e){
		  	console.log("Error on creation");
  		}
	}	

	RemoveProductOderedToLocal(obj,type){
		if(obj === undefined){
  			return
  		}
  		try{
	  		realm.write(() =>{
			    if(type === 'all'){
			    	const allProduct = realm.objects(ProductOdered);
			    	realm.delete(allProduct)
			    	return
			    }
			    const Routput = realm.objectForPrimaryKey(ProductOdered, obj.id);
			    realm.delete(Routput)
	  			return
	  		})
  		}
  		catch(e){
  			console.log("Error on creation");
  		}
	}

}








