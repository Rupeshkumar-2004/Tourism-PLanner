# MongoDB Aggregation Pipeline — Notes

# Aggregation Mental Model

Aggregation is:

```text id="lv1rsl"
Document Transformation Pipeline
```

Documents flow through stages.

Each stage:

* receives documents
* transforms them
* passes output to next stage

Example flow:

```text id="r4u8z6"
match
→ lookup
→ unwind
→ addFields
→ group
→ sort
→ project
```

Aggregation is used for:

* analytics
* dashboards
* reporting
* statistics
* recommendation systems
* advanced backend APIs

---

# Core Aggregation Stages Learned

---

# `$match`

Filters documents.

Equivalent to:

```js id="61u6zw"
find()
```

Example:

```js id="d9o7y4"
{
    $match: {
        country: "India"
    }
}
```

Optimization:

* place early in pipeline
* reduces documents for later stages

---

# `$group`

Groups documents together.

Equivalent to SQL:

```text id="4azbsv"
GROUP BY
```

Example:

```js id="7kpl9n"
{
    $group: {

        _id: "$category",

        totalTrips: {
            $sum: 1
        }
    }
}
```

---

# Common Accumulator Operators

## Count

```js id="mjlwmn"
{
    $sum: 1
}
```

---

## Sum field

```js id="m40ynj"
{
    $sum: "$totalBudget"
}
```

---

## Average

```js id="yuw6eo"
{
    $avg: "$totalBudget"
}
```

---

## Maximum

```js id="xsmxqz"
{
    $max: "$totalBudget"
}
```

---

## Minimum

```js id="6t0r5s"
{
    $min: "$totalBudget"
}
```

---

## First Value

```js id="wtuy79"
{
    $first: "$username"
}
```

Used after grouping when multiple documents collapse into one.

---

# `$sort`

Sorts documents.

Example:

```js id="8w6lqo"
{
    $sort: {
        totalBudget: -1
    }
}
```

* `1` → ascending
* `-1` → descending

---

# `$project`

Reshapes documents.

Can:

* include fields
* exclude fields
* rename fields
* create nested structures

Example:

```js id="v8dwcv"
{
    $project: {

        title: 1,

        budget: "$totalBudget",

        _id: 0
    }
}
```

---

# Nested Projection

Example:

```js id="n56clz"
{
    $project: {

        destination: {
            name: 1,
            country: 1
        }
    }
}
```

Used for clean API responses.

---

# `$lookup`

Performs joins between collections.

Basic lookup:

```js id="37q7d9"
{
    $lookup: {

        from: "users",

        localField: "createdBy",

        foreignField: "_id",

        as: "userDetails"
    }
}
```

Returns ARRAY.

---

# `$unwind`

Flattens arrays.

Example:

```js id="54izjk"
{
    $unwind: "$userDetails"
}
```

Converts:

```js id="hm9e7d"
userDetails: [ {...} ]
```

into:

```js id="v8z4bw"
userDetails: { ... }
```

---

# `$addFields`

Adds computed fields while preserving existing document.

Example:

```js id="6mpp9g"
{
    $addFields: {

        totalDestinations: {
            $size: "$tripDestinations"
        }
    }
}
```

Important difference:

---

## `$project`

Reshapes/removes fields.

---

## `$addFields`

Adds new fields without removing old ones.

---

# `$count`

Counts documents.

Example:

```js id="kxjlwm"
{
    $count: "totalTrips"
}
```

Output:

```js id="uh5t4r"
{
    totalTrips: 20
}
```

---

# `$facet`

Runs multiple pipelines in parallel.

Major production feature.

Example:

```js id="d7s9y1"
{
    $facet: {

        trips: [
            ...
        ],

        analytics: [
            ...
        ],

        totalCount: [
            ...
        ]
    }
}
```

Used for:

* dashboards
* pagination + count
* analytics APIs
* multi-section responses

---

# Important `$facet` Insight

Each facet:

* receives SAME input
* runs independently
* returns ARRAY

---

# Pagination + Count Pattern

Very common production pattern.

```js id="4bns8o"
{
    $facet: {

        data: [

            {
                $skip: 0
            },

            {
                $limit: 10
            }
        ],

        totalCount: [

            {
                $count: "count"
            }
        ]
    }
}
```

---

# Advanced `$lookup`

Pipeline-based joins.

Allows:

* filtered joins
* conditional joins
* projections
* nested aggregation
* correlated queries

---

# Advanced `$lookup` Structure

```js id="v10xtf"
{
    $lookup: {

        from: "tripdestinations",

        let: {
            tripId: "$_id"
        },

        pipeline: [
            ...
        ],

        as: "destinations"
    }
}
```

---

# `let`

Passes outer document variables into lookup pipeline.

Example:

```js id="24gvv2"
let: {
    tripId: "$_id"
}
```

Inside pipeline:

```js id="8tr4m6"
$$tripId
```

---

# `$expr`

Required when comparing:

* fields
* variables
* expressions

Example:

```js id="3ivcq7"
{
    $expr: {

        $eq: ["$trip", "$$tripId"]
    }
}
```

Meaning:

```text id="ck5vmd"
tripDestinations.trip
==
currentTrip._id
```

---

# Filtered Lookup Example

```js id="8uyd98"
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

# Projection Inside Lookup

```js id="w9o8fe"
{
    $project: {
        estimatedCost: 1,
        days: 1,
        _id: 0
    }
}
```

Used to reduce unnecessary data.

---

# Real Analytics Pipeline Learned

You built analytics like:

```text id="0uzmff"
Per-user trip analytics
```

Including:

* total trips
* total budget
* average budget
* total destinations visited

Using:

* `$lookup`
* `$unwind`
* `$addFields`
* `$group`
* `$sum`
* `$avg`
* `$size`
* `$sort`

---

# Important Aggregation Engineering Concepts

---

# Stage Order Matters

Efficient order:

```text id="8l44xk"
match
→ lookup
→ compute
→ group
→ sort
```

---

# Push Filtering Early

Early `$match`:

* reduces documents
* reduces memory usage
* speeds pipeline

Very important optimization pattern.

---

# Database-side Processing

Advanced backend thinking:

BAD:

```text id="lyqux7"
Fetch everything
→ process in Node.js
```

GOOD:

```text id="0mxz2m"
Process inside MongoDB efficiently
```

---

# Production Backend Thinking

Aggregation powers:

* admin dashboards
* analytics systems
* statistics APIs
* reporting
* recommendation systems
* search systems

---

# Current Backend Transition

You are moving from:

```text id="f8u0d8"
CRUD Backend Developer
```

toward:

```text id="3c1dgs"
Data/Systems-Oriented Backend Engineer
```

Because now you are learning:

* transformation pipelines
* analytics architecture
* optimized querying
* database-side computation
* scalable backend thinking

---

# Next Topic

Next continuation:

```text id="y4tzw2"
Aggregation Optimization + Performance Engineering
```

Topics ahead:

* pipeline optimization
* stage cost
* memory-heavy stages
* reducing document size
* indexing intuition
* query optimization
* explain plans
* production aggregation architecture
