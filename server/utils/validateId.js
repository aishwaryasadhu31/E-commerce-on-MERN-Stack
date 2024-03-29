import mongoose from "mongoose";

export const validateId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid)
    {
        //throw new Error("Id is Invalid")
        return false;
    }
    else{
        return true;
    }
}