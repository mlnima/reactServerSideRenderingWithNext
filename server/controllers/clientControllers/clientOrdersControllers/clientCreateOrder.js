const orderSchema = require('../../../models/orderSchema');

module.exports = (req, res) => {

    try {
        const orderData = new orderSchema(req.body.data)
        orderData.save().then(createdOrder=>{
            res.json({createdOrder,error:false});
        }).catch(err=>{
            console.log(err)
            res.json({error:true,err});
        })
    }catch (err) {
        console.log(err)
        res.json({error:true,err});

    }
}