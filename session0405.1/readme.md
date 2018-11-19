Сгенерируйте приложение для Expressjs с помощью CLI или используйте уже готовое, ранее созданное.

В этом приложении необходимо реализовать один ендпойнт getList, возвращающий JSON подобного вида:

```
[{"id": "1", "pdate":"2014-08-22","time":"10:06:55","customer":"12"},
{"id": "2", "pdate":"2014-08-22","time":"10:06:55","customer":"12"},
{.....}]
```

То есть массив объектов состоящий из 10 элементов.

Второй эндпойнт getListItemById, который будет принимать в качестве параметра id и возвращать только тот объект, который соответствует заданному id.

Также в приложении необходимо реализовать промежуточное ПО (middleware), которое измеряет производительность данного ендпойнта (т.е. какое время занимает вызов данного ендпойнта с браузера).

Для того чтобы замерять время выполнения с максимальной точностью используйте функцию process.hrtime. Для эмуляции нагрузки и задержки в работе ендпойнта используйте функцию setTimeout.