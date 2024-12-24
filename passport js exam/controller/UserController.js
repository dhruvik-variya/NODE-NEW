const User = require("../model/UserSchema");


const Signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error:"Error creating"})
    }
}

const login = async (req,res) =>{

    try {
        const {email,password} = req.body;
        const user = await User.findOne({ email: email});
    
        if(!user){
            return res.status(401).json({error: 'Invalid email or password'});
        }
    
        res.status(200).json({message : "Login successful !!"})
    } 
    catch (error) {
        res.status(500).json({error: "server error"});
    }
}

module.exports = {Signup, login};