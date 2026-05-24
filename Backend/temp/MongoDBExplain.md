# MongoDB Explain Plans Notes

# Purpose of `.explain()`

Used to understand:

- how MongoDB executes queries
- whether indexes are used
- how many documents are scanned
- query efficiency
- performance bottlenecks

Very important for:
- debugging slow queries
- query optimization
- backend performance engineering

---

# Basic Syntax

## Find Query

```js
Trip.find({
    category: "Beach"
}).explain("executionStats")
```

---

## Aggregation Query

```js
Trip.aggregate([
    {
        $match: {
            category: "Beach"
        }
    }
]).explain("executionStats")
```

---

# Most Useful Explain Mode

```js
"executionStats"
```

Why?

Because it shows:
- actual execution details
- actual scanned documents
- actual execution time
- actual index usage

---

# Important Explain Fields

---

# `winningPlan`

Shows how MongoDB decided to execute query.

Example:

```js
winningPlan: {
    stage: "COLLSCAN"
}
```

or

```js
winningPlan: {
    stage: "IXSCAN"
}
```

---

# `COLLSCAN`

Meaning:

```text
Collection Scan
```

MongoDB scans:
- every document in collection

Very expensive on large datasets.

Usually BAD.

---

# `IXSCAN`

Meaning:

```text
Index Scan
```

MongoDB uses index for searching.

Much faster and scalable.

Usually GOOD.

---

# Example Without Index

```js
Trip.find({
    category: "Beach"
}).explain("executionStats")
```

Output:

```js
stage: "COLLSCAN"
```

MongoDB scans entire collection.

---

# Example With Index

Create index:

```js
db.trips.createIndex({
    category: 1
})
```

Now explain output:

```js
stage: "IXSCAN"
```

MongoDB uses index.

Huge performance improvement.

---

# `totalDocsExamined`

Shows:

```text
How many documents MongoDB checked
```

Very important metric.

---

# BAD Example

```js
totalDocsExamined: 1000000
```

Meaning:
- MongoDB scanned 1 million documents

even if only few returned.

Inefficient query.

---

# GOOD Example

```js
totalDocsExamined: 10
```

Very efficient query.

---

# `nReturned`

Shows:

```text
How many documents query returned
```

Example:

```js
nReturned: 10
```

---

# Important Optimization Insight

Compare:

```text
totalDocsExamined
vs
nReturned
```

---

# BAD Ratio

```text
1,000,000 examined
10 returned
```

Very inefficient.

---

# GOOD Ratio

```text
10 examined
10 returned
```

Efficient query execution.

---

# `executionTimeMillis`

Shows query execution time.

Example:

```js
executionTimeMillis: 2
```

Meaning:
- query executed in 2 milliseconds

---

# Covered Queries

Advanced optimization concept.

A query is "covered" when:
- MongoDB answers query entirely from index
- actual documents are not accessed

Very fast.

---

# Example Covered Query

Index:

```js
db.trips.createIndex({
    category: 1,
    totalBudget: 1
})
```

Query:

```js
Trip.find(
    {
        category: "Beach"
    },
    {
        totalBudget: 1,
        _id: 0
    }
)
```

MongoDB can answer using only index.

---

# Explain Plans + Aggregation

Aggregation explain helps inspect:
- stage execution
- scanned documents
- sorting behavior
- index usage
- pipeline performance

---

# Example Aggregation Explain

```js
Trip.aggregate([

    {
        $match: {
            category: "Beach"
        }
    },

    {
        $sort: {
            totalBudget: -1
        }
    }

]).explain("executionStats")
```

Useful for debugging:
- slow pipelines
- inefficient sorting
- expensive lookups

---

# Common Causes of Slow Queries

- missing indexes
- wrong compound index order
- sorting without indexes
- late filtering
- large lookups
- huge unwinds
- collection scans

---

# Real Production Workflow

Professional backend workflow:

1. Detect slow API
2. Inspect query
3. Run `.explain()`
4. Analyze execution plan
5. Add/modify indexes
6. Re-test performance

---

# Backend Engineering Shift

Moving from:

```text
Does query work?
```

toward:

```text
How efficiently does query work?
```

---

# Important Engineering Concepts Learned

- `.explain()`
- `executionStats`
- `winningPlan`
- `COLLSCAN`
- `IXSCAN`
- `totalDocsExamined`
- `nReturned`
- `executionTimeMillis`
- covered queries
- aggregation explain intuition

---

# Current Backend Level

You are now learning:
- query execution behavior
- database performance analysis
- indexing efficiency
- query optimization
- scalable backend engineering