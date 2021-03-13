const Router = require('express-promise-router');
const { PrismaClient } = require('@prisma/client')

const router = Router()
const prisma = new PrismaClient()


router.get("/:id(\\d+)", async (req, res, _next) => {
  const id = +req.params.id
  const task = await prisma.task.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      listId: true,
      comments: {
        select: {
          id: true,
          createdAt: true,
          comment: true
        },
        orderBy:[
          {
          createdAt: 'desc'
        },
        {
          id: 'desc'
        }
      ]
      },
      list: {
        select: {
          title:true
        }
      },
    },
  })
  res.json(task)
})

router.post("/", async (req, res, _next) => {
  const {
    title,
    description,
    listId
  } = req.body

  const newTask = await prisma.task.create({
    data: {
      title,
      description,
      listId
    }
  })

  res.json(newTask)
})

router.delete("/:id(\\d+)", async (req, res, _next) => {
  const id = +req.params.id

  const deletedTask = await prisma.task.delete({
    where: {
      id
    }
  })

  res.json(deletedTask)
})

router.put("/:id(\\d+)", async (req, res, _next) => {
  const id = +req.params.id
  const {
    title,
    description,
    status,
    listId
   } = req.body

  const updateTask = await prisma.task.update({
    where: {
      id
    },
    data: {
      title,
      description,
      status,
      listId
    }
  })

  res.json(updateTask)
})

module.exports = router;
