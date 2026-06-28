// Polyfill for Bun missing node:v8 isBuildingSnapshot
const _getBuiltinModule = globalThis.process?.getBuiltinModule;
if (_getBuiltinModule) {
  globalThis.process.getBuiltinModule = function (name: string) {
    if (name === "v8") {
      return {
        startupSnapshot: {
          isBuildingSnapshot: () => false
        }
      };
    }
    return _getBuiltinModule.apply(this, arguments as any);
  };
}

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { userModel } from "./model/User";
import chatModel from "./model/chat"; 
import { authMiddleware } from "./middleware/authmiddleware";
import { generateResponse } from "./ai/gemini";

const app = express();
app.use(express.json());

await mongoose.connect(process.env.MONGODB_URI!);


console.log("Connected to MongoDB");
console.log("Database:", mongoose.connection.name);
console.log("Connected to MongoDB");

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check username
        const usernameExists = await userModel.findOne({
            username: username
        });

        if (usernameExists) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        // Check email
        const emailExists = await userModel.findOne({
            email: email
        });

        if (emailExists) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await userModel.create({
            username: username,
            email: email,
            password: hashPassword
        });

        // Debug
        console.log("Saved User:", newUser);

        // Success response
        // send jwt in sign up too 
        return res.status(201).json({
            id: newUser._id,
            message: "User created successfully"
        });

    } catch (error) {
        console.error("Signup Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await userModel.findOne({
            username: username
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET!
        );

        // Success
        return res.status(200).json({
            message: "Sign in successful",
            token: token
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "You are logged in",
        userId: (req as any).userId
    });
});

app.post("/chat", authMiddleware, async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const aiResponse =  await generateResponse(prompt);

        const newChat = await chatModel.create({
            userId: (req as any).userId,
            prompt: prompt,
            response: aiResponse
        });

        return res.status(201).json({
            message: "Chat created successfully",
            chat: newChat
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.get("/history", authMiddleware, async (req, res) => {
    try {

        const chats = await chatModel.find({
            userId: (req as any).userId
        });

        return res.status(200).json(chats);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.get("/history/:id", authMiddleware, async (req, res) => {
    try {

        const chat = await chatModel.findOne({
            _id: req.params.id,
            userId: (req as any).userId
        });

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        return res.status(200).json(chat);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.patch("/history/:id", authMiddleware, async (req, res) => {
    try {

        const prompt = req.body.prompt;

        const updatedChat = await chatModel.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: (req as any).userId
            },
            {
                prompt: prompt
            },
            {
                new: true
            }
        );

        if (!updatedChat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        return res.status(200).json(updatedChat);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.delete("/history/:id", authMiddleware, async (req, res) => {
    try {

        const deletedChat = await chatModel.findOneAndDelete({
            _id: req.params.id,
            userId: (req as any).userId
        });

        if (!deletedChat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        return res.status(200).json({
            message: "Chat deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});