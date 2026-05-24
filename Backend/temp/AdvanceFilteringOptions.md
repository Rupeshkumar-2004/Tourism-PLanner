# Advanced Filtering — Notes

---

# Problem We’re Solving

Frontend sends queries like:

```txt id="v6a2pp"
?budget[gte]=1000
```

But MongoDB expects:

```js id="q9m3la"
{
   budget: {
      $gte: 1000
   }
}
```

Backend must dynamically transform query params into MongoDB filters.

---

# Goal

Convert:

```txt id="9wns3d"
?budget[gte]=1000&rating[gt]=4
```

into:

```js id="m0w2oe"
{
   budget: {
      $gte: 1000
   },

   rating: {
      $gt: 4
   }
}
```

---

# Express Query Parsing

Request:

```txt id="8f9q1u"
?budget[gte]=1000
```

becomes:

```js id="h7x4mc"
req.query = {
   budget: {
      gte: "1000"
   }
}
```

Express automatically parses nested query params.

---

# MongoDB Operators

| API Query | MongoDB Operator |
| --------- | ---------------- |
| gte       | $gte             |
| gt        | $gt              |
| lte       | $lte             |
| lt        | $lt              |

---

# Basic Dynamic Filtering

Simple filters already work directly:

```txt id="1y0kbi"
?country=India&difficulty=easy
```

becomes:

```js id="n6s5qv"
{
   country: "India",
   difficulty: "easy"
}
```

Used directly:

```js id="md0f7j"
Destination.find(req.query)
```

---

# Copy Query Object

```js id="uv4n9t"
let queryObj = { ...req.query };
```

Why?

To avoid mutating original `req.query`.

---

# Reserved Fields

These are NOT database filters:

```txt id="w4l3cb"
?page=2
&limit=10
&sort=rating
&fields=name,country
```

They control API behavior.

---

# Removing Reserved Fields

```js id="pb7e6y"
const excludedFields = [
   "page",
   "sort",
   "limit",
   "fields"
];

excludedFields.forEach((field) => {
   delete queryObj[field];
});
```

---

# Main Transformation Trick

## Step 1 — Convert Object To String

```js id="yr0g6d"
let queryStr = JSON.stringify(queryObj);
```

Example:

```js id="u4m7qx"
{
   budget: {
      gte: "1000"
   }
}
```

becomes:

```txt id="sz5v0r"
'{"budget":{"gte":"1000"}}'
```

---

# Step 2 — Regex Replacement

```js id="w2e1an"
queryStr = queryStr.replace(
   /\b(gte|gt|lte|lt)\b/g,
   (match) => `$${match}`
);
```

Result:

```txt id="7p9mfh"
'{"budget":{"$gte":"1000"}}'
```

---

# Regex Breakdown

Regex:

```js id="dt9x4c"
/\b(gte|gt|lte|lt)\b/g
```

| Part | Meaning            |
| ---- | ------------------ |
| `()` | grouping           |
| `\|` | OR                 |
| `\b` | word boundary      |
| `g`  | global replacement |

---

# Why Word Boundary Is Important

Without `\b`:

```txt id="p4k2qw"
target
```

could become:

```txt id="n8z7vy"
tar$get
```

because `gt` exists inside `"target"`.

Word boundaries prevent accidental replacements.

---

# Step 3 — Convert Back To Object

```js id="r1m4ko"
queryObj = JSON.parse(queryStr);
```

Final result:

```js id="v9t5eb"
{
   budget: {
      $gte: "1000"
   }
}
```

---

# Final Database Query

```js id="c3w0ql"
const destinations = await Destination.find(queryObj);
```

---

# Full Professional Pattern

```js id="y8s6nd"
let queryObj = { ...req.query };

const excludedFields = [
   "page",
   "sort",
   "limit",
   "fields"
];

excludedFields.forEach((field) => {
   delete queryObj[field];
});

let queryStr = JSON.stringify(queryObj);

queryStr = queryStr.replace(
   /\b(gte|gt|lte|lt)\b/g,
   (match) => `$${match}`
);

queryObj = JSON.parse(queryStr);

const destinations = await Destination.find(queryObj);
```

---

# Important Backend Concepts Learned

## 1. Dynamic Query Building

Backend generates queries dynamically from request params.

---

## 2. Query Parsing Layer

Architecture:

```txt id="cf8x0j"
Frontend Query Params
        ↓
Express Parser
        ↓
Backend Transformation Layer
        ↓
MongoDB Query
        ↓
Database
```

---

## 3. Reusable API Design

Instead of writing:

```js id="ak7m1s"
if(req.query.budget)
```

for every field,

we create scalable dynamic systems.

---

# Real Backend Engineering Insight

This pattern is widely used in production APIs because:

* scalable
* reusable
* generic
* maintainable

---

# Next Topic

Next we’ll build:

# APIFeatures Class

Which turns this logic into reusable backend architecture like:

```js id="v0n2xp"
const features = new APIFeatures(
   Destination.find(),
   req.query
)
   .filter()
   .sort()
   .limitFields()
   .paginate();
```

This is where backend code starts looking professional.
