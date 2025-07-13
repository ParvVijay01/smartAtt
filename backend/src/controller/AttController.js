const Attendance = require("../model/Attendance");
const User = require("../model/User");

exports.markAtt = async (req,res) => {
    try {
        const { userId ,att} = req.body
        const USER = await User.findById(userId)
        if(!USER) return res.status(404).json({message: "No user found"})

            const newAtt = new Attendance({
            user: userId,
            att
        });

        await newAtt.save();

        res.status(200).json({
            message: "Attendance marked successfully",
            attendance: newAtt
        });
    } catch (error) {
        console.log("Error marking the attendance", error);
        res.status(500).json({message: error.message})
        
    }
}

exports.getUserAttSummary = async (req,res) => {
    try {
        const {userId} = req.params
        const USER = await User.findById(userId)
        if(!USER) return res.status(404).json({message: "User not found"})

        const presentCount = await Attendance.countDocuments({user: userId, att: true})

        const absentCount = await Attendance.countDocuments({user: userId, att: false})

        res.status(200).json({
            user: USER.name,
            presentDays: presentCount,
            absentDays: absentCount
        });
    } catch (error) {
        console.log("Cannot fetch att summary", error);
    return res.status(500).json({ message: "Server error" });
    }
}

exports.getAllAttendanceSummary = async (req, res) => {
    try {
        const users = await User.find();

        const summaries = await Promise.all(
            users.map(async (user) => {
                const presentCount = await Attendance.countDocuments({
                    user: user._id,
                    att: true
                });

                const absentCount = await Attendance.countDocuments({
                    user: user._id,
                    att: false
                });

                return {
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    presentDays: presentCount,
                    absentDays: absentCount
                };
            })
        );

        res.status(200).json(summaries);
    } catch (error) {
        console.log("Error fetching all attendance summaries", error);
        res.status(500).json({ message: error.message });
    }
};
