const Group_enrolements = require('../models/group_enrolements')
const Group_enrolement_days = require('../models/group_enrolement_days')


exports.createGroupEnrolement = async(req, res) => {
    try {
        const newGroupEnrolement = await Group_enrolements.query().insert({
           name: req.body.name,
           teacher_id: req.body.teacher_id,
           assistant_id: req.body.assistant_id,
           starting_date: req.body.starting_date,
           course_id: req.body.course_id,
           module_id: req.body.module_id,
           time: req.body.time,
           room_id: req.body.room_id,
           status: "not started"
        })
        req.body.days.forEach(async element => {
            await Group_enrolement_days.query().insert({
                group_enrolement_id: newGroupEnrolement.id,
                day_id: element.id
            })
        });
    
        return res.status(201).json({ success: true, msg: 'Group Enrolement yaratildi' })    
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, error: error.message})
    }
}

exports.getAllGroupEnrolements = async (req, res) => {
    try {
        const knex = await Group_enrolements.knex();
    
        const data = await knex.raw(`
            SELECT
                ge.id,
                ge.name,
                CONCAT(t.name, ' ', t.surname) AS teacher_name,
                CONCAT(a.name, ' ', a.surname) AS assistant_name,
                c.name AS course_name,
                m.name AS module_name,
                r.name AS room_name,
                ge.starting_date,
                ge.time,
                ge.created,
                r.id AS room_id,
                t.id AS teacher_id,
                a.id AS assistant_id,
                c.id AS course_id,
                m.id AS module_id
            FROM
                group_enrolements ge
            JOIN
                rooms r ON ge.room_id = r.id
            JOIN
                users t ON ge.teacher_id = t.id
            JOIN
                users a ON ge.assistant_id = a.id
            JOIN
                modules m ON ge.module_id = m.id
            JOIN
                courses c ON ge.course_id = c.id
            WHERE
                ge.status = 'not started';`);
      
        return res.json({ success: true, group_enrolements: data[0] });
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, error: error.message})
    }
};

exports.editGroupEnrolement = async(req,res) => {
    try {
        await Group_enrolements.query().where('id', req.params.id).update({
            name: req.body.name,
            teacher_id: req.body.teacher_id,
            assistant_id: req.body.assistant_id,
            starting_date: req.body.starting_date,
            course_id:req.body.course_id,
            module_id: req.body.module_id,
            day_id: req.body.day_id,
            time: req.body.time,       
            room_id: req.body.room_id
        })
        return res.status(200).json({success:true, msg: "Group Enrolement tahrirlandi"})
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, error: error.message})
    }
}

exports.deleteGroupEnrolement = async(req,res) => {
    try {
        await Group_enrolement_days.query().where('group_enrolement_id', req.params.id).delete()
    
        await Group_enrolements.query().where('id', req.params.id).delete()
    
        return res.status(200).json({success:true, msg: "Group Enrolement o'chirildi"})
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, error: error.message})
    }

}