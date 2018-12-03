1. Напишите запрос, который вернет все документы, у которых isAcitve — true, age от 25 до 45 
и favoriteFruit — banana или strawberry.
```
db.session13.find({
    isActive: true,
    age: {$gt: 25, $lt: 40},
    favoriteFruit: {$in: ["banana","strawberry"]}
    })
```
```
db.session13.find({
    isActive: true,
    $and: [
        { age: {$gt: 25} },
        { age: {$lt: 40} }
    ],
    $or: [
        { favoriteFruit: "banana" },
        { favoriteFruit: "strawberry" }
    ]})
```
2. Напишите запрос, который вернет все документы, у которых first name — Anne, полученный результат 
должен быть отсортирован по полю index в убывающем порядке и содержать поля name, index, eyeColor.
```
db.session13.find({
    "name.first": "Anne", 
    $and: [
        { name: { $exists: true } },
        { index: { $exists: true } },
        { eyeColor: { $exists: true } }
    ]}).sort({index: -1}).pretty()
```
3. Напишите запрос, который вернет все документы, у которых поле tags содержится значение "commodo", полученный результат 
должен содержать поля tags, balance, name.
```
db.session13.find({
    tags: "commodo", 
    $and: [
        { tags: { $exists: true } },
        { balance: { $exists: true } },
        { name: { $exists: true }}
        ]})
```
4. Напишите запрос, который вернет все уникальные значения поля eyeColor у документов, у которых поле favoriteFruit имеет значение banana.
```
db.session13.distinct("eyeColor", { favoriteFruit: "banana"})
```
5. Напишите запрос, который вернет все документы, у которых name первого друга в массиве friends содержит текст "ri" независимо от регистра.
```
db.session13.find({"friends.0.name": { $regex:/ri/ , $options:"i" } })
```
6. Напишите запрос, который вернет все документы, у которых геопозиция в поле location находится в радиусе 400 км от точки с координатами longitude = 143 latitude = 53 .
```
db.places.find({ location: { $geoWithin: { $center: [ [143, 53], 10 ] } } })
```
