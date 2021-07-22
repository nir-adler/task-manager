const mongoose = require('mongoose')
const validator=require('validator')


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
    useUnifiedTopology: true 
}).catch((e)=>{
    console.log(e)
})



// const task=new Task({
//     description:'pay bills'
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((e)=>{
//     console.log(e)
// })




// const user=new User({
//     name:'Nir Adler',
//     email:'nir@adler.com',
//     password:'123456'
// })

// user.save().then(()=>{
//     console.log(user)
// }).catch((e)=>{
//     console.log(e)
// })