# Reusable Filter Object Architecture — Notes

---

# 1. The Core Problem

When building APIs with filtering + pagination:

We often need BOTH:

```js
find()
```

and

```js
countDocuments()
```

Example:

```js
const destinations = await Destination.find(filters);

const total = await Destination.countDocuments(filters);
```

---

# 2. The Beginner Mistake

Writing filter logic multiple times.

Example:

```js
// for find()
if (req.query.country) {
   query.country = req.query.country;
}
```

then again:

```js
// for countDocuments()
if (req.query.country) {
   totalQuery.country = req.query.country;
}
```

This creates:

# duplicated query logic

---

# 3. Why Duplication Is Dangerous

If new filters are added later:

```text
rating
budget
season
difficulty
activities
```

you must update logic everywhere.

If one place is missed:

```text
find() result count ≠ countDocuments()
```

pagination breaks.

---

# 4. Engineering Solution

Build filters ONCE.

Reuse everywhere.

---

# 5. Reusable Filter Builder

Example:

```js
function buildDestinationFilters(query) {
    const filters = {};

    if (query.country) {
        filters.country = query.country;
    }

    if (query.category) {
        filters.category = query.category;
    }

    if (query.minBudget || query.maxBudget) {
        filters.budget = {};
    }

    if (query.minBudget) {
        filters.budget.$gte = Number(query.minBudget);
    }

    if (query.maxBudget) {
        filters.budget.$lte = Number(query.maxBudget);
    }

    return filters;
}
```

---

# 6. Reusing Filters

```js
const filters = buildDestinationFilters(req.query);

const destinations =
    await Destination.find(filters);

const total =
    await Destination.countDocuments(filters);
```

---

# 7. Architecture Improvement

This separates:

## Query Parsing Layer

Converts request query → Mongo filter object.

from:

## Database Execution Layer

Runs Mongo queries.

---

# 8. Benefits

## Consistency

Same filters everywhere.

---

## Easier Maintenance

Add filter once.

---

## Reusability

Use same filters for:

* find()
* countDocuments()
* aggregate()

---

## Scalability

Cleaner backend structure.

---

## Better Debugging

Single source of truth.

---

# 9. Real Backend Folder Structure

Example:

```text
query-builders/
   destinationFilters.js
```

Inside:

```js
export const buildDestinationFilters = (query) => {
   ...
}
```

---

# 10. Important Backend Principle

Frontend query format should NOT directly become Mongo query.

BAD:

```js
Destination.find(req.query)
```

GOOD:

```js
const filters = buildDestinationFilters(req.query);

Destination.find(filters)
```

Backend acts as:

# translator + security layer

---

# 11. Validation + Sanitization

Reusable filter builders also help with:

## Validation

Allow only approved fields.

---

## Sanitization

Convert:

```js
"1000"
```

into:

```js
1000
```

---

## Security

Prevent:

* NoSQL injection
* dangerous operators
* unwanted fields

---

# 12. Connection With Aggregation

Reusable filters can later be used in aggregation pipelines.

Example:

```js
const filters = buildDestinationFilters(req.query);

Destination.aggregate([
   {
      $match: filters
   }
]);
```

This creates reusable architecture across:

* queries
* counts
* aggregation

---

# 13. Tourism Planner Relevance

Your app will eventually support:

* budget filters
* categories
* activities
* trip duration
* ratings
* tags
* seasons
* popularity
* destination search

Without reusable filter architecture:

backend becomes difficult to maintain.

---

# 14. Key Takeaway

Reusable filter architecture means:

# Build filters once → reuse everywhere safely.

This is a foundational real-world backend engineering pattern.
