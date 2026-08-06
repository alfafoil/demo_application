// ============================================================
// api.js
// This file contains all API call functions that connect the
// React app to Google Apps Script (deployed as a Web App).
// Each function fetches data from a specific sheet endpoint.
//
// HOW TO USE:
//   1. Deploy your Apps Script as a Web App (see AppScript files).
//   2. Replace BASE_URL below with your actual deployed script URL.
//   3. Import and call these functions in your React components.
// ============================================================

// Base URL of your deployed Google Apps Script Web App.
// Replace this with the URL from: Deploy > Manage Deployments in Apps Script.
const BASE_URL = "https://script.google.com/macros/s/AKfycbzgTCZRkD-Pn7uFnTv4L4R6t0MPtVCKS_QJMWOBmwnbUGLjp-DBGx0A8RXps-IZgart/exec";

// ------------------------------------------------------------
// fetchFromAPI()
// Generic internal helper — makes a GET request to the Apps Script
// with a specific "sheet" query parameter and returns the JSON data.
// All other functions below use this helper.
// Parameters:
//   sheet — name of the sheet to fetch ("customers", "items", "users")
// Returns:
//   Array of row objects from the specified sheet
// ------------------------------------------------------------
async function fetchFromAPI(sheet) {
  // Build URL with sheet name as query param so Apps Script knows which sheet to return
  const response = await fetch(`${BASE_URL}?sheet=${sheet}`);

  // If the HTTP request itself failed, throw an error
  if (!response.ok) {
    throw new Error(`API error: ${response.status} for sheet "${sheet}"`);
  }

  // Parse and return JSON data
  const data = await response.json();
  return data;
}

// ------------------------------------------------------------
// getCustomers()
// Fetches all customer records from the "Customer" sheet.
// Returns array of customer objects with fields like:
//   CUSTOMER CODE, CUSTOMER NAME, STATE, EMAIL ID, etc.
// ------------------------------------------------------------
export async function getCustomers() {
  return await fetchFromAPI("customers");
}

// ------------------------------------------------------------
// getItems()
// Fetches all product/item records from the "Items" sheet.
// Returns array of item objects with fields:
//   Name, Item_Code, Category, Company Price / Box
// ------------------------------------------------------------
export async function getItems() {
  return await fetchFromAPI("items");
}

// ------------------------------------------------------------
// getUsers()
// Fetches all user records from the "Users" sheet.
// Returns array of user objects with fields:
//   email, password, role, name, salesman_id
// NOTE: In production, NEVER expose passwords to the frontend.
//       Use a proper auth endpoint instead (see Apps Script login endpoint).
// ------------------------------------------------------------
export async function getUsers() {
  return await fetchFromAPI("users");
}

// ------------------------------------------------------------
// loginUser()
// Sends login credentials to the Apps Script for verification.
// Uses POST request so credentials are not exposed in the URL.
// Parameters:
//   email    — user's email address
//   password — user's plain-text password
// Returns:
//   { success: true, user: { email, role, name, salesman_id } }
//   or { success: false, message: "Invalid credentials" }
// ------------------------------------------------------------
export async function loginUser(email, password) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    // Apps Script requires "text/plain" for POST bodies (no CORS preflight)
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "login", email, password }),
  });

  if (!response.ok) {
    throw new Error(`Login API error: ${response.status}`);
  }

  return await response.json();
}

// ------------------------------------------------------------
// submitOrder()
// Submits a new order to the Apps Script to be saved in the sheet.
// Parameters:
//   orderData — object containing order details:
//     { customerCode, items: [...], totalAmount, salesmanId, date }
// Returns:
//   { success: true, orderId: "ORD-XXX" }
//   or { success: false, message: "Error details" }
// ------------------------------------------------------------
export async function submitOrder(orderData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "submitOrder", ...orderData }),
  });

  if (!response.ok) {
    throw new Error(`Submit order error: ${response.status}`);
  }

  return await response.json();
}