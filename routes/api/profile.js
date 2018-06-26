const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load Profile Model
const Profile = require("../../models/Profile");
//Load User Model
const User = require("../../models/User");
// Load profile validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile Works"
  })
);
// @route   GET api/profile
// @desc    Get current users profile
// @access  private

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {    
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate("user", ["name", "avatar"]);
      if (!profile) {
          return res.json({
          result: 'fail',
          status: 404,
          message: 'You do not have profile'
        })        
      }
      return res.json(profile);
    } catch (err) {
      return res.status(404).json(err);
    }
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  public

router.get("/handle/:handle", async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      errors.noProfile = "There is no profile for this handle";
      return res.status(400).json(errors);
    }
    return res.json(profile);
  } catch (err) {
    return res.status(400).json(err);
  }
});
// @route   GET api/profile/user/:user_id
// @desc    Get profile by user Id
// @access  public

router.get("/user/:user_id", passport.authenticate('jwt',{session: false}), async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    console.log(profile)
    if (!profile) {     
      return res.json({
        result: 'fail',
        status: '404',
        message: 'There is no profile for this UserId'
      });
    }
    return res.json(profile);
  } catch (err) {
    return res.json({
        result: 'fail',
        status: '404',
        message: 'There is no profile for this UserId'
      });
  }
});
// @route   GET api/profile/all
// @desc    Get All profile
// @access  public

router.get("/all", passport.authenticate('jwt',{session: false}) , async (req, res) => {
  const errors = {};
  try {
    const page = +req.query.page || 0
    const limit = +req.query.limit || 100000
    const keyword = req.query.keyword || ''
    const totalCount  = await Profile.count()
    const profiles = await Profile.find({
      handle: {$regex: keyword}
    }
      )
      .skip(page * limit)
      .limit(limit)
      .populate("user", ["name", "avatar"])    
    if (!profiles) {      
      return res.json({
        result:'fail',
        status: 404,
        message: 'There are no profiles'
      })
    }    
    return res.json({
      page,
      limit,
      totalCount,
      profiles
    });
  } catch (err) {
    return res.status(400).json(err.message)
  }
});
// @route   GET api/profile/experience
// @desc    Add experience to profile
// @access  Private

router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    const {
      errors,
      isValid
    } = validateExperienceInput(req.body)
    // Check validation
    if (!isValid) return res.json({
      result: 'fail',
      status: 400,
      errors,
    });
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });
      if(!profile) return res.status(404).json({message: 'Cant add experience to Profile that is not exist'})
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // Add to exp array

      profile.experience.unshift(newExp);
      const newProfle = await profile.save()
      return res.json(newProfle)
    } catch (err) {
      return res.status(400).json(err.message)
    }
  }
);
// @route   GET api/profile/education
// @desc    Add experience to profile
// @access  Private

router.post(
  "/education",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    const {
      errors,
      isValid
    } = validateEducationInput(req.body);

    // Check validation
    if (!isValid) return res.json({
      result: 'fail',
      status: 400,
      errors,
    });
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });
      if(!profile) return res.status(404).json({message: 'Cant add education to Profile that is not exist'})
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        field_of_study: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // Add to exp array
      profile.education.unshift(newEdu);
      const newProfle = await profile.save();
      return res.json(newProfle);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete a education from profile
// @access  Private

router.post(
  "/education/:edu_id",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });
      if(!profile) return res.status(404).json({msg:"Can't not delete from profile does not exist"})
      const newEdus = profile.education.filter(
        edu => edu.id !== req.params.edu_id
      );
      if(newEdus.length === profile.education.length) return res.status(404).json({msg:"Cant't delete something does not exist"})
      profile.education = newEdus;
      const newProfile = await profile.save();
      return res.json(newProfile);
    } catch (err) {
      return res.json(err.message);
    }
  }
);
// @route   DELETE api/profile/education/:exp_id
// @desc    Delete a experience from profile
// @access  Private

router.post(
  "/experience/:exp_id",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      })
      if(!profile) return res.status(404).json({msg:"Can't not delete from profile does not exist"})
      const newExp = profile.experience.filter(
        exp => exp.id !== req.params.exp_id
      )
      if(newExp.length === profile.experience.length) return res.status(404).json({msg:"Cant't delete something does not exist"})
      profile.experience = newExp
      const newProfile = await profile.save()
      return res.json(newProfile)
    } catch (err) {
      return res.json(err.message)
    }
  }
);

// @route   POST api/profile
// @desc    Create user profile
// @access  private

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    const {
      errors,
      isValid
    } = validateProfileInput(req.body);
    //Check validate
    if (!isValid) return res.status(400).json(errors);
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.github_user_name)
      profileFields.github_user_name = req.body.github_user_name;
    //Skills - split into array
    if (typeof req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");
    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    console.log(profileFields)
    const profile = await Profile.findOne({
      user: req.user.id
    });
    if (profile) {
      //Update
      const profile = await Profile.findOneAndUpdate({
        user: req.user.id
      }, {
        $set: profileFields
      }, {
        new: true
      });
      return res.json(profile);
    } else {
      // Create

      // Check if handle exist
      const profile = await Profile.findOne({
        handle: profileFields.handle
      });
      if (profile) {
        errors.handle = " That handle already exist";
        return res.json({
          result: 'fail',
          status: 400,
          errors});
      }
      // Save Profile
      const newProfile = await new Profile(profileFields).save();
      return res.json(newProfile);
    }
  }
);

// @route   DELETE api/profile/
// @desc    Delete Profile
// @access  Private
router.delete('/', passport.authenticate('jwt',{session: false}), async (req, res)=>{
  try{
    const profile = await Profile.findOne({
      user: req.user.id
    })
    if(!profile){
      return res.json({
        result: 'fail',
        message: 'Dont find that Profile'
      })
    } else {
      await profile.remove()
      res.json({
        result: 'success',
        message: 'Delete success'
      })
    }

  } catch(err) {
    return res.json(err.message)
  }
})


module.exports = router;