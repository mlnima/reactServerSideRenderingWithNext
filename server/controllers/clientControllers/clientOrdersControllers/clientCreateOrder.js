const orderSchema = require('../../../models/orderSchema');

module.exports = (req, res) => {

    try {
        const orderData = new orderSchema(req.body.data)
        orderData.save().then(createdOrder=>{
            res.json({createdOrder,error:false});
            res.end()
        }).catch(errorData=>{
            console.log(errorData)
            res.json({error:true,errorData});
            res.end()
        })
    }catch (errorData) {
        console.log(errorData)
        res.json({error:true,errorData});
        res.end()
    }
}