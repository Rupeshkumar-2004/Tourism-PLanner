# Pagination Metadata & Structured API Response Notes

# 1. Why Pagination Metadata Is Needed

Returning only documents is not enough for frontend applications.

Example insufficient response:

```json
{
   "data": [...]
}
```

Frontend cannot determine:

* how many total results exist
* total number of pages
* whether next page exists
* whether previous page exists

Because of this, professional APIs return metadata along with actual data.

---

# 2. Real World API Structure

Professional paginated APIs usually return:

```json
{
   "success": true,
   "data": {
      "destinations": [...],
      "pagination": {
         "page": 1,
         "limit": 10,
         "totalDocuments": 52,
         "totalPages": 6,
         "hasNextPage": true,
         "hasPrevPage": false
      }
   }
}
```

---

# 3. What Is Metadata?

Metadata means:

```text
Information ABOUT the actual data
```

Example:

* current page
* total pages
* total documents

These describe the dataset rather than being the dataset itself.

---

# 4. Why `countDocuments()` Is Needed

`find()` only returns current page documents.

Example:

```js
Destination.find(filter)
```

returns:

* current page records only

It does NOT return:

* total matching documents

So MongoDB provides:

```js 
countDocuments()
```

---

# 5. `countDocuments()` Usage

```js
const totalDocuments = await Destination.countDocuments(filter);
```

Meaning:
    Count all documents matching the filter

---

# Important Concept

Always use SAME filter in:

* `find()`
* `countDocuments()`

Example:

```http
?city=goa
```

Then count should include ONLY Goa documents.

Incorrect:

```js id="jlwm60"
countDocuments()
```

Correct:

```js id="jlwm70"
countDocuments(filter)
```

---

# 6. Total Pages Calculation

Suppose:

* total documents = 52
* limit = 10

Then:

```text id="jlwm80"
52 / 10 = 5.2
```

Meaning:
6 pages are needed.

---

# `Math.ceil()`

Used to round UP values.

```js id="jlwm90"
const totalPages = Math.ceil(totalDocuments / limitNumber);
```

---

# Why Round Up?

Because last page may contain partial data.

Example:

```text id="jlwm91"
Page 6 contains remaining 2 documents
```

Without rounding up, last page would be lost.

---

# 7. `hasNextPage`

Used by frontend to show:

* next button
* infinite scrolling logic

Logic:

```js id="jlwm92"
const hasNextPage = pageNumber < totalPages;
```

---

# Example

If:

* current page = 2
* total pages = 5

Then:

```text id="jlwm93"
2 < 5
```

Result:

```js id="jlwm94"
true
```

Meaning:
next page exists.

---

# 8. `hasPrevPage`

Logic:

```js id="jlwm95"
const hasPrevPage = pageNumber > 1;
```

---

# Example

If current page is:

```text id="jlwm96"
1
```

then:

```js id="jlwm97"
false
```

because previous page does not exist.

---

# 9. Pagination Object

Pagination-related information is grouped together.

Example:

```js id="jlwm98"
const pagination = {
   page: pageNumber,
   limit: limitNumber,
   totalDocuments,
   totalPages,
   hasNextPage,
   hasPrevPage
};
```

This improves:

* readability
* frontend usability
* response organization

---

# 10. Structured API Response

Instead of returning only array data:

```js id="jlwm99"
destinations
```

return structured object:

```js id="jlwm100"
{
   destinations,
   pagination
}
```

This creates scalable and professional API responses.

---

# 11. Final Query Flow

## Step 1 — Build Filters

```js id="jlwm101"
const filter = {};
```

---

## Step 2 — Count Matching Documents

```js id="jlwm102"
const totalDocuments =
   await Destination.countDocuments(filter);
```

---

## Step 3 — Calculate Pagination

```js id="jlwm103"
const totalPages =
   Math.ceil(totalDocuments / limitNumber);
```

---

## Step 4 — Fetch Paginated Data

```js id="jlwm104"
const destinations = await Destination.find(filter)
   .sort(sortOptions)
   .skip(skip)
   .limit(limitNumber);
```

---

# 12. Concepts Learned

After implementing metadata pagination, the following concepts were learned:

* metadata
* structured API responses
* `countDocuments()`
* total page calculation
* `Math.ceil()`
* `hasNextPage`
* `hasPrevPage`
* reusable pagination object
* professional response structure
* scalable frontend/backend communication
