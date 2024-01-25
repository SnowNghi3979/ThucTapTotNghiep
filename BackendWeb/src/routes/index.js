const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter')
const BrandRouter = require('./BrandRouter')
const OrderRouter = require('./OrderRouter')
const SliderRouter = require('./SliderRouter')
const CategoryRouter = require('./CategoryRouter')
const PostRouter = require('./PostRouter')
const ConfigRouter = require('./ConfigRouter')
const MenuRouter = require('./MenuRouter')

const PaymentRouter = require('./PaymentRouter')
const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/brand', BrandRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/category', CategoryRouter);
    app.use('/api/post', PostRouter);
    app.use('/api/slider', SliderRouter);
    app.use('/api/menu', MenuRouter);
    app.use('/api/config', ConfigRouter);
    app.use('/api/payment', PaymentRouter)
}
module.exports =routes