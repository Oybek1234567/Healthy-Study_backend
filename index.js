const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRouter = require('./router/users')
const applicationRouter = require('./router/applications')
const courseRouter = require('./router/courses')
const moduleRouter = require('./router/modules')
const assignmentTypeRouter = require('./router/assignmentTypes')
const unitRouter = require('./router/units')
const lessonRouter = require('./router/lessons')
const lessonReportTypeRouter = require('./router/lessonReportTypes')
const roomRouter = require('./router/rooms')
const lessonUnitRouter = require('./router/lessonUnits')
const assignmentRouter = require('./router/assignments')
const questionRouter = require('./router/questions')
const groupEnrolementRouter = require('./router/groupEnrolements')
const groupEnrolementByStudentRouter = require('./router/groupEnrolementByStudent')
const groupRouter = require('./router/groups')
const groupStudentRouter = require('./router/groupStudents')
const groupLessonRouter = require('./router/groupLessons')
const dayRouter = require('./router/days')
const groupEnrolementDayRouter = require('./router/groupEnrolementDays')
const lessonReportByUserRouter = require('./router/lessonReportByUser')
const groupAttendanceRouter = require('./router/groupAttendance')
const questionLevelRouter = require('./router/questionLevels')
const assignmentLevelRouter = require('./router/assignmentLevels')
const examRouter = require('./router/exams')





const cors = require('cors')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// parse application/json
app.use(bodyParser.json())


app.use('/assignmenttypes', assignmentTypeRouter),

app.use('/modules', moduleRouter),

app.use('/courses', courseRouter),

app.use('/users', userRouter),

app.use('/applications', applicationRouter),

app.use('/subjects', unitRouter),

app.use('/lessons', lessonRouter),

app.use('/lessonreporttypes', lessonReportTypeRouter),

app.use('/rooms', roomRouter),

app.use('/lessonunits', lessonUnitRouter),

app.use('/assignments', assignmentRouter), 

app.use('/questions', questionRouter),

app.use('/groupenrolements', groupEnrolementRouter),

app.use('/groupenrolementsbystudent', groupEnrolementByStudentRouter),

app.use('/groups', groupRouter),

app.use('/groupstudents', groupStudentRouter),

app.use('/grouplessons', groupLessonRouter),

app.use('/days', dayRouter),

app.use('/groupenrolementdays', groupEnrolementDayRouter),

app.use('/lessonreportsbyuser', lessonReportByUserRouter),

app.use('/groupattendance', groupAttendanceRouter),

app.use('/questionlevels', questionLevelRouter),

app.use('/assignmentlevels', assignmentLevelRouter),

app.use('/exams', examRouter)





app.listen(3000, () => {
    console.log('server is running');
})