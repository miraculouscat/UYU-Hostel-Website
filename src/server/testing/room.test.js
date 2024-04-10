const request = require("supertest");
const app = require("../main.js");
jest.mock("../controllers/auth.js");
const { PrismaClient } = require("@prisma/client");
const {prisma} = require("../dbConnector.js");

beforeAll( async()=> { // Digunain buat ngisi database-nya dengan data dummy
    // PENTING : Urutan memasukkan data sangat berpengaruh!
    // Ikuti urutan ini : staff => room => maintenance => report
    // await prisma.staff.create({ 
    //   data: { // Body dari data
    //       username : "tester2",
    //       password : "$2b$08$iG9julx68lbDcQnIG9LwYuQ2yzdeBeBTrM5Fosux6TP3Bls6dPQoi", // ini adalah hash dari password
    //       nik : "1111222211112222",
    //       name : "tester_full_name",
    //       address : "Testway",
    //       email : "tester3@uyu.com",
    //       phone : "111122223333",
    //   },
    //   });
    await prisma.staff.create({ 
      data: { // Body dari data
          username : "bayufarmer",
          password : "$2b$08$iG9julx68lbDcQnIG9LwYuQ2yzdeBeBTrM5Fosux6TP3Bls6dPQoi", // ini adalah hash dari password
          nik : "1451323429839242",
          name : "mas_bayu",
          address : "nganjuk",
          email : "bayu22@uyu.com",
          phone : "888888884332"
      },
      });
      await prisma.room.create({ 
        data: { // Body dari data
            id: 10,
            is_flagged: false 
        },
      });
  
      await prisma.room.create({ 
        data: { // Body dari data
            id: 20,
            is_flagged: false 
        },
      });
  
      await prisma.maintenance.create({ 
        data: { // Body dari data
            room_id: 20,
            description: "test"
        },
      });
    }
  )

afterAll(async() => { // Digunain buat membersihkan database setelah digunakan
    await prisma.report.deleteMany({})
    await prisma.maintenance.deleteMany({})
    await prisma.room.deleteMany({})
    await prisma.staff.deleteMany({}) 
    
  })

describe("Test GetAllRoom method", () => {
    test("It should successfully get all room", async () => {
        const response = await request(app)
        .get("/room").
        send()
        .then(response => {
            expect(response.statusCode).toBe(200);
        })
    });

    test("It should successfully get room with specific id", async () => {
        const response = await request(app)
        .get("/room/10");
        expect(response.statusCode).
        toBe(200);
        // expect(response.body).toHaveProperty('id', roomId);
    })

    test("It should update the room", async () => {
        const response = await request(app)
            .put("/room/10")
            .send({
                id: 12,
                is_flagged: true
            })
        expect(response.statusCode).toBe(200);
    })
});