const express=require("express");
const app=express();

app.use(express.json());

let teachers=[
    {"id":1,"name":"Ajay sir","email":"ajar56622@gamil.com","age":23},
    {"id":2,"name":"sudish sir","email":"sudish26565@gamil.com","age":24},
    {"id":3,"name":"suraj sir","email":"suraj122@gamil.com","age":22},
    {"id":4,"name":"Rahul sir","email":"rahul1261@gamil.com","age":32},
];
// for get
app.get("/teachers",(request,resspone)=>{
    
    resspone.status(200).json({
        "teachers": teachers
    });
});

//for post
app.post("/teachers",(request,resspone)=>{
    let name =request.body.teachersName;
    let email =request.body.teachersEmail;
    let age =request.body.teachersAge;
  //short way👇
  //  const{teachersName,teachersEmail,teachersAge}=resspone.body;
    const id =teachers.length+1;

    const teachersData={
        id:id,
        name:name,
        email:email,
        age:age
    };

    teachers.push(teachersData);
    resspone.status(201).json({
        massage: "Teacher added successfully",
        "teachers":teachers
    });
});

app.put("/teachers/:id",(request,resspone)=>{
    let name =request.body.teachersName;
    let email =request.body.teachersEmail;
    let age =request.body.teachersAge;
    const id =parseInt(request.params.id);
      //short way👇
  //  const{teachersName,teachersEmail,teachersAge}=resspone.body;

    const teachersData={
        id:id,
        name:name,
        email:email,
        age:age
    };

    const teachersIndex=teachers.findIndex((e)=>e.id===id);

    if(teachersIndex!== -1){
      teachers[teachersIndex]=teachersData;
      resspone.status(200).json({ massage: "Teacher updated successfully",teachers});
    }else{
        resspone.status(400).json({massage: "Teacher not found"})
    }
});

app.delete("/teachers/:id",(request,resspone)=>{
    const id =parseInt(request.params.id);

    const teachersIndex=teachers.findIndex((e)=>e.id===id);

    if(teachersIndex!== -1){
       teachers.splice(teachersIndex,1); 
        resspone.status(200).json({massage: "Teacher deleted successfully","teachers":teachers});
    }
    else{
        resspone.status(400).json({massage:"Teacher not found!"})
    }
    
   
    //or another way

//   const id = parseInt(req.params.id);
//   let found = false;

//   // Step 1: manually search
//   for (let i = 0; i < teachers.length; i++) {
//     if (teachers[i].id === id) {
//       teachers.splice(i, 1);  // Step 2: delete element
//       found = true;
//       break;  // Step 3: loop se nikal jao
//     }
//   }

//   // Step 4: check result
//   if (found) {
//     res.status(200).json({ message: "Teacher deleted successfully", teachers });
//   } else {
//     res.status(404).json({ message: "Teacher not found" });
//   }
})


app.listen(4000,()=>{
    console.log("server is running on port number 4000");
})