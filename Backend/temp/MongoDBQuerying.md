# Advanced MongoDB Querying Notes

# 1. MongoDB Query Operators

MongoDB provides special operators for advanced querying.

Operators start with: `$`
Examples:

* `$in`
* `$or`
* `$gte`
* `$lte`

MongoDB queries are JavaScript objects, and operators are special object keys.

---

# 2. `$in` Operator

Used when matching: Multiple values of the SAME field

---

# Example

```js id="jlwm4n"
{
   city: {
      $in: ["Goa", "Mysore", "Paris"]
   }
}
```

Meaning:

```text id="jlwm5o"
city = Goa OR Mysore OR Paris
```

---

# 3. Frontend Multiple Values

Frontend usually sends:

```http id="jlwm6p"
?city=Goa,Mysore,Paris
```

This arrives as ONE string:

```js id="jlwm7q"
"Goa,Mysore,Paris"
```

---

# 4. `.split()`

JavaScript string method used to convert string into array.

Example:

```js id="jlwm8r"
"Goa,Mysore".split(",")
```

becomes:

```js id="jlwm9s"
["Goa", "Mysore"]
```

---

# 5. `.trim()`

Used to remove:

* leading spaces
* trailing spaces

Example:

```js id="jlwm0t"
" Mysore ".trim()
```

becomes:

```text id="jlwm1u"
"Mysore"
```

---

# 6. `.map()`

JavaScript array method used to transform every element.

Example:

```js id="jlwm2v"
[" Goa ", " Mysore "]
   .map(city => city.trim())
```

becomes:

```js id="jlwm3w"
["Goa", "Mysore"]
```

---

# 7. Problem With `$in`

Normal `$in` matching is:

* exact
* case-sensitive

Example:

```js id="jlwm4x"
$in: ["goa"]
```

does NOT match:

```text id="jlwm5y"
Goa
```

---

# 8. `new RegExp()`

Creates regex dynamically.

Example:

```js id="jlwm6z"
new RegExp("goa", "i")
```

becomes:

```text id="jlwm7a"
/goa/i
```

---

# 9. Regex Inside `$in`

Professional solution:

```js id="jlwm8b"
filter.city = {
   $in: cityArray.map(city =>
      new RegExp(city, "i")
   )
};
```

This provides:

* OR matching
* case-insensitive matching

---

# 10. `$in` vs Normal Multiple Fields

## Normal Fields

```js id="jlwm9c"
{
   city: "Goa",
   country: "India"
}
```

means:

```text id="jlwm0d"
AND
```

---

## `$in`

```js id="jlwm1e"
{
   city: {
      $in: ["Goa", "Mysore"]
   }
}
```

means:

```text id="jlwm2f"
OR
```

inside SAME field.

---

# 11. `$or` Operator

Used for:

```text id="jlwm3g"
Multiple DIFFERENT conditions
```

---

# Example

```js id="jlwm4h"
{
   $or: [
      { city: "Goa" },
      { country: "France" }
   ]
}
```

Meaning:

```text id="jlwm5i"
city = Goa OR country = France
```

---

# 12. Global Search Using `$or`

Frontend:

```http id="jlwm6j"
?search=beach
```

Backend:

```js id="jlwm7k"
filter.$or = [
   {
      name: {
         $regex: search,
         $options: "i"
      }
   },
   {
      description: {
         $regex: search,
         $options: "i"
      }
   }
];
```

Meaning:
document matches if ANY field matches.

---

# 13. `$or` vs AND

## Normal Object

```js id="jlwm8l"
{
   city: "Goa",
   country: "India"
}
```

means:

```text id="jlwm9m"
AND
```

---

## `$or`

```js id="jlwm0n"
{
   $or: [
      { city: "Goa" },
      { country: "India" }
   ]
}
```

means:

```text id="jlwm1o"
OR
```

---

# 14. Range Queries

Used for:

* budgets
* prices
* ratings
* dates

MongoDB range operators:

| Operator | Meaning               |
| -------- | --------------------- |
| `$gte`   | greater than or equal |
| `$lte`   | less than or equal    |
| `$gt`    | greater than          |
| `$lt`    | less than             |

---

# 15. `$gte`

Example:

```js id="jlwm2p"
{
   estimatedBudget: {
      $gte: 1000
   }
}
```

Meaning:

```text id="jlwm3q"
budget >= 1000
```

---

# 16. `$lte`

```js id="jlwm4r"
{
   estimatedBudget: {
      $lte: 5000
   }
}
```

Meaning:

```text id="jlwm5s"
budget <= 5000
```

---

# 17. Combined Range

```js id="jlwm6t"
{
   estimatedBudget: {
      $gte: 1000,
      $lte: 5000
   }
}
```

Meaning:

```text id="jlwm7u"
1000 <= budget <= 5000
```

---

# 18. Dynamic Nested Object Construction

Example:

```js id="jlwm8v"
filter.estimatedBudget = {};
```

Then:

```js id="jlwm9w"
filter.estimatedBudget.$gte = 1000;
```

This dynamically creates nested query objects.

---

# 19. Schema-Feature Relationship

A backend feature depends on schema design.

Example:

```text id="jlwm0x"
Want budget filtering?
```

Then schema must contain:

```js id="jlwm1y"
estimatedBudget
```

field.

Without appropriate schema fields, features cannot be implemented properly.

---

# 20. Schema Evolution

Real projects evolve over time.

Initial schema:

```js id="jlwm2z"
name
city
country
```

Later expanded:

```js id="jlwm3a"
estimatedBudget
rating
images
categories
coordinates
```

This process is called:

```text id="jlwm4b"
Schema Evolution
```

---

# 21. Mongoose Validation

Example:

```js id="jlwm5c"
estimatedBudget: {
   type: Number,
   min: 0
}
```

`min: 0` prevents negative budgets.

---

# 22. Engineering Concepts Learned

After advanced querying, the following concepts were learned:

* MongoDB query operators
* `$in`
* `$or`
* `$gte`
* `$lte`
* `.split()`
* `.trim()`
* `.map()`
* `new RegExp()`
* regex inside `$in`
* OR vs AND logic
* range queries
* nested query objects
* schema-feature dependency
* schema evolution
* Mongoose validation
* advanced backend query design
