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
            username : "tester2",
            password : "$2b$08$iG9julx68lbDcQnIG9LwYuQ2yzdeBeBTrM5Fosux6TP3Bls6dPQoi", // ini adalah hash dari password
            nik : "1451178146013931",
            name : "tester_super_full_name",
            address : "Test Street",
            email : "tester@uwu.com",
            phone : "878542294905"
        },
      });
})

afterAll(async() => { // Digunain buat membersihkan database setelah digunakan
  
    await prisma.staff.deleteMany({}) 
    
})

describe("Test GetAllStaff method", () => {
    test("It should successfully get all staff", async () => {
        return await request(app)
            .get("/staff/all").
            send()
            .then(response => {
                expect(response.statusCode).
                toBe(200);
            });
    });

    test("It should successfully get certain staff by spesific ID", async () => {
        return await request(app)
            .get("/staff/${staffId}");            
            expect(response.statusCode).
            toBe(200);
            expect(response.body).toHaveProperty('id', staffId);
    });

    test("It should fail to get certain staff by spesific ID because the ID doesn't exist", async () => {
        return await request(app)
            .get("/staff/${staffId}");            
            expect(response.statusCode).
            toBe(404);
            expect(response.body).not.toHaveProperty('id', staffId);
    });

    test("It should fail to get certain staff by spesific ID because the ID isn't valid", async () => {
        return await request(app)
            .get("/staff/${staffId}");            
            expect(response.statusCode).
            toBe(500);
            expect(response.body).not.toHaveProperty('id', staffId);
    });

    test("It should successfully create a staff account", async () => {
        return await request(app)
            .post("/staff").
            send({
                username : "tester3",
                password : "$2b$08$iG9julx68lbDcQnIG9LwYuQ2yzdeBeBTrM5Fosux6TP3Bls6dPQoi", // ini adalah hash dari password
                nik : "1451429144019051",
                name : "tester_duper_full_name",
                address : "Test Street Num 6",
                email : "tester@uwu.id",
                phone : "878593194943"
            })
            .then(response => {
                expect(response.statusCode).
                toBe(200);
            });
    });

    test("It should fail to create a staff account because the username already taken", async () => {
        return await request(app)
            .post("/staff").
            send({
                username : "tester3",
                password : "$2b$08$iG9julx68lbDcQnIG9LwYuQ2yzdeBeBTrM5Fosux6TP3Bls6dPQoi", // ini adalah hash dari password
                nik : "3652789144019051",
                name : "tester_full_full_name",
                address : "Test Street Num 90",
                email : "tester@uwu.edu",
                phone : "879493194948"
            })
            .then(response => {
                expect(response.statusCode).
                toBe(500);
            });
    });

    test("It should successfully update certain staff account", async () => {
        return await request(app)
            .put("/staff/${staffId}").
            send({
                username : "testerKeren",
            })
            expect(response.statusCode).
            toBe(200);
            expect(response.body).toHaveProperty('id', staffId);
    });

    test("It should fail to update certain staff account because the value of updated attribute had taken", async () => {
        return await request(app)
            .put("/staff/${staffId}").
            send({
                username : "tester2",
            })
            expect(response.statusCode).
            toBe(400);
            expect(response.body).toHaveProperty('id', staffId);
    });

    test("It should fail to update certain staff account because there's an internal error", async () => {
        return await request(app)
            .put("/staff/${staffId}").
            send({
                email : "testuyu.com"
            })
            expect(response.statusCode).
            toBe(500);
            expect(response.body).toHaveProperty('id', staffId);
    });

    test("It should fail to delete certain staff account by ID because the ID doesn't exist", async () => {
        return await request(app)
            .delete("/staff/${staffId}");
            expect(response.statusCode).
            toBe(500);
            expect(response.body).not.toHaveProperty('id', staffId);
    });

});