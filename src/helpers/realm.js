import Realm from 'realm';

import {  TABLE_PRODUCT } from '../util/ValueString'

//////////////////////////////
const Product = 'Product2';
const ProductOdered = 'ProductOderNow2';

const shemaOption = {
    name: 'Options2',
    properties:{
			id:'int',
			name:'string',
			PlusPrice:'int',
			selection:'bool'
    	}
	}

const shemaProduct  = {
	name: TABLE_PRODUCT,
	primaryKey: 'id',
	properties:{
		id:'int',
		type: "string[]",
		name:'string',
		image:'string',
		love:{type: 'bool', default:false, optional: true},
		oderNow:{type: 'bool', default:false, optional: true},
		odered:{type: 'bool', default:false, optional: true},
		Price:'int',
		description:'string?',
		arrSize: {type: 'list', objectType: 'Options2'},
		arrTopping:{type: 'list', objectType: 'Options2'},
	}
}


class Options extends Realm.Object {}
Options.schema = shemaOption;

class Products extends Realm.Object {}
Products.schema = shemaProduct;


export default new Realm({schema: [Options, Products],schemaVersion:2});