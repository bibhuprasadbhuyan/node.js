const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json());

let courses = [
  {
    id: 1,
    name: "angular",
    duration: "3 Month",
  },
  {
    id: 2,
    name: "react",
    duration: "2 Month",
  },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

//get all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//get individual data
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Cources with this Id is is not avilable");
  res.send(course);
});

//update value
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Cources with this Id is is not avilable");

  const { error } = validateCourse(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  course.name = req.body.name;
  course.duration = req.body.duration;
  res.status(200).send(course);
});

//create new
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
    duration: req.body.duration,
  };
  courses.push(course);
  res.status(200).send(course);
});

//remove data

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Cources with this Id is is not avilable");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

//listning port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listning at port ${port}.....`);
});

let validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    duration: Joi.string().required().min(4),
  });

  return schema.validate(course);
};
