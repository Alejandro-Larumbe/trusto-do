const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function main() {
  const list1 = await prisma.list.upsert({
    where: { title: 'Build a todo list for trustero' },
    update: {},
    create: {
      title: 'Build a todo list for trustero',
      tasks: {
        create: [
          {
            title: 'Come up with an schema',
            description: 'yeah, gotta do that fancy dbdiagram thingie and come up with a choice schema',
            comments: {
              create: [
                {
                  comment: "Good thing those trustero folks gave me such detailed instructions!",
                },
                {
                  comment: "Make sure you know how to use all these data types in prisma",
                },
              ]
            }
          },
          {
            title: 'Build backend',
            description: 'build a backend using some stuff that you know well and some other stuff that you kinda know',
            comments: {
              create: [
                {
                  comment: 'Gotta look up all that SQL looking prisma stuff',
                },
                {
                  comment: "Don't forget to add all the routes",
                },
                {
                  comment: "make sure you look carefully at your schema",
                },
                {
                  comment: "it's alive!!!",
                },
              ]
            }
          },
          {
            title: 'Build frond end',
            description: "Now it's time to throw some React into the mix, don't forget to make it looke super-fly for those trustero peeps",
            comments: {
              create: [
                {
                  comment: "Is't react awesome?!",
                },
                {
                  comment: "Oi, where are those props coming from???",
                },
                {
                  comment: "yeah, it's beginning to look like something",
                },
              ]
            }
          },
        ],
      },
    },
  })


  const list2 = await prisma.list.upsert({
    where: { title: 'Make dinner' },
    update: {},
    create: {
      title: 'Make dinner',
      tasks: {
        create: [
          {
            title: 'Chose what to eat?!',
            description: 'yo, the missus is hangry, so I think I better make some tacos!',
            comments: {
              create: [
                {
                  comment: "I think she will be happy about it, my tummy will be too",
                },
              ]
            }
          },
          {
            title: 'prepare the meat',
            description: 'I have this delicious steak, better get it right',
            comments: {
              create: [
                {
                  comment: 'gotta salt it just right',
                },
                {
                  comment: "Please don't over cook it!",
                },
              ]
            }
          },
          {
            title: 'make tortillas',
            description: "Because making great tacos comes with great resposibility, gotta make them tortillas myself",
            comments: {
              create: [
                {
                  comment: "Get tha press ready",
                },
                {
                  comment: "You don't want the masa-flour too soft!",
                },
                {
                  comment: "And please, heat that plank properly",
                },
              ]
            }
          },
          {
            title: 'salsa time',
            description: "A taco is as good as its salsa",
            comments: {
              create: [
                {
                  comment: "Classic classic classic please, REAL tomatoes, garlic, onion, green peppers, grill and blend",
                },
                {
                  comment: "Don't make it too spicy. I know you can take it, but this tacos are not for only yourself",
                },
              ]
            }
          },
          {
            title: 'enjoy',
            description: "sit down and enjoy some relaxing taco time",
            comments: {
              create: [
                {
                  comment: "Play some salsa to go with that salsa",
                },
              ]
            }
          },
        ],
      },
    },
  })

}


main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
