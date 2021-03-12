const Router = require('express-promise-router');
const { PrismaClient } = require('@prisma/client')

const router = Router()
const prisma = new PrismaClient()


router.get("/", async (_req, res, _next) => {

  const lists = await prisma.list.findMany({
    select: {
      id: true,
      title: true,
      tasks: {
        select: {
          id: true,
          title: true
        }
      }
    },
    orderBy: {
      id: "desc"
    }
  })
  console.log('------', lists)

  res.json(lists)
})

router.post("/", async (req, res, _next) => {
  const { title } = req.body

  const newList = await prisma.list.create({
    data: {
      title
    }
  })

  res.json(newList)
})

router.delete("/:id(\\d+)", async (req, res, _next) => {
  const id = +req.params.id

  const deletedList = await prisma.list.delete({
    where: {
      id
    }
  })

  res.json(deletedList)
})

router.put("/:id(\\d+)", async (req, res, _next) => {
  const id = +req.params.id
  const {
    title,
   } = req.body

  const updateList = await prisma.list.update({
    where: {
      id
    },
    data: {
      title
    }
  })

  res.json(updateList)
})

module.exports = router;
