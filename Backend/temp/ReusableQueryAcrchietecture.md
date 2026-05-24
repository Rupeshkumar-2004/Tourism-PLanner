# Reusable Query Architecture — Notes

---

# Why Reusable Query Architecture Exists

In real projects, many APIs need:

* filtering
* sorting
* pagination
* searching
* field selection

Without reusable architecture, every controller repeats the same logic.

Example:

```js id="m7x2p5"
if(req.query.country){
   query.country = req.query.country;
}

if(req.query.sort){
   ...
}
```

This becomes difficult to maintain in large backends.

---

# Goal of Query Architecture

Move reusable query logic into a utility.

Instead of:

```txt id="p4n8q1"
controller → raw query logic
```

We move to:

```txt id="z6v3m7"
controller
   ↓
query utility
   ↓
mongo query
```

---

# What APIFeatures Does

APIFeatures handles:

* filtering
* sorting
* pagination
* searching
* field limiting

in one reusable system.

---

# Simple Query Flow

Client sends:

```txt id="h2q7m4"
/api/destinations?country=India&page=2
```

Express gives:

```js id="v5x1p8"
req.query = {
   country: "India",
   page: "2"
}
```

Backend transforms it into:

```js id="r9m3q6"
Destination.find({
   country: "India"
})
```

while using page separately for pagination.

---

# Important Separation

## Database Filter Fields

Real database fields:

```txt id="c4v8p2"
country
city
budget
rating
```

---

## API Control Fields

Used for API behavior:

```txt id="n7x5q1"
page
sort
limit
fields
```

These should NOT go into MongoDB filter object.

---

# Manual Filtering Logic

```js id="u3m9x4"
const queryObj = { ...req.query };

delete queryObj.page;
delete queryObj.sort;
delete queryObj.limit;

const destinations = await Destination.find(queryObj);
```

---

# Sorting

Request:

```txt id="w8p2q5"
?sort=budget
```

Ascending:

```js id="z1v6m9"
.sort("budget")
```

Descending:

```js id="q4x7p2"
.sort("-budget")
```

---

# Pagination

Request:

```txt id="d9m3v6"
?page=2&limit=5
```

---

# Pagination Formula

\text{skip} = (\text{page}-1) \times \text{limit}

---

# Example

Page 2 with limit 5:

(2-1) \times 5 = 5

Meaning:

```txt id="k5q8m1"
skip first 5 documents
return next 5
```

---

# Mongoose Pagination

```js id="x2p7v4"
query.skip(skip).limit(limit)
```

---

# Important Mongoose Understanding

This:

```js id="t6m1q9"
Destination.find()
```

does NOT immediately fetch data.

It creates a:

# Query Object

which can still be modified.

Example:

```js id="f8x3p5"
Destination.find()
.sort()
.limit()
.skip()
```

Execution happens only at:

```js id="r1v7m2"
await query
```

---

# Building APIFeatures Class

File:

```txt id="p9m4x7"
src/utils/apiFeatures.js
```

---

# Basic Structure

```js id="q5v2m8"
class APIFeatures {

    constructor(query, queryString){

        this.query = query;

        this.queryString = queryString;
    }

}
```

---

# Meaning

## this.query

Stores:

```js id="w3x8p1"
Destination.find()
```

(Mongoose query object)

---

## this.queryString

Stores:

```js id="v7m2q4"
req.query
```

---

# Filter Method

```js id="m1q8v5"
filter(){

    const queryObj = {
        ...this.queryString
    };

    const excludedFields = [
        "page",
        "sort",
        "limit",
        "fields"
    ];

    excludedFields.forEach((field)=>{
        delete queryObj[field];
    });

    this.query = this.query.find(queryObj);

    return this;
}
```

---

# Why `return this`

Enables:

# Method Chaining

Example:

```js id="x4p9m2"
features
.filter()
.sort()
.paginate()
```

Each method returns the same object.

---

# Sorting Method

```js id="n6v1q7"
sort(){

    if(this.queryString.sort){

        this.query = this.query.sort(
            this.queryString.sort
        );
    }

    return this;
}
```

---

# Controller Usage

```js id="p2m7x5"
const features = new APIFeatures(
    Destination.find(),
    req.query
)
.filter()
.sort();

const destinations = await features.query;
```

---

# Query Flow Visualization

```txt id="z8v4m1"
req.query
   ↓
APIFeatures
   ↓
filter()
   ↓
sort()
   ↓
mongoose query object
   ↓
await query
   ↓
MongoDB
```

---

# Aggregation vs APIFeatures

---

# APIFeatures

Used for:

* fetching documents
* filtering
* sorting
* pagination
* searching

Mostly uses:

```js id="r5x2m9"
find()
sort()
skip()
limit()
```

---

# Aggregation Pipeline

Used for:

* analytics
* dashboards
* reports
* recommendations
* statistics
* complex joins

Mostly uses:

```js id="w1m8q4"
aggregate()
```

---

# Example Aggregation Use Cases

## Average Budget

```js id="f7v3p2"
$group
$avg
```

---

## Most Popular Cities

```js id="u9q5m1"
$group
$count
```

---

## Recommendation Engine

```js id="d4x8p6"
$lookup
$match
$group
```

---

# Industry Reality

Most APIs use:

# Normal Queries

Aggregation is used mainly for:

* analytics
* intelligent systems
* reporting

---

# Optimization

Optimization applies to BOTH:

---

## Query Optimization

```js id="q7m1v5"
find({ country: "India" })
```

uses indexes.

---

## Aggregation Optimization

Pipeline optimization:

* early `$match`
* reducing documents
* avoiding expensive stages
* proper indexes

---

# Query Validation

Backend should NEVER trust client input.

Users can send:

* invalid fields
* malicious queries
* huge limits
* forbidden sorts

---

# Validation Layers

---

# 1. Query Validation

Validates:

* allowed filters
* allowed sort fields
* pagination limits

Usually near APIFeatures.

---

# 2. Request Body Validation

Validates:

```js id="c2p9m6"
req.body
```

Using:

* Joi
* Zod
* express-validator

---

# 3. Database Validation

Inside Mongoose schema:

```js id="m8x4q1"
required
enum
min
max
validate
```

---

# Allowed Sort Fields Example

```js id="v3q7m2"
const allowedSortFields = [
   "price",
   "rating",
   "createdAt"
];
```

---

# Allowed Filter Fields Example

```js id="n5m1x8"
const allowedFilters = [
   "country",
   "city",
   "budget"
];
```

---

# Pagination Protection

Prevent:

```txt id="p8v2m4"
?limit=1000000
```

Use:

```js id="x6q9m1"
const limit = Math.min(
   Number(req.query.limit) || 10,
   50
);
```

---

# Professional Backend Principle

# Never trust user input

Everything should be validated and controlled.

---

# Final Big Picture

```txt id="h4m7q2"
Request
   ↓
Validation Layer
   ↓
APIFeatures
   ↓
Mongo Query
   ↓
Database
```
