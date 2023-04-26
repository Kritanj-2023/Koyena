const router = require("express").Router();
const Problem = require("../models/Problem");



//CREATE

router.post("/",async (req, res) => {
  
    const newProblem = new Problem(
       {
        id : req.body.id,
        name : req.body.name,
        level : req.body.level,
        submission : req.body.submission,
        link : req.body.link,
       }
      );
    try {
      const savedProblem = await newProblem.save();
      res.status(201).json(savedProblem);
    } catch (err) {
      res.status(500).json(err);
    }
  
});

// //UPDATE

// router.put("/:id", verify, async (req, res) => {
//   if (req.user.isAdmin) {
//     try {
//       const updatedProblem = await Problem.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedProblem);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("You are not allowed!");
//   }
// });

// //DELETE

// router.delete("/:id", verify, async (req, res) => {
//   if (req.user.isAdmin) {
//     try {
//       await Problem.findByIdAndDelete(req.params.id);
//       res.status(200).json("The movie has been deleted...");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("You are not allowed!");
//   }
// });

// //GET

router.get("/find/:level", async (req, res)=> {
  try {
    const problem = await Problem.find({level:req.params.level});
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json(err);
  }
  // fetchid = req.params.id;
  // monmodel.find(({id:fetchid}),function(err,val){
  //   res.send(val);
  // })
});

// //GET RANDOM

// router.get("/random", async (req, res) => {
//   const type = req.query.type;
//   let problem;
//   try {
//     if (type === "series") {
//       problem = await Problem.aggregate([
//         { $match: { isSeries: true } },
//         { $sample: { size: 1 } },
//       ]);
//     } else {
//       problem = await Problem.aggregate([
//         { $match: { isSeries: false } },
//         { $sample: { size: 1 } },
//       ]);
//     }
//     res.status(200).json(movie);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET ALL

router.get("/", async (req, res) => {
  
    // try {
    //   const problem = await Problem.find();
    //   const {q} = req.query;
    //   res.status(200).json(problem.splice(0,5));
    // } catch (err) {
    //   res.status(500).json(err);
    // }
    const problem = await Problem.find();
    const {q} = req.query;

    const keys = ["name","level"];

    const search = (data) =>{
      return data.filter((item)=>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );

    }
    q ? res.json(search(problem)) : res.json(problem);
    
});

module.exports = router;