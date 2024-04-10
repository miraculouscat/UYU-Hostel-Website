// HEADER, Ini dicopas ke semua file testing
const request = require("supertest");
const app = require("../main.js");
jest.mock("../controllers/auth.js");
const {prisma} = require("../dbConnector.js")
// END HEADER

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
        username : "tester",
        password : "$2b$08$iG9julx68lbDcQnIG9LwYuQ2yzdeBeBTrM5Fosux6TP3Bls6dPQoi", // ini adalah hash dari password
        nik : "1451145114511451",
        name : "tester_full_name",
        address : "Testway",
        email : "test@uyu.com",
        phone : "888888888888"
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
          id: 100,
          room_id: 20,
          description: "test"
      },
    });

    await prisma.maintenance.create({ 
      data: { // Body dari data
          id: 200,
          room_id: 20,
          description: "test",
          status: "in_progress"
      },
    });

    await prisma.report.create({ 
        data: { // Body dari data
            id: 500,
            maintenance_id: 100,
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


//PASS
describe("Test the root path", () => {
  test("It should response the GET method with all maintenance", () => {
    return request(app)
      .get("/report")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

//PASS
describe("Test the root path", () => {
  test("It should response the GET method with a report with an id of 500", () => {
    return request(app)
      .get("/report/500")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

//PASS
describe("Test the root path", () => {
  test("It should response the GET method with report from a maintanance with an id of 100", () => {
    return request(app)
      .get("/report/maintenance/100")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

//PASS
describe("Test the root path", () => {
  test("It should create a new report", async () => {
    const response = await request(app)
    .post("/report")
    .send({
        maintenance_id: 200,
        description: "test",
        further_action: "aman"
    });
    expect(response.statusCode).toBe(200);
  });
});

//PASS
describe("Test the root path", () => {
  test("It should soft delete a maintenance with an id of 500", async () => {
    return request(app)
      .delete("/report/500")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});