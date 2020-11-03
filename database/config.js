import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("db online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datoss");
  }
};

export default dbConnection;
