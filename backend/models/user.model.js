import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
        address: {
			type: String,
			required: true,
		},
        identity: {
			type: String,
			required: true,
		},
		dob: {
			type: Date,
			default: Date.now,
            required: true,
        },
        isDeleted: {
			type: Boolean,
        },
        role:{
            type:String,
            enum:["STUDENT","TEACHER","ADMIN"],
            default: "TEACHER",
            required:true
        }
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
export default User