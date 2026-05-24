# MongoDB Indexes Notes

# What Problem Do Indexes Solve?

Without indexes, MongoDB performs:

```text
Collection Scan
```

Meaning:
- scans every document one-by-one
- very slow on large datasets

Example:

```js
Trip.find({
    category: "Beach"
})
```

If collection contains millions of documents:
- MongoDB checks every document

---

# Real World Analogy

Without index:

```text
Searching a word in textbook
without index page
```

You scan entire book manually.

---

# What Is an Index?

Index is a special optimized data structure that helps MongoDB:
- search faster
- filter faster
- sort faster

Indexes avoid:
- full collection scans

---

# Creating Index

Example:

```js
db.trips.createIndex({
    category: 1
})
```

---

# Meaning of `1`

```js
1
```

Ascending index.

---

# Descending Index

```js
db.trips.createIndex({
    totalBudget: -1
})
```

Used mainly for sorting.

---

# Internal Structure

MongoDB uses:

```text
B-Tree
```

data structure internally.

Optimized for:
- searching
- sorting
- range queries

---

# Query Without Index

```text
Scan all documents
```

---

# Query With Index

```text
Jump directly to matching entries
```

Huge performance improvement.

---

# Queries That Benefit From Indexes

Indexes help heavily with:
- `find()`
- `$match`
- sorting
- range queries
- joins
- filtering

---

# Sorting Optimization

Without index:

```js
Trip.find().sort({
    totalBudget: -1
})
```

MongoDB:
- loads documents
- sorts in memory

Expensive.

---

With index:

```js
db.trips.createIndex({
    totalBudget: -1
})
```

MongoDB can use already-sorted index structure.

Much faster.

---

# Compound Indexes

Used for queries involving multiple fields.

Example query:

```js
Trip.find({
    country: "India",
    category: "Beach"
})
```

Create compound index:

```js
db.trips.createIndex({
    country: 1,
    category: 1
})
```

---

# Important Compound Index Rule

Order matters.

Index:

```js
{
    country: 1,
    category: 1
}
```

Efficient for:

```js
country
country + category
```

Not efficient for:

```js
category only
```

---

# Index Tradeoffs

Indexes improve:
- reads
- searching
- sorting

BUT increase cost of:
- inserts
- updates
- deletes

Because indexes also need updating.

---

# Golden Rule

```text
Index fields queried frequently
```

Do NOT index everything blindly.

Too many indexes:
- waste memory
- slow writes

---

# Important Fields To Index (Tourism App)

Likely useful indexes:

```js
createdBy
country
category
trip
destination
createdAt
```

Because these are commonly used in:
- filtering
- lookup
- sorting
- joins

---

# Indexes + `$lookup`

Very important optimization.

Example:

```js
{
    foreignField: "trip"
}
```

Without index:
- MongoDB scans entire collection repeatedly

BAD for performance.

Create index:

```js
db.tripdestinations.createIndex({
    trip: 1
})
```

Huge improvement.

---

# Indexes + Aggregation

Indexes help most in EARLY stages:

Especially:
- `$match`
- `$sort`

After heavy transformations:
- indexes become less useful

---

# Collection Scan

MongoDB scanning every document manually.

Very expensive on large collections.

Indexes help avoid collection scans.

---

# Backend Engineering Insight

Indexes are critical for:
- scalable APIs
- fast search
- efficient filtering
- optimized sorting
- high-performance joins

---

# Current Backend Transition

Moving from:

```text
CRUD + Query Writing
```

toward:

```text
Performance-Oriented Backend Engineering
```

Because now you are learning:
- query execution
- search optimization
- indexing strategy
- database performance thinking