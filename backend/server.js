require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= ROOT ================= */

app.get("/", (req, res) => {
  res.send("Garage API Running");
});

/* ================= REGISTER ================= */

app.post("/register", async (req, res) => {

  const { name, phone, shop_name, password } = req.body;

  if (!name || !phone || !shop_name || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {

    const existing = await db.query(
      "SELECT * FROM shop_owners WHERE phone=$1",
      [phone]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Phone already registered" });
    }

    await db.query(
      `INSERT INTO shop_owners (name, phone, shop_name, password)
       VALUES ($1,$2,$3,$4)`,
      [name, phone, shop_name, password]
    );

    res.json({ message: "Registration successful" });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Registration error" });
  }

});

/* ================= LOGIN ================= */

app.post("/login", async (req, res) => {

  const { phone, password } = req.body;

  try {

    const result = await db.query(
      "SELECT * FROM shop_owners WHERE phone=$1 AND password=$2",
      [phone, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid login" });
    }

    res.json({ shop: result.rows[0] });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login error" });
  }

});

/* ================= ADD CUSTOMER ================= */

app.post("/add-customer", async (req, res) => {

  const { name, phone, vehicle_number, vehicle_type, vehicle_model, shop_owner_id } = req.body;

  try {

    await db.query(
      `INSERT INTO customers
      (name, phone, vehicle_number, vehicle_type, vehicle_model, shop_owner_id)
      VALUES ($1,$2,$3,$4,$5,$6)`,
      [name, phone, vehicle_number, vehicle_type, vehicle_model, shop_owner_id]
    );

    res.json({ message: "Customer added" });

  } catch (error) {
    console.error("Add customer error:", error.message);
    res.status(500).json({ message: error.message });
  }

});

/* ================= GET CUSTOMERS (ONLY OWN) ================= */

app.get("/customers/:shop_owner_id", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM customers WHERE shop_owner_id=$1 ORDER BY id DESC",
      [req.params.shop_owner_id]
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Get customers error:", error);
    res.status(500).json({ message: "Error fetching customers" });
  }

});

/* ================= SEARCH CUSTOMER BY PHONE ================= */

// Called by CustomerSearchPage: GET /customer/:phone
// Returns the matching customer row or 404 if not found.

app.get("/customer/:phone", async (req, res) => {

  const { phone } = req.params;

  try {

    const result = await db.query(
      "SELECT * FROM customers WHERE phone = $1 LIMIT 1",
      [phone]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ customer: result.rows[0] });

  } catch (error) {
    console.error("Search customer error:", error);
    res.status(500).json({ message: "Error searching customer" });
  }

});

/* ================= ADD PROBLEM ================= */

// UI sends: { customer_id, problem }
// shop_owner_id is optional — stored if provided

app.post("/add-problem", async (req, res) => {

  const { customer_id, problem, shop_owner_id } = req.body;

  if (!customer_id || !problem) {
    return res.status(400).json({ message: "customer_id and problem are required" });
  }

  try {

    await db.query(
      `INSERT INTO service_problems (customer_id, problem, shop_owner_id)
       VALUES ($1, $2, $3)`,
      [customer_id, problem, shop_owner_id || null]
    );

    res.json({ message: "Problem added" });

  } catch (error) {
    console.error("Add problem error:", error);
    res.status(500).json({ message: "Error saving problem" });
  }

});

/* ================= MULTI SERVICE DETECTION ================= */

// Detects one or more services from the problem description text.
// Each keyword maps to a service name that must match spare_part.service_name in the DB.

function detectServices(problem) {

  const text = problem.toLowerCase();

  const rules = [
    { keyword: "oil",     service: "Oil Change"           },
    { keyword: "brake",   service: "Brake Repair"          },
    { keyword: "battery", service: "Battery Replacement"   },
    { keyword: "tyre",    service: "Tyre Replacement"      },
    { keyword: "tire",    service: "Tyre Replacement"      },
    { keyword: "engine",  service: "Engine Repair"         },
    { keyword: "filter",  service: "Filter Replacement"    },
    { keyword: "clutch",  service: "Clutch Repair"         },
    { keyword: "ac",      service: "AC Service"            },
    { keyword: "coolant", service: "Coolant Flush"         },
  ];

  // Deduplicate — multiple keywords can map to the same service
  const found = new Set();
  for (const rule of rules) {
    if (text.includes(rule.keyword)) found.add(rule.service);
  }

  return found.size > 0 ? [...found] : ["General Service"];
}

/* ================= GET ESTIMATE (MULTIPLE SERVICES) ================= */

// Response shape expected by UI:
// { services: [ { service: "...", parts: [ { id, part_name, original_price, third_party_price, ... } ] } ] }

