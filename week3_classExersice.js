const express = require('express');
const app = express();
const res = require("express/lib/response")
const fs = require('fs');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculate-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
const add=(n1,n2)=>{
    return n1+n2
}


app.get("/add", (req,res)=>{
    try{
        const n1=parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        logger.info("Parameters"+n1+'and'+n2+'received for addition')
        if(isNaN(n1)){
            logger.error("n1 incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)){
            logger.error("n2 incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        const result = add(n1,n2);
        res.status(200).json({statuscode:200,data: result})
    } catch(error){
        console.error(error)
        res.status(500).json({statuscode:500,msg:error.toString()})
    }
});

app.listen(3000,()=>{
    console.log('Server id listening on port 3000');

})