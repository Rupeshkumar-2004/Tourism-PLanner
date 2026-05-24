# MongoDB Aggregation Pipeline Notes

# What Is Aggregation?

Aggregation is used to:

* process data
* transform documents
* calculate analytics
* combine collections
* generate reports

Think of it like:

```text id="bzt8mn"
Raw Data
   ↓
Filter
   ↓
Transform
   ↓
Group
   ↓
Sort
   ↓
Final Output
```

MongoDB processes data:

# stage by stage

---

# Aggregation Syntax

```js id="9w6s7t"
Model.aggregate([
   { stage1 },
   { stage2 },
   { stage3 }
])
```

Pipeline stages execute:

# top → bottom

Each stage receives:

# output from previous stage

---

# IMPORTANT MENTAL MODEL

Always ask:

# “What does the document look like AFTER this stage?”

This is the MOST important aggregation skill.

---

# `$match`

Used for:

# filtering documents

Equivalent to:

```js id="lw2wr7"
find()
```

---

## Syntax

```js id="yhj29u"
{
   $match: {
      country: "India"
   }
}
```

---

## Supports

* `$gte`
* `$lte`
* `$in`
* `$or`
* regex
* all normal MongoDB query operators

---

# IMPORTANT

`$match` expects:

# filter object

Correct:

```js id="o6nmdm"
{
   $match: {
      category: "Adventure"
   }
}
```

Wrong:

```js id="bfhq7j"
{
   $match: "Adventure"
}
```

---

# `$group`

Used for:

# grouping documents

Equivalent to SQL:

```sql id="2wjqah"
GROUP BY
```

---

# Syntax

```js id="johj9m"
{
   $group: {
      _id: "$fieldName"
   }
}
```

---

# IMPORTANT

Inside `$group`:

```js id="gnwqlp"
_id
```

means:

# grouping key

---

# Example

```js id="k9cfly"
{
   $group: {
      _id: "$category",

      totalDestinations: {
         $sum: 1
      }
   }
}
```

---

# Meaning

```text id="zmkij5"
Group documents by category
Then count documents in each group
```

---

# IMPORTANT

```js id="zce6jp"
"$category"
```

means:

# take value from document field

Without `$`:

```js id="f6xdjlwm"
_id: "category"
```

MongoDB treats it as:

# literal string

---

# Common Accumulator Operators

| Operator | Meaning         |
| -------- | --------------- |
| `$sum`   | total           |
| `$avg`   | average         |
| `$max`   | maximum         |
| `$min`   | minimum         |
| `$push`  | push into array |
| `$first` | first value     |
| `$last`  | last value      |

---

# `_id: null`

```js id="8wsn7l"
{
   $group: {
      _id: null
   }
}
```

means:

# put ALL documents into one group

Used for:

* overall analytics
* totals
* summaries

---

# `$sort`

Used for:

# sorting documents

---

## Syntax

```js id="owgxg0"
{
   $sort: {
      estimatedBudget: -1
   }
}
```

---

# Values

| Value | Meaning    |
| ----- | ---------- |
| `1`   | ascending  |
| `-1`  | descending |

---

# `$project`

Used for:

* reshaping documents
* selecting fields
* removing fields
* renaming fields
* computed fields

Think of it as:

# designing output shape

---

# Include Fields

```js id="i8vddp"
{
   $project: {
      name: 1,
      country: 1
   }
}
```

---

# Remove `_id`

```js id="vk4zhj"
{
   $project: {
      _id: 0,
      name: 1
   }
}
```

---

# Rename Fields

```js id="1zkpyu"
{
   $project: {

      budget: "$estimatedBudget"
   }
}
```

---

# IMPORTANT

Inside aggregation:

```js id="aab9vt"
"$estimatedBudget"
```

means:

# take value from field

---

# Computed Fields

```js id="xx4j3m"
{
   $project: {

      budgetInThousands: {
         $divide: [
            "$estimatedBudget",
            1000
         ]
      }
   }
}
```

---

# Common Expression Operators

| Operator    | Meaning         |
| ----------- | --------------- |
| `$add`      | addition        |
| `$subtract` | subtraction     |
| `$multiply` | multiplication  |
| `$divide`   | division        |
| `$concat`   | combine strings |
| `$toUpper`  | uppercase       |
| `$toLower`  | lowercase       |

---

# IMPORTANT

After `$project`,
fields not included may disappear.

Example:

```js id="h19yc0"
{
   $project: {
      name: 1
   }
}
```

Now:

* country
* category
* estimatedBudget

are removed from pipeline.

---

# Common Beginner Mistake

Using removed fields later:

```js id="j4s7g5"
$project
↓
$group by removedField
```

This causes aggregation errors.

---

# `$lookup`

MongoDB JOIN operation.

Used to:

# combine collections

Equivalent to SQL JOIN.

---

# Syntax

```js id="i9qj4q"
{
   $lookup: {

      from: "collectionName",

      localField: "fieldInCurrentCollection",

      foreignField: "fieldInOtherCollection",

      as: "outputField"
   }
}
```

---

# IMPORTANT

```js id="zjlwmn"
from
```

uses:

# MongoDB collection name

NOT model name.

---

# Example

```js id="tck7oq"
{
   $lookup: {

      from: "destinations",

      localField: "destination",

      foreignField: "_id",

      as: "destinationDetails"
   }
}
```

---

# What Happens?

MongoDB:

1. takes `destination`
2. searches `destinations` collection
3. matches `_id`
4. attaches matching document

---

# IMPORTANT

`$lookup` ALWAYS returns:

# array

Even if one match exists.

---

# `$unwind`

Used to:

# convert array into object

---

# Syntax

```js id="ybp4rx"
{
   $unwind: "$destinationDetails"
}
```

---

# Before `$unwind`

```js id="2o7jlwm"
destinationDetails: [
   { ... }
]
```

---

# After `$unwind`

```js id="jzhvbn"
destinationDetails: {
   ...
}
```

---

# IMPORTANT

`$unwind` path must start with:

```js id="tkspyz"
$
```

Correct:

```js id="iv0j8w"
"$destinationDetails"
```

Wrong:

```js id="sx3ttn"
"destinationDetails"
```

---

# Nested Projection

Used for nested fields.

---

## Example

```js id="4b2i83"
{
   $project: {

      "destinationDetails.name": 1,

      "destinationDetails.city": 1
   }
}
```

---

# Reshaping Nested Fields

```js id="3sj4jp"
{
   $project: {

      destinationName:
         "$destinationDetails.name",

      city:
         "$destinationDetails.city"
   }
}
```

---

# Common Real-World Pipeline Pattern

```text id="tzj72z"
$match
↓
$lookup
↓
$unwind
↓
$project
↓
$sort
```

---

# IMPORTANT AGGREGATION STRATEGY

Usually:

```text id="sjlwmq"
Filter early
Group later
```

Meaning:

```js id="jlwmtr"
$match → $group
```

is usually better than:

```js id="go0jlwm"
$group → $match
```

because grouping huge datasets is expensive.

---

# MOST IMPORTANT THING

Aggregation difficulty is NOT syntax.

Aggregation difficulty is:

# tracking document transformation stage by stage.
