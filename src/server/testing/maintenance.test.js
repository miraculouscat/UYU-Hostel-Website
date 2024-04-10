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
        id: 500,
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
          id: 200,
          staff_id: 500,
          room_id: 10,
          description: "test",
          status: "pending"
      },
    });

    await prisma.maintenance.create({ 
      data: { // Body dari data
          id: 300,
          staff_id: 500,
          room_id: 20,
          description: "test",
          status: 'in_progress'
      },
  });

    await prisma.report.create({ 
      data: { // Body dari data
          id: 25,
          maintenance_id: 300,
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


// PASS
describe("Test the root path", () => {
    test("It should response the GET method with all maintenance", () => {
      return request(app)
        .get("/maintenance")
        .then(response => {
          expect(response.statusCode).toBe(200);
      });
   });
});

// PASS
describe("Test the maintenance path", () => {
  test("It should response the GET method and return maintenance with an id 200", async () => {
      const response = await request(app)
          .get(`/maintenance/200`);
      expect(response.statusCode).toBe(200);
  });
});

// PASS
describe("Test the maintenance path", () => {
  test("It should response the GET method and return maintenances related to the room with and id of 10", async () => {
      const response = await request(app)
          .get(`/maintenance/room/10`);
      expect(response.statusCode).toBe(200);
  });
});

// PASS
describe("Test the maintenance path", () => {
  test("It should response the GET method and return maintenances related to the staff with an id of 500", async () => {
      const response = await request(app)
          .get(`/maintenance/staff/500`);
      expect(response.statusCode).toBe(200);
  });
});

// PASS
describe("Test the root path", () => {
  test("It should response the POST method", async () => {
    const response = await request(app)
        .post("/maintenance")
        .send({
            room_id: 10,
            staff_id: 500,
            description: "test"
        });
    expect(response.statusCode).toBe(200);
  });
});

// PASS
describe("Test the maintenance path", () => {
  test("It should update the maintenance status to 'finished'", async () => {
    const response = await request(app)
        .put(`/maintenance/300`)
        .send({
            status: "finished"
        });
    expect(response.statusCode).toBe(200);
  });
});

// PASS
describe("Test the maintenance path", () => {
  test("It should update the maintenance status to 'in_progress'", async () => {
    const response = await request(app)
        .put(`/maintenance/200`)
        .send({
            status: "in_progress"
        });
    expect(response.statusCode).toBe(200);
  });
});