app.post("/get-estimate", async (req, res) => {

  const { vehicle_model, problem } = req.body;

  if (!vehicle_model || !problem) {
    return res.status(400).json({ message: "vehicle_model and problem are required" });
  }

  const services = detectServices(problem);

  try {

    const data = [];

    for (const service of services) {

      const result = await db.query(
        `SELECT * FROM spare_part
         WHERE LOWER(vehicle_model) = LOWER($1)
           AND LOWER(service_name)  = LOWER($2)`,
        [vehicle_model, service]
      );

      data.push({
        service,
        parts: result.rows   // each row must have: id, part_name, original_price, third_party_price
      });
    }

    res.json({ services: data });

  } catch (error) {
    console.error("Estimate error:", error);
    res.status(500).json({ message: "Estimate error" });
  }

});

/* ================= ADD SERVICE ================= */

// UI sends: { customer_id, service_name, cost }
// service_name is "Multiple Services" (set by frontend); shop_owner_id optional

app.post("/add-service", async (req, res) => {

  const { customer_id, service_name, cost, shop_owner_id } = req.body;

  if (!customer_id || !cost) {
    return res.status(400).json({ message: "customer_id and cost are required" });
  }

  try {

    await db.query(
      `INSERT INTO services (customer_id, service, cost, shop_owner_id)
       VALUES ($1, $2, $3, $4)`,
      [customer_id, service_name || "Multiple Services", cost, shop_owner_id || null]
    );

    res.json({ message: "Service added" });

  } catch (error) {
    console.error("Add service error:", error);
    res.status(500).json({ message: "Error adding service" });
  }

});

/* ================= GENERATE BILL ================= */

// UI sends: { customer_id, service_cost, parts_cost, shop_name }
// Returns:  { message, total }
// Then UI navigates to /bill with full state (no extra DB read needed).

app.post("/generate-bill", async (req, res) => {

  const { customer_id, service_cost, parts_cost, shop_owner_id, shop_name } = req.body;

  if (!customer_id) {
    return res.status(400).json({ message: "customer_id is required" });
  }

  const total = Number(service_cost || 0) + Number(parts_cost || 0);

  try {

    await db.query(
      `INSERT INTO bills (customer_id, total_amount, shop_owner_id, shop_name)
       VALUES ($1, $2, $3, $4)`,
      [customer_id, total, shop_owner_id || null, shop_name || "Garage"]
    );

    res.json({ message: "Bill generated", total });

  } catch (error) {
    console.error("Bill error:", error);
    res.status(500).json({ message: "Error generating bill" });
  }

});

/* ================= GET LAST BILL BY PHONE ================= */

// When customer comes back, search by phone to get their last bill
// Returns bill + customer details + service + parts

app.get("/bill/:phone", async (req, res) => {

  const { phone } = req.params;

  try {

    // Get customer
    const custResult = await db.query(
      "SELECT * FROM customers WHERE phone = $1 LIMIT 1",
      [phone]
    );

    if (custResult.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const customer = custResult.rows[0];

    // Get latest bill
    const billResult = await db.query(
      `SELECT * FROM bills WHERE customer_id = $1 ORDER BY id DESC LIMIT 1`,
      [customer.id]
    );

    if (billResult.rows.length === 0) {
      return res.status(404).json({ message: "No bill found for this customer" });
    }

    const bill = billResult.rows[0];

    // Get latest service
    const serviceResult = await db.query(
      `SELECT * FROM services WHERE customer_id = $1 ORDER BY id DESC LIMIT 1`,
      [customer.id]
    );

    // Get latest problem
    const problemResult = await db.query(
      `SELECT * FROM service_problems WHERE customer_id = $1 ORDER BY id DESC LIMIT 1`,
      [customer.id]
    );

    res.json({
      customer,
      bill,
      service:  serviceResult.rows[0]  || null,
      problem:  problemResult.rows[0]  || null,
    });

  } catch (error) {
    console.error("Get bill error:", error);
    res.status(500).json({ message: error.message });
  }

});

/* ================= AUTO DELETE OLD BILLS (5 DAYS) ================= */

const deleteOldRecords = async () => {
  try {

    // Delete bills older than 5 days
    const bills = await db.query(
      `DELETE FROM bills
       WHERE created_at < NOW() - INTERVAL '5 days'
       RETURNING id`
    );

    // Delete service problems older than 5 days
    const problems = await db.query(
      `DELETE FROM service_problems
       WHERE created_at < NOW() - INTERVAL '5 days'
       RETURNING id`
    );

    // Delete services older than 5 days
    const services = await db.query(
      `DELETE FROM services
       WHERE created_at < NOW() - INTERVAL '5 days'
       RETURNING id`
    );

    console.log(
      `🧹 Auto-cleanup: removed ${bills.rowCount} bills, ` +
      `${problems.rowCount} problems, ` +
      `${services.rowCount} services older than 5 days`
    );

  } catch (error) {
    console.error("Auto-cleanup error:", error.message);
  }
};

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");

  // Run cleanup immediately on server start
  deleteOldRecords();

  // Then run every 24 hours
  setInterval(deleteOldRecords, 24 * 60 * 60 * 1000);
});