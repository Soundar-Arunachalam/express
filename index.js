import express from "express";
const teaData=[];
let nextid=1;
const app= express();
app.use(express.json())
app.get("/",(req,res)=>{
res.send("Hello from Vijay Kumar and his coffee company ");
});
app.get("/ice-coffee",(req,res)=>{
    res.send("What ice cofee you want ?")
})
app.get("/google",(req,res)=>{

    res.send("<a href='www.google.com'>google<a>");
});

app.post("/coffees",(req,res)=>{

const {name,price}=req.body;
const newTea={id:nextid++,name,price}
teaData.push(newTea);
res.status(200).send(newTea);
});


app.get("/coffees",(req,res)=>{
    res.status(200).json(teaData);
})
app.get("/coffees/:id",(req,res)=>{
    const id=req.params.id;
    let index=teaData.findIndex(tea=>{
        return tea.id==id;
    });
    if(index==-1){
        res.status(201).json({"error":`coffee Id is invalid`});
    }
    else{
        res.status(200).json(teaData[index]);
    }
})
const port= 3000;

app.put("/coffees/:id",(req,res)=>{
    const id=req.params.id;
    const tea=teaData.find(tea=>{
        return tea.id===parseInt(id);
    })
    if(!tea){
    res.status(404).json({"error":"Id Not Found"});
    }
    else{
    const {name,price}=req.body;
    tea.name=name;
    tea.price=price;
    res.status(200).json(tea);
    }
    });

app.delete("/coffees/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=teaData.findIndex(tea=>{
        return tea.id===id
    });
    if(index==-1){
    res.status(404).send("tea not found");
    }
    else{
       teaData.splice(index,1);
   res.status(204).json({"success":"Deleted successfully"});
    }
})
app.listen(port,()=>{
    console.log(`App is running in port ${port}`);
})