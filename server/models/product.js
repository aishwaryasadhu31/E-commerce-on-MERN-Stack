import mongoose  from "mongoose";

const productSchema= new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
          },
          slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
          },
          price: {
            type: Number,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          ratings: {
            type: Number,
            default: 0,
          },
         
          category: {
            type: String,
            required: true,
          },
          brand: {
            type: String,
            required: true,
          },
          sold: {
            type: Number,
            default: 0,
          },
          images: [
            {
              public_id: String,
              url: String,
            },
          ],
          seller: {
            type: String,
            required: [true, "Please enter product seller"],
          },
          stock: {
            type: Number,
            required: [true, "Please enter product stock"],
          },
          numOfReviews: {
            type: Number,
            default: 0,
          },
          reviews: [
            {
              user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
              },
              rating: {
                type: Number,
                required: true,
              },
              comment: {
                type: String,
                required: true,
              },
            },
          ],
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
          },
         
    },
    { timestamps: true }
);
 export default mongoose.model("Product",productSchema);