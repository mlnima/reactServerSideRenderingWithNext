import {OrderSchema} from 'shared-schemas';

const clientCreateOrder = (req, res) => {

    try {
        const orderData = new OrderSchema(req.body.data)
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

export default clientCreateOrder