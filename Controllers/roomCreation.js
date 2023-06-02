const User = require('../models/User')
const Rooms = require('../models/Rooms')
const Subject = require('../models/Subject');
const Question = require('../models/Questions');
const { default: ShortUniqueId } = require('short-unique-id');
const { ObjectId } = require('mongodb');

const uid = new ShortUniqueId({ length: 10 });

exports.createRoom = async (req, res) => {
    try {
        const { username, subject, start } = req.body;
        // console.log('subject', subject);
        // console.log('start', start);
        const userID = '647874ca24f6b3716012a86e'

        const user = await User.findById(userID);
        // console.log('user', user);

        let sub = [];

        console.log('error started here ->')

        await Promise.all(subject.map(async (element, ind) => {
            const questions = [];
            element.QuestionBox.map(async (element, i) => {
                const newQuestion = {
                    question: element.question,
                    answer: element.answer,
                    options: element.option
                };
                const que = await Question.create(newQuestion);
                questions.push(que._id);
            });
            const newSubject = {
                name: element.Subject,
                description: element.Description,
                questions
            };
            const subjectId = await Subject.create(newSubject);
            sub.push(subjectId._id);
        }))

        const room = await Rooms.create({
            host: user._id,
            start,
            socketId: uid(),
            subject: sub,
            joinedUsers: [],
        });

        console.log('room', room,user)

        user.createdRooms.push(room._id);
        await user.save();

        const newUser = await User.findById(userID).populate({
            path: 'createdRooms',
            populate: {
                path: 'subject',
                populate: {
                    path: 'questions'
                }
            }
        });
        res.json({ success: true, data: newUser });
    } catch (error) {
        console.log(error);
        res.json({ success: false, error });
    }
}


exports.findRoom = async (req, res) => {
    try {
        const { roomID } = req.body;
        const room = await Rooms.findOne({socketId: roomID}).populate({
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