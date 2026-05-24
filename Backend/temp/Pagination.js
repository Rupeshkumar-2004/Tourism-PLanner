// Destination Search, Filtering, Pagination & Sorting Notes
// 1. Why Query-Based APIs Are Needed

// In real applications, frontend rarely needs all documents at once.

// Instead, users want:

// search functionality
// filtering
// sorting
// pagination

// Examples:

// GET /destinations?city=Goa
// GET /destinations?page=2&limit=10
// GET /destinations?sortBy=name&sortType=asc

// Using query parameters allows one endpoint to support many behaviors dynamically.

// 2. Types of Incoming Data in Express
// Route Params

// Example:

// /trip/123

// Accessed using:

// req.params
// Request Body

// Used in:

// login
// register
// create/update APIs

// Accessed using:

// req.body
// Query Parameters

// Example:

// /destinations?city=Goa&page=2

// Accessed using:

// req.query

// Express automatically converts query parameters into an object.

// Example:

// /destinations?city=Goa&country=India

// becomes:

// req.query = {
//    city: "Goa",
//    country: "India"
// }
// 3. Dynamic Filter Object

// MongoDB .find() accepts a filter object.

// Example:

// Destination.find({
//    city: "Goa"
// })

// To make filtering dynamic:

// const filter = {};

// Properties are added only if query exists.

// Example:

// if(city){
//    filter.city = city;
// }

// If city exists:

// filter = {
//    city: "Goa"
// }

// JavaScript objects are dynamic, so properties can be added at runtime.

// 4. Regex Search

// Exact matching is case-sensitive.

// Example:

// find({
//    city: "goa"
// })

// will NOT match:

// Goa

// To make search flexible, regex is used.

// Regex Syntax
// filter.city = {
//    $regex: city,
//    $options: "i"
// }
// Meaning
// $regex

// Used for pattern matching.

// Example:

// beach

// matches:

// Beach Paradise
// Baga Beach
// Sunny Beaches
// $options: "i"

// i means case-insensitive.

// Matches:

// Goa
// GOA
// goa
// 5. MongoDB AND Behavior

// When multiple fields exist in filter object:

// {
//    city: {...},
//    country: {...}
// }

// MongoDB automatically applies:

// AND

// Meaning:

// city condition must match
// AND country condition must match
// 6. Pagination

// Pagination prevents sending huge amounts of data at once.

// Without pagination:

// APIs become slow
// frontend becomes heavy
// memory usage increases
// Pagination Query Example
// ?page=2&limit=10

// Meaning:

// page 2
// 10 items per page
// MongoDB Pagination Methods
// .limit()
// .limit(10)

// Returns only 10 documents.

// .skip()
// .skip(10)

// Skips first 10 documents.

// Skip Formula
// skip = (page - 1) * limit
// Example
// Page 1
// page = 1
// limit = 10

// skip = 0
// Page 2
// page = 2
// limit = 10

// skip = 10
// Important Note

// Query values always come as strings.

// Example:

// req.query.page = "1"

// Convert using:

// Number(page)
// 7. Sorting

// Sorting allows frontend to control order of results.

// Examples:

// newest first
// alphabetical
// highest rating
// MongoDB .sort()
// Ascending
// .sort({ name: 1 })

// Meaning:

// A → Z
// low → high
// Descending
// .sort({ createdAt: -1 })

// Meaning:

// newest first
// Z → A
// high → low
// Dynamic Sorting

// Frontend sends:

// ?sortBy=name&sortType=asc
// Computed Property Names
// sortOptions[sortBy] = 1;

// If:

// sortBy = "name"

// then:

// {
//    name: 1
// }

// This allows dynamic field selection.

// Sort Type Logic
// sortType === "asc" ? 1 : -1

// Meaning:

// asc → ascending
// desc → descending
// 8. Query Chaining

// Mongoose queries can be chained step-by-step.

// Example:

// Destination.find(filter)
//    .sort(sortOptions)
//    .skip(skip)
//    .limit(limit)

// Each method modifies the query.

// 9. Benefits of One Flexible Endpoint

// Instead of creating many endpoints:

// /getGoaDestinations
// /getSortedDestinations
// /getPaginatedDestinations

// One endpoint becomes reusable:

// GET /destinations

// with optional query parameters.

// This is scalable backend API design.

// 10. Concepts Learned

// After implementing this system, the following backend concepts were learned:

// req.query
// dynamic object creation
// regex search
// case-insensitive matching
// partial search
// pagination
// skip/limit
// sorting
// computed property names
// query chaining
// scalable API design