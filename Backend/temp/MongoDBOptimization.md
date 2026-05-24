# MongoDB Aggregation Optimization

# Core Optimization Principle

Reduce:
- documents early
- fields early

These two ideas dominate aggregation performance.

---

# Why Optimization Matters

Aggregation stages consume:
- CPU
- RAM
- disk
- execution time

Poor pipeline design becomes very expensive on large datasets.

---

# Golden Rule #1

## Push `$match` Early

BAD:

```js
[
    {
        $lookup: {
            from: "tripdestinations",
            localField: "_id",
            foreignField: "trip",
            as: "destinations"
        }
    },

    {
        $match: {
            category: "Beach"
        }
    }
]
```

Problem:
- joins ALL documents first
- filters later
- huge unnecessary processing

---

GOOD:

```js
[
    {
        $match: {
            category: "Beach"
        }
    },

    {
        $lookup: {
            from: "tripdestinations",
            localField: "_id",
            foreignField: "trip",
            as: "destinations"
        }
    }
]
```

Benefit:
- filters first
- lookup runs on smaller dataset
- much faster

---

# Golden Rule #2

## Reduce Fields Early

Use `$project` to keep only needed fields.

BAD:

```js
[
    {
        $group: {
            _id: "$category",
            avgBudget: {
                $avg: "$totalBudget"
            }
        }
    }
]
```

Entire documents flow through pipeline.

---

GOOD:

```js
[
    {
        $project: {
            category: 1,
            totalBudget: 1
        }
    },

    {
        $group: {
            _id: "$category",
            avgBudget: {
                $avg: "$totalBudget"
            }
        }
    }
]
```

Benefit:
- smaller documents
- less memory usage
- faster processing

---

# Expensive Aggregation Stages

## `$lookup`

Expensive because:
- joins collections
- builds arrays
- may scan many documents

Optimization:
- filter early
- use indexes
- return only needed fields

---

## `$group`

Expensive because:
- accumulates data in memory
- computes aggregates

Large groups can consume lots of RAM.

---

## `$sort`

Expensive because:
- sorting large datasets costs memory
- may spill to disk

Indexes help heavily here.

---

## `$facet`

Expensive because:
- multiple pipelines run simultaneously
- input duplicated internally

Use carefully.

---

# Filter Before Grouping

BAD:

```js
[
    {
        $group: {
            _id: "$country",
            total: {
                $sum: 1
            }
        }
    },

    {
        $match: {
            total: {
                $gt: 100
            }
        }
    }
]
```

Groups everything first.

---

BETTER:

```js
[
    {
        $match: {
            country: "India"
        }
    },

    {
        $group: {
            _id: "$country",
            total: {
                $sum: 1
            }
        }
    }
]
```

---

# Filter Inside `$lookup`

Instead of:
- joining all documents
- filtering later

Use:
- pipeline-based lookup
- filter inside lookup itself

Example:

```js
{
    $lookup: {

        from: "tripdestinations",

        let: {
            tripId: "$_id"
        },

        pipeline: [

            {
                $match: {

                    $expr: {

                        $and: [

                            {
                                $eq: ["$trip", "$$tripId"]
                            },

                            {
                                $gt: ["$estimatedCost", 10000]
                            }
                        ]
                    }
                }
            }
        ],

        as: "expensiveDestinations"
    }
}
```

---

# Document Explosion

Caused mainly by:

```js
$unwind
```

Example:

1 trip with 500 destinations:

```text
1 document
→ 500 documents
```

Can massively increase pipeline size.

---

# Golden Rule #3

Be careful with `$unwind`.

Especially before:
- `$group`
- `$sort`
- `$facet`

---

# Computation Placement

BAD:

```text
Fetch raw data
→ process in Node.js
```

GOOD:

```text
Process inside MongoDB aggregation
```

Benefits:
- less network transfer
- less backend memory
- database optimized internally

---

# Aggregation Memory Thinking

Performance depends on:
- document count
- document size

Both matter.

---

# Efficient Pipeline Pattern

```text
small input
→ small transformations
→ efficient grouping
→ minimal output
```

---

# Bad Pipeline Pattern

```text
huge input
→ huge joins
→ huge arrays
→ huge sorts
→ late filtering
```

---

# Aggregation Optimization Checklist

## 1. Can filtering happen earlier?

Use early:

```js
$match
```

---

## 2. Can fields be reduced earlier?

Use:

```js
$project
```

---

## 3. Can lookup be avoided?

Joins are expensive.

---

## 4. Can lookup be filtered?

Use pipeline lookup.

---

## 5. Will unwind explode documents?

Think carefully.

---

## 6. Can grouping happen on smaller dataset?

Reduce documents first.

---

## 7. Is sorting huge dataset?

Potential bottleneck.

---

# Important Engineering Insight

Aggregation optimization is about:
- reducing work
- reducing memory
- reducing document size
- reducing unnecessary transformations

---

# Backend Engineering Transition

Moving from:

```text
CRUD Backend Thinking
```

toward:

```text
Performance-Oriented Backend Engineering
```