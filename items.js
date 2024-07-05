const Router = require('koa-router');

// Prefix all routes with: /items
const router = new Router({
	prefix: '/items'
});

let items = [
	{ id: 100, iname: 'Quartz Analog Wrist Watch', price: 'US $4.99'},
	{ id: 101, iname: 'Leather Peep Pump Heels', price: 'US $33.56'},
	{ id: 102, iname: 'Apple iPod', price: 'US $219.99'},
	{ id: 103, iname: 'Prince Phantom 97P Tennnis Racket', price: 'US $50.00'},
];

// Routes

module.exports = router;
//Get all
router.get('/', (ctx, next) => {
	ctx.body = items;
	next();
});

//get single
router.get('/:id', (ctx, next) => {
	let getCurrentItem = items.filter(function(item) {
		if (item.id == ctx.params.id) {
			return true;
		}
	});

	if (getCurrentItem.length) {
		ctx.body = getCurrentItem[0];
	} else {
		ctx.response.status = 404;
		ctx.body = 'Item Not Found';
	}
	next();
});

//Add 
router.post('/add', (ctx, next) => {
	if (
		!ctx.request.body.id ||
		!ctx.request.body.iname ||
		!ctx.request.body.price 
	) {
		ctx.response.status = 400;
		ctx.body = 'Please enter the data';
	} else {
		let newItem = items.push({
			id: ctx.request.body.id,
			iname: ctx.request.body.iname,
			price: ctx.request.body.price
		});
		ctx.response.status = 201;
		ctx.body = `New item = added with id: ${ctx.request.body.id} & item name: ${
			ctx.request.body.iname
		}`;
	}
	next();
});

// Delete item
router.delete('/:id', (ctx, next) => {
	let itemId = parseInt(ctx.params.id);
	let index = items.findIndex(item => item.id === itemId);

	if (index !== -1) {
		items.splice(index, 1);
		ctx.response.status = 200;
		ctx.body = `Item with id: ${itemId} has been deleted`;
	} else {
		ctx.response.status = 404;
		ctx.body = 'Item Not Found';
	}
	next();
});


// Update item
router.put('/:id', (ctx, next) => {
	let itemId = parseInt(ctx.params.id);
	let index = items.findIndex(item => item.id === itemId);

	if (index !== -1) {
		if (ctx.request.body.iname) {
			items[index].iname = ctx.request.body.iname;
		}
		if (ctx.request.body.price) {
			items[index].price = ctx.request.body.price;
		}
		ctx.response.status = 200;
		ctx.body = `Item with id: ${itemId} has been updated`;
	} else {
		ctx.response.status = 404;
		ctx.body = 'Item Not Found';
	}
	next();
});