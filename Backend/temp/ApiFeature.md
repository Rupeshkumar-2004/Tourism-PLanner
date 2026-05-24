APIFeatures & Advanced Querying — Notes
Why APIFeatures Exists

Problem with controllers:

if(req.query.sort) { ... }

if(req.query.page) { ... }

if(req.query.fields) { ... }

Controllers become:

huge
repetitive
hard to maintain

Solution:

APIFeatures Class

Centralized reusable query builder.

Mental Model
req.query
    ↓
APIFeatures
    ↓
MongoDB Query Builder
    ↓
Database
Core Architecture
const features = new APIFeatures(
   Destination.find(),
   req.query
)
   .filter()
   .sort()
   .limitFields()
   .paginate();

const destinations = await features.query;
Important Concept

Destination.find() returns:

mongoose query object

NOT actual data.

Query Execution Is Lazy

This does NOT execute DB query:

Destination.find()

Execution happens only when:

await

or:

.then()

is used.

APIFeatures Constructor
class APIFeatures {

   constructor(query, queryString) {

      this.query = query;

      this.queryString = queryString;
   }

}
this.query

Stores mongoose query object.

Example:

Destination.find()
this.queryString

Stores:

req.query
Why Methods Return this
return this;

enables:

Method Chaining
.filter()
.sort()
.paginate()

Without returning this, chaining breaks.

FILTERING
Goal

Convert:

?budget[gte]=1000

into:

{
   budget: {
      $gte: 1000
   }
}
MongoDB Operators
Query Param	MongoDB
gte	$gte
gt	$gt
lte	$lte
lt	$lt
Express Nested Query Parsing

Request:

?budget[gte]=1000

becomes:

{
   budget: {
      gte: "1000"
   }
}
Removing Reserved Fields

Reserved fields are API controls:

page
sort
limit
fields

Not Mongo filters.

Removing Them
const excludedFields = [
   "page",
   "sort",
   "limit",
   "fields"
];

excludedFields.forEach((field) => {
   delete queryObj[field];
});
Main Transformation Trick
Step 1 — Object → String
let queryStr = JSON.stringify(queryObj);
Step 2 — Regex Replace
queryStr = queryStr.replace(
   /\b(gte|gt|lte|lt)\b/g,
   (match) => `$${match}`
);
Regex Breakdown
/\b(gte|gt|lte|lt)\b/g
Part	Meaning
()	grouping
|	OR
\b	word boundary
g	global replacement
Why \b Matters

Without word boundary:

target

could become:

tar$get
Step 3 — String → Object
queryObj = JSON.parse(queryStr);
Final Filter Method
filter() {

   let queryObj = { ...this.queryString };

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

   this.query = this.query.find(queryObj);

   return this;
}
SORTING
Goal

Support:

?sort=-rating,price
Mongoose Sorting
.sort()

Examples:

.sort("price")
.sort("-price")
.sort("-rating price")
Problem

Frontend sends commas:

-rating,price

Mongoose expects spaces:

-rating price
Transformation
const sortBy = this.queryString.sort
   .split(",")
   .join(" ");
Sort Method
sort() {

   if(this.queryString.sort) {

      const sortBy = this.queryString.sort
         .split(",")
         .join(" ");

      this.query = this.query.sort(sortBy);

   } else {

      this.query = this.query.sort("-createdAt");
   }

   return this;
}
Default Sorting

Professional APIs usually use:

-createdAt

to return latest data first.

FIELD LIMITING
Goal

Support:

?fields=name,country,budget
Mongoose Solution
.select()
Example
.select("name country budget")
Excluding Fields
.select("-__v")
Why Hide __v

__v is Mongoose internal version key.

Frontend usually doesn’t need it.

Transformation
const fields = this.queryString.fields
   .split(",")
   .join(" ");
Final Method
limitFields() {

   if(this.queryString.fields) {

      const fields = this.queryString.fields
         .split(",")
         .join(" ");

      this.query = this.query.select(fields);

   } else {

      this.query = this.query.select("-__v");
   }

   return this;
}
PAGINATION
Goal

Support:

?page=2&limit=10
Mongoose Pagination Methods
.skip()
.limit()
Skip Formula

skip=(page−1)×limit

Examples

Page 1:

(1−1)×10=0

Page 2:

(2−1)×10=10

Page 3:

(3−1)×10=20

Important Type Conversion

Query params are strings.

const page = req.query.page * 1;

Converts string → number.

Pagination Method
paginate() {

   const page = this.queryString.page * 1 || 1;

   const limit = this.queryString.limit * 1 || 10;

   const skip = (page - 1) * limit;

   this.query = this.query
      .skip(skip)
      .limit(limit);

   return this;
}
Pagination Metadata

Professional APIs return:

{
   page,
   limit,
   totalResults,
   totalPages,
   hasNextPage,
   hasPrevPage
}
Total Pages Formula

totalPages=⌈
limit
totalResults
	​

⌉

Why Math.ceil()

Example:

57÷10=5.7

Need:

6 pages

because last page still contains remaining documents.

Metadata Logic
const pagination = {
   page,
   limit,
   totalResults,
   totalPages,
   hasNextPage: page < totalPages,
   hasPrevPage: page > 1
};
VERY IMPORTANT Backend Concepts Learned
1. Query Builder Pattern

Composable query pipeline:

.filter()
.sort()
.limitFields()
.paginate()
2. Lazy Query Execution

Mongoose queries execute only at:

await
3. Dynamic Query Architecture

Backend dynamically converts query params into MongoDB queries.

4. Separation Of Concerns
Responsibility	Layer
controller	request/response
APIFeatures	query building
mongoose	DB abstraction
MongoDB	storage
5. Scalable API Design

Features are modular and reusable.

Current Architecture
req.query
    ↓
APIFeatures
    ↓
filter()
    ↓
sort()
    ↓
limitFields()
    ↓
paginate()
    ↓
mongoose query
    ↓
MongoDB
Current Problem In Architecture

We still duplicate filter parsing logic for:

countDocuments()

This leads to next improvement:

Reusable Filter Object Architecture