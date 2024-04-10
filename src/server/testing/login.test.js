// HEADER, Ini dicopas ke semua file testing
const request = require("supertest");
const app = require("../main.js");
jest.mock("../controllers/auth.js");
const {prisma} = require("../dbConnector.js")
// END HEADER

beforeAll( async()=> { // Digunain buat ngisi database-nya dengan data dummy
  // PENTING : Urutan memasukkan data sangat berpengaruh!
  // Ikuti urutan ini : staff => room => maintenance => report
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
    await prisma.staff.create({ 
      data: { // Body dari data
          username : "deletedTester",
          password : "$2b$08$iG9julx68lbDcQnIG9LwYuQ2yzdeBeBTrM5Fosux6TP3Bls6dPQoi", // ini adalah hash dari password
          nik : "1451245114511451",
          name : "testir_full_name",
          address : "Testway",
          email : "test2@uyu.com",
          phone : "888888889888",
          is_deleted : true
      },
      });
  
    // await prisma.room.create({ 
    //   data: { // Body dari data
    //     id : 1,// Isi angka
    //     is_flagged : false // Isi true atau false
    //   },
    //   });

    // await prisma.maintenance.create({ 
    //   data: { // Body dari data
    //     room_id : 1,// Isi dari room id yang ada
    //     staff_id : 2 // Isi true atau false
    //   },
    //   });
      
    // await prisma.room.create({ 
    //   data: { // Body dari data
    //     id : 1,// Isi angka
    //     is_flagged : false // Isi true atau false
    //   },
    //   });
})

afterAll(async() => { // Digunain buat membersihkan database setelah digunakan
  

  await prisma.report.deleteMany({})
  await prisma.maintenance.deleteMany({})
  await prisma.room.deleteMany({})
  await prisma.staff.deleteMany({}) 
  
})




describe("Test login method", () => { // Deskripsi dari API yang di test
  test("It should successfuly login the user as staff", async () => { // Deskripsi dari test
    return request(app)
      .post("/auth/login"). // API yang di test
      send({"username" : "tester", "password" : "password"}) // Req body
      .then(response => {
        expect(response.statusCode). // Object yang dicek, untuk saat ini yang dicek hanya status code
        toBe(200); // Expected Value dari objek yang dicek
      });
  });
  test("It should fail to get the user data from the database, as it doesn't exist", async () => { // Deskripsi dari test
    return request(app)
      .post("/auth/login").
      send({"username" : "notTester", "password" : "password"})
      .then(response => {
        expect(response.statusCode).
        toBe(500);
      });
  });
  test("It should reject the login because the password is wrong", async () => { // Deskripsi dari test
    return request(app)
      .post("/auth/login").
      send({"username" : "tester", "password" : "wrongPassword"})
      .then(response => {
        expect(response.statusCode).
        toBe(401);
      });
  });
  test("It should reject the login because the user is deleted", async () => { // Deskripsi dari test
    return request(app)
      .post("/auth/login").
      send({"username" : "deletedTester", "password" : "password"})
      .then(response => {
        expect(response.statusCode).
        toBe(401);
      });
  });
});

