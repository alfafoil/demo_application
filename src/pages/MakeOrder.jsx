// ============================================================
// MakeOrder.jsx
// Order creation page — visible ONLY to role="user" (salesmen).
//
// FLOW:
//   1. On load: fetch customers (filtered by salesman_id) + all items
//      from Apps Script via getCustomers() and getItems()
//   2. User picks a customer, adds items with quantities
//   3. Order summary shows running total
//   4. On submit: generate Order ID (SM4350-N), POST to Apps Script
//      via addOrder() → saved to Sheet1
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Trash2, CheckCircle, Search, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getCustomers, getItems } from "../api/api";

// ------------------------------------------------------------
// MakeOrder Component
// Full order creation form for salesmen.
// Loads real data from Apps Script on mount.
// ------------------------------------------------------------
export default function MakeOrder() {
  const { user }   = useAuth();
  const navigate   = useNavigate();

  // ---- Data state ----
  const [customers,   setCustomers]   = useState([]);  // from Apps Script getCustomers
  const [items,       setItems]       = useState([]);  // from Apps Script getItems
  const [loadingData, setLoadingData] = useState(true);
  const [dataError,   setDataError]   = useState("");  // shown if fetch fails

  // ---- Form state ----
  const [selectedCustomer, setSelectedCustomer] = useState(null); // full customer object
  const [customerSearch,   setCustomerSearch]   = useState("");   // filter text for customer list
  const [orderItems,       setOrderItems]       = useState([]);   // items added to order
  const [selectedItemCode, setSelectedItemCode] = useState("");   // item selected in dropdown
  const [quantity,         setQuantity]         = useState(1);
  const [itemSearch,       setItemSearch]       = useState("");   // filter text for item dropdown
  const [notes,            setNotes]            = useState("");   // optional order notes
  const [submitting,       setSubmitting]       = useState(false);

  // ------------------------------------------------------------
  // loadData()
  // Fetches customers (for this salesman) and all items from
  // Apps Script when the page first loads.
  // Uses Promise.all to run both requests in parallel.
  // ------------------------------------------------------------
  useEffect(() => {
    async function loadData() {
      try {
        setLoadingData(true);
        setDataError("");

        // Run both API calls at the same time for speed
        // getCustomers filters by salesman_id automatically in Apps Script
        const [customerData, itemData] = await Promise.all([
          getCustomers(user?.salesman_id || ""),
          getItems(),
        ]);

        setCustomers(customerData);
        setItems(itemData);
      } catch (err) {
        console.error("MakeOrder data load error:", err);
        setDataError("Failed to load data: " + err.message);
        toast.error("Could not load customers/items. Check your connection.");
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, [user?.salesman_id]); // Re-fetch if salesman changes

  // ---- Filtered lists ----
  // Filter customers list based on what user types in customer search box
  const filteredCustomers = customers.filter((c) =>
    c.name?.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.code?.toLowerCase().includes(customerSearch.toLowerCase())
  );

  // Filter items dropdown based on item search text
  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(itemSearch.toLowerCase()) ||
    item.code?.toLowerCase().includes(itemSearch.toLowerCase())
  );

  // ------------------------------------------------------------
  // handleAddItem()
  // Adds the selected item + quantity to the orderItems array.
  // If the same item is already in the order, increases its quantity.
  // ------------------------------------------------------------
  const handleAddItem = () => {
    if (!selectedItemCode) {
      toast.warning("Please select an item.");
      return;
    }
    if (quantity < 1) {
      toast.warning("Quantity must be at least 1.");
      return;
    }

    // Find the full item object from the items list
    const item = items.find((i) => i.code === selectedItemCode);
    if (!item) return;

    // Parse price — Apps Script returns companyPrice as a string like "180" or "₹180"
    const price = parseFloat(String(item.companyPrice).replace(/[₹,\s]/g, "")) || 0;

    // Check if this item code is already in the order
    const existingIdx = orderItems.findIndex((o) => o.code === item.code);

    if (existingIdx >= 0) {
      // Item already exists — increase quantity and recalculate total
      const updated = [...orderItems];
      updated[existingIdx].quantity += quantity;
      updated[existingIdx].total     = updated[existingIdx].quantity * price;
      setOrderItems(updated);
    } else {
      // New item — append to order list
      setOrderItems([
        ...orderItems,
        {
          code:     item.code,
          name:     item.name,
          category: item.category,
          price,
          quantity,
          total: price * quantity,
        },
      ]);
    }

    // Reset item selection fields after adding
    setSelectedItemCode("");
    setQuantity(1);
    setItemSearch("");
  };

  // ------------------------------------------------------------
  // handleRemoveItem(code)
  // Removes an item from the order list by its item code.
  // ------------------------------------------------------------
  const handleRemoveItem = (code) => {
    setOrderItems(orderItems.filter((o) => o.code !== code));
  };

  // Grand total = sum of all item totals
  const grandTotal = orderItems.reduce((sum, i) => sum + i.total, 0);

  // ------------------------------------------------------------
  // handleSubmitOrder()
  // Validates the order, generates an Order ID, and POSTs to
  // Apps Script via addOrder().
  // Apps Script saves all data to Sheet1.
  // ------------------------------------------------------------
  const handleSubmitOrder = async () => {
    if (!selectedCustomer) {
      toast.warning("Please select a customer.");
      return;
    }
    if (orderItems.length === 0) {
      toast.warning("Please add at least one item.");
      return;
    }

    setSubmitting(true);

    try {
      // Get the next sequential order number for this salesman
      // e.g. if SM4350 already has orders SM4350-1, SM4350-2 → nextNum = 3
      const nextNum = await getNextOrderNum(user.salesman_id);
      const orderId = `${user.salesman_id}-${nextNum}`; // e.g. "SM4350-3"

      // Build order items as a readable string for the Notes/Address field
      // (Sheet1 doesn't have per-item columns — items go into the order details)
      const itemsSummary = orderItems
        .map((i) => `${i.name} (${i.code}) x${i.quantity} = ₹${i.total.toLocaleString("en-IN")}`)
        .join("\n");

      // Build the order object matching Sheet1 column structure exactly:
      // Col1=Order ID, Col2=Date, Col3=Customer Name, Col4=Address,
      // Col5=Customer Email, Col6=Customer Phone, Col7=Notes, Col8=salesman_id,
      // Col10=CN Applicable, Col11=CN Remark
      const orderData = {
        "Order ID":       orderId,
        "Date":           new Date().toISOString().split("T")[0], // YYYY-MM-DD
        "Customer Name":  selectedCustomer.name,
        "Address":        [selectedCustomer.address1, selectedCustomer.address2, selectedCustomer.address3]
                            .filter(Boolean).join(", "),
        "Customer Email": selectedCustomer.email,
        "Customer Phone": selectedCustomer.phone,
        "Notes":          `Items:\n${itemsSummary}\n\nTotal: ₹${grandTotal.toLocaleString("en-IN")}${notes ? "\n\nRemarks: " + notes : ""}`,
        "salesman_id":    user.salesman_id,
        "CN Applicable":  selectedCustomer.cnApplicable || "",
        "CN Remark":      selectedCustomer.cnRemark     || "",
      };

      // POST to Apps Script — saves row to Sheet1
      const result = await addOrder(orderData);

      toast.success(`Order ${orderId} placed successfully! 🎉`);
      navigate("/dashboard");

    } catch (err) {
      console.error("Submit order error:", err);
      toast.error("Order submission failed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Loading state ----
  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400">Loading customers and items...</p>
        </div>
      </div>
    );
  }

  // ---- Error state ----
  if (dataError) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center space-y-4">
          <p className="text-red-400">{dataError}</p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all mx-auto"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // JSX
  // ============================================================
  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* Page title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">New Order</h2>
          <p className="text-slate-400 text-sm">{user?.name} · {user?.salesman_id}</p>
        </div>
      </div>

      {/* ---- Customer Selection ---- */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
        <h3 className="text-white font-semibold">Select Customer</h3>

        {/* Customer search box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
            placeholder="Search by name or code..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Customer list — scrollable cards */}
        <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
          {filteredCustomers.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">No customers found.</p>
          ) : (
            filteredCustomers.map((c) => (
              <div
                key={c.code}
                onClick={() => setSelectedCustomer(c)} // Select this customer on click
                className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer border transition-all
                  ${selectedCustomer?.code === c.code
                    ? "border-indigo-500 bg-indigo-500/15 text-white"
                    : "border-white/5 bg-white/3 hover:bg-white/8 text-slate-300"
                  }`}
              >
                <div>
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.code} · {c.phone}</p>
                </div>
                {/* Checkmark when selected */}
                {selectedCustomer?.code === c.code && (
                  <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Show selected customer details */}
        {selectedCustomer && (
          <div className="mt-2 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm text-slate-300 space-y-1">
            <p><span className="text-slate-500">Customer:</span> <span className="text-white font-medium">{selectedCustomer.name}</span></p>
            <p><span className="text-slate-500">Address:</span> {[selectedCustomer.address1, selectedCustomer.address2].filter(Boolean).join(", ") || "—"}</p>
            {selectedCustomer.cnApplicable && (
              <p><span className="text-slate-500">CN:</span> {selectedCustomer.cnApplicable} {selectedCustomer.cnRemark ? `— ${selectedCustomer.cnRemark}` : ""}</p>
            )}
          </div>
        )}
      </div>

      {/* ---- Add Items Section ---- */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold">Add Items</h3>

        {/* Item search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={itemSearch}
            onChange={(e) => setItemSearch(e.target.value)}
            placeholder="Search item by name or code..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Item dropdown + quantity + add button */}
        <div className="flex gap-3 flex-wrap">
          <select
            value={selectedItemCode}
            onChange={(e) => setSelectedItemCode(e.target.value)}
            className="flex-1 min-w-48 px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-all"
          >
            <option value="" className="bg-slate-800">— Select item —</option>
            {filteredItems.map((item) => (
              <option key={item.code} value={item.code} className="bg-slate-800">
                {item.code} | {item.name} — ₹{item.companyPrice}
              </option>
            ))}
          </select>

          {/* Quantity number input */}
          <input
            type="number"
            value={quantity}
            min={1}
            max={9999}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-24 px-3 py-3 bg-white/5 border border-slate-600 rounded-xl text-white text-center focus:outline-none focus:border-indigo-500 transition-all"
          />

          {/* Add to order */}
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* ---- Order Items Table ---- */}
      {orderItems.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h3 className="text-white font-semibold">Order Summary — {orderItems.length} item{orderItems.length > 1 ? "s" : ""}</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 text-xs uppercase">
                  <th className="text-left px-5 py-3">Item</th>
                  <th className="text-left px-5 py-3">Code</th>
                  <th className="text-right px-5 py-3">Price</th>
                  <th className="text-right px-5 py-3">Qty</th>
                  <th className="text-right px-5 py-3">Total</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item.code} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3 text-white text-sm">{item.name}</td>
                    <td className="px-5 py-3 text-indigo-300 text-sm">{item.code}</td>
                    <td className="px-5 py-3 text-right text-slate-300 text-sm">₹{item.price.toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3 text-right text-white text-sm">{item.quantity}</td>
                    <td className="px-5 py-3 text-right text-emerald-300 font-medium text-sm">₹{item.total.toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3">
                      <button onClick={() => handleRemoveItem(item.code)} className="text-slate-500 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-white/5">
                  <td colSpan={4} className="px-5 py-4 text-right text-white font-semibold">Grand Total:</td>
                  <td className="px-5 py-4 text-right text-emerald-300 font-bold text-lg">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Notes field */}
          <div className="px-5 py-4 border-t border-white/10">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional remarks / notes for this order..."
              rows={2}
              className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all resize-none text-sm"
            />
          </div>

          {/* Submit button */}
          <div className="px-5 pb-5 flex justify-end">
            <button
              onClick={handleSubmitOrder}
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Submit Order
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
