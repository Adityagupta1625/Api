const express=require('express');
const report=require('../schemas/report');
const bodyParser=require('body-parser');
const uuid=require('uuid');
const router=express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));


router.post('/',async (req,res)=>{

    try{
        const reportData=await report.findOne(
            {marketID:req.body.reportDetails.marketID,
            cmdtyID:req.body.reportDetails.cmdtyID});
        
        if(reportData){
           let usersArr=reportData.users;
            usersArr.push(req.body.reportDetails.userID);
        
            let price=req.body.reportDetails.price/req.body.reportDetails.convFctr;
            let usersNum=usersArr.length;

            let newPrice=(reportData.price*usersNum+price)/(usersNum+1);

            await reportData.updateOne({
                $set:{
                  users:usersArr,
                  price:newPrice,
                },
            });
            
            return res.status(200).json({
                status:"success",
                reportID:reportData.reportID,
            });
        }
        else{
            const id=uuid.v4();
            const newReport=new report({
                reportID:id,
                users:[req.body.reportDetails.userID],
                marketID:req.body.reportDetails.marketID,
                marketName:req.body.reportDetails.marketName,
                cmdtyID:req.body.reportDetails.cmdtyID,
                cmdtyName:req.body.reportDetails.cmdtyName,
                marketType:req.body.reportDetails.marketType,
                price:req.body.reportDetails.price/req.body.reportDetails.convFctr,
                
            });
            newReport.save((err,report)=>{
                if(err){
                    return res.status(500).send({
                        status:"error",
                        message:"Some error in form",
                    });
                }
                else{
                    return res.status(200).json({
                        status:"success",
                        reportID:id,
                    });
                }
            });
        }
        
    }
    catch(err){
        return res.status(500).send(
            {message:"Internal Server Error"}
        );
    }
    
});

router.get('/',async (req,res)=>{ 
    try{
        const reportData=await report.findOne({reportID:req.body.reportID});

        if(reportData){
            
            return res.status(200).json({
                cmdtyName:reportData.cmdtyName,
                cmdtyID:reportData.cmdtyID,
                marketID:reportData.marketID,
                marketName:reportData.marketName,
                users:reportData.users,
                timestamp:reportData.updatedAt.getTime(),
                priceUnit:reportData.priceUnit,
                price:reportData.price,
            });
        }
        else{
            return res.status(404).json({
                status:"error",
                message:"no report found",
            });
        }
    }
    catch(err){
        return res.status(500).send(
            {message:"Internal Server Error"}
        );
    }
})

module.exports=router;

