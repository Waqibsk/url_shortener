const express=require("express");
const {connectToMongo}=require("./connect");
const URL=require("./models/url")

const app=express();
const PORT=8000;

const urlroute=require("./routes/url")
connectToMongo("mongodb://127.0.0.1:27017/short-url")
.then(()=>{console.log("mongodb connected")})

app.use(express.json());

app.get('/:shortId', async (req,res)=>{
    const shortId=req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push: {
            visitedHistory: {
                timestamp: Date.now(),
            },
        },

        
    }

);
res.redirect(entry.redirectURL);

});

app.use("/url",urlroute);
app.listen(PORT,()=>{
    console.log(`server running ar ${PORT}`);
    
})