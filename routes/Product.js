const express =  require('express');

const router =  express.Router();

const {addProduct,photo,getAllProducts,deleteProduct,editProduct, singleProduct} = require('../controllers/Product')

router.post('/create',addProduct);
router.get('/photo/:id',photo)
router.get('/products',getAllProducts);
router.get('/product/:id',singleProduct);
router.delete('/product/:id',deleteProduct);
router.put('/edit/:id',editProduct);
module.exports = router;