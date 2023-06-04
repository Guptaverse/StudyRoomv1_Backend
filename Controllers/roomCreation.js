const User = require('../models/User')
const Rooms = require('../models/Rooms')
const Subject = require('../models/Subject');
const Question = require('../models/Questions');
const Score = require('../models/Score');
const { default: ShortUniqueId } = require('short-unique-id');
const { ObjectId } = require('mongodb');

const uid = new ShortUniqueId({ length: 10 });

exports.createRoom = async (req, res) => {
    try {
        const { userID, subject, start } = req.body;
        console.log("start", start);
        // const userID = '646dd4a6a2baa3d5bf385708'

        const user = await User.findById(userID);
        // console.log('user', user);

        let sub = [];

        console.log("error started here ->");
        // console.log('subject', subject[subject.length-1].QuestionBox[0].question);

        await Promise.all(
            subject.map(async (element, ind) => {
                let questions = [];
                await Promise.all(
                    element.QuestionBox.map(async (element, i) => {
                        // console.log("no of question :",i);

                        const newQuestion = {
                            question: element.question,
                            answer: element.answer,
                            options: element.option,
                        };
                        const que = await Question.create(newQuestion);
                        questions.push(que._id);
                        // console.log("question length : ",questions.length,"question id : ", que._id);
                    })
                );
                // console.log("question arr : ", questions)
                const newSubject = {
                    name: element.Subject,
                    description: element.Description,
                    questions,
                };
                // console.log("newSubject : ", newSubject)

                const subjectId = await Subject.create(newSubject);
                sub.push(subjectId._id);
            })
        );

        const room = await Rooms.create({
            host: user._id,
            start,
            socketId: uid(),
            subject: sub,
            joinedUsers: [],
        });

        console.log("room", room, user);

        user.createdRooms.push(room._id);
        await user.save();

        const newUser = await User.findById(userID).populate({
            path: "createdRooms",
            populate: {
                path: "subject",
                populate: {
                    path: "questions",
                },
            },
        });
        res.json({ success: true, data: newUser });
    } catch (error) {
        console.log(error);
        res.json({ success: false, error });
    }
};

exports.findRoom = async (req, res) => {
    try {
        const { roomID } = req.body;
        const room = await Rooms.findOne({ socketId: roomID }).populate({
            path: "subject",
            populate: {
                path: "questions",
            },
        });
        res.json({ success: true, data: room });
    } catch (error) {
        console.log(error);
        res.json({ success: false, error });
    }
};

exports.joinRoom = async (req, res) => {
    try {
        const { userID, socketID } = req.body;
        console.log("userID", userID, "socketID", socketID);
        const user = await User.findById(userID);
        const room = await Rooms.findOne({
            socketId: socketID,
        })
        if(!room){
            return res.json({success:false,error:"Room not found"})
        }
        console.log(room)
        if (!(room.joinedUsers.includes(userID))) {
            user.joinedRooms.push(room._id);
            console.log("roomID : ",room._id)
            await user.save();
            room.joinedUsers.push(userID);
            await room.save();
        }
        res.json({ success: true, data: room });
    } catch (error) {
        console.log(error);
        res.json({ success: false, error });
    }
};

exports.getUserData = async (req, res) => {
    try {
        const { userID } = req.body;
        console.log(req.body);
        const user = await User.findById(userID).populate([
            {
                path: "createdRooms",
                populate: [
                    {
                        path: "subject",
                        populate: {
                            path: "questions",
                        },
                    },
                    {
                        path: "host",
                    },
                ],
                // path: 'joinedRooms',
            },
            {
                path: "joinedRooms",
                populate: [
                    {
                        path: "subject",
                        populate: {
                            path: "questions",
                        },
                    },
                    {
                        path: "host",
                    },
                ],
            },
        ]);
        res.json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, error });
    }
};

exports.getRoomData = async (req, res) => {
    try {
        const { roomID } = req.body;
        const room = await Rooms.findOne({ socketId: roomID }).populate({
            path: 'subject',
            populate: {
                path: 'questions'
            }
        });
        res.json({ success: true, data: room });
    } catch (error) {
        console.log(error);
        res.json({ success: false, error });
    }
}

exports.uploadMarks = async (req, res) => {
    try {
        const { roomID, userID, subjectID, score } = req.body;
        console.log('roomId', roomID);
        console.log('userId', userID);
        console.log('subjectId', subjectID);
        console.log('score', score);
        const newScore = new Score({
            userId: userID,
            roomId: roomID,
            subjectId: subjectID,
            score
        });

        await newScore.save();
        res.json({ success: true, data: newScore });
    } catch (error) {

    }
}
