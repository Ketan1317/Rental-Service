import User from "../../models/user.model.js";
import { uploadSingleImage } from "../../services/cloudinary.service.js";
import { generateToken } from "../../services/token.service.js";
import bcrypt from "bcryptjs";


export const userRegister = async (req, res) => {
  try {
    const {name,email,password,phone,role} = req.body;
    console.log(req.body);

    if(!name || !email || !password || !phone){
      return res.status(400).json({success:false, error: "All fields are required"});
    }

    const alreadyExists = await User.findOne({ $or: [{ email }, { phone }] });
    if(alreadyExists){
        return res.status(409).json({success:false, error: "User with given email or phone already exists"});
    }

    let url = "";
    console.log(req.file);
    if(req.file){
      url = await uploadSingleImage(req.file.buffer, `profile_${Date.now()}`);
    }
    console.log(url);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword, phone, profileImage: url, role });
    await user.save();
    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    return res.status(201).json({ success: true, message: "User registered successfully", token });

    
  } catch (error) {
    return res.json({ success: false, error: "Registeration failed" });
  }
};
