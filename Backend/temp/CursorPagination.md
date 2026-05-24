# Cursor Pagination Notes

# Why Cursor Pagination Exists

Traditional pagination:

```js id="tgn3p8"
skip().limit()
```

works fine initially but becomes problematic at scale.

Problems with offset pagination:

* slow for large datasets
* inconsistent results
* duplicate/missing records
* poor infinite scrolling support

Modern systems solve this using:

# Cursor Pagination

---

# Core Idea

Instead of:

```txt id="zjlwmk"
"Give page 5"
```

Cursor pagination says:

```txt id="18r23m"
"Give records AFTER this item"
```

---

# Mental Model

Offset Pagination:

```txt id="p0s9to"
skip first N records
```

Cursor Pagination:

```txt id="8nkh9s"
start from this position
```

---

# Basic Cursor Pagination Example

Sort by newest:

```js id="jlwm3a"
.sort({ createdAt: -1 })
```

Frontend sends:

```txt id="1yo9lp"
cursor=2026-05-01T10:00:00
```

Backend query:

```js id="9mrv0w"
Destination.find({
    createdAt: {
        $lt: cursor
    }
})
.sort({ createdAt: -1 })
.limit(10)
```

Meaning:

```txt id="zpsb6f"
Give next 10 records older than cursor
```

---

# Why It Is Faster

Offset pagination:

```js id="9p1lnk"
.skip(100000)
```

MongoDB may still traverse many records internally.

Cursor pagination:

```js id="hru5jo"
createdAt < cursor
```

uses indexes directly.

Database jumps directly to the correct position.

Huge performance improvement.

---

# Infinite Scroll Architecture

Apps like:

* Instagram
* Twitter/X
* YouTube
* LinkedIn

mostly use cursor pagination.

Frontend flow:

```txt id="fq5v8x"
Load initial posts
↓
Store last cursor
↓
Request next records using cursor
↓
Append new data
```

---

# Cursor Field Requirements

Good cursor fields should be:

* indexed
* stable
* sortable
* nearly unique

---

# Good Cursor Fields

```txt id="xvjlwm"
_id
createdAt
timestamp
```

---

# Bad Cursor Fields

```txt id="jlwm9z"
category
city
country
```

Because many documents may share same values.

---

# Production-Level Cursor

Real systems often use:

```txt id="pcplqw"
createdAt + _id
```

Why?

Timestamps may collide.

Combining with `_id` ensures stable ordering.

---

# Example API Request

```txt id="vjlwm0"
GET /destinations?cursor=abc123
```

---

# Backend Query

```js id="yo91qz"
Destination.find({
    _id: {
        $lt: cursor
    }
})
.sort({ _id: -1 })
.limit(10)
```

---

# Typical API Response

```js id="t4g72k"
{
    data: [...],

    nextCursor: "xyz456",

    hasMore: true
}
```

Frontend stores:

```txt id="wjlwm7"
nextCursor
```

for future requests.

---

# Stable Sorting

Cursor pagination REQUIRES deterministic sorting.

Good:

```js id="jlwm1s"
.sort({ createdAt: -1 })
```

Bad:

```js id="jlwm2s"
.find().limit(10)
```

Without sorting:

* results become inconsistent
* records may duplicate/move

---

# Offset vs Cursor Pagination

| Feature                     | Offset Pagination | Cursor Pagination |
| --------------------------- | ----------------- | ----------------- |
| Easy to implement           | Yes               | Medium            |
| Supports page numbers       | Yes               | Hard              |
| Deep pagination performance | Poor              | Excellent         |
| Infinite scroll             | Weak              | Excellent         |
| Stable results              | Poor              | Good              |
| Large datasets              | Poor              | Excellent         |

---

# When To Use What

## Use Offset Pagination For

* admin dashboards
* small datasets
* simple table UIs
* traditional page numbers

---

## Use Cursor Pagination For

* social feeds
* notifications
* chat systems
* reviews
* infinite scrolling
* very large collections

---

# Tourism Planner Usage

Good use cases in your app:

* activity feed
* reviews
* trip updates
* comments
* live recommendations

Regular destination listing can still use offset pagination initially.

---

# Important Production Insight

Pagination is actually about:

* index traversal
* database efficiency
* stable ordering
* scalability

NOT just:

```txt id="jlwm4a"
skip + limit
```

---

# Final Mental Model

Offset Pagination:

```txt id="jlwm5b"
page-based navigation
```

Cursor Pagination:

```txt id="jlwm6c"
position-based navigation
```

Modern scalable systems heavily prefer:

# Cursor Pagination
