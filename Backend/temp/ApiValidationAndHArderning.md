# API Validation & Hardening Notes

# 1. Why Validation Is Necessary

Backend should NEVER trust client input.

Frontend data can be:

* invalid
* buggy
* manipulated
* malicious

Therefore backend must validate all incoming data before using it.

This is a core backend engineering principle.

---

# 2. Problems Without Validation

Without validation, users can send invalid queries.

Examples:

```http id="jlwm01"
?page=-100
```

```http id="jlwm02"
?limit=1000000
```

```http id="jlwm03"
?sortType=random
```

These can:

* break logic
* increase database load
* create security issues
* cause unexpected behavior

---

# 3. Query Values Are Strings

All query parameters arrive as strings.

Example:

```http id="jlwm04"
?page=1
```

becomes:

```js id="jlwm05"
req.query.page === "1"
```

NOT number.

Therefore conversion is required.

---

# 4. Number Conversion

```js id="jlwm06"
const pageNumber = Number(page);
const limitNumber = Number(limit);
```

---

# 5. Invalid Number Problem

Example:

```http id="jlwm07"
?page=abc
```

Then:

```js id="jlwm08"
Number("abc")
```

returns:

```js id="jlwm09"
NaN
```

Meaning:

```text id="jlwm10"
Not a Number
```

---

# 6. `Number.isNaN()`

JavaScript provides:

```js id="jlwm11"
Number.isNaN(value)
```

Used to check whether conversion failed.

Example:

```js id="jlwm12"
Number.isNaN(NaN)
```

returns:

```js id="jlwm13"
true
```

---

# 7. Page Validation

```js id="jlwm14"
if(Number.isNaN(pageNumber) || pageNumber < 1){
   throw new ApiError(400, "Invalid page number");
}
```

---

# Why `< 1`?

Because:

* page 0 is invalid
* negative pages are invalid

Pagination logically starts from page 1.

---

# 8. Limit Validation

```js id="jlwm15"
if(Number.isNaN(limitNumber) || limitNumber < 1){
   throw new ApiError(400, "Invalid limit");
}
```

Ensures:

* limit is numeric
* limit is positive

---

# 9. Maximum Limit Protection

Example attack:

```http id="jlwm16"
?limit=1000000
```

This may:

* overload database
* increase memory usage
* slow down API

Therefore maximum limit should be enforced.

Example:

```js id="jlwm17"
if(limitNumber > 50){
   throw new ApiError(
      400,
      "Limit cannot exceed 50"
   );
}
```

---

# 10. API Hardening

Protecting backend against:

* misuse
* abuse
* invalid inputs
* performance attacks

is called:

```text id="jlwm18"
API Hardening
```

This is an important backend engineering concept.

---

# 11. Sort Type Validation

Current sorting logic:

```js id="jlwm19"
sortType === "asc" ? 1 : -1
```

Problem:

```http id="jlwm20"
?sortType=random
```

still becomes:
-1

Incorrect behavior.

---

# 12. Allowed Sort Types

```js id="jlwm21"
const allowedSortTypes = ["asc", "desc"];
```

Validation:

```js id="jlwm22"
if(!allowedSortTypes.includes(sortType)){
   throw new ApiError(
      400,
      "sortType must be asc or desc"
   );
}
```

---

# 13. `.includes()`

Checks whether value exists in array.

Example:

```js id="jlwm23"
["asc", "desc"].includes("asc")
```

returns:

```js id="jlwm24"
true
```

---

# 14. Sort Field Validation

Suppose user sends:

```http id="jlwm25"
?sortBy=hackedField
```

Backend should not allow arbitrary fields.

---

# 15. Whitelisting

Only explicitly allowed fields should be accepted.

Example:

```js id="jlwm26"
const allowedSortFields = [
   "name",
   "city",
   "country",
   "createdAt"
];
```

Validation:

```js id="jlwm27"
if(!allowedSortFields.includes(sortBy)){
   throw new ApiError(
      400,
      "Invalid sort field"
   );
}
```

---

# 16. What Is Whitelisting?

Whitelisting means:

```text id="jlwm28"
Only approved values are allowed
```

Everything else is rejected.

Used heavily in:

* backend validation
* security systems
* API design

---

# 17. Validation Flow

## Step 1 — Convert Query Values

```js id="jlwm29"
Number(page)
```

---

## Step 2 — Validate Numbers

```js id="jlwm30"
Number.isNaN()
```

---

## Step 3 — Validate Range

```js id="jlwm31"
page < 1
```

---

## Step 4 — Validate Allowed Values

```js id="jlwm32"
.includes()
```

---

# 18. Concepts Learned

After implementing validation and API hardening, the following concepts were learned:

* backend validation
* why backend cannot trust frontend
* query parameter validation
* number conversion
* `NaN`
* `Number.isNaN()`
* positive range validation
* API hardening
* maximum limit protection
* `.includes()`
* whitelisting
* safe API design
* defensive backend engineering
