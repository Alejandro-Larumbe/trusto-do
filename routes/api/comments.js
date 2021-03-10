const Router = require('express-promise-router');
const { PrismaClient } = require('@prisma/client')

const router = Router()
const prisma = new PrismaClient()


router.get("/:id(\\d+)", async (req, res, _next) => {
  const id = +req.params.id
  const comment = await prisma.comment.findUnique({
    where: {
      id
    }
  })
  res.json(comment)
})

router.post("/", async (req, res, _next) => {
  const {
    comment,
    taskId
  } = req.body

  const newComment = await prisma.comment.create({
    data: {
      comment,
      taskId
    }
  })

  res.json(newComment)
})

router.delete("/:id(\\d+)", async (req, res, _next) => {
  const id = +req.params.id

  const deletedComment = await prisma.comment.delete({
    where: {
      id
    }
  })

  res.json(deletedComment)
})

router.put("/:id(\\d+)", async (req, res, _next) => {
  const id = +req.params.id
  const {
    comment,
    taskId
   } = req.body

  const updateComment = await prisma.comment.update({
    where: {
      id
    },
    data: {
      comment,
      taskId
    }
  })

  res.json(updateComment)
})

module.exports = router;
