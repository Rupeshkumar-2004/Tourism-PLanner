# Search Systems in MongoDB — Notes

---

# 1. Why Search Systems Matter

Users do NOT search using exact database values.

Example user searches:

```text id="0f2n5x"
cheap beaches
mountain trekking
snow places
goa nightlife
```

Backend must support:

# flexible search behavior

---

# 2. Regex Search Fundamentals

MongoDB supports regex using:

```js id="4grjwb"
$regex
```

Example:

```js id="mjlwm3"
Destination.find({
   name: {
      $regex: "mountain"
   }
});
```

Matches documents containing:

```text id="7kgn4x"
mountain
```

inside the field.

---

# 3. Case Insensitive Search

Use:

```js id="jlwmq7"
$options: "i"
```

Example:

```js id="jlwmr8"
{
   name: {
      $regex: "mountain",
      $options: "i"
   }
}
```

Matches:

```text id="0kqg2p"
Mountain
MOUNTAIN
mountain
```

---

# 4. Multi-Field Search

Search across multiple fields using:

```js id="wjlwm9"
$or
```

Example:

```js id="xjlwm0"
Destination.find({
   $or: [
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
   ]
});
```

---

# 5. Combining Search + Filters

Example request:

```http id="jlwmy1"
GET /destinations?
search=mountain&
country=India
```

Mongo query:

```js id="zjlwm2"
{
   country: "India",

   $or: [
      {
         name: {
            $regex: "mountain",
            $options: "i"
         }
      }
   ]
}
```

---

# 6. Advanced Regex Patterns

---

## Contains Search

```js id="1jlwm3"
{
   $regex: "man"
}
```

Matches:

```text id="2jlwm4"
Manali
Romania
Superman
```

---

## Starts With (`^`)

```js id="3jlwm5"
{
   $regex: "^man"
}
```

Matches:

```text id="4jlwm6"
Manali
Mangalore
```

NOT:

```text id="5jlwm7"
Romania
```

### Important

Prefix regex can often use indexes efficiently.

Very important for:

# autocomplete

---

## Ends With (`$`)

```js id="6jlwm8"
{
   $regex: "garh$"
}
```

Matches strings ending with:

```text id="7jlwm9"
garh
```

---

## Exact Match (`^...$`)

```js id="8jlwm0"
{
   $regex: "^manali$"
}
```

Matches ONLY:

```text id="9jlwm1"
Manali
```

---

# 7. Regex Performance

---

## Index-Friendly Regex

GOOD:

```js id="ajlwm2"
^man
```

Mongo can traverse indexes alphabetically.

---

## Non-Index-Friendly Regex

BAD:

```js id="bjlwm3"
man
```

Often causes:

# full collection scan

because Mongo searches entire strings.

---

# 8. Regex Security Concern

User input can contain dangerous regex patterns.

Example:

```text id="cjlwm4"
.*
```

matches everything.

Potential issue:

# ReDoS (Regex Denial of Service)

---

# 9. Safer Regex Handling

Escape special characters before building regex.

Example:

```js id="djlwm5"
search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
```

---

# 10. Why Regex Search Is Limited

Regex becomes slow at scale.

Especially with:

```text id="ejlwm6"
large collections
contains search
multiple fields
```

This leads to:

# MongoDB Text Indexes

---

# 11. MongoDB Text Indexes

Special indexes optimized for:

# word-based search

---

# 12. Creating Text Index

Example:

```js id="fjlwm7"
destinationSchema.index({
   name: "text",
   description: "text",
   category: "text"
});
```

---

# 13. Important Difference

---

## Regex Search

Pattern matching.

---

## Text Search

Word indexing + tokenization.

Mongo splits text into searchable words internally.

---

# 14. Text Search Query

Mongo uses:

```js id="gjlwm8"
$text
```

and:

```js id="hjlwm9"
$search
```

Example:

```js id="ijlwm0"
Destination.find({
   $text: {
      $search: "mountain"
   }
});
```

---

# 15. Text Search Benefits

## Faster Search

Optimized indexes.

---

## Better Scalability

Works better for large collections.

---

## Multi-Word Search

```js id="jjlwm1"
{
   $search: "mountain trekking"
}
```

---

## Relevance Scoring

Mongo can rank search results.

---

# 16. Search Relevance Score

Example:

```js id="kjlwm2"
Destination.find(
   {
      $text: {
         $search: "mountain"
      }
   },
   {
      score: {
         $meta: "textScore"
      }
   }
)
```

---

# 17. Sorting By Relevance

```js id="ljlwm3"
.sort({
   score: {
      $meta: "textScore"
   }
})
```

Most relevant results appear first.

---

# 18. Weighted Search Fields

Some fields are more important.

Example:

```js id="mjlwm4"
destinationSchema.index(
   {
      name: "text",
      description: "text"
   },
   {
      weights: {
         name: 10,
         description: 2
      }
   }
);
```

Meaning:

* name matches are prioritized
* description matches are less important

---

# 19. MongoDB Text Index Restriction

MongoDB allows:

# only ONE text index per collection

But that single index can contain multiple fields.

---

# 20. Phrase Search

Exact phrase search:

```js id="njlwm5"
{
   $search: "\"snow mountain\""
}
```

---

# 21. Excluding Words

Example:

```js id="ojlwm6"
{
   $search: "mountain -snow"
}
```

Meaning:

```text id="pjlwm7"
contains mountain
but NOT snow
```

---

# 22. Regex vs Text Search

| Feature                 | Regex | Text Search |
| ----------------------- | ----- | ----------- |
| Pattern matching        | YES   | NO          |
| Word search             | Weak  | Strong      |
| Large-scale performance | Poor  | Better      |
| Relevance scoring       | No    | Yes         |
| Partial word search     | Good  | Limited     |
| Autocomplete            | Good  | Weak        |

---

# 23. Real World Architecture

Most apps combine BOTH.

---

## Regex Search

Used for:

* autocomplete
* prefix matching
* partial text search

---

## Text Search

Used for:

* search pages
* relevance ranking
* scalable word search

---

# 24. Tourism Planner Relevance

Your app will eventually need:

* destination search
* autocomplete
* category search
* activity search
* ranking by relevance
* scalable search architecture

Search systems are foundational for modern products.

---

# 25. Key Takeaway

Search systems evolve like this:

```text id="qjlwm8"
regex search
    ↓
advanced regex
    ↓
text indexes
    ↓
relevance scoring
    ↓
search architecture
    ↓
scalable search systems
```

You are now entering real backend search engineering.
