# This is the [Project for english learning](https://bart-git21.github.io/English-Cards/)

# Project Overview:
The web-based single page application for learning English.

# Technologies Used
Frontend: JavaScript, TypeScript, CSS, Bootstrap.
Backend: PHP, PDO.
Database: MySQL.
Authentication: no.
Data format: JSON.
Deployment: GitHub.

# Base URL
http://localhost/index.php

# Features
Create, read, update, and delete sets of sentences.
Allows users to create, read and update sets of sentences.
It provides a user-friendly interface.
Responsive design for mobile and desktop.
The user can choose either ready-made sets 
of sentences with translation 
or specify their own in the text field.
To save a new list of phrases wit translation, 
click on the 'Create' button.
To edit the list, click on the 'Edit' button.

### Игра "Переводить карточки"
![screen](https://github.com/bart-git21/English-Cards/blob/master/intro_translation.jpg)
```
Кнопка "Start" начинает показ фраз из текстового поля. 
В первой итерации будет только одна фраза (и ее перевод).
Во второй - две фразы. 
При этом фразы будут перемешаны и показаны в случайном порядке.
Затем прибавится третья, и т.д.

Если пользователь отвечает правильно, он нажимает кнопку "Delete",
карточка удаляется и в текущей игре показываться не будет.
После того, как будут показаны все фразы,
на экран выведется сообщение о количестве правильных ответов.

Пользователь сам устанавливает длительность паузы между карточками.
```

### Игра "Перемешать слова в карточке"
![screen](https://github.com/bart-git21/English-Cards/blob/master/intro_dragdrop.jpg)
```
На экране отобразится фраза на русском языке.
Ниже ее перевод на английский язык.
При этом все слова перемешаны.
Пользователю необходимо переставить английские слова, 
чтобы составить правильную фразу на английском.
В случае успеха на экран выведется следующая фраза.
```

### Игра "Написание карточек"
![screen](https://github.com/bart-git21/English-Cards/blob/master/intro_writing.jpg)
```
На экране отобразится фраза на русском языке.
Пользователю необходимо написать ту же фразу на английском языке.
В случае успеха на экран выведется следующая фраза.
Кнопка Next позволяет перейти к следующей фразе независимо от результата.
В консоли указан перевод фразы на английский язык.
```