const express = require('express')
const { School, User, House } = require('../../Models')
const router = express.Router()
const { protectEndPoint } = require('../../auth/jwt')

// This middleware ensures that only the owner of the school can make updates
// async function because we wanna use await
async function ensureOwner(req, res, next) {
  // get the user object from database by matching  the auth token
  const user = await User.findOne({
    where: {
      email: req.user.email,
    },
  })

  // get the school with the id specified in params
  const school = await School.findByPk(req.params.id)

  // the ID may be invalid i.e. no school exists with that ID, send a 404 in that case
  if (!school) return next({ code: 404 })

  // now we can compare if the school's userId property is the same as the logged in user's id
  // if it matches then they are good to go, otherwise send a 403 - forbidden
  // coerce the ids into Numbers just to avoid any gotchas
  if (Number(school.userId) === Number(user.id)) {
    // while we are at it, lets also make it easy for the next middleware to process this transaction
    // we already made the db query to fetch the school and user lets put those 2 objects on the
    // req object so that the next handler function can directly access them without having to
    // make a db query

    req.user = user
    req.school = school
    return next()
  }

  return next({ code: 403 })
}

router.get('/', async function(req, res) {
  try {
    const schools = await School.findAll({
<<<<<<< HEAD
      include: [
        House
        // {
        //   model: User,
        //   attributes: [
        //     [
        //       sequelize.fn(
        //         'concat',
        //         sequelize.col('firstName'),
        //         ' ',
        //         sequelize.col('lastName')
        //       ),
        //       'name',
        //     ],
        //     'email',
        //   ],
        // },
      ],
    });
=======
      include: [{ model: User, attributes:["firstName", "lastName", "email", "id"] }, House],
    })

>>>>>>> a7fc5a1c130a03aae0048abd92441b6434e38900
    return res.json({
      status: true,
      data: {
        schools,
      },
    })
  } catch (err) {
    console.log(err)
    next({ ...err, code: 500 })
  }
})

router.get('/:id', async function(req, res) {
  try {
    const school = await School.findById(req.params.id)
    res.json({
      status: true,
      data: {
        school,
      },
    })
  } catch (err) {
    console.log(err)
    next({ ...err, code: 500 })
  }
})

router.post('/', protectEndPoint, async function(req, res) {
  try {
<<<<<<< HEAD
    // const user = await User.findOne({
    //   where: {
    //     email: req.user.name,
    //   },
    // });

=======
    const user = await User.findOne({
      where: {
        email: req.user.email,
      },
    })
    console.log(`Line 52`, req.user.email)
>>>>>>> a7fc5a1c130a03aae0048abd92441b6434e38900
    const newSchool = await School.create({
      ...req.body,
      userId: user.id,
    })

    res.status(201).json({
      status: true,
      data: {
        newSchool,
      },
    })
  } catch (err) {
    console.log(err)
    next({ ...err, code: 500 })
  }
})

// Edit details of a particular school
// first protectEndPoint, then ensureOwner - order very important as one relies on another
// the ensureOwner middleware gives us the school and user object from the db so we
// don't have to make the queries in this function
// async function for await usage
router.put('/:id', protectEndPoint, ensureOwner, async (req, res, next) => {
  // wrap the code in try..catch block to catch any errors
  try {
    // every sequelize model has a handy update method which accepts an object
    // we can directly pass the body to the update method, sequelize automagically strips off unwanted properties
    // and updates the right values in the db
    const updatedSchool = await req.school.update(req.body)

    // just send back the updated object back to user
    res.status(200).json(updatedSchool)
  } catch (err) {
    next({ ...err, code: 500 })
  }
})

// Delete a particular school
// middleware setup same as above - protectEndPoint and then ensureOwner
router.delete('/:id', protectEndPoint, ensureOwner, async (req, res, next) => {
  // error catching
  try {
    // sequelize models have a handy destroy method, we don't even need to pass any arguments to it!
    await req.school.destroy()

    // send the details of deleted school back to user
    res.status(200).json(req.school.toJSON())
  } catch (err) {
    next({ ...err, code: 500 })
  }
})

// Add school routes above this  line
// nested route

module.exports = router
