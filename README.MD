#### Задание 2
В файле **README.md** написать следующие запросы для **MongoDB**:
- запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**,
- запрос для *поиска* полей документов коллекции **books** по полю *title*,
- запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи.

*Каждый документ коллекции **books** должен содержать следующую структуру данных:
```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
``` 

#### Решение
- вставка:
```javascript
db.books.insertOne({
    title: "Война и мир",
    description: "Роман-эпопея!",
    authors: "Лев Николаевич Толстой"
});
db.books.insertMany([
    {
        title: "Преступление и наказание",
        description: "А мог стать лесорубом...",
        authors: "Фёдор Михайлович Достоевский"
    },
    {
        title: "Мастер и Маргарита",
        description: "Аннушка уже разлила масло...",
        authors: "Михаи́л Афанасьевич Булгаков"
    }
]);
``` 
- поиск:
```javascript
const search = 'Достаевский';
db.books.find(
    {title: {$text: search}}
)
``` 

- редактирование:
```javascript
const bookId = 100500;
db.books.updateOne(
    {id: bookId},
    {
        $set: {
            description: 'Захватывающая история',
            autors: 'Иван Сергеевич Тургенев',
        }
    }
);
``` 